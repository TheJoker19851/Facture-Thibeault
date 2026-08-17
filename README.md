# vinext-starter

A PWA for invoice and expense processing at Maçonnerie Thibeault, running on
[vinext](https://github.com/cloudflare/vinext) with Firebase Authentication,
SQL Connect/PostgreSQL and private Storage.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

Production access is role-based: Kim and administrators can use the accounting
workspace, while assigned workers can only submit invoice photos.

## Included Shape

- edit site code under `app/`
- `dataconnect/dataconnect.yaml` records the supplied SQL Connect/PostgreSQL
  service, database, instance and Montréal region
- `firebase/seed-data.ts` contains controlled reference-data input from the
  legacy demo data and Kim's official accounting-table image; it is not seeded
- `firebase/seed-emulator.sql` contains the local-only SQL fixture used by the
  Firebase Data Connect emulator; it never targets production
- `firebase/data-connect.ts` prepares the public client connector metadata
- `firebase.json` and `storage.rules` keep the Firebase boundary closed by
  default and prepare the Montréal region
- `/capture` is the mobile deposit flow and the PWA `start_url`: the first
  button opens the rear camera, additional pages can be added in order, and a
  successful send clears the invoice tray for the next receipt
- `vercel.json` builds vinext through Nitro's Vercel preset; the production
  deployment is protected by Firebase Authentication and uses no custom domain
- `docs/EFVP-Quebec.md` records the Québec privacy and data-transfer checklist
- `app/components/FirebaseShell.tsx` gates the production application behind
  Firebase Authentication and a `WORKER`, `KIM`, `ADMIN` or `SUPER_ADMIN`
  custom claim; the demo mode is only available when production variables are
  absent
- `db/` and `drizzle/` are legacy starter scaffolding and are not the official
  application data model

## Workspace Auth Headers

Signed-in visitors receive both `oai-authenticated-user-id` and `oai-authenticated-user-email`. Private Sites require every visitor to sign in; public Sites may also have anonymous visitors, for whom neither header is present.

The user ID is stable for the same user on the same Site and different across Sites. Email and name are intended for display or contact purposes.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("oai-authenticated-user-id");
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the application and verify the rendered PWA shell
- `pnpm exec tsc --noEmit`: run the TypeScript check (the legacy Cloudflare
  starter files still require their optional worker type package)
- `npx firebase-tools emulators:start --only auth,storage,dataconnect`: run
  the local Firebase Auth, Storage and SQL Connect emulators
- When Java 8 is first on `PATH`, set `JAVA_HOME` to a Java 11+ JDK and put its
  `bin` directory first on `PATH` before starting Firebase CLI
- With the emulators running, load the local fixture into the PostgreSQL
  emulator with `psql -h 127.0.0.1 -p 5433 -U postgres -d facture-thibeault-database -f firebase/seed-emulator.sql`
- See `docs/Firebase-connection.md` for environment separation, connector
  generation and deployment gates

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Firebase documentation](https://firebase.google.com/docs)
