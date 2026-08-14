# Convex foundation

This directory is the target backend for the Thibeault expense application.

- `schema.ts` is the authoritative Convex data model.
- `seed-data.ts` contains migration input copied from the current demo data and
  the official accounting-summary image.
- `reports.ts` contains the first deterministic report query for Kim's table.

The demo arrays in `app/components/ThibeaultApp.tsx` are still used as a local
preview until a Convex deployment URL is configured. They are not the planned
source of truth. The next integration step is to run Convex code generation,
import the seed data once, and switch the UI to the generated API.
