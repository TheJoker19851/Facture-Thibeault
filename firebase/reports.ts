import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";
import { firestore } from "./client";

export type FirebasePerson = {
  id: string;
  fullName: string;
  function?: string;
};

export type FirebaseProject = {
  id: string;
  code: string;
  name: string;
};

export type FirebaseReport = {
  rows: Array<{
    code: string;
    label: string;
    totalBeforeTaxesCents: number;
    displayOrder: number;
  }>;
  totalBeforeTaxesCents: number;
  transactionCount: number;
  source: "firebase";
  fromCache: boolean;
};

type ReportFilters = {
  startDate: string;
  endDate: string;
  personId?: string;
  projectId?: string;
  status?: string;
};

type SnapshotHandler<T> = (value: T) => void;

function sortByFrenchName<T extends { fullName: string }>(items: T[]) {
  return items.sort((a, b) => a.fullName.localeCompare(b.fullName, "fr"));
}

export function subscribeActivePeople(
  onValue: SnapshotHandler<FirebasePerson[]>,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!firestore) {
    onValue([]);
    return () => undefined;
  }

  const peopleQuery = query(
    collection(firestore, "people"),
    where("status", "==", "ACTIVE"),
  );

  return onSnapshot(
    peopleQuery,
    (snapshot) => {
      onValue(
        sortByFrenchName(
          snapshot.docs.map((entry) => {
            const data = entry.data() as DocumentData;
            return {
              id: entry.id,
              fullName: String(data.fullName ?? ""),
              function: data.function ? String(data.function) : undefined,
            };
          }),
        ),
      );
    },
    (error) => onError?.(error),
  );
}

export function subscribeActiveProjects(
  onValue: SnapshotHandler<FirebaseProject[]>,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!firestore) {
    onValue([]);
    return () => undefined;
  }

  const projectsQuery = query(
    collection(firestore, "projects"),
    where("status", "==", "ACTIVE"),
    orderBy("code"),
  );

  return onSnapshot(
    projectsQuery,
    (snapshot) => {
      onValue(
        snapshot.docs.map((entry) => {
          const data = entry.data() as DocumentData;
          return {
            id: entry.id,
            code: String(data.code ?? ""),
            name: String(data.name ?? ""),
          };
        }),
      );
    },
    (error) => onError?.(error),
  );
}

export function subscribeAccountingSummary(
  filters: ReportFilters,
  onValue: SnapshotHandler<FirebaseReport>,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!firestore) {
    onValue({
      rows: [],
      totalBeforeTaxesCents: 0,
      transactionCount: 0,
      source: "firebase",
      fromCache: true,
    });
    return () => undefined;
  }

  let accounts: DocumentData[] = [];
  let transactions: Array<{ id: string; data: DocumentData; fromCache: boolean }> = [];
  let lines: DocumentData[] = [];
  let latestFromCache = false;

  const emit = () => {
    const filteredTransactions = transactions.filter(({ data }) => {
      const invoiceDate = String(data.invoiceDate ?? "");
      if (invoiceDate < filters.startDate || invoiceDate > filters.endDate) return false;
      if (filters.personId && data.submittedPersonId !== filters.personId) return false;
      if (filters.projectId && data.projectId !== filters.projectId) return false;
      if (filters.status && data.status !== filters.status) return false;
      return true;
    });
    const transactionIds = new Set(filteredTransactions.map((transaction) => transaction.id));
    const totals = new Map<string, number>();

    for (const line of lines) {
      if (!transactionIds.has(String(line.transactionId ?? ""))) continue;
      const code = line.accountCodeSnapshot ? String(line.accountCodeSnapshot) : "";
      const lineTotal = typeof line.lineTotalCents === "number" ? line.lineTotalCents : 0;
      if (!code || line.lineTotalCents === undefined) continue;
      totals.set(code, (totals.get(code) ?? 0) + lineTotal);
    }

    const rows = accounts
      .filter((account) => account.type === "EXPENSE" && account.active === true)
      .sort((a, b) => Number(a.displayOrder ?? 0) - Number(b.displayOrder ?? 0))
      .map((account) => ({
        code: String(account.code ?? ""),
        label: String(account.label ?? ""),
        totalBeforeTaxesCents: totals.get(String(account.code ?? "")) ?? 0,
        displayOrder: Number(account.displayOrder ?? 0),
      }));

    onValue({
      rows,
      totalBeforeTaxesCents: rows.reduce((sum, row) => sum + row.totalBeforeTaxesCents, 0),
      transactionCount: filteredTransactions.length,
      source: "firebase",
      fromCache: latestFromCache,
    });
  };

  const unsubscribers: Unsubscribe[] = [];
  unsubscribers.push(
    onSnapshot(
      query(collection(firestore, "accountCategories"), orderBy("displayOrder")),
      (snapshot) => {
        accounts = snapshot.docs.map((entry) => entry.data());
        latestFromCache = latestFromCache || snapshot.metadata.fromCache;
        emit();
      },
      (error) => onError?.(error),
    ),
  );
  unsubscribers.push(
    onSnapshot(
      query(
        collection(firestore, "transactions"),
        where("invoiceDate", ">=", filters.startDate),
        where("invoiceDate", "<=", filters.endDate),
      ),
      (snapshot) => {
        transactions = snapshot.docs.map((entry) => ({
          id: entry.id,
          data: entry.data(),
          fromCache: snapshot.metadata.fromCache,
        }));
        latestFromCache = snapshot.metadata.fromCache;
        emit();
      },
      (error) => onError?.(error),
    ),
  );
  unsubscribers.push(
    onSnapshot(
      collection(firestore, "transactionLines"),
      (snapshot) => {
        lines = snapshot.docs.map((entry) => entry.data());
        latestFromCache = latestFromCache || snapshot.metadata.fromCache;
        emit();
      },
      (error) => onError?.(error),
    ),
  );

  return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
}
