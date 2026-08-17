"use client";

import {
  FormEvent,
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, type User } from "firebase/auth";
import { firebaseAuth, firebaseConfigured } from "../../firebase/client";

export { firebaseConfigured };

export type AppRole = "WORKER" | "KIM" | "ADMIN" | "SUPER_ADMIN";

export type FirebaseIdentity = {
  user: User | null;
  role: AppRole | null;
};

const FirebaseIdentityContext = createContext<FirebaseIdentity>({
  user: null,
  role: null,
});

export function useFirebaseIdentity() {
  return useContext(FirebaseIdentityContext);
}

const subscribeToHydration = () => () => undefined;
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export function FirebaseShell({ children }: { children: ReactNode }) {
  const previewMode = process.env.NEXT_PUBLIC_FIREBASE_PREVIEW_MODE === "true";
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!firebaseAuth) return;
    const unsubscribe = onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      nextUser.getIdTokenResult()
        .then((token) => {
          setRole(readRoleClaim(token.claims.role));
        })
        .catch(() => {
          setRole(null);
        })
        .finally(() => setLoading(false));
    });
    return unsubscribe;
  }, []);

  if (previewMode || !firebaseConfigured) return children;
  if (!hydrated) return children;
  if (!firebaseAuth) return children;
  if (loading) return <div className="firebase-gate">Vérification de la session…</div>;
  if (!user) return <FirebaseSignIn />;
  if (!role) return <FirebaseAccessDenied email={user.email ?? ""} />;
  return <FirebaseIdentityContext.Provider value={{ user, role }}>{children}</FirebaseIdentityContext.Provider>;
}

function readRoleClaim(value: unknown): AppRole | null {
  return value === "WORKER" || value === "KIM" || value === "ADMIN" || value === "SUPER_ADMIN"
    ? value
    : null;
}

function FirebaseAccessDenied({ email }: { email: string }) {
  return <main className="firebase-gate"><section className="firebase-denied"><p className="eyebrow">Accès refusé</p><h1>Compte non autorisé</h1><p className="muted">Le compte {email || "connecté"} n’a pas de rôle actif dans Factures Thibeault. Un administrateur doit lui attribuer le rôle de dépôt ou d’administration.</p></section></main>;
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

  const signInWithGoogle = async () => {
    if (!firebaseAuth) return;
    setSubmitting(true);
    setError("");
    try {
      await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
    } catch {
      setError("Connexion Google refusée. Vérifiez le compte sélectionné ou réessayez.");
      setSubmitting(false);
    }
  };

  return <main className="firebase-gate"><form className="firebase-sign-in" onSubmit={submit}><p className="eyebrow">Accès sécurisé</p><h1>Connexion Thibeault</h1><p className="muted">Utilisez votre compte courriel ou Google autorisé.</p><label><span>Courriel</span><input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label><span>Mot de passe</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="firebase-error">{error}</p>}<button className="primary-button" type="submit" disabled={submitting}>{submitting ? "Connexion…" : "Se connecter"}</button><div className="auth-divider" aria-hidden="true"><span>ou</span></div><button className="secondary-button google-button" type="button" onClick={() => void signInWithGoogle()} disabled={submitting}>{submitting ? "Connexion…" : "Continuer avec Google"}</button></form></main>;
}
