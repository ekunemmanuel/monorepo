import { defineTable } from "convex/server";
import { v } from "convex/values";

export const tasks = defineTable({
  text: v.string(),
  isCompleted: v.boolean(),
});
