"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

type Device = "android" | "ios" | "other";
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallerPage() {
  const [device, setDevice] = useState<Device>("other");
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const detectDeviceAndInstallState = () => {
      const userAgent = navigator.userAgent;
      setDevice(/Android/i.test(userAgent) ? "android" : /iPhone|iPad|iPod/i.test(userAgent) ? "ios" : "other");
      setInstalled(window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    };
    const detectionTimer = window.setTimeout(detectDeviceAndInstallState, 0);

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.clearTimeout(detectionTimer);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    setBusy(true);
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
    } finally {
      setInstallPrompt(null);
      setBusy(false);
    }
  };

  return <main className="installer-page"><section className="installer-card"><img className="installer-icon" src="/icons/thibeault-192.png" width="96" height="96" alt="Facture Thibeault" /><p className="eyebrow">Facture Thibeault</p><h1>Installer l’application</h1><p className="muted">Gardez l’accès à la capture de factures directement sur votre appareil.</p>{installed ? <div className="installer-success"><strong>Facture Thibeault est déjà installée.</strong><span>Ouvrez-la depuis votre écran d’accueil pour travailler comme une application.</span></div> : device === "android" && installPrompt ? <button className="primary-button installer-button" type="button" onClick={() => void install()} disabled={busy}>{busy ? "Installation…" : "Installer Facture Thibeault"}</button> : device === "ios" ? <div className="installer-instructions"><strong>Sur iPhone ou iPad</strong><ol><li>Ouvrez cette page dans Safari.</li><li>Appuyez sur <b>Partager</b>.</li><li>Choisissez <b>Sur l’écran d’accueil</b>.</li><li>Confirmez avec <b>Ajouter</b>.</li></ol></div> : <div className="installer-instructions"><strong>Installation depuis Chrome</strong><p>Sur Android, ouvrez cette page dans Chrome et utilisez le bouton d’installation ou le menu <b>⋮ → Installer l’application</b> lorsque l’option est proposée.</p></div>}<a className="secondary-button installer-open" href="/capture">Ouvrir Facture Thibeault</a></section></main>;
}
