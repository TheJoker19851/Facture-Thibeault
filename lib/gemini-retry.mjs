import {
  parseDecisionChecks,
  parseDecisionExceptions,
  serializeDecisionChecks,
  serializeDecisionExceptions,
} from "./decision-json.mjs";

const TRANSIENT_GEMINI_PATTERN = /high demand|capacity|temporar(?:y|ily)|temporaire|unavailable|try again later|timed?\s*out|timeout|délai|\b429\b|\b503\b/i;

// Provider capacity spikes can last through several cron windows. Only
// explicitly transient Gemini failures are automatically retried, so this
// higher ceiling does not retry business-validation failures.
export const DEFAULT_INVOICE_AI_MAX_ATTEMPTS = 12;
export const AI_MAX_ATTEMPTS_REACHED = "AI_MAX_ATTEMPTS_REACHED";

export function invoiceAiMaxAttempts(rawValue = process.env.INVOICE_AI_MAX_ATTEMPTS) {
  const configured = Number(rawValue ?? DEFAULT_INVOICE_AI_MAX_ATTEMPTS);
  return Number.isInteger(configured) && configured > 0
    ? configured
    : DEFAULT_INVOICE_AI_MAX_ATTEMPTS;
}

export function hasReachedInvoiceAiMaxAttempts(intake, maxAttempts = DEFAULT_INVOICE_AI_MAX_ATTEMPTS) {
  return Number(intake?.processingAttempts ?? 0) >= maxAttempts;
}

function safeDecisionArray(parser, value) {
  try {
    return parser(value ?? "[]");
  } catch {
    return [];
  }
}

export function decisionExceptionsAtMaxAttempts(value, maxAttempts) {
  const exceptions = safeDecisionArray(parseDecisionExceptions, value)
    .filter((exception) => exception.code !== AI_MAX_ATTEMPTS_REACHED);
  exceptions.push({
    code: AI_MAX_ATTEMPTS_REACHED,
    fieldName: null,
    message: `Le traitement IA a atteint la limite de ${maxAttempts} tentatives; intervention humaine requise.`,
    aiValue: String(maxAttempts),
    suggestedValue: null,
    status: "OPEN",
  });
  return serializeDecisionExceptions(exceptions);
}

export function decisionChecksAtMaxAttempts(value, maxAttempts) {
  const checks = safeDecisionArray(parseDecisionChecks, value)
    .filter((check) => check.code !== AI_MAX_ATTEMPTS_REACHED);
  checks.push({
    code: AI_MAX_ATTEMPTS_REACHED,
    passed: false,
    message: `Le traitement IA a atteint la limite de ${maxAttempts} tentatives.`,
  });
  return serializeDecisionChecks(checks);
}

export function transientGeminiErrorCode(source, error) {
  if (source !== "GEMINI") return null;
  const retryable = typeof error === "object" && error !== null && "isRetryable" in error && error.isRetryable === true;
  const message = error instanceof Error ? error.message : String(error);
  return retryable || TRANSIENT_GEMINI_PATTERN.test(message) ? "GEMINI_TRANSIENT" : null;
}

export function isTransientGeminiCapacityRetry(intake) {
  if (intake.processingStatus !== "NEEDS_REVIEW" || intake.accountingStatus !== "NOT_POSTED" ||
    intake.aiErrorCode !== "GEMINI_TRANSIENT" || intake.aiModel) return false;
  try {
    const exceptions = JSON.parse(intake.decisionExceptions ?? "[]");
    return exceptions.some((exception) => exception?.code === "AI_PROCESSING_ERROR" &&
      typeof exception.message === "string" && TRANSIENT_GEMINI_PATTERN.test(exception.message));
  } catch {
    return false;
  }
}
