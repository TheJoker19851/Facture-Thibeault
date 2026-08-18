const TRANSIENT_GEMINI_PATTERN = /high demand|capacity|temporar(?:y|ily)|unavailable|try again later|\b429\b|\b503\b/i;

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
