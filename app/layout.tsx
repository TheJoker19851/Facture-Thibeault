import type { Metadata, Viewport } from "next";
import { FirebaseShell } from "./components/FirebaseShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thibeault · Factures et dépenses",
  description: "Capture mobile et contrôle administratif des dépenses de Maçonnerie Thibeault.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f8fb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><FirebaseShell>{children}</FirebaseShell></body></html>;
}
