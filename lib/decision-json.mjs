import { z } from "zod";

const decisionExceptionSchema = z.object({
  code: z.string().min(1),
  fieldName: z.string().nullable().optional(),
  message: z.string().min(1),
  aiValue: z.string().nullable().optional(),
  suggestedValue: z.string().nullable().optional(),
  status: z.string().min(1).default("OPEN"),
}).passthrough();

const decisionCheckSchema = z.object({
  code: z.string().min(1),
  passed: z.boolean(),
  message: z.string().min(1),
}).passthrough();

export class DecisionJsonError extends Error {
  constructor(fieldName, message, cause) {
    super(`[${fieldName}] ${message}`, cause ? { cause } : undefined);
    this.name = "DecisionJsonError";
    this.fieldName = fieldName;
  }
}

function parseDecisionArray(value, schema, fieldName) {
  if (value == null || String(value).trim() === "") return [];

  let parsed;
  try {
    parsed = JSON.parse(String(value));
  } catch (error) {
    throw new DecisionJsonError(fieldName, "JSON invalide; la donnée doit être corrigée.", error);
  }

  const result = z.array(schema).safeParse(parsed);
  if (!result.success) {
    throw new DecisionJsonError(fieldName, `structure JSON invalide: ${result.error.issues.map((issue) => issue.message).join("; ")}`);
  }
  return result.data;
}

function serializeDecisionArray(value, schema, fieldName) {
  const result = z.array(schema).safeParse(value ?? []);
  if (!result.success) {
    throw new DecisionJsonError(fieldName, `structure de décision invalide: ${result.error.issues.map((issue) => issue.message).join("; ")}`);
  }
  return JSON.stringify(result.data);
}

export function parseDecisionExceptions(value) {
  return parseDecisionArray(value, decisionExceptionSchema, "decisionExceptions");
}

export function parseDecisionChecks(value) {
  return parseDecisionArray(value, decisionCheckSchema, "decisionChecks");
}

export function serializeDecisionExceptions(value) {
  return serializeDecisionArray(value, decisionExceptionSchema, "decisionExceptions");
}

export function serializeDecisionChecks(value) {
  return serializeDecisionArray(value, decisionCheckSchema, "decisionChecks");
}

export function serializeDecision(value, fieldName = "decisionExceptions") {
  return fieldName === "decisionChecks"
    ? serializeDecisionChecks(value)
    : serializeDecisionExceptions(value);
}
