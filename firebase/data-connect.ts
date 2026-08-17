"use client";

import {
  connectDataConnectEmulator,
  getDataConnect,
  type ConnectorConfig,
  type DataConnect,
} from "firebase/data-connect";
import { firebaseApp, firebaseUsesEmulators } from "./client";

export const SQL_CONNECT_LOCATION =
  process.env.NEXT_PUBLIC_SQL_CONNECT_LOCATION ?? "northamerica-northeast1";
export const SQL_CONNECT_SERVICE_ID =
  process.env.NEXT_PUBLIC_SQL_CONNECT_SERVICE_ID ?? "facture-thibeault-service";
export const SQL_CONNECT_CONNECTOR_ID =
  process.env.NEXT_PUBLIC_SQL_CONNECT_CONNECTOR_ID ?? "";

/**
 * This is public connector metadata, not a PostgreSQL credential. The
 * connector ID stays empty until SQL Connect has an approved connector and
 * generated operations. No network request is made by this module alone.
 */
export const sqlConnectConnectorConfig: ConnectorConfig | null =
  SQL_CONNECT_CONNECTOR_ID
    ? {
        location: SQL_CONNECT_LOCATION,
        service: SQL_CONNECT_SERVICE_ID,
        connector: SQL_CONNECT_CONNECTOR_ID,
      }
    : null;

export const sqlConnectConfigured = Boolean(
  firebaseApp && sqlConnectConnectorConfig,
);

export const firebaseDataConnect: DataConnect | null =
  firebaseApp && sqlConnectConnectorConfig
    ? getDataConnect(sqlConnectConnectorConfig)
    : null;

if (
  firebaseDataConnect &&
  firebaseUsesEmulators
) {
  try {
    connectDataConnectEmulator(firebaseDataConnect, "127.0.0.1", 9399);
  } catch {
    // The emulator may already be attached during hot module replacement.
  }
}
