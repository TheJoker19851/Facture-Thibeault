import type { Metadata, Viewport } from "next";
import { FirebaseShell } from "./components/FirebaseShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thibeault · Factures et dépenses",
  description: "Capture mobile et contrôle administratif des dépenses de Maçonnerie Thibeault.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/thibeault-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/thibeault-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icons/thibeault-192.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
