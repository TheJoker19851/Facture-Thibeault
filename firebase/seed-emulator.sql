-- Local Firebase Data Connect emulator fixture only.
-- This file contains demonstration data and must never be run against a
-- production Cloud SQL instance.

BEGIN;

INSERT INTO user_profiles
  (id, firebase_uid, display_name, email, job_title, role, status, created_at, updated_at)
VALUES
  ('PERSON-KEVEN-TREMBLAY', 'demo-keven-tremblay', 'Keven Tremblay', 'keven@example.test', 'Propriétaire', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-PATRICE-SAVARD', 'demo-patrice-savard', 'Patrice Savard', 'patrice@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-STEPHANE-DESCHESNE', 'demo-stephane-deschesne', 'Stéphane Deschêsne', 'stephane@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-OLIVIER-SIMARD', 'demo-olivier-simard', 'Olivier Simard', 'olivier@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-MARTIAL-TREMBLAY', 'demo-martial-tremblay', 'Martial Tremblay', 'martial@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-KEVEN-LAVOIE', 'demo-keven-lavoie', 'Keven Lavoie', 'keven.lavoie@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-SIMON-MURRAY', 'demo-simon-murray', 'Simon Murray', 'simon@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-MICHEL-FORTIER', 'demo-michel-fortier', 'Michel Fortier', 'michel.fortier@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-MICHEL-SIMARD', 'demo-michel-simard', 'Michel Simard', 'michel.simard@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-DAVE-EMOND', 'demo-dave-emond', 'Dave Émond', 'dave@example.test', 'Contremaître', 'WORKER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('PERSON-REAL-SAVARD', 'demo-real-savard', 'Réal Savard', 'real@example.test', 'Contremaître', 'WORKER', 'INACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO expense_accounts (code, label, status, created_at, updated_at)
VALUES
  ('33544', 'Essence', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33556', 'Entretien roulant', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33557', 'Réparation équipement', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('43400', 'CCQ', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33500', 'Matériaux divers', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('42112', 'Frais bureau', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33552', 'Frais de soumission', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('42104', 'Pénalité/amende', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33537', 'Chauffage des travaux', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33539', 'Rebus', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33526', 'Divers', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('34019', 'Équipement de sécurité', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('42102', 'Taxes licence permis', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('34016', 'Voyage et pension', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('11155', 'Avance à l’administrateur', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('45670', 'Promotion', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33558', 'Immatriculation', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33536', 'Location équipement', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33555', 'Entretien camion lourd', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33554', 'Location camion', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('34014', 'Formation', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33540', 'Transport matériel', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('33518', 'Maçonnerie', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('15250', 'Mise de fonds achat tracteur', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('11160', 'Dépôt garantie', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO tax_accounts (code, label, status, created_at, updated_at)
VALUES
  ('21340', 'TPS', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('21370', 'TVQ', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO projects (id, name, status, created_at, updated_at)
VALUES
  ('21', 'Façade', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('125', 'Résidentiel', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('133', 'Chantier Nord', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('135', 'À configurer', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('138', 'Atelier', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('ADMIN', 'Administration / non chantier', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO credit_cards
  (id, holder_id, last_four, card_function, status, active_from, created_at, updated_at)
VALUES
  ('CARD-01', 'PERSON-KEVEN-TREMBLAY', '2481', 'Propriétaire', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-02', 'PERSON-PATRICE-SAVARD', '2286', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-03', 'PERSON-STEPHANE-DESCHESNE', '7184', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-05', 'PERSON-OLIVIER-SIMARD', '0383', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-06', 'PERSON-MARTIAL-TREMBLAY', '9294', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-07', 'PERSON-KEVEN-LAVOIE', '9295', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-08', 'PERSON-SIMON-MURRAY', '9309', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-09', 'PERSON-MICHEL-FORTIER', '2250', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-10', 'PERSON-MICHEL-SIMARD', '9291', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-11', 'PERSON-DAVE-EMOND', '9298', 'Contremaître', 'ACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CARD-04', 'PERSON-REAL-SAVARD', '2141', 'Contremaître', 'INACTIVE', '2026-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO card_statement_periods
  (id, label, start_date, end_date, statement_label, status, created_at, updated_at)
VALUES
  ('2026-06', '10 juin → 09 juillet 2026', '2026-06-10', '2026-07-09', 'Relevé Mastercard · juin', 'OPEN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2026-07', '10 juillet → 09 août 2026', '2026-07-10', '2026-08-09', 'Relevé Mastercard · juillet', 'OPEN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2026-05', '10 mai → 09 juin 2026', '2026-05-10', '2026-06-09', 'Relevé Mastercard · mai', 'CLOSED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO sku_references
  (merchant, sku, product_label, category_label, expense_account_code, verification_status, created_at, updated_at)
VALUES
  ('Canadian Tire', '07654856', 'Matelas Outbound', 'Divers', '33526', 'TO_CONFIRM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO expense_transactions
  (id, transaction_date, vendor, card_id, statement_period_id, project_id,
   expense_account_code, category_label, sku, amount_before_tax_cents,
   tps_cents, tvq_cents, total_cents, currency, status, reconciliation_status,
   classification_source, classification_note, invoice_number, issue,
   created_at, updated_at)
VALUES
  ('TX-2026-0048', '2026-08-12', 'CANAC', 'CARD-01', '2026-07', '125', '33500', 'Matériaux divers', NULL, 16035, 802, 1600, 18437, 'CAD', 'TO_VERIFY', 'UNMATCHED', 'HUMAN_REVIEW', 'Facture multipage détectée. Vérifier les lignes manquantes avant validation.', 'CAN-84219', 'Sous-total incomplet : une ligne de 64,37 $ est absente des photos reçues.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('TX-2026-0047', '2026-08-11', 'Canadian Tire', 'CARD-02', '2026-07', 'ADMIN', '33526', 'Divers', '07654856', 5400, 270, 544, 6214, 'CAD', 'TO_VALIDATE', 'MATCHED', 'SKU_REFERENCE', 'SKU reconnu dans la base locale; contrôle de catégorie en attente.', 'CT-119402', 'Compte comptable à confirmer : le SKU 07654856 n’est pas encore validé.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('TX-2026-0046', '2026-08-10', 'Esso', 'CARD-03', '2026-07', '133', '33544', 'Essence', NULL, 7960, 398, 794, 9152, 'CAD', 'VALIDATED', 'MATCHED', 'CARD_MATCH', 'Contrôles complets; preuve conservée.', 'ESS-66481', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('TX-2026-0045', '2026-08-09', 'Location Équipement Plus', 'CARD-05', '2026-07', '138', '33536', 'Location équipement', NULL, 38000, 1900, 3900, 43800, 'CAD', 'TO_VALIDATE', 'UNMATCHED', 'HUMAN_REVIEW', 'Deux pages regroupées automatiquement; validation administrative requise.', 'LEP-2026-081', 'Bon de livraison non joint à la facture.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('TX-2026-0044', '2026-08-08', 'Béton Montréal', 'CARD-06', '2026-07', '21', '33518', 'Maçonnerie', NULL, 62780, 3139, 6261, 72180, 'CAD', 'VALIDATED', 'MATCHED', 'CARD_MATCH', 'Transaction historique validée.', 'BM-99012', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO invoices
  (id, transaction_id, vendor, invoice_number, invoice_date, subtotal_cents,
   tps_cents, tvq_cents, total_cents, review_status, storage_folder,
   created_by_id, created_at, updated_at)
VALUES
  ('INV-2026-0048', 'TX-2026-0048', 'CANAC', 'CAN-84219', '2026-08-12', 16035, 802, 1600, 18437, 'TO_VERIFY', 'receipts/2026/08/receipt-demo-0048', 'PERSON-KEVEN-TREMBLAY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('INV-2026-0047', 'TX-2026-0047', 'Canadian Tire', 'CT-119402', '2026-08-11', 5400, 270, 544, 6214, 'TO_VERIFY', 'receipts/2026/08/receipt-demo-0047', 'PERSON-PATRICE-SAVARD', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('INV-2026-0046', 'TX-2026-0046', 'Esso', 'ESS-66481', '2026-08-10', 7960, 398, 794, 9152, 'VALIDATED', 'receipts/2026/08/receipt-demo-0046', 'PERSON-STEPHANE-DESCHESNE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('INV-2026-0045', 'TX-2026-0045', 'Location Équipement Plus', 'LEP-2026-081', '2026-08-09', 38000, 1900, 3900, 43800, 'TO_VERIFY', 'receipts/2026/08/receipt-demo-0045', 'PERSON-OLIVIER-SIMARD', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('INV-2026-0044', 'TX-2026-0044', 'Béton Montréal', 'BM-99012', '2026-08-08', 62780, 3139, 6261, 72180, 'VALIDATED', 'receipts/2026/08/receipt-demo-0044', 'PERSON-MARTIAL-TREMBLAY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO invoice_photos
  (id, invoice_id, storage_path, content_type, sequence, created_at)
VALUES
  ('PHOTO-0048-01', 'INV-2026-0048', 'receipts/2026/08/receipt-demo-0048/original-01.jpg', 'image/jpeg', 1, CURRENT_TIMESTAMP),
  ('PHOTO-0048-02', 'INV-2026-0048', 'receipts/2026/08/receipt-demo-0048/original-02.jpg', 'image/jpeg', 2, CURRENT_TIMESTAMP),
  ('PHOTO-0048-03', 'INV-2026-0048', 'receipts/2026/08/receipt-demo-0048/original-03.jpg', 'image/jpeg', 3, CURRENT_TIMESTAMP),
  ('PHOTO-0047-01', 'INV-2026-0047', 'receipts/2026/08/receipt-demo-0047/original-01.jpg', 'image/jpeg', 1, CURRENT_TIMESTAMP),
  ('PHOTO-0045-01', 'INV-2026-0045', 'receipts/2026/08/receipt-demo-0045/original-01.jpg', 'image/jpeg', 1, CURRENT_TIMESTAMP),
  ('PHOTO-0045-02', 'INV-2026-0045', 'receipts/2026/08/receipt-demo-0045/original-02.jpg', 'image/jpeg', 2, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

COMMIT;
