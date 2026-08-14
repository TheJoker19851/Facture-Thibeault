# Firebase Functions boundary

Privileged workflows belong in Cloud Functions, deployed explicitly to
`northamerica-northeast1` (Montréal):

- create the SQL Connect receipt record after an authenticated Storage upload;
- call Gemini server-side and store only validated structured output;
- write `aiRuns` and `auditLogs`;
- perform reconciliation, exports and archival jobs;
- enforce idempotency and role checks outside the browser.

Gemini is intentionally not called from the PWA. Before enabling the function
with real invoice images, complete the Québec EFVP and verify that the chosen
Gemini provider/model supports the Montréal location. If the provider requires
`global` or a non-Québec location, stop and complete the required transfer
assessment and written safeguards first.
