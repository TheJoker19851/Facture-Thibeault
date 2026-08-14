"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_CONVEX_URL : undefined;

export const convexConfigured = Boolean(convexUrl);

const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexShell({ children }: { children: ReactNode }) {
  if (!convexClient) return children;
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
