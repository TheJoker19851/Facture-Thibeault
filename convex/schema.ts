import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const role = v.union(
  v.literal("WORKER"),
  v.literal("ACCOUNTING"),
  v.literal("ADMIN"),
);

const activeStatus = v.union(v.literal("ACTIVE"), v.literal("INACTIVE"));

const auditSource = v.union(
  v.literal("AUTO"),
  v.literal("MANUAL"),
  v.literal("IMPORT"),
  v.literal("SYSTEM"),
);

export default defineSchema({
  users: defineTable({
    authSubject: v.string(),
    email: v.optional(v.string()),
    displayName: v.string(),
    role,
    personId: v.optional(v.id("people")),
    status: activeStatus,
    createdAt: v.number(),
    updatedAt: v.number(),
    deactivatedAt: v.optional(v.number()),
    deactivatedBy: v.optional(v.id("users")),
  })
    .index("by_auth_subject", ["authSubject"])
    .index("by_person", ["personId"])
    .index("by_status", ["status"]),

  people: defineTable({
    legacyKey: v.string(),
    fullName: v.string(),
    function: v.string(),
    status: activeStatus,
    primaryCardId: v.optional(v.id("cards")),
    createdAt: v.number(),
    updatedAt: v.number(),
    deactivatedAt: v.optional(v.number()),
  })
    .index("by_legacy_key", ["legacyKey"])
    .index("by_status", ["status"]),

  cards: defineTable({
    legacyKey: v.string(),
    lastFour: v.string(),
    brand: v.optional(v.string()),
    status: activeStatus,
    issuedAt: v.string(),
    retiredAt: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_legacy_key", ["legacyKey"])
    .index("by_last_four", ["lastFour"])
    .index("by_status", ["status"]),

  personCardAssociations: defineTable({
    personId: v.id("people"),
    cardId: v.id("cards"),
    startsAt: v.string(),
    endsAt: v.optional(v.string()),
    status: activeStatus,
    isPrimary: v.boolean(),
    source: v.union(v.literal("IMPORT"), v.literal("MANUAL")),
    createdAt: v.number(),
    updatedAt: v.number(),
    endedBy: v.optional(v.id("users")),
  })
    .index("by_person_start", ["personId", "startsAt"])
    .index("by_card_start", ["cardId", "startsAt"])
    .index("by_person_status", ["personId", "status"]),

  projects: defineTable({
    legacyKey: v.string(),
    code: v.string(),
    name: v.string(),
    aliases: v.array(v.string()),
    startsAt: v.optional(v.string()),
    endsAt: v.optional(v.string()),
    status: activeStatus,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_legacy_key", ["legacyKey"])
    .index("by_status", ["status"]),

  projectVersions: defineTable({
    projectId: v.id("projects"),
    code: v.string(),
    name: v.string(),
    aliases: v.array(v.string()),
    startsAt: v.optional(v.string()),
    endsAt: v.optional(v.string()),
    status: activeStatus,
    validFrom: v.string(),
    validTo: v.optional(v.string()),
    changedAt: v.number(),
    changedBy: v.optional(v.id("users")),
    reason: v.optional(v.string()),
  }).index("by_project_valid_from", ["projectId", "validFrom"]),

  accountCategories: defineTable({
    code: v.string(),
    label: v.string(),
    type: v.union(v.literal("EXPENSE"), v.literal("TAX")),
    active: v.boolean(),
    displayOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_active_order", ["active", "displayOrder"]),

  accountCategoryVersions: defineTable({
    accountCategoryId: v.id("accountCategories"),
    code: v.string(),
    label: v.string(),
    type: v.union(v.literal("EXPENSE"), v.literal("TAX")),
    validFrom: v.string(),
    validTo: v.optional(v.string()),
    changedAt: v.number(),
    changedBy: v.optional(v.id("users")),
    reason: v.optional(v.string()),
  }).index("by_account_valid_from", ["accountCategoryId", "validFrom"]),

  vendors: defineTable({
    legacyKey: v.string(),
    name: v.string(),
    aliases: v.array(v.string()),
    active: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_legacy_key", ["legacyKey"])
    .index("by_active", ["active"]),

  skuCatalog: defineTable({
    vendorId: v.optional(v.id("vendors")),
    vendorKey: v.string(),
    sku: v.string(),
    originalDescription: v.optional(v.string()),
    normalizedDescription: v.optional(v.string()),
    categoryId: v.optional(v.id("accountCategories")),
    source: v.union(
      v.literal("INTERNAL"),
      v.literal("GEMINI"),
      v.literal("AUTHORIZED_SOURCE"),
      v.literal("HUMAN"),
    ),
    searchedAt: v.number(),
    aiModel: v.optional(v.string()),
    confidence: v.optional(v.number()),
    status: v.union(
      v.literal("UNKNOWN"),
      v.literal("FOUND"),
      v.literal("AMBIGUOUS"),
      v.literal("NOT_FOUND"),
      v.literal("HUMAN_CORRECTED"),
    ),
    humanCorrection: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_vendor_sku", ["vendorKey", "sku"])
    .index("by_status", ["status"]),

  cardPeriods: defineTable({
    periodKey: v.string(),
    label: v.string(),
    officialStartDate: v.string(),
    officialEndDate: v.string(),
    source: v.union(v.literal("STATEMENT"), v.literal("MANUAL")),
    status: v.union(
      v.literal("PROVISIONAL"),
      v.literal("CONFIRMED"),
      v.literal("CORRECTED"),
    ),
    confirmedAt: v.optional(v.number()),
    confirmedBy: v.optional(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_period_key", ["periodKey"])
    .index("by_dates", ["officialStartDate", "officialEndDate"]),

  submissions: defineTable({
    submittedByUserId: v.id("users"),
    submittedPersonId: v.id("people"),
    idempotencyKey: v.string(),
    status: v.union(
      v.literal("RECEIVED"),
      v.literal("ANALYZING"),
      v.literal("READY_FOR_REVIEW"),
      v.literal("VALIDATED"),
      v.literal("REJECTED"),
    ),
    receivedAt: v.number(),
    analysisQueuedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
  })
    .index("by_idempotency", ["idempotencyKey"])
    .index("by_user_status", ["submittedByUserId", "status"]),

  documents: defineTable({
    submissionId: v.id("submissions"),
    kind: v.union(v.literal("INVOICE"), v.literal("RECEIPT"), v.literal("UNKNOWN")),
    sequence: v.number(),
    completeness: v.union(v.literal("COMPLETE"), v.literal("POTENTIALLY_INCOMPLETE"), v.literal("UNKNOWN")),
    groupingConfidence: v.optional(v.number()),
    transactionId: v.optional(v.id("transactions")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_submission", ["submissionId"])
    .index("by_transaction", ["transactionId"]),

  images: defineTable({
    submissionId: v.id("submissions"),
    documentId: v.optional(v.id("documents")),
    storageId: v.id("_storage"),
    sequence: v.number(),
    contentType: v.string(),
    checksum: v.optional(v.string()),
    status: v.union(v.literal("ACTIVE"), v.literal("ARCHIVED"), v.literal("PURGED")),
    capturedAt: v.optional(v.number()),
    archivedAt: v.optional(v.number()),
    archivedBy: v.optional(v.id("users")),
  })
    .index("by_submission", ["submissionId", "sequence"])
    .index("by_document", ["documentId", "sequence"])
    .index("by_status", ["status"]),

  transactions: defineTable({
    submissionId: v.id("submissions"),
    documentId: v.id("documents"),
    submittedByUserId: v.id("users"),
    submittedPersonId: v.id("people"),
    detectedCardLastFour: v.optional(v.string()),
    detectedCardId: v.optional(v.id("cards")),
    statementCardId: v.optional(v.id("cards")),
    personSnapshot: v.object({ personId: v.id("people"), fullName: v.string() }),
    detectedCardSnapshot: v.optional(v.object({ cardId: v.id("cards"), lastFour: v.string(), holderName: v.string() })),
    vendorId: v.optional(v.id("vendors")),
    vendorNameSnapshot: v.optional(v.string()),
    invoiceAddress: v.optional(v.string()),
    invoiceDate: v.optional(v.string()),
    invoiceNumber: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
    projectCodeSnapshot: v.optional(v.string()),
    projectNameSnapshot: v.optional(v.string()),
    status: v.union(v.literal("A_VERIFIER"), v.literal("A_VALIDER"), v.literal("VALIDEE")),
    reconciliationStatus: v.union(
      v.literal("RAPPROCHE_AUTO"),
      v.literal("RAPPROCHE_MANUEL"),
      v.literal("A_VERIFIER"),
      v.literal("FACTURE_MANQUANTE"),
      v.literal("EN_ATTENTE_RELEVE"),
      v.literal("NON_RAPPROCHEE"),
    ),
    subtotalCents: v.optional(v.number()),
    tpsCents: v.optional(v.number()),
    tvqCents: v.optional(v.number()),
    totalTaxCents: v.optional(v.number()),
    totalCents: v.optional(v.number()),
    issueCodes: v.array(v.string()),
    receivedAt: v.number(),
    validatedAt: v.optional(v.number()),
    validatedBy: v.optional(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_invoice_date", ["invoiceDate"])
    .index("by_person_date", ["submittedPersonId", "invoiceDate"])
    .index("by_status", ["status"])
    .index("by_card_date", ["detectedCardId", "invoiceDate"])
    .index("by_project_date", ["projectId", "invoiceDate"])
    .index("by_vendor_date", ["vendorId", "invoiceDate"])
    .index("by_submission", ["submissionId"])
    .index("by_invoice_number", ["invoiceNumber"]),

  transactionLines: defineTable({
    transactionId: v.id("transactions"),
    lineNumber: v.number(),
    sku: v.optional(v.string()),
    originalDescription: v.optional(v.string()),
    normalizedDescription: v.optional(v.string()),
    quantity: v.optional(v.number()),
    unitPriceCents: v.optional(v.number()),
    lineTotalCents: v.optional(v.number()),
    accountCategoryId: v.optional(v.id("accountCategories")),
    accountCodeSnapshot: v.optional(v.string()),
    accountLabelSnapshot: v.optional(v.string()),
    source: v.union(v.literal("AI"), v.literal("HUMAN"), v.literal("IMPORT")),
    humanCorrected: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_transaction", ["transactionId", "lineNumber"])
    .index("by_account", ["accountCategoryId"]),

  statementTransactions: defineTable({
    periodId: v.id("cardPeriods"),
    statementTransactionKey: v.string(),
    cardId: v.optional(v.id("cards")),
    cardLastFour: v.optional(v.string()),
    personId: v.optional(v.id("people")),
    transactionDate: v.string(),
    vendorName: v.optional(v.string()),
    amountCents: v.number(),
    invoiceNumber: v.optional(v.string()),
    statementTransactionNumber: v.optional(v.string()),
    status: v.union(v.literal("IMPORTED"), v.literal("MATCHED"), v.literal("EXCEPTION")),
    createdAt: v.number(),
  })
    .index("by_period", ["periodId"])
    .index("by_card_date_amount", ["cardId", "transactionDate", "amountCents"])
    .index("by_statement_key", ["statementTransactionKey"]),

  reconciliationMatches: defineTable({
    statementTransactionId: v.id("statementTransactions"),
    transactionId: v.optional(v.id("transactions")),
    status: v.union(
      v.literal("RAPPROCHE_AUTO"),
      v.literal("RAPPROCHE_MANUEL"),
      v.literal("A_VERIFIER"),
      v.literal("FACTURE_MANQUANTE"),
      v.literal("EN_ATTENTE_RELEVE"),
    ),
    score: v.optional(v.number()),
    reason: v.string(),
    createdBy: v.optional(v.id("users")),
    createdAt: v.number(),
    confirmedAt: v.optional(v.number()),
    confirmedBy: v.optional(v.id("users")),
  })
    .index("by_statement", ["statementTransactionId"])
    .index("by_transaction", ["transactionId"])
    .index("by_status", ["status"]),

  aiRuns: defineTable({
    submissionId: v.id("submissions"),
    transactionId: v.optional(v.id("transactions")),
    provider: v.string(),
    model: v.string(),
    status: v.union(v.literal("QUEUED"), v.literal("RUNNING"), v.literal("SUCCEEDED"), v.literal("FAILED")),
    inputImageIds: v.array(v.id("images")),
    rawOutputJson: v.optional(v.string()),
    validatedOutputJson: v.optional(v.string()),
    confidence: v.optional(v.number()),
    errorMessage: v.optional(v.string()),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    humanOverride: v.boolean(),
  })
    .index("by_submission", ["submissionId", "startedAt"])
    .index("by_status", ["status"]),

  auditLogs: defineTable({
    actorUserId: v.optional(v.id("users")),
    actorIdentity: v.optional(v.string()),
    action: v.string(),
    objectType: v.string(),
    objectId: v.string(),
    field: v.optional(v.string()),
    beforeValue: v.optional(v.string()),
    afterValue: v.optional(v.string()),
    source: auditSource,
    justification: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_object", ["objectType", "objectId", "createdAt"])
    .index("by_actor", ["actorUserId", "createdAt"])
    .index("by_created_at", ["createdAt"]),

  settings: defineTable({
    key: v.string(),
    valueJson: v.string(),
    version: v.number(),
    activeFrom: v.string(),
    updatedBy: v.optional(v.id("users")),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  archiveJobs: defineTable({
    periodStart: v.string(),
    periodEnd: v.string(),
    status: v.union(v.literal("RECOMMENDED"), v.literal("PREPARING"), v.literal("VERIFIED"), v.literal("PURGED")),
    photoCount: v.number(),
    bytes: v.number(),
    indexStorageId: v.optional(v.id("_storage")),
    manifestStorageId: v.optional(v.id("_storage")),
    requestedBy: v.optional(v.id("users")),
    requestedAt: v.number(),
    verifiedBy: v.optional(v.id("users")),
    verifiedAt: v.optional(v.number()),
    purgedBy: v.optional(v.id("users")),
    purgedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_period", ["periodStart", "periodEnd"]),
});
