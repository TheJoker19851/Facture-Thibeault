"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, type User } from "firebase/auth";
import { firebaseAuth, firebaseConfigured } from "../../firebase/client";

export { firebaseConfigured };

export function FirebaseShell({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!firebaseAuth) return;
    return onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  if (!firebaseConfigured || !firebaseAuth) return children;
  if (loading) return <div className="firebase-gate">Vérification de la session…</div>;
  if (!user) return <FirebaseSignIn />;
  return children;
}

function FirebaseSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firebaseAuth) return;
    setSubmitting(true);
    setError("");
    try {
      await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
    } catch {
      setError("Connexion refusée. Vérifiez votre courriel et votre mot de passe.");
      setSubmitting(false);
    }
  };

  return <main className="firebase-gate"><form className="firebase-sign-in" onSubmit={submit}><p className="eyebrow">Accès sécurisé</p><h1>Connexion Thibeault</h1><p className="muted">Utilisez le compte Firebase qui vous a été attribué.</p><label><span>Courriel</span><input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label><span>Mot de passe</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="firebase-error">{error}</p>}<button className="primary-button" type="submit" disabled={submitting}>{submitting ? "Connexion…" : "Se connecter"}</button></form></main>;
}
