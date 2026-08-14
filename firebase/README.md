# Firebase foundation

Firebase is now the planned application backend. Firestore stores the
structured collections, Cloud Storage stores invoice evidence, Authentication
identifies users, and Cloud Functions will own privileged workflows such as
Gemini analysis, reconciliation, exports and audit writes.

The default data region is `northamerica-northeast1` (Montréal). This is a
technical residency choice, not a complete legal-compliance determination.
Before real personal information is imported, complete the Québec EFVP and
the supplier/data-transfer review described in `docs/EFVP-Quebec.md`.

`seed-data.ts` is a controlled reference-data import input. The runtime source
of truth is Firestore, not this file.
