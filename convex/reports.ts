import { queryGeneric } from "convex/server";
import { v } from "convex/values";

/**
 * Deterministic accounting summary for Kim's official table.
 *
 * The report starts from the configured account order, then adds validated
 * transaction lines. Accounts with no matching lines are intentionally
 * returned with zero so the exported table keeps its official shape.
 */
export const accountingSummary = queryGeneric({
  args: {
    startDate: v.string(),
    endDate: v.string(),
    personId: v.optional(v.string()),
    projectId: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const accounts = await ctx.db
      .query("accountCategories")
      .withIndex("by_active_order", (query) => query.eq("active", true))
      .collect();

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_invoice_date", (query) =>
        query.gte("invoiceDate", args.startDate).lte("invoiceDate", args.endDate),
      )
      .collect();

    const totals = new Map<string, number>();
    let transactionCount = 0;

    for (const transaction of transactions) {
      if (args.personId && transaction.submittedPersonId !== args.personId) continue;
      if (args.projectId && transaction.projectId !== args.projectId) continue;
      if (args.status && transaction.status !== args.status) continue;

      transactionCount += 1;
      const lines = await ctx.db
        .query("transactionLines")
        .withIndex("by_transaction", (query) => query.eq("transactionId", transaction._id))
        .collect();

      for (const line of lines) {
        if (!line.accountCodeSnapshot || line.lineTotalCents === undefined) continue;
        totals.set(
          line.accountCodeSnapshot,
          (totals.get(line.accountCodeSnapshot) ?? 0) + line.lineTotalCents,
        );
      }
    }

    const rows = accounts
      .filter((account) => account.type === "EXPENSE")
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((account) => ({
        code: account.code,
        label: account.label,
        totalBeforeTaxesCents: totals.get(account.code) ?? 0,
        displayOrder: account.displayOrder,
      }));

    return {
      rows,
      totalBeforeTaxesCents: rows.reduce((sum, row) => sum + row.totalBeforeTaxesCents, 0),
      transactionCount,
      source: "convex",
    };
  },
});
