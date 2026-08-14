import { queryGeneric } from "convex/server";

export const listActivePeople = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const people = await ctx.db
      .query("people")
      .withIndex("by_status", (query) => query.eq("status", "ACTIVE"))
      .collect();
    return people.sort((a, b) => a.fullName.localeCompare(b.fullName, "fr"));
  },
});

export const listActiveProjects = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_status", (query) => query.eq("status", "ACTIVE"))
      .collect();
    return projects.sort((a, b) => a.code.localeCompare(b.code, "fr"));
  },
});
