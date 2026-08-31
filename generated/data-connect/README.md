# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `accounting`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`data-connect/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*AdminListInvoices*](#adminlistinvoices)
  - [*AdminListInvoicePhotos*](#adminlistinvoicephotos)
  - [*ListUserProfiles*](#listuserprofiles)
  - [*ListCreditCards*](#listcreditcards)
  - [*ListCardStatementPeriods*](#listcardstatementperiods)
  - [*ListExpenseAccounts*](#listexpenseaccounts)
  - [*ListCreditCardHolderHistories*](#listcreditcardholderhistories)
  - [*ListCreditCardStatements*](#listcreditcardstatements)
  - [*ListCreditCardStatementsPage*](#listcreditcardstatementspage)
  - [*ListCreditCardStatementLines*](#listcreditcardstatementlines)
  - [*ListCreditCardStatementLinesPage*](#listcreditcardstatementlinespage)
  - [*ListAllCreditCardStatementLines*](#listallcreditcardstatementlines)
  - [*ListAllCreditCardStatementLinesPage*](#listallcreditcardstatementlinespage)
  - [*ListMerchantAliases*](#listmerchantaliases)
  - [*ListMerchantAliasesPage*](#listmerchantaliasespage)
  - [*ListReconciliationMatches*](#listreconciliationmatches)
  - [*ListReconciliationMatchesPage*](#listreconciliationmatchespage)
  - [*ListProjects*](#listprojects)
  - [*ListSkuReferences*](#listskureferences)
  - [*ListExpenseTransactions*](#listexpensetransactions)
  - [*ListExpenseTransactionsPage*](#listexpensetransactionspage)
  - [*ListInvoicesToReview*](#listinvoicestoreview)
  - [*ListInvoicesToReviewPage*](#listinvoicestoreviewpage)
  - [*ListInvoiceIntakes*](#listinvoiceintakes)
  - [*ListInvoiceIntakesPage*](#listinvoiceintakespage)
  - [*ListInvoicesForReconciliation*](#listinvoicesforreconciliation)
  - [*ListInvoicesForReconciliationPage*](#listinvoicesforreconciliationpage)
  - [*ListTransactionCorrections*](#listtransactioncorrections)
  - [*ListReportAdjustmentSets*](#listreportadjustmentsets)
  - [*ListAuditEvents*](#listauditevents)
  - [*ListReconciliationOutsideControls*](#listreconciliationoutsidecontrols)
  - [*ListReconciliationOutsideControlsPage*](#listreconciliationoutsidecontrolspage)
  - [*ListCreditCardsPage*](#listcreditcardspage)
  - [*ListCardStatementPeriodsPage*](#listcardstatementperiodspage)
  - [*ListExpenseAccountsPage*](#listexpenseaccountspage)
  - [*ListProjectsPage*](#listprojectspage)
  - [*ListSkuReferencesPage*](#listskureferencespage)
- [**Mutations**](#mutations)
  - [*AdminSeedUserProfile*](#adminseeduserprofile)
  - [*AdminSeedProject*](#adminseedproject)
  - [*AdminSeedExpenseAccount*](#adminseedexpenseaccount)
  - [*AdminSeedCardStatementPeriod*](#adminseedcardstatementperiod)
  - [*AdminSeedInvoiceIntake*](#adminseedinvoiceintake)
  - [*AdminSeedCreditCard*](#adminseedcreditcard)
  - [*AdminSeedCreditCardStatement*](#adminseedcreditcardstatement)
  - [*AdminSeedCreditCardStatementLine*](#adminseedcreditcardstatementline)
  - [*AdminSeedSkuReference*](#adminseedskureference)
  - [*AdminSeedExpenseTransaction*](#adminseedexpensetransaction)
  - [*AdminSeedInvoice*](#adminseedinvoice)
  - [*AdminSeedInvoicePhoto*](#adminseedinvoicephoto)
  - [*AdminDeleteInvoicePhoto*](#admindeleteinvoicephoto)
  - [*AdminDeleteInvoice*](#admindeleteinvoice)
  - [*AdminDeleteExpenseTransaction*](#admindeleteexpensetransaction)
  - [*AdminDeleteInvoiceIntake*](#admindeleteinvoiceintake)
  - [*AdminDeleteCreditCard*](#admindeletecreditcard)
  - [*AdminDeleteSkuReference*](#admindeleteskureference)
  - [*AdminDeleteProject*](#admindeleteproject)
  - [*AdminDeleteExpenseAccount*](#admindeleteexpenseaccount)
  - [*AdminSeedCreditCardHolderHistory*](#adminseedcreditcardholderhistory)
  - [*AdminSeedMerchantAlias*](#adminseedmerchantalias)
  - [*AdminDeleteCardStatementPeriod*](#admindeletecardstatementperiod)
  - [*AdminDeleteUserProfile*](#admindeleteuserprofile)
  - [*AdminRecordArchivePurge*](#adminrecordarchivepurge)
  - [*UpsertUserProfile*](#upsertuserprofile)
  - [*UpsertCreditCard*](#upsertcreditcard)
  - [*AdminUpsertUserProfileWithAudit*](#adminupsertuserprofilewithaudit)
  - [*AdminRecordUserAudit*](#adminrecorduseraudit)
  - [*UpsertProject*](#upsertproject)
  - [*UpsertExpenseAccount*](#upsertexpenseaccount)
  - [*DeleteProject*](#deleteproject)
  - [*DeleteExpenseAccount*](#deleteexpenseaccount)
  - [*DeleteCreditCard*](#deletecreditcard)
  - [*DeleteCreditCardAndHolder*](#deletecreditcardandholder)
  - [*UpsertCardStatementPeriod*](#upsertcardstatementperiod)
  - [*SaveStatementManualAdjustments*](#savestatementmanualadjustments)
  - [*UpsertReportAdjustmentSet*](#upsertreportadjustmentset)
  - [*UpsertCreditCardStatement*](#upsertcreditcardstatement)
  - [*UpsertCreditCardStatementLine*](#upsertcreditcardstatementline)
  - [*UpsertCreditCardHolderHistory*](#upsertcreditcardholderhistory)
  - [*UpsertMerchantAlias*](#upsertmerchantalias)
  - [*PersistReconciliationMatch*](#persistreconciliationmatch)
  - [*ClearReconciliationMatch*](#clearreconciliationmatch)
  - [*PersistReconciliationMatchWithoutInvoice*](#persistreconciliationmatchwithoutinvoice)
  - [*PersistReconciliationLineStatus*](#persistreconciliationlinestatus)
  - [*UpsertReconciliationOutsideControl*](#upsertreconciliationoutsidecontrol)
  - [*ResolveReconciliationOutsideControl*](#resolvereconciliationoutsidecontrol)
  - [*CreateInvoiceIntake*](#createinvoiceintake)
  - [*CreateInvoiceIntakeV2*](#createinvoiceintakev2)
  - [*ClaimInvoiceIntakeProcessing*](#claiminvoiceintakeprocessing)
  - [*RequeueStaleInvoiceIntake*](#requeuestaleinvoiceintake)
  - [*UpdateInvoiceIntakeAiResult*](#updateinvoiceintakeairesult)
  - [*MarkInvoiceIntakeAiError*](#markinvoiceintakeaierror)
  - [*MarkInvoiceIntakeAiMaxAttempts*](#markinvoiceintakeaimaxattempts)
  - [*MarkInvoiceIntakeAutoPostingError*](#markinvoiceintakeautopostingerror)
  - [*UpdateInvoiceIntakeReview*](#updateinvoiceintakereview)
  - [*DiscardInvoiceIntake*](#discardinvoiceintake)
  - [*DeletePostedInvoice*](#deletepostedinvoice)
  - [*MarkInvoiceIntakePostingError*](#markinvoiceintakepostingerror)
  - [*RetryInvoiceIntakeAi*](#retryinvoiceintakeai)
  - [*RetryInvoiceIntakeAiTransient*](#retryinvoiceintakeaitransient)
  - [*RetryInvoiceIntakeAiTransientV2*](#retryinvoiceintakeaitransientv2)
  - [*RetryInvoiceIntakeAiReviewV2*](#retryinvoiceintakeaireviewv2)
  - [*MaterializeInvoiceIntakeV2*](#materializeinvoiceintakev2)
  - [*CorrectPostedInvoice*](#correctpostedinvoice)
  - [*CommitInvoiceIntake*](#commitinvoiceintake)
  - [*CommitInvoiceIntakeWithoutProject*](#commitinvoiceintakewithoutproject)
  - [*AutoCommitInvoiceIntake*](#autocommitinvoiceintake)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `accounting`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@factures-thibeault/data-connect-generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `accounting` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## AdminListInvoices
You can execute the `AdminListInvoices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminListInvoices(vars: AdminListInvoicesVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicesData, AdminListInvoicesVariables>;

interface AdminListInvoicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminListInvoicesVariables): QueryRef<AdminListInvoicesData, AdminListInvoicesVariables>;
}
export const adminListInvoicesRef: AdminListInvoicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListInvoices(dc: DataConnect, vars: AdminListInvoicesVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicesData, AdminListInvoicesVariables>;

interface AdminListInvoicesRef {
  ...
  (dc: DataConnect, vars: AdminListInvoicesVariables): QueryRef<AdminListInvoicesData, AdminListInvoicesVariables>;
}
export const adminListInvoicesRef: AdminListInvoicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListInvoicesRef:
```typescript
const name = adminListInvoicesRef.operationName;
console.log(name);
```

### Variables
The `AdminListInvoices` query requires an argument of type `AdminListInvoicesVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminListInvoicesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `AdminListInvoices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListInvoicesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminListInvoicesData {
  invoices: ({
    id: string;
    intake?: {
      receiptId: string;
      storageFolder: string;
    } & InvoiceIntake_Key;
    invoiceNumber?: string | null;
    processingStatus: string;
    accountingStatus: string;
    reviewStatus: string;
    storageFolder?: string | null;
    transaction: {
      id: string;
      vendor: string;
      invoiceNumber?: string | null;
    } & ExpenseTransaction_Key;
    createdBy?: {
      id: string;
      firebaseUid?: string | null;
    } & UserProfile_Key;
    invoicePhotos_on_invoice: ({
      id: string;
      storagePath: string;
      contentType: string;
      sequence: number;
    } & InvoicePhoto_Key)[];
  } & Invoice_Key)[];
}
```
### Using `AdminListInvoices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListInvoices, AdminListInvoicesVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminListInvoices` query requires an argument of type `AdminListInvoicesVariables`:
const adminListInvoicesVars: AdminListInvoicesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `adminListInvoices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListInvoices(adminListInvoicesVars);
// Variables can be defined inline as well.
const { data } = await adminListInvoices({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListInvoices(dataConnect, adminListInvoicesVars);

console.log(data.invoices);

// Or, you can use the `Promise` API.
adminListInvoices(adminListInvoicesVars).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

### Using `AdminListInvoices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListInvoicesRef, AdminListInvoicesVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminListInvoices` query requires an argument of type `AdminListInvoicesVariables`:
const adminListInvoicesVars: AdminListInvoicesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `adminListInvoicesRef()` function to get a reference to the query.
const ref = adminListInvoicesRef(adminListInvoicesVars);
// Variables can be defined inline as well.
const ref = adminListInvoicesRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListInvoicesRef(dataConnect, adminListInvoicesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

## AdminListInvoicePhotos
You can execute the `AdminListInvoicePhotos` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminListInvoicePhotos(vars: AdminListInvoicePhotosVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;

interface AdminListInvoicePhotosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminListInvoicePhotosVariables): QueryRef<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;
}
export const adminListInvoicePhotosRef: AdminListInvoicePhotosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListInvoicePhotos(dc: DataConnect, vars: AdminListInvoicePhotosVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;

interface AdminListInvoicePhotosRef {
  ...
  (dc: DataConnect, vars: AdminListInvoicePhotosVariables): QueryRef<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;
}
export const adminListInvoicePhotosRef: AdminListInvoicePhotosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListInvoicePhotosRef:
```typescript
const name = adminListInvoicePhotosRef.operationName;
console.log(name);
```

### Variables
The `AdminListInvoicePhotos` query requires an argument of type `AdminListInvoicePhotosVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminListInvoicePhotosVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `AdminListInvoicePhotos` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListInvoicePhotosData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminListInvoicePhotosData {
  invoicePhotos: ({
    id: string;
    invoice: {
      id: string;
      storageFolder?: string | null;
    } & Invoice_Key;
    storagePath: string;
    contentType: string;
    sequence: number;
  } & InvoicePhoto_Key)[];
}
```
### Using `AdminListInvoicePhotos`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListInvoicePhotos, AdminListInvoicePhotosVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminListInvoicePhotos` query requires an argument of type `AdminListInvoicePhotosVariables`:
const adminListInvoicePhotosVars: AdminListInvoicePhotosVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `adminListInvoicePhotos()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListInvoicePhotos(adminListInvoicePhotosVars);
// Variables can be defined inline as well.
const { data } = await adminListInvoicePhotos({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListInvoicePhotos(dataConnect, adminListInvoicePhotosVars);

console.log(data.invoicePhotos);

// Or, you can use the `Promise` API.
adminListInvoicePhotos(adminListInvoicePhotosVars).then((response) => {
  const data = response.data;
  console.log(data.invoicePhotos);
});
```

### Using `AdminListInvoicePhotos`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListInvoicePhotosRef, AdminListInvoicePhotosVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminListInvoicePhotos` query requires an argument of type `AdminListInvoicePhotosVariables`:
const adminListInvoicePhotosVars: AdminListInvoicePhotosVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `adminListInvoicePhotosRef()` function to get a reference to the query.
const ref = adminListInvoicePhotosRef(adminListInvoicePhotosVars);
// Variables can be defined inline as well.
const ref = adminListInvoicePhotosRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListInvoicePhotosRef(dataConnect, adminListInvoicePhotosVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoicePhotos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoicePhotos);
});
```

## ListUserProfiles
You can execute the `ListUserProfiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listUserProfiles(vars: ListUserProfilesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserProfilesData, ListUserProfilesVariables>;

interface ListUserProfilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserProfilesVariables): QueryRef<ListUserProfilesData, ListUserProfilesVariables>;
}
export const listUserProfilesRef: ListUserProfilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserProfiles(dc: DataConnect, vars: ListUserProfilesVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserProfilesData, ListUserProfilesVariables>;

interface ListUserProfilesRef {
  ...
  (dc: DataConnect, vars: ListUserProfilesVariables): QueryRef<ListUserProfilesData, ListUserProfilesVariables>;
}
export const listUserProfilesRef: ListUserProfilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserProfilesRef:
```typescript
const name = listUserProfilesRef.operationName;
console.log(name);
```

### Variables
The `ListUserProfiles` query requires an argument of type `ListUserProfilesVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUserProfilesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListUserProfiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserProfilesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserProfilesData {
  userProfiles: ({
    id: string;
    firebaseUid?: string | null;
    displayName: string;
    email?: string | null;
    jobTitle?: string | null;
    role: string;
    status: string;
    invitationStatus: string;
    invitationSentAt?: TimestampString | null;
    invitationSentBy?: string | null;
    lastInvitationError?: string | null;
    activatedAt?: TimestampString | null;
  } & UserProfile_Key)[];
}
```
### Using `ListUserProfiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserProfiles, ListUserProfilesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListUserProfiles` query requires an argument of type `ListUserProfilesVariables`:
const listUserProfilesVars: ListUserProfilesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listUserProfiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserProfiles(listUserProfilesVars);
// Variables can be defined inline as well.
const { data } = await listUserProfiles({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserProfiles(dataConnect, listUserProfilesVars);

console.log(data.userProfiles);

// Or, you can use the `Promise` API.
listUserProfiles(listUserProfilesVars).then((response) => {
  const data = response.data;
  console.log(data.userProfiles);
});
```

### Using `ListUserProfiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserProfilesRef, ListUserProfilesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListUserProfiles` query requires an argument of type `ListUserProfilesVariables`:
const listUserProfilesVars: ListUserProfilesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listUserProfilesRef()` function to get a reference to the query.
const ref = listUserProfilesRef(listUserProfilesVars);
// Variables can be defined inline as well.
const ref = listUserProfilesRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserProfilesRef(dataConnect, listUserProfilesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userProfiles);
});
```

## ListCreditCards
You can execute the `ListCreditCards` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCreditCards(options?: ExecuteQueryOptions): QueryPromise<ListCreditCardsData, undefined>;

interface ListCreditCardsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCreditCardsData, undefined>;
}
export const listCreditCardsRef: ListCreditCardsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCreditCards(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardsData, undefined>;

interface ListCreditCardsRef {
  ...
  (dc: DataConnect): QueryRef<ListCreditCardsData, undefined>;
}
export const listCreditCardsRef: ListCreditCardsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCreditCardsRef:
```typescript
const name = listCreditCardsRef.operationName;
console.log(name);
```

### Variables
The `ListCreditCards` query has no variables.
### Return Type
Recall that executing the `ListCreditCards` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCreditCardsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCreditCardsData {
  creditCards: ({
    id: string;
    lastFour: string;
    holder: {
      id: string;
      displayName: string;
      role: string;
      status: string;
    } & UserProfile_Key;
    cardFunction?: string | null;
    activeFrom?: DateString | null;
    inactiveFrom?: DateString | null;
    status: string;
  } & CreditCard_Key)[];
}
```
### Using `ListCreditCards`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCreditCards } from '@factures-thibeault/data-connect-generated';


// Call the `listCreditCards()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCreditCards();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCreditCards(dataConnect);

console.log(data.creditCards);

// Or, you can use the `Promise` API.
listCreditCards().then((response) => {
  const data = response.data;
  console.log(data.creditCards);
});
```

### Using `ListCreditCards`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCreditCardsRef } from '@factures-thibeault/data-connect-generated';


// Call the `listCreditCardsRef()` function to get a reference to the query.
const ref = listCreditCardsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCreditCardsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCards);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCards);
});
```

## ListCardStatementPeriods
You can execute the `ListCardStatementPeriods` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCardStatementPeriods(options?: ExecuteQueryOptions): QueryPromise<ListCardStatementPeriodsData, undefined>;

interface ListCardStatementPeriodsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCardStatementPeriodsData, undefined>;
}
export const listCardStatementPeriodsRef: ListCardStatementPeriodsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCardStatementPeriods(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCardStatementPeriodsData, undefined>;

interface ListCardStatementPeriodsRef {
  ...
  (dc: DataConnect): QueryRef<ListCardStatementPeriodsData, undefined>;
}
export const listCardStatementPeriodsRef: ListCardStatementPeriodsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCardStatementPeriodsRef:
```typescript
const name = listCardStatementPeriodsRef.operationName;
console.log(name);
```

### Variables
The `ListCardStatementPeriods` query has no variables.
### Return Type
Recall that executing the `ListCardStatementPeriods` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCardStatementPeriodsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCardStatementPeriodsData {
  cardStatementPeriods: ({
    id: string;
    label: string;
    startDate: DateString;
    endDate: DateString;
    statementLabel?: string | null;
    manualAdjustmentsJson?: string | null;
    status: string;
  } & CardStatementPeriod_Key)[];
}
```
### Using `ListCardStatementPeriods`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCardStatementPeriods } from '@factures-thibeault/data-connect-generated';


// Call the `listCardStatementPeriods()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCardStatementPeriods();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCardStatementPeriods(dataConnect);

console.log(data.cardStatementPeriods);

// Or, you can use the `Promise` API.
listCardStatementPeriods().then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriods);
});
```

### Using `ListCardStatementPeriods`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCardStatementPeriodsRef } from '@factures-thibeault/data-connect-generated';


// Call the `listCardStatementPeriodsRef()` function to get a reference to the query.
const ref = listCardStatementPeriodsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCardStatementPeriodsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.cardStatementPeriods);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriods);
});
```

## ListExpenseAccounts
You can execute the `ListExpenseAccounts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listExpenseAccounts(options?: ExecuteQueryOptions): QueryPromise<ListExpenseAccountsData, undefined>;

interface ListExpenseAccountsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListExpenseAccountsData, undefined>;
}
export const listExpenseAccountsRef: ListExpenseAccountsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExpenseAccounts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListExpenseAccountsData, undefined>;

interface ListExpenseAccountsRef {
  ...
  (dc: DataConnect): QueryRef<ListExpenseAccountsData, undefined>;
}
export const listExpenseAccountsRef: ListExpenseAccountsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExpenseAccountsRef:
```typescript
const name = listExpenseAccountsRef.operationName;
console.log(name);
```

### Variables
The `ListExpenseAccounts` query has no variables.
### Return Type
Recall that executing the `ListExpenseAccounts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExpenseAccountsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListExpenseAccountsData {
  expenseAccounts: ({
    id: string;
    number: string;
    label: string;
    type: string;
    status: string;
  } & ExpenseAccount_Key)[];
}
```
### Using `ListExpenseAccounts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExpenseAccounts } from '@factures-thibeault/data-connect-generated';


// Call the `listExpenseAccounts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExpenseAccounts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExpenseAccounts(dataConnect);

console.log(data.expenseAccounts);

// Or, you can use the `Promise` API.
listExpenseAccounts().then((response) => {
  const data = response.data;
  console.log(data.expenseAccounts);
});
```

### Using `ListExpenseAccounts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExpenseAccountsRef } from '@factures-thibeault/data-connect-generated';


// Call the `listExpenseAccountsRef()` function to get a reference to the query.
const ref = listExpenseAccountsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExpenseAccountsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.expenseAccounts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseAccounts);
});
```

## ListCreditCardHolderHistories
You can execute the `ListCreditCardHolderHistories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCreditCardHolderHistories(vars: ListCreditCardHolderHistoriesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;

interface ListCreditCardHolderHistoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardHolderHistoriesVariables): QueryRef<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;
}
export const listCreditCardHolderHistoriesRef: ListCreditCardHolderHistoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCreditCardHolderHistories(dc: DataConnect, vars: ListCreditCardHolderHistoriesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;

interface ListCreditCardHolderHistoriesRef {
  ...
  (dc: DataConnect, vars: ListCreditCardHolderHistoriesVariables): QueryRef<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;
}
export const listCreditCardHolderHistoriesRef: ListCreditCardHolderHistoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCreditCardHolderHistoriesRef:
```typescript
const name = listCreditCardHolderHistoriesRef.operationName;
console.log(name);
```

### Variables
The `ListCreditCardHolderHistories` query requires an argument of type `ListCreditCardHolderHistoriesVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCreditCardHolderHistoriesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListCreditCardHolderHistories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCreditCardHolderHistoriesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCreditCardHolderHistoriesData {
  creditCardHolderHistories: ({
    id: string;
    card: {
      id: string;
      lastFour: string;
    } & CreditCard_Key;
    holder: {
      id: string;
      displayName: string;
      role: string;
      status: string;
    } & UserProfile_Key;
    validFrom: DateString;
    validTo?: DateString | null;
    isCurrent: boolean;
    status: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardHolderHistory_Key)[];
}
```
### Using `ListCreditCardHolderHistories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCreditCardHolderHistories, ListCreditCardHolderHistoriesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardHolderHistories` query requires an argument of type `ListCreditCardHolderHistoriesVariables`:
const listCreditCardHolderHistoriesVars: ListCreditCardHolderHistoriesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardHolderHistories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCreditCardHolderHistories(listCreditCardHolderHistoriesVars);
// Variables can be defined inline as well.
const { data } = await listCreditCardHolderHistories({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCreditCardHolderHistories(dataConnect, listCreditCardHolderHistoriesVars);

console.log(data.creditCardHolderHistories);

// Or, you can use the `Promise` API.
listCreditCardHolderHistories(listCreditCardHolderHistoriesVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardHolderHistories);
});
```

### Using `ListCreditCardHolderHistories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCreditCardHolderHistoriesRef, ListCreditCardHolderHistoriesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardHolderHistories` query requires an argument of type `ListCreditCardHolderHistoriesVariables`:
const listCreditCardHolderHistoriesVars: ListCreditCardHolderHistoriesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardHolderHistoriesRef()` function to get a reference to the query.
const ref = listCreditCardHolderHistoriesRef(listCreditCardHolderHistoriesVars);
// Variables can be defined inline as well.
const ref = listCreditCardHolderHistoriesRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCreditCardHolderHistoriesRef(dataConnect, listCreditCardHolderHistoriesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCardHolderHistories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardHolderHistories);
});
```

## ListCreditCardStatements
You can execute the `ListCreditCardStatements` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCreditCardStatements(vars: ListCreditCardStatementsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;

interface ListCreditCardStatementsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardStatementsVariables): QueryRef<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;
}
export const listCreditCardStatementsRef: ListCreditCardStatementsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCreditCardStatements(dc: DataConnect, vars: ListCreditCardStatementsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;

interface ListCreditCardStatementsRef {
  ...
  (dc: DataConnect, vars: ListCreditCardStatementsVariables): QueryRef<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;
}
export const listCreditCardStatementsRef: ListCreditCardStatementsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCreditCardStatementsRef:
```typescript
const name = listCreditCardStatementsRef.operationName;
console.log(name);
```

### Variables
The `ListCreditCardStatements` query requires an argument of type `ListCreditCardStatementsVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCreditCardStatementsVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListCreditCardStatements` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCreditCardStatementsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCreditCardStatementsData {
  creditCardStatements: ({
    id: string;
    card: {
      id: string;
      lastFour: string;
      holder: {
        id: string;
        displayName: string;
      } & UserProfile_Key;
    } & CreditCard_Key;
    holderIdSnapshot: string;
    holderNameSnapshot: string;
    periodStart: DateString;
    periodEnd: DateString;
    originalStoragePath: string;
    originalFilename: string;
    importedAt: TimestampString;
    importedBy: {
      id: string;
      displayName: string;
    } & UserProfile_Key;
    statementHash: string;
    status: string;
    lineCount: number;
    totalAmountCents: Int64String;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardStatement_Key)[];
}
```
### Using `ListCreditCardStatements`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCreditCardStatements, ListCreditCardStatementsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardStatements` query requires an argument of type `ListCreditCardStatementsVariables`:
const listCreditCardStatementsVars: ListCreditCardStatementsVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardStatements()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCreditCardStatements(listCreditCardStatementsVars);
// Variables can be defined inline as well.
const { data } = await listCreditCardStatements({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCreditCardStatements(dataConnect, listCreditCardStatementsVars);

console.log(data.creditCardStatements);

// Or, you can use the `Promise` API.
listCreditCardStatements(listCreditCardStatementsVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatements);
});
```

### Using `ListCreditCardStatements`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCreditCardStatementsRef, ListCreditCardStatementsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardStatements` query requires an argument of type `ListCreditCardStatementsVariables`:
const listCreditCardStatementsVars: ListCreditCardStatementsVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardStatementsRef()` function to get a reference to the query.
const ref = listCreditCardStatementsRef(listCreditCardStatementsVars);
// Variables can be defined inline as well.
const ref = listCreditCardStatementsRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCreditCardStatementsRef(dataConnect, listCreditCardStatementsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCardStatements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatements);
});
```

## ListCreditCardStatementsPage
You can execute the `ListCreditCardStatementsPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCreditCardStatementsPage(vars: ListCreditCardStatementsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;

interface ListCreditCardStatementsPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardStatementsPageVariables): QueryRef<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;
}
export const listCreditCardStatementsPageRef: ListCreditCardStatementsPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCreditCardStatementsPage(dc: DataConnect, vars: ListCreditCardStatementsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;

interface ListCreditCardStatementsPageRef {
  ...
  (dc: DataConnect, vars: ListCreditCardStatementsPageVariables): QueryRef<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;
}
export const listCreditCardStatementsPageRef: ListCreditCardStatementsPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCreditCardStatementsPageRef:
```typescript
const name = listCreditCardStatementsPageRef.operationName;
console.log(name);
```

### Variables
The `ListCreditCardStatementsPage` query requires an argument of type `ListCreditCardStatementsPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCreditCardStatementsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListCreditCardStatementsPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCreditCardStatementsPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCreditCardStatementsPageData {
  creditCardStatements: ({
    id: string;
    card: {
      id: string;
      lastFour: string;
      holder: {
        id: string;
        displayName: string;
      } & UserProfile_Key;
    } & CreditCard_Key;
    holderIdSnapshot: string;
    holderNameSnapshot: string;
    periodStart: DateString;
    periodEnd: DateString;
    originalStoragePath: string;
    originalFilename: string;
    importedAt: TimestampString;
    importedBy: {
      id: string;
      displayName: string;
    } & UserProfile_Key;
    statementHash: string;
    status: string;
    lineCount: number;
    totalAmountCents: Int64String;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardStatement_Key)[];
}
```
### Using `ListCreditCardStatementsPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCreditCardStatementsPage, ListCreditCardStatementsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardStatementsPage` query requires an argument of type `ListCreditCardStatementsPageVariables`:
const listCreditCardStatementsPageVars: ListCreditCardStatementsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardStatementsPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCreditCardStatementsPage(listCreditCardStatementsPageVars);
// Variables can be defined inline as well.
const { data } = await listCreditCardStatementsPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCreditCardStatementsPage(dataConnect, listCreditCardStatementsPageVars);

console.log(data.creditCardStatements);

// Or, you can use the `Promise` API.
listCreditCardStatementsPage(listCreditCardStatementsPageVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatements);
});
```

### Using `ListCreditCardStatementsPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCreditCardStatementsPageRef, ListCreditCardStatementsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardStatementsPage` query requires an argument of type `ListCreditCardStatementsPageVariables`:
const listCreditCardStatementsPageVars: ListCreditCardStatementsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardStatementsPageRef()` function to get a reference to the query.
const ref = listCreditCardStatementsPageRef(listCreditCardStatementsPageVars);
// Variables can be defined inline as well.
const ref = listCreditCardStatementsPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCreditCardStatementsPageRef(dataConnect, listCreditCardStatementsPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCardStatements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatements);
});
```

## ListCreditCardStatementLines
You can execute the `ListCreditCardStatementLines` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCreditCardStatementLines(vars: ListCreditCardStatementLinesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;

interface ListCreditCardStatementLinesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardStatementLinesVariables): QueryRef<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;
}
export const listCreditCardStatementLinesRef: ListCreditCardStatementLinesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCreditCardStatementLines(dc: DataConnect, vars: ListCreditCardStatementLinesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;

interface ListCreditCardStatementLinesRef {
  ...
  (dc: DataConnect, vars: ListCreditCardStatementLinesVariables): QueryRef<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;
}
export const listCreditCardStatementLinesRef: ListCreditCardStatementLinesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCreditCardStatementLinesRef:
```typescript
const name = listCreditCardStatementLinesRef.operationName;
console.log(name);
```

### Variables
The `ListCreditCardStatementLines` query requires an argument of type `ListCreditCardStatementLinesVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCreditCardStatementLinesVariables {
  statementId: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListCreditCardStatementLines` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCreditCardStatementLinesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCreditCardStatementLinesData {
  creditCardStatementLines: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    sequence: number;
    transactionDate: DateString;
    postedDate?: DateString | null;
    merchantRaw: string;
    merchantNormalized: string;
    amountCents: Int64String;
    externalReference?: string | null;
    status: string;
    rawData?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardStatementLine_Key)[];
}
```
### Using `ListCreditCardStatementLines`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCreditCardStatementLines, ListCreditCardStatementLinesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardStatementLines` query requires an argument of type `ListCreditCardStatementLinesVariables`:
const listCreditCardStatementLinesVars: ListCreditCardStatementLinesVariables = {
  statementId: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardStatementLines()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCreditCardStatementLines(listCreditCardStatementLinesVars);
// Variables can be defined inline as well.
const { data } = await listCreditCardStatementLines({ statementId: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCreditCardStatementLines(dataConnect, listCreditCardStatementLinesVars);

console.log(data.creditCardStatementLines);

// Or, you can use the `Promise` API.
listCreditCardStatementLines(listCreditCardStatementLinesVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLines);
});
```

### Using `ListCreditCardStatementLines`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCreditCardStatementLinesRef, ListCreditCardStatementLinesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardStatementLines` query requires an argument of type `ListCreditCardStatementLinesVariables`:
const listCreditCardStatementLinesVars: ListCreditCardStatementLinesVariables = {
  statementId: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardStatementLinesRef()` function to get a reference to the query.
const ref = listCreditCardStatementLinesRef(listCreditCardStatementLinesVars);
// Variables can be defined inline as well.
const ref = listCreditCardStatementLinesRef({ statementId: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCreditCardStatementLinesRef(dataConnect, listCreditCardStatementLinesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCardStatementLines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLines);
});
```

## ListCreditCardStatementLinesPage
You can execute the `ListCreditCardStatementLinesPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCreditCardStatementLinesPage(vars: ListCreditCardStatementLinesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;

interface ListCreditCardStatementLinesPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardStatementLinesPageVariables): QueryRef<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;
}
export const listCreditCardStatementLinesPageRef: ListCreditCardStatementLinesPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCreditCardStatementLinesPage(dc: DataConnect, vars: ListCreditCardStatementLinesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;

interface ListCreditCardStatementLinesPageRef {
  ...
  (dc: DataConnect, vars: ListCreditCardStatementLinesPageVariables): QueryRef<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;
}
export const listCreditCardStatementLinesPageRef: ListCreditCardStatementLinesPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCreditCardStatementLinesPageRef:
```typescript
const name = listCreditCardStatementLinesPageRef.operationName;
console.log(name);
```

### Variables
The `ListCreditCardStatementLinesPage` query requires an argument of type `ListCreditCardStatementLinesPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCreditCardStatementLinesPageVariables {
  statementId: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListCreditCardStatementLinesPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCreditCardStatementLinesPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCreditCardStatementLinesPageData {
  creditCardStatementLines: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    sequence: number;
    transactionDate: DateString;
    postedDate?: DateString | null;
    merchantRaw: string;
    merchantNormalized: string;
    amountCents: Int64String;
    externalReference?: string | null;
    status: string;
    rawData?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardStatementLine_Key)[];
}
```
### Using `ListCreditCardStatementLinesPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCreditCardStatementLinesPage, ListCreditCardStatementLinesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardStatementLinesPage` query requires an argument of type `ListCreditCardStatementLinesPageVariables`:
const listCreditCardStatementLinesPageVars: ListCreditCardStatementLinesPageVariables = {
  statementId: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardStatementLinesPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCreditCardStatementLinesPage(listCreditCardStatementLinesPageVars);
// Variables can be defined inline as well.
const { data } = await listCreditCardStatementLinesPage({ statementId: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCreditCardStatementLinesPage(dataConnect, listCreditCardStatementLinesPageVars);

console.log(data.creditCardStatementLines);

// Or, you can use the `Promise` API.
listCreditCardStatementLinesPage(listCreditCardStatementLinesPageVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLines);
});
```

### Using `ListCreditCardStatementLinesPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCreditCardStatementLinesPageRef, ListCreditCardStatementLinesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardStatementLinesPage` query requires an argument of type `ListCreditCardStatementLinesPageVariables`:
const listCreditCardStatementLinesPageVars: ListCreditCardStatementLinesPageVariables = {
  statementId: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardStatementLinesPageRef()` function to get a reference to the query.
const ref = listCreditCardStatementLinesPageRef(listCreditCardStatementLinesPageVars);
// Variables can be defined inline as well.
const ref = listCreditCardStatementLinesPageRef({ statementId: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCreditCardStatementLinesPageRef(dataConnect, listCreditCardStatementLinesPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCardStatementLines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLines);
});
```

## ListAllCreditCardStatementLines
You can execute the `ListAllCreditCardStatementLines` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listAllCreditCardStatementLines(vars: ListAllCreditCardStatementLinesVariables, options?: ExecuteQueryOptions): QueryPromise<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;

interface ListAllCreditCardStatementLinesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAllCreditCardStatementLinesVariables): QueryRef<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;
}
export const listAllCreditCardStatementLinesRef: ListAllCreditCardStatementLinesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllCreditCardStatementLines(dc: DataConnect, vars: ListAllCreditCardStatementLinesVariables, options?: ExecuteQueryOptions): QueryPromise<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;

interface ListAllCreditCardStatementLinesRef {
  ...
  (dc: DataConnect, vars: ListAllCreditCardStatementLinesVariables): QueryRef<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;
}
export const listAllCreditCardStatementLinesRef: ListAllCreditCardStatementLinesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllCreditCardStatementLinesRef:
```typescript
const name = listAllCreditCardStatementLinesRef.operationName;
console.log(name);
```

### Variables
The `ListAllCreditCardStatementLines` query requires an argument of type `ListAllCreditCardStatementLinesVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAllCreditCardStatementLinesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListAllCreditCardStatementLines` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllCreditCardStatementLinesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllCreditCardStatementLinesData {
  creditCardStatementLines: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    sequence: number;
    transactionDate: DateString;
    postedDate?: DateString | null;
    merchantRaw: string;
    merchantNormalized: string;
    amountCents: Int64String;
    externalReference?: string | null;
    status: string;
    rawData?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardStatementLine_Key)[];
}
```
### Using `ListAllCreditCardStatementLines`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllCreditCardStatementLines, ListAllCreditCardStatementLinesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListAllCreditCardStatementLines` query requires an argument of type `ListAllCreditCardStatementLinesVariables`:
const listAllCreditCardStatementLinesVars: ListAllCreditCardStatementLinesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listAllCreditCardStatementLines()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllCreditCardStatementLines(listAllCreditCardStatementLinesVars);
// Variables can be defined inline as well.
const { data } = await listAllCreditCardStatementLines({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllCreditCardStatementLines(dataConnect, listAllCreditCardStatementLinesVars);

console.log(data.creditCardStatementLines);

// Or, you can use the `Promise` API.
listAllCreditCardStatementLines(listAllCreditCardStatementLinesVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLines);
});
```

### Using `ListAllCreditCardStatementLines`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllCreditCardStatementLinesRef, ListAllCreditCardStatementLinesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListAllCreditCardStatementLines` query requires an argument of type `ListAllCreditCardStatementLinesVariables`:
const listAllCreditCardStatementLinesVars: ListAllCreditCardStatementLinesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listAllCreditCardStatementLinesRef()` function to get a reference to the query.
const ref = listAllCreditCardStatementLinesRef(listAllCreditCardStatementLinesVars);
// Variables can be defined inline as well.
const ref = listAllCreditCardStatementLinesRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllCreditCardStatementLinesRef(dataConnect, listAllCreditCardStatementLinesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCardStatementLines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLines);
});
```

## ListAllCreditCardStatementLinesPage
You can execute the `ListAllCreditCardStatementLinesPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listAllCreditCardStatementLinesPage(vars: ListAllCreditCardStatementLinesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;

interface ListAllCreditCardStatementLinesPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAllCreditCardStatementLinesPageVariables): QueryRef<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;
}
export const listAllCreditCardStatementLinesPageRef: ListAllCreditCardStatementLinesPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllCreditCardStatementLinesPage(dc: DataConnect, vars: ListAllCreditCardStatementLinesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;

interface ListAllCreditCardStatementLinesPageRef {
  ...
  (dc: DataConnect, vars: ListAllCreditCardStatementLinesPageVariables): QueryRef<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;
}
export const listAllCreditCardStatementLinesPageRef: ListAllCreditCardStatementLinesPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllCreditCardStatementLinesPageRef:
```typescript
const name = listAllCreditCardStatementLinesPageRef.operationName;
console.log(name);
```

### Variables
The `ListAllCreditCardStatementLinesPage` query requires an argument of type `ListAllCreditCardStatementLinesPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAllCreditCardStatementLinesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListAllCreditCardStatementLinesPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllCreditCardStatementLinesPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllCreditCardStatementLinesPageData {
  creditCardStatementLines: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    sequence: number;
    transactionDate: DateString;
    postedDate?: DateString | null;
    merchantRaw: string;
    merchantNormalized: string;
    amountCents: Int64String;
    externalReference?: string | null;
    status: string;
    rawData?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CreditCardStatementLine_Key)[];
}
```
### Using `ListAllCreditCardStatementLinesPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllCreditCardStatementLinesPage, ListAllCreditCardStatementLinesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListAllCreditCardStatementLinesPage` query requires an argument of type `ListAllCreditCardStatementLinesPageVariables`:
const listAllCreditCardStatementLinesPageVars: ListAllCreditCardStatementLinesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listAllCreditCardStatementLinesPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllCreditCardStatementLinesPage(listAllCreditCardStatementLinesPageVars);
// Variables can be defined inline as well.
const { data } = await listAllCreditCardStatementLinesPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllCreditCardStatementLinesPage(dataConnect, listAllCreditCardStatementLinesPageVars);

console.log(data.creditCardStatementLines);

// Or, you can use the `Promise` API.
listAllCreditCardStatementLinesPage(listAllCreditCardStatementLinesPageVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLines);
});
```

### Using `ListAllCreditCardStatementLinesPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllCreditCardStatementLinesPageRef, ListAllCreditCardStatementLinesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListAllCreditCardStatementLinesPage` query requires an argument of type `ListAllCreditCardStatementLinesPageVariables`:
const listAllCreditCardStatementLinesPageVars: ListAllCreditCardStatementLinesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listAllCreditCardStatementLinesPageRef()` function to get a reference to the query.
const ref = listAllCreditCardStatementLinesPageRef(listAllCreditCardStatementLinesPageVars);
// Variables can be defined inline as well.
const ref = listAllCreditCardStatementLinesPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllCreditCardStatementLinesPageRef(dataConnect, listAllCreditCardStatementLinesPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCardStatementLines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLines);
});
```

## ListMerchantAliases
You can execute the `ListMerchantAliases` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listMerchantAliases(vars: ListMerchantAliasesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMerchantAliasesData, ListMerchantAliasesVariables>;

interface ListMerchantAliasesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMerchantAliasesVariables): QueryRef<ListMerchantAliasesData, ListMerchantAliasesVariables>;
}
export const listMerchantAliasesRef: ListMerchantAliasesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMerchantAliases(dc: DataConnect, vars: ListMerchantAliasesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMerchantAliasesData, ListMerchantAliasesVariables>;

interface ListMerchantAliasesRef {
  ...
  (dc: DataConnect, vars: ListMerchantAliasesVariables): QueryRef<ListMerchantAliasesData, ListMerchantAliasesVariables>;
}
export const listMerchantAliasesRef: ListMerchantAliasesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMerchantAliasesRef:
```typescript
const name = listMerchantAliasesRef.operationName;
console.log(name);
```

### Variables
The `ListMerchantAliases` query requires an argument of type `ListMerchantAliasesVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMerchantAliasesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListMerchantAliases` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMerchantAliasesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMerchantAliasesData {
  merchantAliases: ({
    id: string;
    merchantRawKey: string;
    merchantNormalized: string;
    merchantCanonical?: string | null;
    active: boolean;
    status: string;
    source: string;
    confidence?: number | null;
    method?: string | null;
    createdBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & MerchantAlias_Key)[];
}
```
### Using `ListMerchantAliases`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMerchantAliases, ListMerchantAliasesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListMerchantAliases` query requires an argument of type `ListMerchantAliasesVariables`:
const listMerchantAliasesVars: ListMerchantAliasesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listMerchantAliases()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMerchantAliases(listMerchantAliasesVars);
// Variables can be defined inline as well.
const { data } = await listMerchantAliases({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMerchantAliases(dataConnect, listMerchantAliasesVars);

console.log(data.merchantAliases);

// Or, you can use the `Promise` API.
listMerchantAliases(listMerchantAliasesVars).then((response) => {
  const data = response.data;
  console.log(data.merchantAliases);
});
```

### Using `ListMerchantAliases`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMerchantAliasesRef, ListMerchantAliasesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListMerchantAliases` query requires an argument of type `ListMerchantAliasesVariables`:
const listMerchantAliasesVars: ListMerchantAliasesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listMerchantAliasesRef()` function to get a reference to the query.
const ref = listMerchantAliasesRef(listMerchantAliasesVars);
// Variables can be defined inline as well.
const ref = listMerchantAliasesRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMerchantAliasesRef(dataConnect, listMerchantAliasesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.merchantAliases);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.merchantAliases);
});
```

## ListMerchantAliasesPage
You can execute the `ListMerchantAliasesPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listMerchantAliasesPage(vars: ListMerchantAliasesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;

interface ListMerchantAliasesPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMerchantAliasesPageVariables): QueryRef<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;
}
export const listMerchantAliasesPageRef: ListMerchantAliasesPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMerchantAliasesPage(dc: DataConnect, vars: ListMerchantAliasesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;

interface ListMerchantAliasesPageRef {
  ...
  (dc: DataConnect, vars: ListMerchantAliasesPageVariables): QueryRef<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;
}
export const listMerchantAliasesPageRef: ListMerchantAliasesPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMerchantAliasesPageRef:
```typescript
const name = listMerchantAliasesPageRef.operationName;
console.log(name);
```

### Variables
The `ListMerchantAliasesPage` query requires an argument of type `ListMerchantAliasesPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMerchantAliasesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListMerchantAliasesPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMerchantAliasesPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMerchantAliasesPageData {
  merchantAliases: ({
    id: string;
    merchantRawKey: string;
    merchantNormalized: string;
    merchantCanonical?: string | null;
    active: boolean;
    status: string;
    source: string;
    confidence?: number | null;
    method?: string | null;
    createdBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & MerchantAlias_Key)[];
}
```
### Using `ListMerchantAliasesPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMerchantAliasesPage, ListMerchantAliasesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListMerchantAliasesPage` query requires an argument of type `ListMerchantAliasesPageVariables`:
const listMerchantAliasesPageVars: ListMerchantAliasesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listMerchantAliasesPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMerchantAliasesPage(listMerchantAliasesPageVars);
// Variables can be defined inline as well.
const { data } = await listMerchantAliasesPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMerchantAliasesPage(dataConnect, listMerchantAliasesPageVars);

console.log(data.merchantAliases);

// Or, you can use the `Promise` API.
listMerchantAliasesPage(listMerchantAliasesPageVars).then((response) => {
  const data = response.data;
  console.log(data.merchantAliases);
});
```

### Using `ListMerchantAliasesPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMerchantAliasesPageRef, ListMerchantAliasesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListMerchantAliasesPage` query requires an argument of type `ListMerchantAliasesPageVariables`:
const listMerchantAliasesPageVars: ListMerchantAliasesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listMerchantAliasesPageRef()` function to get a reference to the query.
const ref = listMerchantAliasesPageRef(listMerchantAliasesPageVars);
// Variables can be defined inline as well.
const ref = listMerchantAliasesPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMerchantAliasesPageRef(dataConnect, listMerchantAliasesPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.merchantAliases);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.merchantAliases);
});
```

## ListReconciliationMatches
You can execute the `ListReconciliationMatches` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listReconciliationMatches(vars: ListReconciliationMatchesVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;

interface ListReconciliationMatchesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReconciliationMatchesVariables): QueryRef<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;
}
export const listReconciliationMatchesRef: ListReconciliationMatchesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listReconciliationMatches(dc: DataConnect, vars: ListReconciliationMatchesVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;

interface ListReconciliationMatchesRef {
  ...
  (dc: DataConnect, vars: ListReconciliationMatchesVariables): QueryRef<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;
}
export const listReconciliationMatchesRef: ListReconciliationMatchesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listReconciliationMatchesRef:
```typescript
const name = listReconciliationMatchesRef.operationName;
console.log(name);
```

### Variables
The `ListReconciliationMatches` query requires an argument of type `ListReconciliationMatchesVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListReconciliationMatchesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListReconciliationMatches` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListReconciliationMatchesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListReconciliationMatchesData {
  reconciliationMatches: ({
    id: string;
    statementLine: {
      id: string;
      statement: {
        id: string;
      } & CreditCardStatement_Key;
      sequence: number;
    } & CreditCardStatementLine_Key;
    expenseTransaction?: {
      id: string;
    } & ExpenseTransaction_Key;
    invoice?: {
      id: string;
    } & Invoice_Key;
    matchScore?: number | null;
    matchMethod: string;
    status: string;
    confirmedBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    confirmedAt?: TimestampString | null;
    reason?: string | null;
    details?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReconciliationMatch_Key)[];
}
```
### Using `ListReconciliationMatches`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listReconciliationMatches, ListReconciliationMatchesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReconciliationMatches` query requires an argument of type `ListReconciliationMatchesVariables`:
const listReconciliationMatchesVars: ListReconciliationMatchesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listReconciliationMatches()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listReconciliationMatches(listReconciliationMatchesVars);
// Variables can be defined inline as well.
const { data } = await listReconciliationMatches({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listReconciliationMatches(dataConnect, listReconciliationMatchesVars);

console.log(data.reconciliationMatches);

// Or, you can use the `Promise` API.
listReconciliationMatches(listReconciliationMatchesVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatches);
});
```

### Using `ListReconciliationMatches`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listReconciliationMatchesRef, ListReconciliationMatchesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReconciliationMatches` query requires an argument of type `ListReconciliationMatchesVariables`:
const listReconciliationMatchesVars: ListReconciliationMatchesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listReconciliationMatchesRef()` function to get a reference to the query.
const ref = listReconciliationMatchesRef(listReconciliationMatchesVars);
// Variables can be defined inline as well.
const ref = listReconciliationMatchesRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listReconciliationMatchesRef(dataConnect, listReconciliationMatchesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reconciliationMatches);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatches);
});
```

## ListReconciliationMatchesPage
You can execute the `ListReconciliationMatchesPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listReconciliationMatchesPage(vars: ListReconciliationMatchesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;

interface ListReconciliationMatchesPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReconciliationMatchesPageVariables): QueryRef<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;
}
export const listReconciliationMatchesPageRef: ListReconciliationMatchesPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listReconciliationMatchesPage(dc: DataConnect, vars: ListReconciliationMatchesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;

interface ListReconciliationMatchesPageRef {
  ...
  (dc: DataConnect, vars: ListReconciliationMatchesPageVariables): QueryRef<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;
}
export const listReconciliationMatchesPageRef: ListReconciliationMatchesPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listReconciliationMatchesPageRef:
```typescript
const name = listReconciliationMatchesPageRef.operationName;
console.log(name);
```

### Variables
The `ListReconciliationMatchesPage` query requires an argument of type `ListReconciliationMatchesPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListReconciliationMatchesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListReconciliationMatchesPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListReconciliationMatchesPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListReconciliationMatchesPageData {
  reconciliationMatches: ({
    id: string;
    statementLine: {
      id: string;
      statement: {
        id: string;
      } & CreditCardStatement_Key;
      sequence: number;
    } & CreditCardStatementLine_Key;
    expenseTransaction?: {
      id: string;
    } & ExpenseTransaction_Key;
    invoice?: {
      id: string;
    } & Invoice_Key;
    matchScore?: number | null;
    matchMethod: string;
    status: string;
    confirmedBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    confirmedAt?: TimestampString | null;
    reason?: string | null;
    details?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReconciliationMatch_Key)[];
}
```
### Using `ListReconciliationMatchesPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listReconciliationMatchesPage, ListReconciliationMatchesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReconciliationMatchesPage` query requires an argument of type `ListReconciliationMatchesPageVariables`:
const listReconciliationMatchesPageVars: ListReconciliationMatchesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listReconciliationMatchesPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listReconciliationMatchesPage(listReconciliationMatchesPageVars);
// Variables can be defined inline as well.
const { data } = await listReconciliationMatchesPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listReconciliationMatchesPage(dataConnect, listReconciliationMatchesPageVars);

console.log(data.reconciliationMatches);

// Or, you can use the `Promise` API.
listReconciliationMatchesPage(listReconciliationMatchesPageVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatches);
});
```

### Using `ListReconciliationMatchesPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listReconciliationMatchesPageRef, ListReconciliationMatchesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReconciliationMatchesPage` query requires an argument of type `ListReconciliationMatchesPageVariables`:
const listReconciliationMatchesPageVars: ListReconciliationMatchesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listReconciliationMatchesPageRef()` function to get a reference to the query.
const ref = listReconciliationMatchesPageRef(listReconciliationMatchesPageVars);
// Variables can be defined inline as well.
const ref = listReconciliationMatchesPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listReconciliationMatchesPageRef(dataConnect, listReconciliationMatchesPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reconciliationMatches);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatches);
});
```

## ListProjects
You can execute the `ListProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listProjects(options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface ListProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
}
export const listProjectsRef: ListProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface ListProjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
}
export const listProjectsRef: ListProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsRef:
```typescript
const name = listProjectsRef.operationName;
console.log(name);
```

### Variables
The `ListProjects` query has no variables.
### Return Type
Recall that executing the `ListProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectsData {
  projects: ({
    id: string;
    number: string;
    name: string;
    status: string;
  } & Project_Key)[];
}
```
### Using `ListProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjects } from '@factures-thibeault/data-connect-generated';


// Call the `listProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjects(dataConnect);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjects().then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsRef } from '@factures-thibeault/data-connect-generated';


// Call the `listProjectsRef()` function to get a reference to the query.
const ref = listProjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## ListSkuReferences
You can execute the `ListSkuReferences` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listSkuReferences(options?: ExecuteQueryOptions): QueryPromise<ListSkuReferencesData, undefined>;

interface ListSkuReferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSkuReferencesData, undefined>;
}
export const listSkuReferencesRef: ListSkuReferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSkuReferences(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSkuReferencesData, undefined>;

interface ListSkuReferencesRef {
  ...
  (dc: DataConnect): QueryRef<ListSkuReferencesData, undefined>;
}
export const listSkuReferencesRef: ListSkuReferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSkuReferencesRef:
```typescript
const name = listSkuReferencesRef.operationName;
console.log(name);
```

### Variables
The `ListSkuReferences` query has no variables.
### Return Type
Recall that executing the `ListSkuReferences` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSkuReferencesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSkuReferencesData {
  skuReferences: ({
    merchant: string;
    sku: string;
    productLabel?: string | null;
    categoryLabel?: string | null;
    expenseAccount?: {
      id: string;
      number: string;
      label: string;
      type: string;
    } & ExpenseAccount_Key;
    sourceUrl?: string | null;
    verificationStatus: string;
    verifiedAt?: TimestampString | null;
  } & SkuReference_Key)[];
}
```
### Using `ListSkuReferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSkuReferences } from '@factures-thibeault/data-connect-generated';


// Call the `listSkuReferences()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSkuReferences();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSkuReferences(dataConnect);

console.log(data.skuReferences);

// Or, you can use the `Promise` API.
listSkuReferences().then((response) => {
  const data = response.data;
  console.log(data.skuReferences);
});
```

### Using `ListSkuReferences`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSkuReferencesRef } from '@factures-thibeault/data-connect-generated';


// Call the `listSkuReferencesRef()` function to get a reference to the query.
const ref = listSkuReferencesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSkuReferencesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.skuReferences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.skuReferences);
});
```

## ListExpenseTransactions
You can execute the `ListExpenseTransactions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listExpenseTransactions(vars: ListExpenseTransactionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;

interface ListExpenseTransactionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExpenseTransactionsVariables): QueryRef<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;
}
export const listExpenseTransactionsRef: ListExpenseTransactionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExpenseTransactions(dc: DataConnect, vars: ListExpenseTransactionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;

interface ListExpenseTransactionsRef {
  ...
  (dc: DataConnect, vars: ListExpenseTransactionsVariables): QueryRef<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;
}
export const listExpenseTransactionsRef: ListExpenseTransactionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExpenseTransactionsRef:
```typescript
const name = listExpenseTransactionsRef.operationName;
console.log(name);
```

### Variables
The `ListExpenseTransactions` query requires an argument of type `ListExpenseTransactionsVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListExpenseTransactionsVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListExpenseTransactions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExpenseTransactionsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListExpenseTransactionsData {
  expenseTransactions: ({
    id: string;
    transactionDate: DateString;
    vendor: string;
    card: {
      id: string;
      lastFour: string;
      holder: {
        id: string;
        displayName: string;
      } & UserProfile_Key;
    } & CreditCard_Key;
    statementPeriod?: {
      id: string;
      label: string;
      startDate: DateString;
      endDate: DateString;
    } & CardStatementPeriod_Key;
    project?: {
      id: string;
      number: string;
      name: string;
    } & Project_Key;
    expenseAccount?: {
      id: string;
      number: string;
      label: string;
      type: string;
    } & ExpenseAccount_Key;
    categoryLabel?: string | null;
    sku?: string | null;
    amountBeforeTaxCents: Int64String;
    tpsCents: Int64String;
    tvqCents: Int64String;
    totalCents: Int64String;
    currency: string;
    status: string;
    processingStatus: string;
    accountingStatus: string;
    reconciliationStatus: string;
    classificationSource?: string | null;
    classificationConfidence?: number | null;
    classificationNote?: string | null;
    invoiceNumber?: string | null;
    issue?: string | null;
  } & ExpenseTransaction_Key)[];
}
```
### Using `ListExpenseTransactions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExpenseTransactions, ListExpenseTransactionsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListExpenseTransactions` query requires an argument of type `ListExpenseTransactionsVariables`:
const listExpenseTransactionsVars: ListExpenseTransactionsVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listExpenseTransactions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExpenseTransactions(listExpenseTransactionsVars);
// Variables can be defined inline as well.
const { data } = await listExpenseTransactions({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExpenseTransactions(dataConnect, listExpenseTransactionsVars);

console.log(data.expenseTransactions);

// Or, you can use the `Promise` API.
listExpenseTransactions(listExpenseTransactionsVars).then((response) => {
  const data = response.data;
  console.log(data.expenseTransactions);
});
```

### Using `ListExpenseTransactions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExpenseTransactionsRef, ListExpenseTransactionsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListExpenseTransactions` query requires an argument of type `ListExpenseTransactionsVariables`:
const listExpenseTransactionsVars: ListExpenseTransactionsVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listExpenseTransactionsRef()` function to get a reference to the query.
const ref = listExpenseTransactionsRef(listExpenseTransactionsVars);
// Variables can be defined inline as well.
const ref = listExpenseTransactionsRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExpenseTransactionsRef(dataConnect, listExpenseTransactionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.expenseTransactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseTransactions);
});
```

## ListExpenseTransactionsPage
You can execute the `ListExpenseTransactionsPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listExpenseTransactionsPage(vars: ListExpenseTransactionsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;

interface ListExpenseTransactionsPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExpenseTransactionsPageVariables): QueryRef<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;
}
export const listExpenseTransactionsPageRef: ListExpenseTransactionsPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExpenseTransactionsPage(dc: DataConnect, vars: ListExpenseTransactionsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;

interface ListExpenseTransactionsPageRef {
  ...
  (dc: DataConnect, vars: ListExpenseTransactionsPageVariables): QueryRef<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;
}
export const listExpenseTransactionsPageRef: ListExpenseTransactionsPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExpenseTransactionsPageRef:
```typescript
const name = listExpenseTransactionsPageRef.operationName;
console.log(name);
```

### Variables
The `ListExpenseTransactionsPage` query requires an argument of type `ListExpenseTransactionsPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListExpenseTransactionsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListExpenseTransactionsPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExpenseTransactionsPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListExpenseTransactionsPageData {
  expenseTransactions: ({
    id: string;
    transactionDate: DateString;
    vendor: string;
    card: {
      id: string;
      lastFour: string;
      holder: {
        id: string;
        displayName: string;
      } & UserProfile_Key;
    } & CreditCard_Key;
    statementPeriod?: {
      id: string;
      label: string;
      startDate: DateString;
      endDate: DateString;
    } & CardStatementPeriod_Key;
    project?: {
      id: string;
      number: string;
      name: string;
    } & Project_Key;
    expenseAccount?: {
      id: string;
      number: string;
      label: string;
      type: string;
    } & ExpenseAccount_Key;
    categoryLabel?: string | null;
    sku?: string | null;
    amountBeforeTaxCents: Int64String;
    tpsCents: Int64String;
    tvqCents: Int64String;
    totalCents: Int64String;
    currency: string;
    status: string;
    processingStatus: string;
    accountingStatus: string;
    reconciliationStatus: string;
    classificationSource?: string | null;
    classificationConfidence?: number | null;
    classificationNote?: string | null;
    invoiceNumber?: string | null;
    issue?: string | null;
  } & ExpenseTransaction_Key)[];
}
```
### Using `ListExpenseTransactionsPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExpenseTransactionsPage, ListExpenseTransactionsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListExpenseTransactionsPage` query requires an argument of type `ListExpenseTransactionsPageVariables`:
const listExpenseTransactionsPageVars: ListExpenseTransactionsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listExpenseTransactionsPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExpenseTransactionsPage(listExpenseTransactionsPageVars);
// Variables can be defined inline as well.
const { data } = await listExpenseTransactionsPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExpenseTransactionsPage(dataConnect, listExpenseTransactionsPageVars);

console.log(data.expenseTransactions);

// Or, you can use the `Promise` API.
listExpenseTransactionsPage(listExpenseTransactionsPageVars).then((response) => {
  const data = response.data;
  console.log(data.expenseTransactions);
});
```

### Using `ListExpenseTransactionsPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExpenseTransactionsPageRef, ListExpenseTransactionsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListExpenseTransactionsPage` query requires an argument of type `ListExpenseTransactionsPageVariables`:
const listExpenseTransactionsPageVars: ListExpenseTransactionsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listExpenseTransactionsPageRef()` function to get a reference to the query.
const ref = listExpenseTransactionsPageRef(listExpenseTransactionsPageVars);
// Variables can be defined inline as well.
const ref = listExpenseTransactionsPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExpenseTransactionsPageRef(dataConnect, listExpenseTransactionsPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.expenseTransactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseTransactions);
});
```

## ListInvoicesToReview
You can execute the `ListInvoicesToReview` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listInvoicesToReview(vars: ListInvoicesToReviewVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;

interface ListInvoicesToReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoicesToReviewVariables): QueryRef<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;
}
export const listInvoicesToReviewRef: ListInvoicesToReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInvoicesToReview(dc: DataConnect, vars: ListInvoicesToReviewVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;

interface ListInvoicesToReviewRef {
  ...
  (dc: DataConnect, vars: ListInvoicesToReviewVariables): QueryRef<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;
}
export const listInvoicesToReviewRef: ListInvoicesToReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInvoicesToReviewRef:
```typescript
const name = listInvoicesToReviewRef.operationName;
console.log(name);
```

### Variables
The `ListInvoicesToReview` query requires an argument of type `ListInvoicesToReviewVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListInvoicesToReviewVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListInvoicesToReview` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInvoicesToReviewData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInvoicesToReviewData {
  invoices: ({
    id: string;
    intake?: {
      receiptId: string;
      uploaderUid: string;
      storageFolder: string;
      photoCount: number;
    } & InvoiceIntake_Key;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    subtotalCents?: Int64String | null;
    tpsCents?: Int64String | null;
    tvqCents?: Int64String | null;
    totalCents?: Int64String | null;
    lineItems?: string | null;
    processingStatus: string;
    accountingStatus: string;
    reviewStatus: string;
    storageFolder?: string | null;
    transaction: {
      id: string;
      vendor: string;
      issue?: string | null;
    } & ExpenseTransaction_Key;
    invoicePhotos_on_invoice: ({
      id: string;
      storagePath: string;
      contentType: string;
      sequence: number;
    } & InvoicePhoto_Key)[];
  } & Invoice_Key)[];
}
```
### Using `ListInvoicesToReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInvoicesToReview, ListInvoicesToReviewVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoicesToReview` query requires an argument of type `ListInvoicesToReviewVariables`:
const listInvoicesToReviewVars: ListInvoicesToReviewVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoicesToReview()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInvoicesToReview(listInvoicesToReviewVars);
// Variables can be defined inline as well.
const { data } = await listInvoicesToReview({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInvoicesToReview(dataConnect, listInvoicesToReviewVars);

console.log(data.invoices);

// Or, you can use the `Promise` API.
listInvoicesToReview(listInvoicesToReviewVars).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

### Using `ListInvoicesToReview`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInvoicesToReviewRef, ListInvoicesToReviewVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoicesToReview` query requires an argument of type `ListInvoicesToReviewVariables`:
const listInvoicesToReviewVars: ListInvoicesToReviewVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoicesToReviewRef()` function to get a reference to the query.
const ref = listInvoicesToReviewRef(listInvoicesToReviewVars);
// Variables can be defined inline as well.
const ref = listInvoicesToReviewRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInvoicesToReviewRef(dataConnect, listInvoicesToReviewVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

## ListInvoicesToReviewPage
You can execute the `ListInvoicesToReviewPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listInvoicesToReviewPage(vars: ListInvoicesToReviewPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;

interface ListInvoicesToReviewPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoicesToReviewPageVariables): QueryRef<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;
}
export const listInvoicesToReviewPageRef: ListInvoicesToReviewPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInvoicesToReviewPage(dc: DataConnect, vars: ListInvoicesToReviewPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;

interface ListInvoicesToReviewPageRef {
  ...
  (dc: DataConnect, vars: ListInvoicesToReviewPageVariables): QueryRef<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;
}
export const listInvoicesToReviewPageRef: ListInvoicesToReviewPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInvoicesToReviewPageRef:
```typescript
const name = listInvoicesToReviewPageRef.operationName;
console.log(name);
```

### Variables
The `ListInvoicesToReviewPage` query requires an argument of type `ListInvoicesToReviewPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListInvoicesToReviewPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListInvoicesToReviewPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInvoicesToReviewPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInvoicesToReviewPageData {
  invoices: ({
    id: string;
    intake?: {
      receiptId: string;
      uploaderUid: string;
      storageFolder: string;
      photoCount: number;
    } & InvoiceIntake_Key;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    subtotalCents?: Int64String | null;
    tpsCents?: Int64String | null;
    tvqCents?: Int64String | null;
    totalCents?: Int64String | null;
    lineItems?: string | null;
    processingStatus: string;
    accountingStatus: string;
    reviewStatus: string;
    storageFolder?: string | null;
    transaction: {
      id: string;
      vendor: string;
      issue?: string | null;
    } & ExpenseTransaction_Key;
    invoicePhotos_on_invoice: ({
      id: string;
      storagePath: string;
      contentType: string;
      sequence: number;
    } & InvoicePhoto_Key)[];
  } & Invoice_Key)[];
}
```
### Using `ListInvoicesToReviewPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInvoicesToReviewPage, ListInvoicesToReviewPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoicesToReviewPage` query requires an argument of type `ListInvoicesToReviewPageVariables`:
const listInvoicesToReviewPageVars: ListInvoicesToReviewPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoicesToReviewPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInvoicesToReviewPage(listInvoicesToReviewPageVars);
// Variables can be defined inline as well.
const { data } = await listInvoicesToReviewPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInvoicesToReviewPage(dataConnect, listInvoicesToReviewPageVars);

console.log(data.invoices);

// Or, you can use the `Promise` API.
listInvoicesToReviewPage(listInvoicesToReviewPageVars).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

### Using `ListInvoicesToReviewPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInvoicesToReviewPageRef, ListInvoicesToReviewPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoicesToReviewPage` query requires an argument of type `ListInvoicesToReviewPageVariables`:
const listInvoicesToReviewPageVars: ListInvoicesToReviewPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoicesToReviewPageRef()` function to get a reference to the query.
const ref = listInvoicesToReviewPageRef(listInvoicesToReviewPageVars);
// Variables can be defined inline as well.
const ref = listInvoicesToReviewPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInvoicesToReviewPageRef(dataConnect, listInvoicesToReviewPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

## ListInvoiceIntakes
You can execute the `ListInvoiceIntakes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listInvoiceIntakes(vars: ListInvoiceIntakesVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;

interface ListInvoiceIntakesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoiceIntakesVariables): QueryRef<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;
}
export const listInvoiceIntakesRef: ListInvoiceIntakesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInvoiceIntakes(dc: DataConnect, vars: ListInvoiceIntakesVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;

interface ListInvoiceIntakesRef {
  ...
  (dc: DataConnect, vars: ListInvoiceIntakesVariables): QueryRef<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;
}
export const listInvoiceIntakesRef: ListInvoiceIntakesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInvoiceIntakesRef:
```typescript
const name = listInvoiceIntakesRef.operationName;
console.log(name);
```

### Variables
The `ListInvoiceIntakes` query requires an argument of type `ListInvoiceIntakesVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListInvoiceIntakesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListInvoiceIntakes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInvoiceIntakesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInvoiceIntakesData {
  invoiceIntakes: ({
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    status: string;
    processingStatus: string;
    processingState: string;
    processingAttempts: number;
    reviewRevision: number;
    lastAttemptAt?: TimestampString | null;
    accountingStatus: string;
    lastError?: string | null;
    aiErrorCode?: string | null;
    aiModel?: string | null;
    aiConfidence?: number | null;
    extractedVendor?: string | null;
    extractedInvoiceNumber?: string | null;
    extractedInvoiceDate?: DateString | null;
    extractedSubtotalCents?: Int64String | null;
    extractedTpsCents?: Int64String | null;
    extractedTvqCents?: Int64String | null;
    extractedTotalCents?: Int64String | null;
    extractedLineItems?: string | null;
    extractedCurrency?: string | null;
    extractedSku?: string | null;
    extractedCategory?: string | null;
    extractedProjectId?: string | null;
    classificationAccountCode?: string | null;
    classificationCategory?: string | null;
    classificationSource?: string | null;
    classificationConfidence?: number | null;
    classificationStatus?: string | null;
    aiNotes?: string | null;
    decisionExceptions?: string | null;
    decisionChecks?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & InvoiceIntake_Key)[];
}
```
### Using `ListInvoiceIntakes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInvoiceIntakes, ListInvoiceIntakesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoiceIntakes` query requires an argument of type `ListInvoiceIntakesVariables`:
const listInvoiceIntakesVars: ListInvoiceIntakesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoiceIntakes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInvoiceIntakes(listInvoiceIntakesVars);
// Variables can be defined inline as well.
const { data } = await listInvoiceIntakes({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInvoiceIntakes(dataConnect, listInvoiceIntakesVars);

console.log(data.invoiceIntakes);

// Or, you can use the `Promise` API.
listInvoiceIntakes(listInvoiceIntakesVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntakes);
});
```

### Using `ListInvoiceIntakes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInvoiceIntakesRef, ListInvoiceIntakesVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoiceIntakes` query requires an argument of type `ListInvoiceIntakesVariables`:
const listInvoiceIntakesVars: ListInvoiceIntakesVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoiceIntakesRef()` function to get a reference to the query.
const ref = listInvoiceIntakesRef(listInvoiceIntakesVars);
// Variables can be defined inline as well.
const ref = listInvoiceIntakesRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInvoiceIntakesRef(dataConnect, listInvoiceIntakesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoiceIntakes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntakes);
});
```

## ListInvoiceIntakesPage
You can execute the `ListInvoiceIntakesPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listInvoiceIntakesPage(vars: ListInvoiceIntakesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;

interface ListInvoiceIntakesPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoiceIntakesPageVariables): QueryRef<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;
}
export const listInvoiceIntakesPageRef: ListInvoiceIntakesPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInvoiceIntakesPage(dc: DataConnect, vars: ListInvoiceIntakesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;

interface ListInvoiceIntakesPageRef {
  ...
  (dc: DataConnect, vars: ListInvoiceIntakesPageVariables): QueryRef<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;
}
export const listInvoiceIntakesPageRef: ListInvoiceIntakesPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInvoiceIntakesPageRef:
```typescript
const name = listInvoiceIntakesPageRef.operationName;
console.log(name);
```

### Variables
The `ListInvoiceIntakesPage` query requires an argument of type `ListInvoiceIntakesPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListInvoiceIntakesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListInvoiceIntakesPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInvoiceIntakesPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInvoiceIntakesPageData {
  invoiceIntakes: ({
    receiptId: string;
    uploaderUid: string;
    storageFolder: string;
    photoCount: number;
    status: string;
    processingStatus: string;
    processingState: string;
    processingAttempts: number;
    reviewRevision: number;
    lastAttemptAt?: TimestampString | null;
    accountingStatus: string;
    lastError?: string | null;
    aiErrorCode?: string | null;
    aiModel?: string | null;
    aiConfidence?: number | null;
    extractedVendor?: string | null;
    extractedInvoiceNumber?: string | null;
    extractedInvoiceDate?: DateString | null;
    extractedSubtotalCents?: Int64String | null;
    extractedTpsCents?: Int64String | null;
    extractedTvqCents?: Int64String | null;
    extractedTotalCents?: Int64String | null;
    extractedLineItems?: string | null;
    extractedCurrency?: string | null;
    extractedSku?: string | null;
    extractedCategory?: string | null;
    extractedProjectId?: string | null;
    classificationAccountCode?: string | null;
    classificationCategory?: string | null;
    classificationSource?: string | null;
    classificationConfidence?: number | null;
    classificationStatus?: string | null;
    aiNotes?: string | null;
    decisionExceptions?: string | null;
    decisionChecks?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & InvoiceIntake_Key)[];
}
```
### Using `ListInvoiceIntakesPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInvoiceIntakesPage, ListInvoiceIntakesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoiceIntakesPage` query requires an argument of type `ListInvoiceIntakesPageVariables`:
const listInvoiceIntakesPageVars: ListInvoiceIntakesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoiceIntakesPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInvoiceIntakesPage(listInvoiceIntakesPageVars);
// Variables can be defined inline as well.
const { data } = await listInvoiceIntakesPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInvoiceIntakesPage(dataConnect, listInvoiceIntakesPageVars);

console.log(data.invoiceIntakes);

// Or, you can use the `Promise` API.
listInvoiceIntakesPage(listInvoiceIntakesPageVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntakes);
});
```

### Using `ListInvoiceIntakesPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInvoiceIntakesPageRef, ListInvoiceIntakesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoiceIntakesPage` query requires an argument of type `ListInvoiceIntakesPageVariables`:
const listInvoiceIntakesPageVars: ListInvoiceIntakesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoiceIntakesPageRef()` function to get a reference to the query.
const ref = listInvoiceIntakesPageRef(listInvoiceIntakesPageVars);
// Variables can be defined inline as well.
const ref = listInvoiceIntakesPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInvoiceIntakesPageRef(dataConnect, listInvoiceIntakesPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoiceIntakes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntakes);
});
```

## ListInvoicesForReconciliation
You can execute the `ListInvoicesForReconciliation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listInvoicesForReconciliation(vars: ListInvoicesForReconciliationVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;

interface ListInvoicesForReconciliationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoicesForReconciliationVariables): QueryRef<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;
}
export const listInvoicesForReconciliationRef: ListInvoicesForReconciliationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInvoicesForReconciliation(dc: DataConnect, vars: ListInvoicesForReconciliationVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;

interface ListInvoicesForReconciliationRef {
  ...
  (dc: DataConnect, vars: ListInvoicesForReconciliationVariables): QueryRef<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;
}
export const listInvoicesForReconciliationRef: ListInvoicesForReconciliationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInvoicesForReconciliationRef:
```typescript
const name = listInvoicesForReconciliationRef.operationName;
console.log(name);
```

### Variables
The `ListInvoicesForReconciliation` query requires an argument of type `ListInvoicesForReconciliationVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListInvoicesForReconciliationVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListInvoicesForReconciliation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInvoicesForReconciliationData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInvoicesForReconciliationData {
  invoices: ({
    id: string;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    totalCents?: Int64String | null;
    processingStatus: string;
    accountingStatus: string;
    reviewStatus: string;
    transaction: {
      id: string;
    } & ExpenseTransaction_Key;
  } & Invoice_Key)[];
}
```
### Using `ListInvoicesForReconciliation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInvoicesForReconciliation, ListInvoicesForReconciliationVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoicesForReconciliation` query requires an argument of type `ListInvoicesForReconciliationVariables`:
const listInvoicesForReconciliationVars: ListInvoicesForReconciliationVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoicesForReconciliation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInvoicesForReconciliation(listInvoicesForReconciliationVars);
// Variables can be defined inline as well.
const { data } = await listInvoicesForReconciliation({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInvoicesForReconciliation(dataConnect, listInvoicesForReconciliationVars);

console.log(data.invoices);

// Or, you can use the `Promise` API.
listInvoicesForReconciliation(listInvoicesForReconciliationVars).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

### Using `ListInvoicesForReconciliation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInvoicesForReconciliationRef, ListInvoicesForReconciliationVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoicesForReconciliation` query requires an argument of type `ListInvoicesForReconciliationVariables`:
const listInvoicesForReconciliationVars: ListInvoicesForReconciliationVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoicesForReconciliationRef()` function to get a reference to the query.
const ref = listInvoicesForReconciliationRef(listInvoicesForReconciliationVars);
// Variables can be defined inline as well.
const ref = listInvoicesForReconciliationRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInvoicesForReconciliationRef(dataConnect, listInvoicesForReconciliationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

## ListInvoicesForReconciliationPage
You can execute the `ListInvoicesForReconciliationPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listInvoicesForReconciliationPage(vars: ListInvoicesForReconciliationPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;

interface ListInvoicesForReconciliationPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInvoicesForReconciliationPageVariables): QueryRef<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;
}
export const listInvoicesForReconciliationPageRef: ListInvoicesForReconciliationPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInvoicesForReconciliationPage(dc: DataConnect, vars: ListInvoicesForReconciliationPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;

interface ListInvoicesForReconciliationPageRef {
  ...
  (dc: DataConnect, vars: ListInvoicesForReconciliationPageVariables): QueryRef<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;
}
export const listInvoicesForReconciliationPageRef: ListInvoicesForReconciliationPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInvoicesForReconciliationPageRef:
```typescript
const name = listInvoicesForReconciliationPageRef.operationName;
console.log(name);
```

### Variables
The `ListInvoicesForReconciliationPage` query requires an argument of type `ListInvoicesForReconciliationPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListInvoicesForReconciliationPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListInvoicesForReconciliationPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInvoicesForReconciliationPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInvoicesForReconciliationPageData {
  invoices: ({
    id: string;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    totalCents?: Int64String | null;
    processingStatus: string;
    accountingStatus: string;
    reviewStatus: string;
    transaction: {
      id: string;
    } & ExpenseTransaction_Key;
  } & Invoice_Key)[];
}
```
### Using `ListInvoicesForReconciliationPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInvoicesForReconciliationPage, ListInvoicesForReconciliationPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoicesForReconciliationPage` query requires an argument of type `ListInvoicesForReconciliationPageVariables`:
const listInvoicesForReconciliationPageVars: ListInvoicesForReconciliationPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoicesForReconciliationPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInvoicesForReconciliationPage(listInvoicesForReconciliationPageVars);
// Variables can be defined inline as well.
const { data } = await listInvoicesForReconciliationPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInvoicesForReconciliationPage(dataConnect, listInvoicesForReconciliationPageVars);

console.log(data.invoices);

// Or, you can use the `Promise` API.
listInvoicesForReconciliationPage(listInvoicesForReconciliationPageVars).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

### Using `ListInvoicesForReconciliationPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInvoicesForReconciliationPageRef, ListInvoicesForReconciliationPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListInvoicesForReconciliationPage` query requires an argument of type `ListInvoicesForReconciliationPageVariables`:
const listInvoicesForReconciliationPageVars: ListInvoicesForReconciliationPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listInvoicesForReconciliationPageRef()` function to get a reference to the query.
const ref = listInvoicesForReconciliationPageRef(listInvoicesForReconciliationPageVars);
// Variables can be defined inline as well.
const ref = listInvoicesForReconciliationPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInvoicesForReconciliationPageRef(dataConnect, listInvoicesForReconciliationPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invoices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

## ListTransactionCorrections
You can execute the `ListTransactionCorrections` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listTransactionCorrections(vars: ListTransactionCorrectionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;

interface ListTransactionCorrectionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTransactionCorrectionsVariables): QueryRef<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;
}
export const listTransactionCorrectionsRef: ListTransactionCorrectionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTransactionCorrections(dc: DataConnect, vars: ListTransactionCorrectionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;

interface ListTransactionCorrectionsRef {
  ...
  (dc: DataConnect, vars: ListTransactionCorrectionsVariables): QueryRef<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;
}
export const listTransactionCorrectionsRef: ListTransactionCorrectionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTransactionCorrectionsRef:
```typescript
const name = listTransactionCorrectionsRef.operationName;
console.log(name);
```

### Variables
The `ListTransactionCorrections` query requires an argument of type `ListTransactionCorrectionsVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTransactionCorrectionsVariables {
  transactionId: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListTransactionCorrections` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTransactionCorrectionsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTransactionCorrectionsData {
  transactionCorrections: ({
    id: string;
    invoice?: {
      id: string;
    } & Invoice_Key;
    transaction: {
      id: string;
    } & ExpenseTransaction_Key;
    fieldName: string;
    previousValue?: string | null;
    correctedValue: string;
    correctedBy: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    note?: string | null;
    createdAt: TimestampString;
  } & TransactionCorrection_Key)[];
}
```
### Using `ListTransactionCorrections`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTransactionCorrections, ListTransactionCorrectionsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListTransactionCorrections` query requires an argument of type `ListTransactionCorrectionsVariables`:
const listTransactionCorrectionsVars: ListTransactionCorrectionsVariables = {
  transactionId: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listTransactionCorrections()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTransactionCorrections(listTransactionCorrectionsVars);
// Variables can be defined inline as well.
const { data } = await listTransactionCorrections({ transactionId: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTransactionCorrections(dataConnect, listTransactionCorrectionsVars);

console.log(data.transactionCorrections);

// Or, you can use the `Promise` API.
listTransactionCorrections(listTransactionCorrectionsVars).then((response) => {
  const data = response.data;
  console.log(data.transactionCorrections);
});
```

### Using `ListTransactionCorrections`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTransactionCorrectionsRef, ListTransactionCorrectionsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListTransactionCorrections` query requires an argument of type `ListTransactionCorrectionsVariables`:
const listTransactionCorrectionsVars: ListTransactionCorrectionsVariables = {
  transactionId: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listTransactionCorrectionsRef()` function to get a reference to the query.
const ref = listTransactionCorrectionsRef(listTransactionCorrectionsVars);
// Variables can be defined inline as well.
const ref = listTransactionCorrectionsRef({ transactionId: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTransactionCorrectionsRef(dataConnect, listTransactionCorrectionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.transactionCorrections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.transactionCorrections);
});
```

## ListReportAdjustmentSets
You can execute the `ListReportAdjustmentSets` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listReportAdjustmentSets(vars: ListReportAdjustmentSetsVariables, options?: ExecuteQueryOptions): QueryPromise<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;

interface ListReportAdjustmentSetsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReportAdjustmentSetsVariables): QueryRef<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;
}
export const listReportAdjustmentSetsRef: ListReportAdjustmentSetsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listReportAdjustmentSets(dc: DataConnect, vars: ListReportAdjustmentSetsVariables, options?: ExecuteQueryOptions): QueryPromise<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;

interface ListReportAdjustmentSetsRef {
  ...
  (dc: DataConnect, vars: ListReportAdjustmentSetsVariables): QueryRef<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;
}
export const listReportAdjustmentSetsRef: ListReportAdjustmentSetsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listReportAdjustmentSetsRef:
```typescript
const name = listReportAdjustmentSetsRef.operationName;
console.log(name);
```

### Variables
The `ListReportAdjustmentSets` query requires an argument of type `ListReportAdjustmentSetsVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListReportAdjustmentSetsVariables {
  periodKey: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListReportAdjustmentSets` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListReportAdjustmentSetsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListReportAdjustmentSetsData {
  reportAdjustmentSets: ({
    id: string;
    periodKey: string;
    periodStart: DateString;
    periodEnd: DateString;
    projectId?: string | null;
    holderId?: string | null;
    rowsJson: string;
    createdByUid: string;
    updatedByUid: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReportAdjustmentSet_Key)[];
}
```
### Using `ListReportAdjustmentSets`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listReportAdjustmentSets, ListReportAdjustmentSetsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReportAdjustmentSets` query requires an argument of type `ListReportAdjustmentSetsVariables`:
const listReportAdjustmentSetsVars: ListReportAdjustmentSetsVariables = {
  periodKey: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listReportAdjustmentSets()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listReportAdjustmentSets(listReportAdjustmentSetsVars);
// Variables can be defined inline as well.
const { data } = await listReportAdjustmentSets({ periodKey: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listReportAdjustmentSets(dataConnect, listReportAdjustmentSetsVars);

console.log(data.reportAdjustmentSets);

// Or, you can use the `Promise` API.
listReportAdjustmentSets(listReportAdjustmentSetsVars).then((response) => {
  const data = response.data;
  console.log(data.reportAdjustmentSets);
});
```

### Using `ListReportAdjustmentSets`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listReportAdjustmentSetsRef, ListReportAdjustmentSetsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReportAdjustmentSets` query requires an argument of type `ListReportAdjustmentSetsVariables`:
const listReportAdjustmentSetsVars: ListReportAdjustmentSetsVariables = {
  periodKey: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listReportAdjustmentSetsRef()` function to get a reference to the query.
const ref = listReportAdjustmentSetsRef(listReportAdjustmentSetsVars);
// Variables can be defined inline as well.
const ref = listReportAdjustmentSetsRef({ periodKey: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listReportAdjustmentSetsRef(dataConnect, listReportAdjustmentSetsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reportAdjustmentSets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reportAdjustmentSets);
});
```

## ListAuditEvents
You can execute the `ListAuditEvents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listAuditEvents(vars: ListAuditEventsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditEventsData, ListAuditEventsVariables>;

interface ListAuditEventsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAuditEventsVariables): QueryRef<ListAuditEventsData, ListAuditEventsVariables>;
}
export const listAuditEventsRef: ListAuditEventsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAuditEvents(dc: DataConnect, vars: ListAuditEventsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditEventsData, ListAuditEventsVariables>;

interface ListAuditEventsRef {
  ...
  (dc: DataConnect, vars: ListAuditEventsVariables): QueryRef<ListAuditEventsData, ListAuditEventsVariables>;
}
export const listAuditEventsRef: ListAuditEventsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAuditEventsRef:
```typescript
const name = listAuditEventsRef.operationName;
console.log(name);
```

### Variables
The `ListAuditEvents` query requires an argument of type `ListAuditEventsVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAuditEventsVariables {
  entityType: string;
  entityId: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListAuditEvents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAuditEventsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAuditEventsData {
  auditEvents: ({
    id: string;
    actorUid?: string | null;
    actorRole?: string | null;
    actor?: {
      displayName: string;
      role: string;
    };
    action: string;
    entityType: string;
    entityId: string;
    details?: string | null;
    createdAt: TimestampString;
  } & AuditEvent_Key)[];
}
```
### Using `ListAuditEvents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAuditEvents, ListAuditEventsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListAuditEvents` query requires an argument of type `ListAuditEventsVariables`:
const listAuditEventsVars: ListAuditEventsVariables = {
  entityType: ..., 
  entityId: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listAuditEvents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAuditEvents(listAuditEventsVars);
// Variables can be defined inline as well.
const { data } = await listAuditEvents({ entityType: ..., entityId: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAuditEvents(dataConnect, listAuditEventsVars);

console.log(data.auditEvents);

// Or, you can use the `Promise` API.
listAuditEvents(listAuditEventsVars).then((response) => {
  const data = response.data;
  console.log(data.auditEvents);
});
```

### Using `ListAuditEvents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAuditEventsRef, ListAuditEventsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListAuditEvents` query requires an argument of type `ListAuditEventsVariables`:
const listAuditEventsVars: ListAuditEventsVariables = {
  entityType: ..., 
  entityId: ..., 
  limit: ..., 
  offset: ..., 
};

// Call the `listAuditEventsRef()` function to get a reference to the query.
const ref = listAuditEventsRef(listAuditEventsVars);
// Variables can be defined inline as well.
const ref = listAuditEventsRef({ entityType: ..., entityId: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAuditEventsRef(dataConnect, listAuditEventsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditEvents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditEvents);
});
```

## ListReconciliationOutsideControls
You can execute the `ListReconciliationOutsideControls` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listReconciliationOutsideControls(vars: ListReconciliationOutsideControlsVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;

interface ListReconciliationOutsideControlsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReconciliationOutsideControlsVariables): QueryRef<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;
}
export const listReconciliationOutsideControlsRef: ListReconciliationOutsideControlsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listReconciliationOutsideControls(dc: DataConnect, vars: ListReconciliationOutsideControlsVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;

interface ListReconciliationOutsideControlsRef {
  ...
  (dc: DataConnect, vars: ListReconciliationOutsideControlsVariables): QueryRef<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;
}
export const listReconciliationOutsideControlsRef: ListReconciliationOutsideControlsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listReconciliationOutsideControlsRef:
```typescript
const name = listReconciliationOutsideControlsRef.operationName;
console.log(name);
```

### Variables
The `ListReconciliationOutsideControls` query requires an argument of type `ListReconciliationOutsideControlsVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListReconciliationOutsideControlsVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListReconciliationOutsideControls` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListReconciliationOutsideControlsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListReconciliationOutsideControlsData {
  reconciliationOutsideControls: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    expenseTransaction: {
      id: string;
      transactionDate: DateString;
      vendor: string;
      totalCents: Int64String;
      card: {
        id: string;
      } & CreditCard_Key;
    } & ExpenseTransaction_Key;
    status: string;
    reason: string;
    resolvedBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    resolvedAt?: TimestampString | null;
    resolutionNote?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReconciliationOutsideControl_Key)[];
}
```
### Using `ListReconciliationOutsideControls`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listReconciliationOutsideControls, ListReconciliationOutsideControlsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReconciliationOutsideControls` query requires an argument of type `ListReconciliationOutsideControlsVariables`:
const listReconciliationOutsideControlsVars: ListReconciliationOutsideControlsVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listReconciliationOutsideControls()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listReconciliationOutsideControls(listReconciliationOutsideControlsVars);
// Variables can be defined inline as well.
const { data } = await listReconciliationOutsideControls({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listReconciliationOutsideControls(dataConnect, listReconciliationOutsideControlsVars);

console.log(data.reconciliationOutsideControls);

// Or, you can use the `Promise` API.
listReconciliationOutsideControls(listReconciliationOutsideControlsVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationOutsideControls);
});
```

### Using `ListReconciliationOutsideControls`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listReconciliationOutsideControlsRef, ListReconciliationOutsideControlsVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReconciliationOutsideControls` query requires an argument of type `ListReconciliationOutsideControlsVariables`:
const listReconciliationOutsideControlsVars: ListReconciliationOutsideControlsVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listReconciliationOutsideControlsRef()` function to get a reference to the query.
const ref = listReconciliationOutsideControlsRef(listReconciliationOutsideControlsVars);
// Variables can be defined inline as well.
const ref = listReconciliationOutsideControlsRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listReconciliationOutsideControlsRef(dataConnect, listReconciliationOutsideControlsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reconciliationOutsideControls);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationOutsideControls);
});
```

## ListReconciliationOutsideControlsPage
You can execute the `ListReconciliationOutsideControlsPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listReconciliationOutsideControlsPage(vars: ListReconciliationOutsideControlsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;

interface ListReconciliationOutsideControlsPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReconciliationOutsideControlsPageVariables): QueryRef<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;
}
export const listReconciliationOutsideControlsPageRef: ListReconciliationOutsideControlsPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listReconciliationOutsideControlsPage(dc: DataConnect, vars: ListReconciliationOutsideControlsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;

interface ListReconciliationOutsideControlsPageRef {
  ...
  (dc: DataConnect, vars: ListReconciliationOutsideControlsPageVariables): QueryRef<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;
}
export const listReconciliationOutsideControlsPageRef: ListReconciliationOutsideControlsPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listReconciliationOutsideControlsPageRef:
```typescript
const name = listReconciliationOutsideControlsPageRef.operationName;
console.log(name);
```

### Variables
The `ListReconciliationOutsideControlsPage` query requires an argument of type `ListReconciliationOutsideControlsPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListReconciliationOutsideControlsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListReconciliationOutsideControlsPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListReconciliationOutsideControlsPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListReconciliationOutsideControlsPageData {
  reconciliationOutsideControls: ({
    id: string;
    statement: {
      id: string;
    } & CreditCardStatement_Key;
    expenseTransaction: {
      id: string;
      transactionDate: DateString;
      vendor: string;
      totalCents: Int64String;
      card: {
        id: string;
      } & CreditCard_Key;
    } & ExpenseTransaction_Key;
    status: string;
    reason: string;
    resolvedBy?: {
      id: string;
      displayName: string;
      role: string;
    } & UserProfile_Key;
    resolvedAt?: TimestampString | null;
    resolutionNote?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ReconciliationOutsideControl_Key)[];
}
```
### Using `ListReconciliationOutsideControlsPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listReconciliationOutsideControlsPage, ListReconciliationOutsideControlsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReconciliationOutsideControlsPage` query requires an argument of type `ListReconciliationOutsideControlsPageVariables`:
const listReconciliationOutsideControlsPageVars: ListReconciliationOutsideControlsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listReconciliationOutsideControlsPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listReconciliationOutsideControlsPage(listReconciliationOutsideControlsPageVars);
// Variables can be defined inline as well.
const { data } = await listReconciliationOutsideControlsPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listReconciliationOutsideControlsPage(dataConnect, listReconciliationOutsideControlsPageVars);

console.log(data.reconciliationOutsideControls);

// Or, you can use the `Promise` API.
listReconciliationOutsideControlsPage(listReconciliationOutsideControlsPageVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationOutsideControls);
});
```

### Using `ListReconciliationOutsideControlsPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listReconciliationOutsideControlsPageRef, ListReconciliationOutsideControlsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListReconciliationOutsideControlsPage` query requires an argument of type `ListReconciliationOutsideControlsPageVariables`:
const listReconciliationOutsideControlsPageVars: ListReconciliationOutsideControlsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listReconciliationOutsideControlsPageRef()` function to get a reference to the query.
const ref = listReconciliationOutsideControlsPageRef(listReconciliationOutsideControlsPageVars);
// Variables can be defined inline as well.
const ref = listReconciliationOutsideControlsPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listReconciliationOutsideControlsPageRef(dataConnect, listReconciliationOutsideControlsPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reconciliationOutsideControls);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationOutsideControls);
});
```

## ListCreditCardsPage
You can execute the `ListCreditCardsPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCreditCardsPage(vars: ListCreditCardsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardsPageData, ListCreditCardsPageVariables>;

interface ListCreditCardsPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCreditCardsPageVariables): QueryRef<ListCreditCardsPageData, ListCreditCardsPageVariables>;
}
export const listCreditCardsPageRef: ListCreditCardsPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCreditCardsPage(dc: DataConnect, vars: ListCreditCardsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCreditCardsPageData, ListCreditCardsPageVariables>;

interface ListCreditCardsPageRef {
  ...
  (dc: DataConnect, vars: ListCreditCardsPageVariables): QueryRef<ListCreditCardsPageData, ListCreditCardsPageVariables>;
}
export const listCreditCardsPageRef: ListCreditCardsPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCreditCardsPageRef:
```typescript
const name = listCreditCardsPageRef.operationName;
console.log(name);
```

### Variables
The `ListCreditCardsPage` query requires an argument of type `ListCreditCardsPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCreditCardsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListCreditCardsPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCreditCardsPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCreditCardsPageData {
  creditCards: ({
    id: string;
    lastFour: string;
    holder: {
      id: string;
      displayName: string;
      role: string;
      status: string;
    } & UserProfile_Key;
    cardFunction?: string | null;
    activeFrom?: DateString | null;
    inactiveFrom?: DateString | null;
    status: string;
  } & CreditCard_Key)[];
}
```
### Using `ListCreditCardsPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCreditCardsPage, ListCreditCardsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardsPage` query requires an argument of type `ListCreditCardsPageVariables`:
const listCreditCardsPageVars: ListCreditCardsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardsPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCreditCardsPage(listCreditCardsPageVars);
// Variables can be defined inline as well.
const { data } = await listCreditCardsPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCreditCardsPage(dataConnect, listCreditCardsPageVars);

console.log(data.creditCards);

// Or, you can use the `Promise` API.
listCreditCardsPage(listCreditCardsPageVars).then((response) => {
  const data = response.data;
  console.log(data.creditCards);
});
```

### Using `ListCreditCardsPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCreditCardsPageRef, ListCreditCardsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCreditCardsPage` query requires an argument of type `ListCreditCardsPageVariables`:
const listCreditCardsPageVars: ListCreditCardsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCreditCardsPageRef()` function to get a reference to the query.
const ref = listCreditCardsPageRef(listCreditCardsPageVars);
// Variables can be defined inline as well.
const ref = listCreditCardsPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCreditCardsPageRef(dataConnect, listCreditCardsPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.creditCards);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCards);
});
```

## ListCardStatementPeriodsPage
You can execute the `ListCardStatementPeriodsPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listCardStatementPeriodsPage(vars: ListCardStatementPeriodsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;

interface ListCardStatementPeriodsPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCardStatementPeriodsPageVariables): QueryRef<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;
}
export const listCardStatementPeriodsPageRef: ListCardStatementPeriodsPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCardStatementPeriodsPage(dc: DataConnect, vars: ListCardStatementPeriodsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;

interface ListCardStatementPeriodsPageRef {
  ...
  (dc: DataConnect, vars: ListCardStatementPeriodsPageVariables): QueryRef<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;
}
export const listCardStatementPeriodsPageRef: ListCardStatementPeriodsPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCardStatementPeriodsPageRef:
```typescript
const name = listCardStatementPeriodsPageRef.operationName;
console.log(name);
```

### Variables
The `ListCardStatementPeriodsPage` query requires an argument of type `ListCardStatementPeriodsPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCardStatementPeriodsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListCardStatementPeriodsPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCardStatementPeriodsPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCardStatementPeriodsPageData {
  cardStatementPeriods: ({
    id: string;
    label: string;
    startDate: DateString;
    endDate: DateString;
    statementLabel?: string | null;
    manualAdjustmentsJson?: string | null;
    status: string;
  } & CardStatementPeriod_Key)[];
}
```
### Using `ListCardStatementPeriodsPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCardStatementPeriodsPage, ListCardStatementPeriodsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCardStatementPeriodsPage` query requires an argument of type `ListCardStatementPeriodsPageVariables`:
const listCardStatementPeriodsPageVars: ListCardStatementPeriodsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCardStatementPeriodsPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCardStatementPeriodsPage(listCardStatementPeriodsPageVars);
// Variables can be defined inline as well.
const { data } = await listCardStatementPeriodsPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCardStatementPeriodsPage(dataConnect, listCardStatementPeriodsPageVars);

console.log(data.cardStatementPeriods);

// Or, you can use the `Promise` API.
listCardStatementPeriodsPage(listCardStatementPeriodsPageVars).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriods);
});
```

### Using `ListCardStatementPeriodsPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCardStatementPeriodsPageRef, ListCardStatementPeriodsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListCardStatementPeriodsPage` query requires an argument of type `ListCardStatementPeriodsPageVariables`:
const listCardStatementPeriodsPageVars: ListCardStatementPeriodsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listCardStatementPeriodsPageRef()` function to get a reference to the query.
const ref = listCardStatementPeriodsPageRef(listCardStatementPeriodsPageVars);
// Variables can be defined inline as well.
const ref = listCardStatementPeriodsPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCardStatementPeriodsPageRef(dataConnect, listCardStatementPeriodsPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.cardStatementPeriods);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriods);
});
```

## ListExpenseAccountsPage
You can execute the `ListExpenseAccountsPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listExpenseAccountsPage(vars: ListExpenseAccountsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;

interface ListExpenseAccountsPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExpenseAccountsPageVariables): QueryRef<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;
}
export const listExpenseAccountsPageRef: ListExpenseAccountsPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExpenseAccountsPage(dc: DataConnect, vars: ListExpenseAccountsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;

interface ListExpenseAccountsPageRef {
  ...
  (dc: DataConnect, vars: ListExpenseAccountsPageVariables): QueryRef<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;
}
export const listExpenseAccountsPageRef: ListExpenseAccountsPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExpenseAccountsPageRef:
```typescript
const name = listExpenseAccountsPageRef.operationName;
console.log(name);
```

### Variables
The `ListExpenseAccountsPage` query requires an argument of type `ListExpenseAccountsPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListExpenseAccountsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListExpenseAccountsPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExpenseAccountsPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListExpenseAccountsPageData {
  expenseAccounts: ({
    id: string;
    number: string;
    label: string;
    type: string;
    status: string;
  } & ExpenseAccount_Key)[];
}
```
### Using `ListExpenseAccountsPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExpenseAccountsPage, ListExpenseAccountsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListExpenseAccountsPage` query requires an argument of type `ListExpenseAccountsPageVariables`:
const listExpenseAccountsPageVars: ListExpenseAccountsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listExpenseAccountsPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExpenseAccountsPage(listExpenseAccountsPageVars);
// Variables can be defined inline as well.
const { data } = await listExpenseAccountsPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExpenseAccountsPage(dataConnect, listExpenseAccountsPageVars);

console.log(data.expenseAccounts);

// Or, you can use the `Promise` API.
listExpenseAccountsPage(listExpenseAccountsPageVars).then((response) => {
  const data = response.data;
  console.log(data.expenseAccounts);
});
```

### Using `ListExpenseAccountsPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExpenseAccountsPageRef, ListExpenseAccountsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListExpenseAccountsPage` query requires an argument of type `ListExpenseAccountsPageVariables`:
const listExpenseAccountsPageVars: ListExpenseAccountsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listExpenseAccountsPageRef()` function to get a reference to the query.
const ref = listExpenseAccountsPageRef(listExpenseAccountsPageVars);
// Variables can be defined inline as well.
const ref = listExpenseAccountsPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExpenseAccountsPageRef(dataConnect, listExpenseAccountsPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.expenseAccounts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseAccounts);
});
```

## ListProjectsPage
You can execute the `ListProjectsPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listProjectsPage(vars: ListProjectsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsPageData, ListProjectsPageVariables>;

interface ListProjectsPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsPageVariables): QueryRef<ListProjectsPageData, ListProjectsPageVariables>;
}
export const listProjectsPageRef: ListProjectsPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectsPage(dc: DataConnect, vars: ListProjectsPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsPageData, ListProjectsPageVariables>;

interface ListProjectsPageRef {
  ...
  (dc: DataConnect, vars: ListProjectsPageVariables): QueryRef<ListProjectsPageData, ListProjectsPageVariables>;
}
export const listProjectsPageRef: ListProjectsPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsPageRef:
```typescript
const name = listProjectsPageRef.operationName;
console.log(name);
```

### Variables
The `ListProjectsPage` query requires an argument of type `ListProjectsPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListProjectsPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectsPageData {
  projects: ({
    id: string;
    number: string;
    name: string;
    status: string;
  } & Project_Key)[];
}
```
### Using `ListProjectsPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectsPage, ListProjectsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListProjectsPage` query requires an argument of type `ListProjectsPageVariables`:
const listProjectsPageVars: ListProjectsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listProjectsPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectsPage(listProjectsPageVars);
// Variables can be defined inline as well.
const { data } = await listProjectsPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectsPage(dataConnect, listProjectsPageVars);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjectsPage(listProjectsPageVars).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjectsPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsPageRef, ListProjectsPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListProjectsPage` query requires an argument of type `ListProjectsPageVariables`:
const listProjectsPageVars: ListProjectsPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listProjectsPageRef()` function to get a reference to the query.
const ref = listProjectsPageRef(listProjectsPageVars);
// Variables can be defined inline as well.
const ref = listProjectsPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsPageRef(dataConnect, listProjectsPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## ListSkuReferencesPage
You can execute the `ListSkuReferencesPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listSkuReferencesPage(vars: ListSkuReferencesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;

interface ListSkuReferencesPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSkuReferencesPageVariables): QueryRef<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;
}
export const listSkuReferencesPageRef: ListSkuReferencesPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSkuReferencesPage(dc: DataConnect, vars: ListSkuReferencesPageVariables, options?: ExecuteQueryOptions): QueryPromise<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;

interface ListSkuReferencesPageRef {
  ...
  (dc: DataConnect, vars: ListSkuReferencesPageVariables): QueryRef<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;
}
export const listSkuReferencesPageRef: ListSkuReferencesPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSkuReferencesPageRef:
```typescript
const name = listSkuReferencesPageRef.operationName;
console.log(name);
```

### Variables
The `ListSkuReferencesPage` query requires an argument of type `ListSkuReferencesPageVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListSkuReferencesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that executing the `ListSkuReferencesPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSkuReferencesPageData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSkuReferencesPageData {
  skuReferences: ({
    merchant: string;
    sku: string;
    productLabel?: string | null;
    categoryLabel?: string | null;
    expenseAccount?: {
      id: string;
      number: string;
      label: string;
      type: string;
    } & ExpenseAccount_Key;
    sourceUrl?: string | null;
    verificationStatus: string;
    verifiedAt?: TimestampString | null;
  } & SkuReference_Key)[];
}
```
### Using `ListSkuReferencesPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSkuReferencesPage, ListSkuReferencesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListSkuReferencesPage` query requires an argument of type `ListSkuReferencesPageVariables`:
const listSkuReferencesPageVars: ListSkuReferencesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listSkuReferencesPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSkuReferencesPage(listSkuReferencesPageVars);
// Variables can be defined inline as well.
const { data } = await listSkuReferencesPage({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSkuReferencesPage(dataConnect, listSkuReferencesPageVars);

console.log(data.skuReferences);

// Or, you can use the `Promise` API.
listSkuReferencesPage(listSkuReferencesPageVars).then((response) => {
  const data = response.data;
  console.log(data.skuReferences);
});
```

### Using `ListSkuReferencesPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSkuReferencesPageRef, ListSkuReferencesPageVariables } from '@factures-thibeault/data-connect-generated';

// The `ListSkuReferencesPage` query requires an argument of type `ListSkuReferencesPageVariables`:
const listSkuReferencesPageVars: ListSkuReferencesPageVariables = {
  limit: ..., 
  offset: ..., 
};

// Call the `listSkuReferencesPageRef()` function to get a reference to the query.
const ref = listSkuReferencesPageRef(listSkuReferencesPageVars);
// Variables can be defined inline as well.
const ref = listSkuReferencesPageRef({ limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSkuReferencesPageRef(dataConnect, listSkuReferencesPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.skuReferences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.skuReferences);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `accounting` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AdminSeedUserProfile
You can execute the `AdminSeedUserProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedUserProfile(vars: AdminSeedUserProfileVariables): MutationPromise<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;

interface AdminSeedUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedUserProfileVariables): MutationRef<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;
}
export const adminSeedUserProfileRef: AdminSeedUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedUserProfile(dc: DataConnect, vars: AdminSeedUserProfileVariables): MutationPromise<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;

interface AdminSeedUserProfileRef {
  ...
  (dc: DataConnect, vars: AdminSeedUserProfileVariables): MutationRef<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;
}
export const adminSeedUserProfileRef: AdminSeedUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedUserProfileRef:
```typescript
const name = adminSeedUserProfileRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedUserProfile` mutation requires an argument of type `AdminSeedUserProfileVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedUserProfileVariables {
  id: string;
  firebaseUid: string;
  displayName: string;
  email?: string | null;
  jobTitle?: string | null;
  role: string;
  status: string;
}
```
### Return Type
Recall that executing the `AdminSeedUserProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedUserProfileData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedUserProfileData {
  userProfile_upsert: UserProfile_Key;
}
```
### Using `AdminSeedUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedUserProfile, AdminSeedUserProfileVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedUserProfile` mutation requires an argument of type `AdminSeedUserProfileVariables`:
const adminSeedUserProfileVars: AdminSeedUserProfileVariables = {
  id: ..., 
  firebaseUid: ..., 
  displayName: ..., 
  email: ..., // optional
  jobTitle: ..., // optional
  role: ..., 
  status: ..., 
};

// Call the `adminSeedUserProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedUserProfile(adminSeedUserProfileVars);
// Variables can be defined inline as well.
const { data } = await adminSeedUserProfile({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedUserProfile(dataConnect, adminSeedUserProfileVars);

console.log(data.userProfile_upsert);

// Or, you can use the `Promise` API.
adminSeedUserProfile(adminSeedUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.userProfile_upsert);
});
```

### Using `AdminSeedUserProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedUserProfileRef, AdminSeedUserProfileVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedUserProfile` mutation requires an argument of type `AdminSeedUserProfileVariables`:
const adminSeedUserProfileVars: AdminSeedUserProfileVariables = {
  id: ..., 
  firebaseUid: ..., 
  displayName: ..., 
  email: ..., // optional
  jobTitle: ..., // optional
  role: ..., 
  status: ..., 
};

// Call the `adminSeedUserProfileRef()` function to get a reference to the mutation.
const ref = adminSeedUserProfileRef(adminSeedUserProfileVars);
// Variables can be defined inline as well.
const ref = adminSeedUserProfileRef({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedUserProfileRef(dataConnect, adminSeedUserProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProfile_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProfile_upsert);
});
```

## AdminSeedProject
You can execute the `AdminSeedProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedProject(vars: AdminSeedProjectVariables): MutationPromise<AdminSeedProjectData, AdminSeedProjectVariables>;

interface AdminSeedProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedProjectVariables): MutationRef<AdminSeedProjectData, AdminSeedProjectVariables>;
}
export const adminSeedProjectRef: AdminSeedProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedProject(dc: DataConnect, vars: AdminSeedProjectVariables): MutationPromise<AdminSeedProjectData, AdminSeedProjectVariables>;

interface AdminSeedProjectRef {
  ...
  (dc: DataConnect, vars: AdminSeedProjectVariables): MutationRef<AdminSeedProjectData, AdminSeedProjectVariables>;
}
export const adminSeedProjectRef: AdminSeedProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedProjectRef:
```typescript
const name = adminSeedProjectRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedProject` mutation requires an argument of type `AdminSeedProjectVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedProjectVariables {
  id: string;
  number: string;
  name: string;
  status: string;
}
```
### Return Type
Recall that executing the `AdminSeedProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedProjectData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedProjectData {
  project_upsert: Project_Key;
}
```
### Using `AdminSeedProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedProject, AdminSeedProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedProject` mutation requires an argument of type `AdminSeedProjectVariables`:
const adminSeedProjectVars: AdminSeedProjectVariables = {
  id: ..., 
  number: ..., 
  name: ..., 
  status: ..., 
};

// Call the `adminSeedProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedProject(adminSeedProjectVars);
// Variables can be defined inline as well.
const { data } = await adminSeedProject({ id: ..., number: ..., name: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedProject(dataConnect, adminSeedProjectVars);

console.log(data.project_upsert);

// Or, you can use the `Promise` API.
adminSeedProject(adminSeedProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_upsert);
});
```

### Using `AdminSeedProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedProjectRef, AdminSeedProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedProject` mutation requires an argument of type `AdminSeedProjectVariables`:
const adminSeedProjectVars: AdminSeedProjectVariables = {
  id: ..., 
  number: ..., 
  name: ..., 
  status: ..., 
};

// Call the `adminSeedProjectRef()` function to get a reference to the mutation.
const ref = adminSeedProjectRef(adminSeedProjectVars);
// Variables can be defined inline as well.
const ref = adminSeedProjectRef({ id: ..., number: ..., name: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedProjectRef(dataConnect, adminSeedProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_upsert);
});
```

## AdminSeedExpenseAccount
You can execute the `AdminSeedExpenseAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedExpenseAccount(vars: AdminSeedExpenseAccountVariables): MutationPromise<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;

interface AdminSeedExpenseAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedExpenseAccountVariables): MutationRef<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;
}
export const adminSeedExpenseAccountRef: AdminSeedExpenseAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedExpenseAccount(dc: DataConnect, vars: AdminSeedExpenseAccountVariables): MutationPromise<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;

interface AdminSeedExpenseAccountRef {
  ...
  (dc: DataConnect, vars: AdminSeedExpenseAccountVariables): MutationRef<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;
}
export const adminSeedExpenseAccountRef: AdminSeedExpenseAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedExpenseAccountRef:
```typescript
const name = adminSeedExpenseAccountRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedExpenseAccount` mutation requires an argument of type `AdminSeedExpenseAccountVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedExpenseAccountVariables {
  id: string;
  number: string;
  label: string;
  type: string;
  status: string;
}
```
### Return Type
Recall that executing the `AdminSeedExpenseAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedExpenseAccountData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedExpenseAccountData {
  expenseAccount_upsert: ExpenseAccount_Key;
}
```
### Using `AdminSeedExpenseAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedExpenseAccount, AdminSeedExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedExpenseAccount` mutation requires an argument of type `AdminSeedExpenseAccountVariables`:
const adminSeedExpenseAccountVars: AdminSeedExpenseAccountVariables = {
  id: ..., 
  number: ..., 
  label: ..., 
  type: ..., 
  status: ..., 
};

// Call the `adminSeedExpenseAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedExpenseAccount(adminSeedExpenseAccountVars);
// Variables can be defined inline as well.
const { data } = await adminSeedExpenseAccount({ id: ..., number: ..., label: ..., type: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedExpenseAccount(dataConnect, adminSeedExpenseAccountVars);

console.log(data.expenseAccount_upsert);

// Or, you can use the `Promise` API.
adminSeedExpenseAccount(adminSeedExpenseAccountVars).then((response) => {
  const data = response.data;
  console.log(data.expenseAccount_upsert);
});
```

### Using `AdminSeedExpenseAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedExpenseAccountRef, AdminSeedExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedExpenseAccount` mutation requires an argument of type `AdminSeedExpenseAccountVariables`:
const adminSeedExpenseAccountVars: AdminSeedExpenseAccountVariables = {
  id: ..., 
  number: ..., 
  label: ..., 
  type: ..., 
  status: ..., 
};

// Call the `adminSeedExpenseAccountRef()` function to get a reference to the mutation.
const ref = adminSeedExpenseAccountRef(adminSeedExpenseAccountVars);
// Variables can be defined inline as well.
const ref = adminSeedExpenseAccountRef({ id: ..., number: ..., label: ..., type: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedExpenseAccountRef(dataConnect, adminSeedExpenseAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expenseAccount_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseAccount_upsert);
});
```

## AdminSeedCardStatementPeriod
You can execute the `AdminSeedCardStatementPeriod` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedCardStatementPeriod(vars: AdminSeedCardStatementPeriodVariables): MutationPromise<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;

interface AdminSeedCardStatementPeriodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCardStatementPeriodVariables): MutationRef<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;
}
export const adminSeedCardStatementPeriodRef: AdminSeedCardStatementPeriodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedCardStatementPeriod(dc: DataConnect, vars: AdminSeedCardStatementPeriodVariables): MutationPromise<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;

interface AdminSeedCardStatementPeriodRef {
  ...
  (dc: DataConnect, vars: AdminSeedCardStatementPeriodVariables): MutationRef<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;
}
export const adminSeedCardStatementPeriodRef: AdminSeedCardStatementPeriodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedCardStatementPeriodRef:
```typescript
const name = adminSeedCardStatementPeriodRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedCardStatementPeriod` mutation requires an argument of type `AdminSeedCardStatementPeriodVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedCardStatementPeriodVariables {
  id: string;
  label: string;
  startDate: DateString;
  endDate: DateString;
  statementLabel?: string | null;
  status: string;
}
```
### Return Type
Recall that executing the `AdminSeedCardStatementPeriod` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedCardStatementPeriodData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedCardStatementPeriodData {
  cardStatementPeriod_upsert: CardStatementPeriod_Key;
}
```
### Using `AdminSeedCardStatementPeriod`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedCardStatementPeriod, AdminSeedCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCardStatementPeriod` mutation requires an argument of type `AdminSeedCardStatementPeriodVariables`:
const adminSeedCardStatementPeriodVars: AdminSeedCardStatementPeriodVariables = {
  id: ..., 
  label: ..., 
  startDate: ..., 
  endDate: ..., 
  statementLabel: ..., // optional
  status: ..., 
};

// Call the `adminSeedCardStatementPeriod()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedCardStatementPeriod(adminSeedCardStatementPeriodVars);
// Variables can be defined inline as well.
const { data } = await adminSeedCardStatementPeriod({ id: ..., label: ..., startDate: ..., endDate: ..., statementLabel: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedCardStatementPeriod(dataConnect, adminSeedCardStatementPeriodVars);

console.log(data.cardStatementPeriod_upsert);

// Or, you can use the `Promise` API.
adminSeedCardStatementPeriod(adminSeedCardStatementPeriodVars).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriod_upsert);
});
```

### Using `AdminSeedCardStatementPeriod`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedCardStatementPeriodRef, AdminSeedCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCardStatementPeriod` mutation requires an argument of type `AdminSeedCardStatementPeriodVariables`:
const adminSeedCardStatementPeriodVars: AdminSeedCardStatementPeriodVariables = {
  id: ..., 
  label: ..., 
  startDate: ..., 
  endDate: ..., 
  statementLabel: ..., // optional
  status: ..., 
};

// Call the `adminSeedCardStatementPeriodRef()` function to get a reference to the mutation.
const ref = adminSeedCardStatementPeriodRef(adminSeedCardStatementPeriodVars);
// Variables can be defined inline as well.
const ref = adminSeedCardStatementPeriodRef({ id: ..., label: ..., startDate: ..., endDate: ..., statementLabel: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedCardStatementPeriodRef(dataConnect, adminSeedCardStatementPeriodVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cardStatementPeriod_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriod_upsert);
});
```

## AdminSeedInvoiceIntake
You can execute the `AdminSeedInvoiceIntake` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedInvoiceIntake(vars: AdminSeedInvoiceIntakeVariables): MutationPromise<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;

interface AdminSeedInvoiceIntakeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedInvoiceIntakeVariables): MutationRef<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;
}
export const adminSeedInvoiceIntakeRef: AdminSeedInvoiceIntakeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedInvoiceIntake(dc: DataConnect, vars: AdminSeedInvoiceIntakeVariables): MutationPromise<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;

interface AdminSeedInvoiceIntakeRef {
  ...
  (dc: DataConnect, vars: AdminSeedInvoiceIntakeVariables): MutationRef<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;
}
export const adminSeedInvoiceIntakeRef: AdminSeedInvoiceIntakeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedInvoiceIntakeRef:
```typescript
const name = adminSeedInvoiceIntakeRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedInvoiceIntake` mutation requires an argument of type `AdminSeedInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedInvoiceIntakeVariables {
  receiptId: string;
  uploaderUid: string;
  storageFolder: string;
  photoCount: number;
  status: string;
  processingStatus: string;
  accountingStatus: string;
  aiModel?: string | null;
  aiConfidence?: number | null;
  extractedVendor?: string | null;
  extractedInvoiceNumber?: string | null;
  extractedInvoiceDate?: DateString | null;
  extractedSubtotalCents?: Int64String | null;
  extractedTpsCents?: Int64String | null;
  extractedTvqCents?: Int64String | null;
  extractedTotalCents?: Int64String | null;
  extractedCurrency?: string | null;
  extractedSku?: string | null;
  extractedCategory?: string | null;
  extractedProjectId?: string | null;
  classificationAccountCode?: string | null;
  classificationCategory?: string | null;
  classificationSource?: string | null;
  classificationConfidence?: number | null;
  classificationStatus?: string | null;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  aiNotes?: string | null;
}
```
### Return Type
Recall that executing the `AdminSeedInvoiceIntake` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedInvoiceIntakeData {
  invoiceIntake_upsert: InvoiceIntake_Key;
}
```
### Using `AdminSeedInvoiceIntake`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedInvoiceIntake, AdminSeedInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedInvoiceIntake` mutation requires an argument of type `AdminSeedInvoiceIntakeVariables`:
const adminSeedInvoiceIntakeVars: AdminSeedInvoiceIntakeVariables = {
  receiptId: ..., 
  uploaderUid: ..., 
  storageFolder: ..., 
  photoCount: ..., 
  status: ..., 
  processingStatus: ..., 
  accountingStatus: ..., 
  aiModel: ..., // optional
  aiConfidence: ..., // optional
  extractedVendor: ..., // optional
  extractedInvoiceNumber: ..., // optional
  extractedInvoiceDate: ..., // optional
  extractedSubtotalCents: ..., // optional
  extractedTpsCents: ..., // optional
  extractedTvqCents: ..., // optional
  extractedTotalCents: ..., // optional
  extractedCurrency: ..., // optional
  extractedSku: ..., // optional
  extractedCategory: ..., // optional
  extractedProjectId: ..., // optional
  classificationAccountCode: ..., // optional
  classificationCategory: ..., // optional
  classificationSource: ..., // optional
  classificationConfidence: ..., // optional
  classificationStatus: ..., // optional
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  aiNotes: ..., // optional
};

// Call the `adminSeedInvoiceIntake()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedInvoiceIntake(adminSeedInvoiceIntakeVars);
// Variables can be defined inline as well.
const { data } = await adminSeedInvoiceIntake({ receiptId: ..., uploaderUid: ..., storageFolder: ..., photoCount: ..., status: ..., processingStatus: ..., accountingStatus: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., decisionExceptions: ..., decisionChecks: ..., aiNotes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedInvoiceIntake(dataConnect, adminSeedInvoiceIntakeVars);

console.log(data.invoiceIntake_upsert);

// Or, you can use the `Promise` API.
adminSeedInvoiceIntake(adminSeedInvoiceIntakeVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_upsert);
});
```

### Using `AdminSeedInvoiceIntake`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedInvoiceIntakeRef, AdminSeedInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedInvoiceIntake` mutation requires an argument of type `AdminSeedInvoiceIntakeVariables`:
const adminSeedInvoiceIntakeVars: AdminSeedInvoiceIntakeVariables = {
  receiptId: ..., 
  uploaderUid: ..., 
  storageFolder: ..., 
  photoCount: ..., 
  status: ..., 
  processingStatus: ..., 
  accountingStatus: ..., 
  aiModel: ..., // optional
  aiConfidence: ..., // optional
  extractedVendor: ..., // optional
  extractedInvoiceNumber: ..., // optional
  extractedInvoiceDate: ..., // optional
  extractedSubtotalCents: ..., // optional
  extractedTpsCents: ..., // optional
  extractedTvqCents: ..., // optional
  extractedTotalCents: ..., // optional
  extractedCurrency: ..., // optional
  extractedSku: ..., // optional
  extractedCategory: ..., // optional
  extractedProjectId: ..., // optional
  classificationAccountCode: ..., // optional
  classificationCategory: ..., // optional
  classificationSource: ..., // optional
  classificationConfidence: ..., // optional
  classificationStatus: ..., // optional
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  aiNotes: ..., // optional
};

// Call the `adminSeedInvoiceIntakeRef()` function to get a reference to the mutation.
const ref = adminSeedInvoiceIntakeRef(adminSeedInvoiceIntakeVars);
// Variables can be defined inline as well.
const ref = adminSeedInvoiceIntakeRef({ receiptId: ..., uploaderUid: ..., storageFolder: ..., photoCount: ..., status: ..., processingStatus: ..., accountingStatus: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., decisionExceptions: ..., decisionChecks: ..., aiNotes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedInvoiceIntakeRef(dataConnect, adminSeedInvoiceIntakeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_upsert);
});
```

## AdminSeedCreditCard
You can execute the `AdminSeedCreditCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedCreditCard(vars: AdminSeedCreditCardVariables): MutationPromise<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;

interface AdminSeedCreditCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCreditCardVariables): MutationRef<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;
}
export const adminSeedCreditCardRef: AdminSeedCreditCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedCreditCard(dc: DataConnect, vars: AdminSeedCreditCardVariables): MutationPromise<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;

interface AdminSeedCreditCardRef {
  ...
  (dc: DataConnect, vars: AdminSeedCreditCardVariables): MutationRef<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;
}
export const adminSeedCreditCardRef: AdminSeedCreditCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedCreditCardRef:
```typescript
const name = adminSeedCreditCardRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedCreditCard` mutation requires an argument of type `AdminSeedCreditCardVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedCreditCardVariables {
  id: string;
  lastFour: string;
  holderId: string;
  cardFunction?: string | null;
  status: string;
  activeFrom?: DateString | null;
}
```
### Return Type
Recall that executing the `AdminSeedCreditCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedCreditCardData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedCreditCardData {
  creditCard_upsert: CreditCard_Key;
}
```
### Using `AdminSeedCreditCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedCreditCard, AdminSeedCreditCardVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCreditCard` mutation requires an argument of type `AdminSeedCreditCardVariables`:
const adminSeedCreditCardVars: AdminSeedCreditCardVariables = {
  id: ..., 
  lastFour: ..., 
  holderId: ..., 
  cardFunction: ..., // optional
  status: ..., 
  activeFrom: ..., // optional
};

// Call the `adminSeedCreditCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedCreditCard(adminSeedCreditCardVars);
// Variables can be defined inline as well.
const { data } = await adminSeedCreditCard({ id: ..., lastFour: ..., holderId: ..., cardFunction: ..., status: ..., activeFrom: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedCreditCard(dataConnect, adminSeedCreditCardVars);

console.log(data.creditCard_upsert);

// Or, you can use the `Promise` API.
adminSeedCreditCard(adminSeedCreditCardVars).then((response) => {
  const data = response.data;
  console.log(data.creditCard_upsert);
});
```

### Using `AdminSeedCreditCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedCreditCardRef, AdminSeedCreditCardVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCreditCard` mutation requires an argument of type `AdminSeedCreditCardVariables`:
const adminSeedCreditCardVars: AdminSeedCreditCardVariables = {
  id: ..., 
  lastFour: ..., 
  holderId: ..., 
  cardFunction: ..., // optional
  status: ..., 
  activeFrom: ..., // optional
};

// Call the `adminSeedCreditCardRef()` function to get a reference to the mutation.
const ref = adminSeedCreditCardRef(adminSeedCreditCardVars);
// Variables can be defined inline as well.
const ref = adminSeedCreditCardRef({ id: ..., lastFour: ..., holderId: ..., cardFunction: ..., status: ..., activeFrom: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedCreditCardRef(dataConnect, adminSeedCreditCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCard_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCard_upsert);
});
```

## AdminSeedCreditCardStatement
You can execute the `AdminSeedCreditCardStatement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedCreditCardStatement(vars: AdminSeedCreditCardStatementVariables): MutationPromise<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;

interface AdminSeedCreditCardStatementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCreditCardStatementVariables): MutationRef<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;
}
export const adminSeedCreditCardStatementRef: AdminSeedCreditCardStatementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedCreditCardStatement(dc: DataConnect, vars: AdminSeedCreditCardStatementVariables): MutationPromise<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;

interface AdminSeedCreditCardStatementRef {
  ...
  (dc: DataConnect, vars: AdminSeedCreditCardStatementVariables): MutationRef<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;
}
export const adminSeedCreditCardStatementRef: AdminSeedCreditCardStatementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedCreditCardStatementRef:
```typescript
const name = adminSeedCreditCardStatementRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedCreditCardStatement` mutation requires an argument of type `AdminSeedCreditCardStatementVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedCreditCardStatementVariables {
  id: string;
  cardId: string;
  holderIdSnapshot: string;
  holderNameSnapshot: string;
  periodStart: DateString;
  periodEnd: DateString;
  originalStoragePath: string;
  originalFilename: string;
  importedById: string;
  statementHash: string;
  status: string;
  lineCount: number;
  totalAmountCents: Int64String;
}
```
### Return Type
Recall that executing the `AdminSeedCreditCardStatement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedCreditCardStatementData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedCreditCardStatementData {
  creditCardStatement_upsert: CreditCardStatement_Key;
}
```
### Using `AdminSeedCreditCardStatement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedCreditCardStatement, AdminSeedCreditCardStatementVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCreditCardStatement` mutation requires an argument of type `AdminSeedCreditCardStatementVariables`:
const adminSeedCreditCardStatementVars: AdminSeedCreditCardStatementVariables = {
  id: ..., 
  cardId: ..., 
  holderIdSnapshot: ..., 
  holderNameSnapshot: ..., 
  periodStart: ..., 
  periodEnd: ..., 
  originalStoragePath: ..., 
  originalFilename: ..., 
  importedById: ..., 
  statementHash: ..., 
  status: ..., 
  lineCount: ..., 
  totalAmountCents: ..., 
};

// Call the `adminSeedCreditCardStatement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedCreditCardStatement(adminSeedCreditCardStatementVars);
// Variables can be defined inline as well.
const { data } = await adminSeedCreditCardStatement({ id: ..., cardId: ..., holderIdSnapshot: ..., holderNameSnapshot: ..., periodStart: ..., periodEnd: ..., originalStoragePath: ..., originalFilename: ..., importedById: ..., statementHash: ..., status: ..., lineCount: ..., totalAmountCents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedCreditCardStatement(dataConnect, adminSeedCreditCardStatementVars);

console.log(data.creditCardStatement_upsert);

// Or, you can use the `Promise` API.
adminSeedCreditCardStatement(adminSeedCreditCardStatementVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatement_upsert);
});
```

### Using `AdminSeedCreditCardStatement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedCreditCardStatementRef, AdminSeedCreditCardStatementVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCreditCardStatement` mutation requires an argument of type `AdminSeedCreditCardStatementVariables`:
const adminSeedCreditCardStatementVars: AdminSeedCreditCardStatementVariables = {
  id: ..., 
  cardId: ..., 
  holderIdSnapshot: ..., 
  holderNameSnapshot: ..., 
  periodStart: ..., 
  periodEnd: ..., 
  originalStoragePath: ..., 
  originalFilename: ..., 
  importedById: ..., 
  statementHash: ..., 
  status: ..., 
  lineCount: ..., 
  totalAmountCents: ..., 
};

// Call the `adminSeedCreditCardStatementRef()` function to get a reference to the mutation.
const ref = adminSeedCreditCardStatementRef(adminSeedCreditCardStatementVars);
// Variables can be defined inline as well.
const ref = adminSeedCreditCardStatementRef({ id: ..., cardId: ..., holderIdSnapshot: ..., holderNameSnapshot: ..., periodStart: ..., periodEnd: ..., originalStoragePath: ..., originalFilename: ..., importedById: ..., statementHash: ..., status: ..., lineCount: ..., totalAmountCents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedCreditCardStatementRef(dataConnect, adminSeedCreditCardStatementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCardStatement_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatement_upsert);
});
```

## AdminSeedCreditCardStatementLine
You can execute the `AdminSeedCreditCardStatementLine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedCreditCardStatementLine(vars: AdminSeedCreditCardStatementLineVariables): MutationPromise<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;

interface AdminSeedCreditCardStatementLineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCreditCardStatementLineVariables): MutationRef<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;
}
export const adminSeedCreditCardStatementLineRef: AdminSeedCreditCardStatementLineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedCreditCardStatementLine(dc: DataConnect, vars: AdminSeedCreditCardStatementLineVariables): MutationPromise<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;

interface AdminSeedCreditCardStatementLineRef {
  ...
  (dc: DataConnect, vars: AdminSeedCreditCardStatementLineVariables): MutationRef<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;
}
export const adminSeedCreditCardStatementLineRef: AdminSeedCreditCardStatementLineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedCreditCardStatementLineRef:
```typescript
const name = adminSeedCreditCardStatementLineRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedCreditCardStatementLine` mutation requires an argument of type `AdminSeedCreditCardStatementLineVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedCreditCardStatementLineVariables {
  id: string;
  statementId: string;
  sequence: number;
  transactionDate: DateString;
  postedDate?: DateString | null;
  merchantRaw: string;
  merchantNormalized: string;
  amountCents: Int64String;
  externalReference?: string | null;
  status: string;
  rawData?: string | null;
}
```
### Return Type
Recall that executing the `AdminSeedCreditCardStatementLine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedCreditCardStatementLineData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedCreditCardStatementLineData {
  creditCardStatementLine_upsert: CreditCardStatementLine_Key;
}
```
### Using `AdminSeedCreditCardStatementLine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedCreditCardStatementLine, AdminSeedCreditCardStatementLineVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCreditCardStatementLine` mutation requires an argument of type `AdminSeedCreditCardStatementLineVariables`:
const adminSeedCreditCardStatementLineVars: AdminSeedCreditCardStatementLineVariables = {
  id: ..., 
  statementId: ..., 
  sequence: ..., 
  transactionDate: ..., 
  postedDate: ..., // optional
  merchantRaw: ..., 
  merchantNormalized: ..., 
  amountCents: ..., 
  externalReference: ..., // optional
  status: ..., 
  rawData: ..., // optional
};

// Call the `adminSeedCreditCardStatementLine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedCreditCardStatementLine(adminSeedCreditCardStatementLineVars);
// Variables can be defined inline as well.
const { data } = await adminSeedCreditCardStatementLine({ id: ..., statementId: ..., sequence: ..., transactionDate: ..., postedDate: ..., merchantRaw: ..., merchantNormalized: ..., amountCents: ..., externalReference: ..., status: ..., rawData: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedCreditCardStatementLine(dataConnect, adminSeedCreditCardStatementLineVars);

console.log(data.creditCardStatementLine_upsert);

// Or, you can use the `Promise` API.
adminSeedCreditCardStatementLine(adminSeedCreditCardStatementLineVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLine_upsert);
});
```

### Using `AdminSeedCreditCardStatementLine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedCreditCardStatementLineRef, AdminSeedCreditCardStatementLineVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCreditCardStatementLine` mutation requires an argument of type `AdminSeedCreditCardStatementLineVariables`:
const adminSeedCreditCardStatementLineVars: AdminSeedCreditCardStatementLineVariables = {
  id: ..., 
  statementId: ..., 
  sequence: ..., 
  transactionDate: ..., 
  postedDate: ..., // optional
  merchantRaw: ..., 
  merchantNormalized: ..., 
  amountCents: ..., 
  externalReference: ..., // optional
  status: ..., 
  rawData: ..., // optional
};

// Call the `adminSeedCreditCardStatementLineRef()` function to get a reference to the mutation.
const ref = adminSeedCreditCardStatementLineRef(adminSeedCreditCardStatementLineVars);
// Variables can be defined inline as well.
const ref = adminSeedCreditCardStatementLineRef({ id: ..., statementId: ..., sequence: ..., transactionDate: ..., postedDate: ..., merchantRaw: ..., merchantNormalized: ..., amountCents: ..., externalReference: ..., status: ..., rawData: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedCreditCardStatementLineRef(dataConnect, adminSeedCreditCardStatementLineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCardStatementLine_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLine_upsert);
});
```

## AdminSeedSkuReference
You can execute the `AdminSeedSkuReference` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedSkuReference(vars: AdminSeedSkuReferenceVariables): MutationPromise<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;

interface AdminSeedSkuReferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedSkuReferenceVariables): MutationRef<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;
}
export const adminSeedSkuReferenceRef: AdminSeedSkuReferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedSkuReference(dc: DataConnect, vars: AdminSeedSkuReferenceVariables): MutationPromise<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;

interface AdminSeedSkuReferenceRef {
  ...
  (dc: DataConnect, vars: AdminSeedSkuReferenceVariables): MutationRef<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;
}
export const adminSeedSkuReferenceRef: AdminSeedSkuReferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedSkuReferenceRef:
```typescript
const name = adminSeedSkuReferenceRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedSkuReference` mutation requires an argument of type `AdminSeedSkuReferenceVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedSkuReferenceVariables {
  merchant: string;
  sku: string;
  productLabel?: string | null;
  categoryLabel?: string | null;
  accountId: string;
  verificationStatus: string;
}
```
### Return Type
Recall that executing the `AdminSeedSkuReference` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedSkuReferenceData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedSkuReferenceData {
  skuReference_upsert: SkuReference_Key;
}
```
### Using `AdminSeedSkuReference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedSkuReference, AdminSeedSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedSkuReference` mutation requires an argument of type `AdminSeedSkuReferenceVariables`:
const adminSeedSkuReferenceVars: AdminSeedSkuReferenceVariables = {
  merchant: ..., 
  sku: ..., 
  productLabel: ..., // optional
  categoryLabel: ..., // optional
  accountId: ..., 
  verificationStatus: ..., 
};

// Call the `adminSeedSkuReference()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedSkuReference(adminSeedSkuReferenceVars);
// Variables can be defined inline as well.
const { data } = await adminSeedSkuReference({ merchant: ..., sku: ..., productLabel: ..., categoryLabel: ..., accountId: ..., verificationStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedSkuReference(dataConnect, adminSeedSkuReferenceVars);

console.log(data.skuReference_upsert);

// Or, you can use the `Promise` API.
adminSeedSkuReference(adminSeedSkuReferenceVars).then((response) => {
  const data = response.data;
  console.log(data.skuReference_upsert);
});
```

### Using `AdminSeedSkuReference`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedSkuReferenceRef, AdminSeedSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedSkuReference` mutation requires an argument of type `AdminSeedSkuReferenceVariables`:
const adminSeedSkuReferenceVars: AdminSeedSkuReferenceVariables = {
  merchant: ..., 
  sku: ..., 
  productLabel: ..., // optional
  categoryLabel: ..., // optional
  accountId: ..., 
  verificationStatus: ..., 
};

// Call the `adminSeedSkuReferenceRef()` function to get a reference to the mutation.
const ref = adminSeedSkuReferenceRef(adminSeedSkuReferenceVars);
// Variables can be defined inline as well.
const ref = adminSeedSkuReferenceRef({ merchant: ..., sku: ..., productLabel: ..., categoryLabel: ..., accountId: ..., verificationStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedSkuReferenceRef(dataConnect, adminSeedSkuReferenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.skuReference_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.skuReference_upsert);
});
```

## AdminSeedExpenseTransaction
You can execute the `AdminSeedExpenseTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedExpenseTransaction(vars: AdminSeedExpenseTransactionVariables): MutationPromise<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;

interface AdminSeedExpenseTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedExpenseTransactionVariables): MutationRef<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;
}
export const adminSeedExpenseTransactionRef: AdminSeedExpenseTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedExpenseTransaction(dc: DataConnect, vars: AdminSeedExpenseTransactionVariables): MutationPromise<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;

interface AdminSeedExpenseTransactionRef {
  ...
  (dc: DataConnect, vars: AdminSeedExpenseTransactionVariables): MutationRef<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;
}
export const adminSeedExpenseTransactionRef: AdminSeedExpenseTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedExpenseTransactionRef:
```typescript
const name = adminSeedExpenseTransactionRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedExpenseTransaction` mutation requires an argument of type `AdminSeedExpenseTransactionVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedExpenseTransactionVariables {
  id: string;
  transactionDate: DateString;
  vendor: string;
  cardId: string;
  statementPeriodId: string;
  projectId: string;
  accountId: string;
  categoryLabel?: string | null;
  sku?: string | null;
  amountBeforeTaxCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  status: string;
  processingStatus?: string | null;
  accountingStatus?: string | null;
  reconciliationStatus: string;
  classificationSource?: string | null;
  classificationConfidence?: number | null;
  classificationNote?: string | null;
  invoiceNumber?: string | null;
  issue?: string | null;
}
```
### Return Type
Recall that executing the `AdminSeedExpenseTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedExpenseTransactionData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedExpenseTransactionData {
  expenseTransaction_upsert: ExpenseTransaction_Key;
}
```
### Using `AdminSeedExpenseTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedExpenseTransaction, AdminSeedExpenseTransactionVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedExpenseTransaction` mutation requires an argument of type `AdminSeedExpenseTransactionVariables`:
const adminSeedExpenseTransactionVars: AdminSeedExpenseTransactionVariables = {
  id: ..., 
  transactionDate: ..., 
  vendor: ..., 
  cardId: ..., 
  statementPeriodId: ..., 
  projectId: ..., 
  accountId: ..., 
  categoryLabel: ..., // optional
  sku: ..., // optional
  amountBeforeTaxCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  currency: ..., 
  status: ..., 
  processingStatus: ..., // optional
  accountingStatus: ..., // optional
  reconciliationStatus: ..., 
  classificationSource: ..., // optional
  classificationConfidence: ..., // optional
  classificationNote: ..., // optional
  invoiceNumber: ..., // optional
  issue: ..., // optional
};

// Call the `adminSeedExpenseTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedExpenseTransaction(adminSeedExpenseTransactionVars);
// Variables can be defined inline as well.
const { data } = await adminSeedExpenseTransaction({ id: ..., transactionDate: ..., vendor: ..., cardId: ..., statementPeriodId: ..., projectId: ..., accountId: ..., categoryLabel: ..., sku: ..., amountBeforeTaxCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., status: ..., processingStatus: ..., accountingStatus: ..., reconciliationStatus: ..., classificationSource: ..., classificationConfidence: ..., classificationNote: ..., invoiceNumber: ..., issue: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedExpenseTransaction(dataConnect, adminSeedExpenseTransactionVars);

console.log(data.expenseTransaction_upsert);

// Or, you can use the `Promise` API.
adminSeedExpenseTransaction(adminSeedExpenseTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.expenseTransaction_upsert);
});
```

### Using `AdminSeedExpenseTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedExpenseTransactionRef, AdminSeedExpenseTransactionVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedExpenseTransaction` mutation requires an argument of type `AdminSeedExpenseTransactionVariables`:
const adminSeedExpenseTransactionVars: AdminSeedExpenseTransactionVariables = {
  id: ..., 
  transactionDate: ..., 
  vendor: ..., 
  cardId: ..., 
  statementPeriodId: ..., 
  projectId: ..., 
  accountId: ..., 
  categoryLabel: ..., // optional
  sku: ..., // optional
  amountBeforeTaxCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  currency: ..., 
  status: ..., 
  processingStatus: ..., // optional
  accountingStatus: ..., // optional
  reconciliationStatus: ..., 
  classificationSource: ..., // optional
  classificationConfidence: ..., // optional
  classificationNote: ..., // optional
  invoiceNumber: ..., // optional
  issue: ..., // optional
};

// Call the `adminSeedExpenseTransactionRef()` function to get a reference to the mutation.
const ref = adminSeedExpenseTransactionRef(adminSeedExpenseTransactionVars);
// Variables can be defined inline as well.
const ref = adminSeedExpenseTransactionRef({ id: ..., transactionDate: ..., vendor: ..., cardId: ..., statementPeriodId: ..., projectId: ..., accountId: ..., categoryLabel: ..., sku: ..., amountBeforeTaxCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., status: ..., processingStatus: ..., accountingStatus: ..., reconciliationStatus: ..., classificationSource: ..., classificationConfidence: ..., classificationNote: ..., invoiceNumber: ..., issue: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedExpenseTransactionRef(dataConnect, adminSeedExpenseTransactionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expenseTransaction_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseTransaction_upsert);
});
```

## AdminSeedInvoice
You can execute the `AdminSeedInvoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedInvoice(vars: AdminSeedInvoiceVariables): MutationPromise<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;

interface AdminSeedInvoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedInvoiceVariables): MutationRef<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;
}
export const adminSeedInvoiceRef: AdminSeedInvoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedInvoice(dc: DataConnect, vars: AdminSeedInvoiceVariables): MutationPromise<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;

interface AdminSeedInvoiceRef {
  ...
  (dc: DataConnect, vars: AdminSeedInvoiceVariables): MutationRef<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;
}
export const adminSeedInvoiceRef: AdminSeedInvoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedInvoiceRef:
```typescript
const name = adminSeedInvoiceRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedInvoice` mutation requires an argument of type `AdminSeedInvoiceVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedInvoiceVariables {
  id: string;
  transactionId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate?: DateString | null;
  subtotalCents?: Int64String | null;
  tpsCents?: Int64String | null;
  tvqCents?: Int64String | null;
  totalCents?: Int64String | null;
  processingStatus?: string | null;
  accountingStatus?: string | null;
  reviewStatus: string;
  storageFolder?: string | null;
  createdById: string;
}
```
### Return Type
Recall that executing the `AdminSeedInvoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedInvoiceData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedInvoiceData {
  invoice_upsert: Invoice_Key;
}
```
### Using `AdminSeedInvoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedInvoice, AdminSeedInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedInvoice` mutation requires an argument of type `AdminSeedInvoiceVariables`:
const adminSeedInvoiceVars: AdminSeedInvoiceVariables = {
  id: ..., 
  transactionId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., // optional
  subtotalCents: ..., // optional
  tpsCents: ..., // optional
  tvqCents: ..., // optional
  totalCents: ..., // optional
  processingStatus: ..., // optional
  accountingStatus: ..., // optional
  reviewStatus: ..., 
  storageFolder: ..., // optional
  createdById: ..., 
};

// Call the `adminSeedInvoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedInvoice(adminSeedInvoiceVars);
// Variables can be defined inline as well.
const { data } = await adminSeedInvoice({ id: ..., transactionId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., processingStatus: ..., accountingStatus: ..., reviewStatus: ..., storageFolder: ..., createdById: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedInvoice(dataConnect, adminSeedInvoiceVars);

console.log(data.invoice_upsert);

// Or, you can use the `Promise` API.
adminSeedInvoice(adminSeedInvoiceVars).then((response) => {
  const data = response.data;
  console.log(data.invoice_upsert);
});
```

### Using `AdminSeedInvoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedInvoiceRef, AdminSeedInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedInvoice` mutation requires an argument of type `AdminSeedInvoiceVariables`:
const adminSeedInvoiceVars: AdminSeedInvoiceVariables = {
  id: ..., 
  transactionId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., // optional
  subtotalCents: ..., // optional
  tpsCents: ..., // optional
  tvqCents: ..., // optional
  totalCents: ..., // optional
  processingStatus: ..., // optional
  accountingStatus: ..., // optional
  reviewStatus: ..., 
  storageFolder: ..., // optional
  createdById: ..., 
};

// Call the `adminSeedInvoiceRef()` function to get a reference to the mutation.
const ref = adminSeedInvoiceRef(adminSeedInvoiceVars);
// Variables can be defined inline as well.
const ref = adminSeedInvoiceRef({ id: ..., transactionId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., processingStatus: ..., accountingStatus: ..., reviewStatus: ..., storageFolder: ..., createdById: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedInvoiceRef(dataConnect, adminSeedInvoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoice_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoice_upsert);
});
```

## AdminSeedInvoicePhoto
You can execute the `AdminSeedInvoicePhoto` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedInvoicePhoto(vars: AdminSeedInvoicePhotoVariables): MutationPromise<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;

interface AdminSeedInvoicePhotoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedInvoicePhotoVariables): MutationRef<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;
}
export const adminSeedInvoicePhotoRef: AdminSeedInvoicePhotoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedInvoicePhoto(dc: DataConnect, vars: AdminSeedInvoicePhotoVariables): MutationPromise<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;

interface AdminSeedInvoicePhotoRef {
  ...
  (dc: DataConnect, vars: AdminSeedInvoicePhotoVariables): MutationRef<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;
}
export const adminSeedInvoicePhotoRef: AdminSeedInvoicePhotoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedInvoicePhotoRef:
```typescript
const name = adminSeedInvoicePhotoRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedInvoicePhoto` mutation requires an argument of type `AdminSeedInvoicePhotoVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedInvoicePhotoVariables {
  id: string;
  invoiceId: string;
  storagePath: string;
  contentType: string;
  sequence: number;
}
```
### Return Type
Recall that executing the `AdminSeedInvoicePhoto` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedInvoicePhotoData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedInvoicePhotoData {
  invoicePhoto_upsert: InvoicePhoto_Key;
}
```
### Using `AdminSeedInvoicePhoto`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedInvoicePhoto, AdminSeedInvoicePhotoVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedInvoicePhoto` mutation requires an argument of type `AdminSeedInvoicePhotoVariables`:
const adminSeedInvoicePhotoVars: AdminSeedInvoicePhotoVariables = {
  id: ..., 
  invoiceId: ..., 
  storagePath: ..., 
  contentType: ..., 
  sequence: ..., 
};

// Call the `adminSeedInvoicePhoto()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedInvoicePhoto(adminSeedInvoicePhotoVars);
// Variables can be defined inline as well.
const { data } = await adminSeedInvoicePhoto({ id: ..., invoiceId: ..., storagePath: ..., contentType: ..., sequence: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedInvoicePhoto(dataConnect, adminSeedInvoicePhotoVars);

console.log(data.invoicePhoto_upsert);

// Or, you can use the `Promise` API.
adminSeedInvoicePhoto(adminSeedInvoicePhotoVars).then((response) => {
  const data = response.data;
  console.log(data.invoicePhoto_upsert);
});
```

### Using `AdminSeedInvoicePhoto`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedInvoicePhotoRef, AdminSeedInvoicePhotoVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedInvoicePhoto` mutation requires an argument of type `AdminSeedInvoicePhotoVariables`:
const adminSeedInvoicePhotoVars: AdminSeedInvoicePhotoVariables = {
  id: ..., 
  invoiceId: ..., 
  storagePath: ..., 
  contentType: ..., 
  sequence: ..., 
};

// Call the `adminSeedInvoicePhotoRef()` function to get a reference to the mutation.
const ref = adminSeedInvoicePhotoRef(adminSeedInvoicePhotoVars);
// Variables can be defined inline as well.
const ref = adminSeedInvoicePhotoRef({ id: ..., invoiceId: ..., storagePath: ..., contentType: ..., sequence: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedInvoicePhotoRef(dataConnect, adminSeedInvoicePhotoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoicePhoto_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoicePhoto_upsert);
});
```

## AdminDeleteInvoicePhoto
You can execute the `AdminDeleteInvoicePhoto` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteInvoicePhoto(vars: AdminDeleteInvoicePhotoVariables): MutationPromise<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;

interface AdminDeleteInvoicePhotoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteInvoicePhotoVariables): MutationRef<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;
}
export const adminDeleteInvoicePhotoRef: AdminDeleteInvoicePhotoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteInvoicePhoto(dc: DataConnect, vars: AdminDeleteInvoicePhotoVariables): MutationPromise<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;

interface AdminDeleteInvoicePhotoRef {
  ...
  (dc: DataConnect, vars: AdminDeleteInvoicePhotoVariables): MutationRef<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;
}
export const adminDeleteInvoicePhotoRef: AdminDeleteInvoicePhotoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteInvoicePhotoRef:
```typescript
const name = adminDeleteInvoicePhotoRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteInvoicePhoto` mutation requires an argument of type `AdminDeleteInvoicePhotoVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteInvoicePhotoVariables {
  id: string;
}
```
### Return Type
Recall that executing the `AdminDeleteInvoicePhoto` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteInvoicePhotoData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteInvoicePhotoData {
  invoicePhoto_delete?: InvoicePhoto_Key | null;
}
```
### Using `AdminDeleteInvoicePhoto`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteInvoicePhoto, AdminDeleteInvoicePhotoVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteInvoicePhoto` mutation requires an argument of type `AdminDeleteInvoicePhotoVariables`:
const adminDeleteInvoicePhotoVars: AdminDeleteInvoicePhotoVariables = {
  id: ..., 
};

// Call the `adminDeleteInvoicePhoto()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteInvoicePhoto(adminDeleteInvoicePhotoVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteInvoicePhoto({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteInvoicePhoto(dataConnect, adminDeleteInvoicePhotoVars);

console.log(data.invoicePhoto_delete);

// Or, you can use the `Promise` API.
adminDeleteInvoicePhoto(adminDeleteInvoicePhotoVars).then((response) => {
  const data = response.data;
  console.log(data.invoicePhoto_delete);
});
```

### Using `AdminDeleteInvoicePhoto`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteInvoicePhotoRef, AdminDeleteInvoicePhotoVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteInvoicePhoto` mutation requires an argument of type `AdminDeleteInvoicePhotoVariables`:
const adminDeleteInvoicePhotoVars: AdminDeleteInvoicePhotoVariables = {
  id: ..., 
};

// Call the `adminDeleteInvoicePhotoRef()` function to get a reference to the mutation.
const ref = adminDeleteInvoicePhotoRef(adminDeleteInvoicePhotoVars);
// Variables can be defined inline as well.
const ref = adminDeleteInvoicePhotoRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteInvoicePhotoRef(dataConnect, adminDeleteInvoicePhotoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoicePhoto_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoicePhoto_delete);
});
```

## AdminDeleteInvoice
You can execute the `AdminDeleteInvoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteInvoice(vars: AdminDeleteInvoiceVariables): MutationPromise<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;

interface AdminDeleteInvoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteInvoiceVariables): MutationRef<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;
}
export const adminDeleteInvoiceRef: AdminDeleteInvoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteInvoice(dc: DataConnect, vars: AdminDeleteInvoiceVariables): MutationPromise<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;

interface AdminDeleteInvoiceRef {
  ...
  (dc: DataConnect, vars: AdminDeleteInvoiceVariables): MutationRef<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;
}
export const adminDeleteInvoiceRef: AdminDeleteInvoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteInvoiceRef:
```typescript
const name = adminDeleteInvoiceRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteInvoice` mutation requires an argument of type `AdminDeleteInvoiceVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteInvoiceVariables {
  id: string;
}
```
### Return Type
Recall that executing the `AdminDeleteInvoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteInvoiceData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteInvoiceData {
  invoice_delete?: Invoice_Key | null;
}
```
### Using `AdminDeleteInvoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteInvoice, AdminDeleteInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteInvoice` mutation requires an argument of type `AdminDeleteInvoiceVariables`:
const adminDeleteInvoiceVars: AdminDeleteInvoiceVariables = {
  id: ..., 
};

// Call the `adminDeleteInvoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteInvoice(adminDeleteInvoiceVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteInvoice({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteInvoice(dataConnect, adminDeleteInvoiceVars);

console.log(data.invoice_delete);

// Or, you can use the `Promise` API.
adminDeleteInvoice(adminDeleteInvoiceVars).then((response) => {
  const data = response.data;
  console.log(data.invoice_delete);
});
```

### Using `AdminDeleteInvoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteInvoiceRef, AdminDeleteInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteInvoice` mutation requires an argument of type `AdminDeleteInvoiceVariables`:
const adminDeleteInvoiceVars: AdminDeleteInvoiceVariables = {
  id: ..., 
};

// Call the `adminDeleteInvoiceRef()` function to get a reference to the mutation.
const ref = adminDeleteInvoiceRef(adminDeleteInvoiceVars);
// Variables can be defined inline as well.
const ref = adminDeleteInvoiceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteInvoiceRef(dataConnect, adminDeleteInvoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoice_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoice_delete);
});
```

## AdminDeleteExpenseTransaction
You can execute the `AdminDeleteExpenseTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteExpenseTransaction(vars: AdminDeleteExpenseTransactionVariables): MutationPromise<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;

interface AdminDeleteExpenseTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteExpenseTransactionVariables): MutationRef<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;
}
export const adminDeleteExpenseTransactionRef: AdminDeleteExpenseTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteExpenseTransaction(dc: DataConnect, vars: AdminDeleteExpenseTransactionVariables): MutationPromise<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;

interface AdminDeleteExpenseTransactionRef {
  ...
  (dc: DataConnect, vars: AdminDeleteExpenseTransactionVariables): MutationRef<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;
}
export const adminDeleteExpenseTransactionRef: AdminDeleteExpenseTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteExpenseTransactionRef:
```typescript
const name = adminDeleteExpenseTransactionRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteExpenseTransaction` mutation requires an argument of type `AdminDeleteExpenseTransactionVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteExpenseTransactionVariables {
  id: string;
}
```
### Return Type
Recall that executing the `AdminDeleteExpenseTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteExpenseTransactionData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteExpenseTransactionData {
  expenseTransaction_delete?: ExpenseTransaction_Key | null;
}
```
### Using `AdminDeleteExpenseTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteExpenseTransaction, AdminDeleteExpenseTransactionVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteExpenseTransaction` mutation requires an argument of type `AdminDeleteExpenseTransactionVariables`:
const adminDeleteExpenseTransactionVars: AdminDeleteExpenseTransactionVariables = {
  id: ..., 
};

// Call the `adminDeleteExpenseTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteExpenseTransaction(adminDeleteExpenseTransactionVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteExpenseTransaction({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteExpenseTransaction(dataConnect, adminDeleteExpenseTransactionVars);

console.log(data.expenseTransaction_delete);

// Or, you can use the `Promise` API.
adminDeleteExpenseTransaction(adminDeleteExpenseTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.expenseTransaction_delete);
});
```

### Using `AdminDeleteExpenseTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteExpenseTransactionRef, AdminDeleteExpenseTransactionVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteExpenseTransaction` mutation requires an argument of type `AdminDeleteExpenseTransactionVariables`:
const adminDeleteExpenseTransactionVars: AdminDeleteExpenseTransactionVariables = {
  id: ..., 
};

// Call the `adminDeleteExpenseTransactionRef()` function to get a reference to the mutation.
const ref = adminDeleteExpenseTransactionRef(adminDeleteExpenseTransactionVars);
// Variables can be defined inline as well.
const ref = adminDeleteExpenseTransactionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteExpenseTransactionRef(dataConnect, adminDeleteExpenseTransactionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expenseTransaction_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseTransaction_delete);
});
```

## AdminDeleteInvoiceIntake
You can execute the `AdminDeleteInvoiceIntake` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteInvoiceIntake(vars: AdminDeleteInvoiceIntakeVariables): MutationPromise<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;

interface AdminDeleteInvoiceIntakeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteInvoiceIntakeVariables): MutationRef<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;
}
export const adminDeleteInvoiceIntakeRef: AdminDeleteInvoiceIntakeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteInvoiceIntake(dc: DataConnect, vars: AdminDeleteInvoiceIntakeVariables): MutationPromise<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;

interface AdminDeleteInvoiceIntakeRef {
  ...
  (dc: DataConnect, vars: AdminDeleteInvoiceIntakeVariables): MutationRef<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;
}
export const adminDeleteInvoiceIntakeRef: AdminDeleteInvoiceIntakeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteInvoiceIntakeRef:
```typescript
const name = adminDeleteInvoiceIntakeRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteInvoiceIntake` mutation requires an argument of type `AdminDeleteInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteInvoiceIntakeVariables {
  receiptId: string;
}
```
### Return Type
Recall that executing the `AdminDeleteInvoiceIntake` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteInvoiceIntakeData {
  invoiceIntake_delete?: InvoiceIntake_Key | null;
}
```
### Using `AdminDeleteInvoiceIntake`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteInvoiceIntake, AdminDeleteInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteInvoiceIntake` mutation requires an argument of type `AdminDeleteInvoiceIntakeVariables`:
const adminDeleteInvoiceIntakeVars: AdminDeleteInvoiceIntakeVariables = {
  receiptId: ..., 
};

// Call the `adminDeleteInvoiceIntake()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteInvoiceIntake(adminDeleteInvoiceIntakeVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteInvoiceIntake({ receiptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteInvoiceIntake(dataConnect, adminDeleteInvoiceIntakeVars);

console.log(data.invoiceIntake_delete);

// Or, you can use the `Promise` API.
adminDeleteInvoiceIntake(adminDeleteInvoiceIntakeVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_delete);
});
```

### Using `AdminDeleteInvoiceIntake`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteInvoiceIntakeRef, AdminDeleteInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteInvoiceIntake` mutation requires an argument of type `AdminDeleteInvoiceIntakeVariables`:
const adminDeleteInvoiceIntakeVars: AdminDeleteInvoiceIntakeVariables = {
  receiptId: ..., 
};

// Call the `adminDeleteInvoiceIntakeRef()` function to get a reference to the mutation.
const ref = adminDeleteInvoiceIntakeRef(adminDeleteInvoiceIntakeVars);
// Variables can be defined inline as well.
const ref = adminDeleteInvoiceIntakeRef({ receiptId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteInvoiceIntakeRef(dataConnect, adminDeleteInvoiceIntakeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_delete);
});
```

## AdminDeleteCreditCard
You can execute the `AdminDeleteCreditCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteCreditCard(vars: AdminDeleteCreditCardVariables): MutationPromise<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;

interface AdminDeleteCreditCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteCreditCardVariables): MutationRef<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;
}
export const adminDeleteCreditCardRef: AdminDeleteCreditCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteCreditCard(dc: DataConnect, vars: AdminDeleteCreditCardVariables): MutationPromise<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;

interface AdminDeleteCreditCardRef {
  ...
  (dc: DataConnect, vars: AdminDeleteCreditCardVariables): MutationRef<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;
}
export const adminDeleteCreditCardRef: AdminDeleteCreditCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteCreditCardRef:
```typescript
const name = adminDeleteCreditCardRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteCreditCard` mutation requires an argument of type `AdminDeleteCreditCardVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteCreditCardVariables {
  id: string;
}
```
### Return Type
Recall that executing the `AdminDeleteCreditCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteCreditCardData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteCreditCardData {
  creditCard_delete?: CreditCard_Key | null;
}
```
### Using `AdminDeleteCreditCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteCreditCard, AdminDeleteCreditCardVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteCreditCard` mutation requires an argument of type `AdminDeleteCreditCardVariables`:
const adminDeleteCreditCardVars: AdminDeleteCreditCardVariables = {
  id: ..., 
};

// Call the `adminDeleteCreditCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteCreditCard(adminDeleteCreditCardVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteCreditCard({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteCreditCard(dataConnect, adminDeleteCreditCardVars);

console.log(data.creditCard_delete);

// Or, you can use the `Promise` API.
adminDeleteCreditCard(adminDeleteCreditCardVars).then((response) => {
  const data = response.data;
  console.log(data.creditCard_delete);
});
```

### Using `AdminDeleteCreditCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteCreditCardRef, AdminDeleteCreditCardVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteCreditCard` mutation requires an argument of type `AdminDeleteCreditCardVariables`:
const adminDeleteCreditCardVars: AdminDeleteCreditCardVariables = {
  id: ..., 
};

// Call the `adminDeleteCreditCardRef()` function to get a reference to the mutation.
const ref = adminDeleteCreditCardRef(adminDeleteCreditCardVars);
// Variables can be defined inline as well.
const ref = adminDeleteCreditCardRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteCreditCardRef(dataConnect, adminDeleteCreditCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCard_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCard_delete);
});
```

## AdminDeleteSkuReference
You can execute the `AdminDeleteSkuReference` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteSkuReference(vars: AdminDeleteSkuReferenceVariables): MutationPromise<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;

interface AdminDeleteSkuReferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteSkuReferenceVariables): MutationRef<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;
}
export const adminDeleteSkuReferenceRef: AdminDeleteSkuReferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteSkuReference(dc: DataConnect, vars: AdminDeleteSkuReferenceVariables): MutationPromise<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;

interface AdminDeleteSkuReferenceRef {
  ...
  (dc: DataConnect, vars: AdminDeleteSkuReferenceVariables): MutationRef<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;
}
export const adminDeleteSkuReferenceRef: AdminDeleteSkuReferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteSkuReferenceRef:
```typescript
const name = adminDeleteSkuReferenceRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteSkuReference` mutation requires an argument of type `AdminDeleteSkuReferenceVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteSkuReferenceVariables {
  merchant: string;
  sku: string;
}
```
### Return Type
Recall that executing the `AdminDeleteSkuReference` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteSkuReferenceData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteSkuReferenceData {
  skuReference_delete?: SkuReference_Key | null;
}
```
### Using `AdminDeleteSkuReference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteSkuReference, AdminDeleteSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteSkuReference` mutation requires an argument of type `AdminDeleteSkuReferenceVariables`:
const adminDeleteSkuReferenceVars: AdminDeleteSkuReferenceVariables = {
  merchant: ..., 
  sku: ..., 
};

// Call the `adminDeleteSkuReference()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteSkuReference(adminDeleteSkuReferenceVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteSkuReference({ merchant: ..., sku: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteSkuReference(dataConnect, adminDeleteSkuReferenceVars);

console.log(data.skuReference_delete);

// Or, you can use the `Promise` API.
adminDeleteSkuReference(adminDeleteSkuReferenceVars).then((response) => {
  const data = response.data;
  console.log(data.skuReference_delete);
});
```

### Using `AdminDeleteSkuReference`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteSkuReferenceRef, AdminDeleteSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteSkuReference` mutation requires an argument of type `AdminDeleteSkuReferenceVariables`:
const adminDeleteSkuReferenceVars: AdminDeleteSkuReferenceVariables = {
  merchant: ..., 
  sku: ..., 
};

// Call the `adminDeleteSkuReferenceRef()` function to get a reference to the mutation.
const ref = adminDeleteSkuReferenceRef(adminDeleteSkuReferenceVars);
// Variables can be defined inline as well.
const ref = adminDeleteSkuReferenceRef({ merchant: ..., sku: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteSkuReferenceRef(dataConnect, adminDeleteSkuReferenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.skuReference_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.skuReference_delete);
});
```

## AdminDeleteProject
You can execute the `AdminDeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteProject(vars: AdminDeleteProjectVariables): MutationPromise<AdminDeleteProjectData, AdminDeleteProjectVariables>;

interface AdminDeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteProjectVariables): MutationRef<AdminDeleteProjectData, AdminDeleteProjectVariables>;
}
export const adminDeleteProjectRef: AdminDeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteProject(dc: DataConnect, vars: AdminDeleteProjectVariables): MutationPromise<AdminDeleteProjectData, AdminDeleteProjectVariables>;

interface AdminDeleteProjectRef {
  ...
  (dc: DataConnect, vars: AdminDeleteProjectVariables): MutationRef<AdminDeleteProjectData, AdminDeleteProjectVariables>;
}
export const adminDeleteProjectRef: AdminDeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteProjectRef:
```typescript
const name = adminDeleteProjectRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteProject` mutation requires an argument of type `AdminDeleteProjectVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteProjectVariables {
  id: string;
}
```
### Return Type
Recall that executing the `AdminDeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteProjectData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteProjectData {
  project_delete?: Project_Key | null;
}
```
### Using `AdminDeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteProject, AdminDeleteProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteProject` mutation requires an argument of type `AdminDeleteProjectVariables`:
const adminDeleteProjectVars: AdminDeleteProjectVariables = {
  id: ..., 
};

// Call the `adminDeleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteProject(adminDeleteProjectVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteProject(dataConnect, adminDeleteProjectVars);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
adminDeleteProject(adminDeleteProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

### Using `AdminDeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteProjectRef, AdminDeleteProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteProject` mutation requires an argument of type `AdminDeleteProjectVariables`:
const adminDeleteProjectVars: AdminDeleteProjectVariables = {
  id: ..., 
};

// Call the `adminDeleteProjectRef()` function to get a reference to the mutation.
const ref = adminDeleteProjectRef(adminDeleteProjectVars);
// Variables can be defined inline as well.
const ref = adminDeleteProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteProjectRef(dataConnect, adminDeleteProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

## AdminDeleteExpenseAccount
You can execute the `AdminDeleteExpenseAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteExpenseAccount(vars: AdminDeleteExpenseAccountVariables): MutationPromise<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;

interface AdminDeleteExpenseAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteExpenseAccountVariables): MutationRef<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;
}
export const adminDeleteExpenseAccountRef: AdminDeleteExpenseAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteExpenseAccount(dc: DataConnect, vars: AdminDeleteExpenseAccountVariables): MutationPromise<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;

interface AdminDeleteExpenseAccountRef {
  ...
  (dc: DataConnect, vars: AdminDeleteExpenseAccountVariables): MutationRef<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;
}
export const adminDeleteExpenseAccountRef: AdminDeleteExpenseAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteExpenseAccountRef:
```typescript
const name = adminDeleteExpenseAccountRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteExpenseAccount` mutation requires an argument of type `AdminDeleteExpenseAccountVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteExpenseAccountVariables {
  id: string;
}
```
### Return Type
Recall that executing the `AdminDeleteExpenseAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteExpenseAccountData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteExpenseAccountData {
  expenseAccount_delete?: ExpenseAccount_Key | null;
}
```
### Using `AdminDeleteExpenseAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteExpenseAccount, AdminDeleteExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteExpenseAccount` mutation requires an argument of type `AdminDeleteExpenseAccountVariables`:
const adminDeleteExpenseAccountVars: AdminDeleteExpenseAccountVariables = {
  id: ..., 
};

// Call the `adminDeleteExpenseAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteExpenseAccount(adminDeleteExpenseAccountVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteExpenseAccount({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteExpenseAccount(dataConnect, adminDeleteExpenseAccountVars);

console.log(data.expenseAccount_delete);

// Or, you can use the `Promise` API.
adminDeleteExpenseAccount(adminDeleteExpenseAccountVars).then((response) => {
  const data = response.data;
  console.log(data.expenseAccount_delete);
});
```

### Using `AdminDeleteExpenseAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteExpenseAccountRef, AdminDeleteExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteExpenseAccount` mutation requires an argument of type `AdminDeleteExpenseAccountVariables`:
const adminDeleteExpenseAccountVars: AdminDeleteExpenseAccountVariables = {
  id: ..., 
};

// Call the `adminDeleteExpenseAccountRef()` function to get a reference to the mutation.
const ref = adminDeleteExpenseAccountRef(adminDeleteExpenseAccountVars);
// Variables can be defined inline as well.
const ref = adminDeleteExpenseAccountRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteExpenseAccountRef(dataConnect, adminDeleteExpenseAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expenseAccount_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseAccount_delete);
});
```

## AdminSeedCreditCardHolderHistory
You can execute the `AdminSeedCreditCardHolderHistory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedCreditCardHolderHistory(vars: AdminSeedCreditCardHolderHistoryVariables): MutationPromise<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;

interface AdminSeedCreditCardHolderHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedCreditCardHolderHistoryVariables): MutationRef<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;
}
export const adminSeedCreditCardHolderHistoryRef: AdminSeedCreditCardHolderHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedCreditCardHolderHistory(dc: DataConnect, vars: AdminSeedCreditCardHolderHistoryVariables): MutationPromise<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;

interface AdminSeedCreditCardHolderHistoryRef {
  ...
  (dc: DataConnect, vars: AdminSeedCreditCardHolderHistoryVariables): MutationRef<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;
}
export const adminSeedCreditCardHolderHistoryRef: AdminSeedCreditCardHolderHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedCreditCardHolderHistoryRef:
```typescript
const name = adminSeedCreditCardHolderHistoryRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedCreditCardHolderHistory` mutation requires an argument of type `AdminSeedCreditCardHolderHistoryVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedCreditCardHolderHistoryVariables {
  id: string;
  cardId: string;
  holderId: string;
  validFrom: DateString;
  validTo?: DateString | null;
  isCurrent: boolean;
  status: string;
}
```
### Return Type
Recall that executing the `AdminSeedCreditCardHolderHistory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedCreditCardHolderHistoryData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedCreditCardHolderHistoryData {
  creditCardHolderHistory_upsert: CreditCardHolderHistory_Key;
}
```
### Using `AdminSeedCreditCardHolderHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedCreditCardHolderHistory, AdminSeedCreditCardHolderHistoryVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCreditCardHolderHistory` mutation requires an argument of type `AdminSeedCreditCardHolderHistoryVariables`:
const adminSeedCreditCardHolderHistoryVars: AdminSeedCreditCardHolderHistoryVariables = {
  id: ..., 
  cardId: ..., 
  holderId: ..., 
  validFrom: ..., 
  validTo: ..., // optional
  isCurrent: ..., 
  status: ..., 
};

// Call the `adminSeedCreditCardHolderHistory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedCreditCardHolderHistory(adminSeedCreditCardHolderHistoryVars);
// Variables can be defined inline as well.
const { data } = await adminSeedCreditCardHolderHistory({ id: ..., cardId: ..., holderId: ..., validFrom: ..., validTo: ..., isCurrent: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedCreditCardHolderHistory(dataConnect, adminSeedCreditCardHolderHistoryVars);

console.log(data.creditCardHolderHistory_upsert);

// Or, you can use the `Promise` API.
adminSeedCreditCardHolderHistory(adminSeedCreditCardHolderHistoryVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardHolderHistory_upsert);
});
```

### Using `AdminSeedCreditCardHolderHistory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedCreditCardHolderHistoryRef, AdminSeedCreditCardHolderHistoryVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedCreditCardHolderHistory` mutation requires an argument of type `AdminSeedCreditCardHolderHistoryVariables`:
const adminSeedCreditCardHolderHistoryVars: AdminSeedCreditCardHolderHistoryVariables = {
  id: ..., 
  cardId: ..., 
  holderId: ..., 
  validFrom: ..., 
  validTo: ..., // optional
  isCurrent: ..., 
  status: ..., 
};

// Call the `adminSeedCreditCardHolderHistoryRef()` function to get a reference to the mutation.
const ref = adminSeedCreditCardHolderHistoryRef(adminSeedCreditCardHolderHistoryVars);
// Variables can be defined inline as well.
const ref = adminSeedCreditCardHolderHistoryRef({ id: ..., cardId: ..., holderId: ..., validFrom: ..., validTo: ..., isCurrent: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedCreditCardHolderHistoryRef(dataConnect, adminSeedCreditCardHolderHistoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCardHolderHistory_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardHolderHistory_upsert);
});
```

## AdminSeedMerchantAlias
You can execute the `AdminSeedMerchantAlias` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminSeedMerchantAlias(vars: AdminSeedMerchantAliasVariables): MutationPromise<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;

interface AdminSeedMerchantAliasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSeedMerchantAliasVariables): MutationRef<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;
}
export const adminSeedMerchantAliasRef: AdminSeedMerchantAliasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSeedMerchantAlias(dc: DataConnect, vars: AdminSeedMerchantAliasVariables): MutationPromise<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;

interface AdminSeedMerchantAliasRef {
  ...
  (dc: DataConnect, vars: AdminSeedMerchantAliasVariables): MutationRef<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;
}
export const adminSeedMerchantAliasRef: AdminSeedMerchantAliasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSeedMerchantAliasRef:
```typescript
const name = adminSeedMerchantAliasRef.operationName;
console.log(name);
```

### Variables
The `AdminSeedMerchantAlias` mutation requires an argument of type `AdminSeedMerchantAliasVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSeedMerchantAliasVariables {
  id: string;
  merchantRawKey: string;
  merchantNormalized: string;
  merchantCanonical?: string | null;
  active: boolean;
  status: string;
  source: string;
  confidence?: number | null;
  method?: string | null;
}
```
### Return Type
Recall that executing the `AdminSeedMerchantAlias` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSeedMerchantAliasData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSeedMerchantAliasData {
  merchantAlias_upsert: MerchantAlias_Key;
}
```
### Using `AdminSeedMerchantAlias`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSeedMerchantAlias, AdminSeedMerchantAliasVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedMerchantAlias` mutation requires an argument of type `AdminSeedMerchantAliasVariables`:
const adminSeedMerchantAliasVars: AdminSeedMerchantAliasVariables = {
  id: ..., 
  merchantRawKey: ..., 
  merchantNormalized: ..., 
  merchantCanonical: ..., // optional
  active: ..., 
  status: ..., 
  source: ..., 
  confidence: ..., // optional
  method: ..., // optional
};

// Call the `adminSeedMerchantAlias()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedMerchantAlias(adminSeedMerchantAliasVars);
// Variables can be defined inline as well.
const { data } = await adminSeedMerchantAlias({ id: ..., merchantRawKey: ..., merchantNormalized: ..., merchantCanonical: ..., active: ..., status: ..., source: ..., confidence: ..., method: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSeedMerchantAlias(dataConnect, adminSeedMerchantAliasVars);

console.log(data.merchantAlias_upsert);

// Or, you can use the `Promise` API.
adminSeedMerchantAlias(adminSeedMerchantAliasVars).then((response) => {
  const data = response.data;
  console.log(data.merchantAlias_upsert);
});
```

### Using `AdminSeedMerchantAlias`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSeedMerchantAliasRef, AdminSeedMerchantAliasVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminSeedMerchantAlias` mutation requires an argument of type `AdminSeedMerchantAliasVariables`:
const adminSeedMerchantAliasVars: AdminSeedMerchantAliasVariables = {
  id: ..., 
  merchantRawKey: ..., 
  merchantNormalized: ..., 
  merchantCanonical: ..., // optional
  active: ..., 
  status: ..., 
  source: ..., 
  confidence: ..., // optional
  method: ..., // optional
};

// Call the `adminSeedMerchantAliasRef()` function to get a reference to the mutation.
const ref = adminSeedMerchantAliasRef(adminSeedMerchantAliasVars);
// Variables can be defined inline as well.
const ref = adminSeedMerchantAliasRef({ id: ..., merchantRawKey: ..., merchantNormalized: ..., merchantCanonical: ..., active: ..., status: ..., source: ..., confidence: ..., method: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSeedMerchantAliasRef(dataConnect, adminSeedMerchantAliasVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.merchantAlias_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.merchantAlias_upsert);
});
```

## AdminDeleteCardStatementPeriod
You can execute the `AdminDeleteCardStatementPeriod` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteCardStatementPeriod(vars: AdminDeleteCardStatementPeriodVariables): MutationPromise<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;

interface AdminDeleteCardStatementPeriodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteCardStatementPeriodVariables): MutationRef<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;
}
export const adminDeleteCardStatementPeriodRef: AdminDeleteCardStatementPeriodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteCardStatementPeriod(dc: DataConnect, vars: AdminDeleteCardStatementPeriodVariables): MutationPromise<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;

interface AdminDeleteCardStatementPeriodRef {
  ...
  (dc: DataConnect, vars: AdminDeleteCardStatementPeriodVariables): MutationRef<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;
}
export const adminDeleteCardStatementPeriodRef: AdminDeleteCardStatementPeriodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteCardStatementPeriodRef:
```typescript
const name = adminDeleteCardStatementPeriodRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteCardStatementPeriod` mutation requires an argument of type `AdminDeleteCardStatementPeriodVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteCardStatementPeriodVariables {
  id: string;
}
```
### Return Type
Recall that executing the `AdminDeleteCardStatementPeriod` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteCardStatementPeriodData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteCardStatementPeriodData {
  cardStatementPeriod_delete?: CardStatementPeriod_Key | null;
}
```
### Using `AdminDeleteCardStatementPeriod`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteCardStatementPeriod, AdminDeleteCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteCardStatementPeriod` mutation requires an argument of type `AdminDeleteCardStatementPeriodVariables`:
const adminDeleteCardStatementPeriodVars: AdminDeleteCardStatementPeriodVariables = {
  id: ..., 
};

// Call the `adminDeleteCardStatementPeriod()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteCardStatementPeriod(adminDeleteCardStatementPeriodVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteCardStatementPeriod({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteCardStatementPeriod(dataConnect, adminDeleteCardStatementPeriodVars);

console.log(data.cardStatementPeriod_delete);

// Or, you can use the `Promise` API.
adminDeleteCardStatementPeriod(adminDeleteCardStatementPeriodVars).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriod_delete);
});
```

### Using `AdminDeleteCardStatementPeriod`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteCardStatementPeriodRef, AdminDeleteCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteCardStatementPeriod` mutation requires an argument of type `AdminDeleteCardStatementPeriodVariables`:
const adminDeleteCardStatementPeriodVars: AdminDeleteCardStatementPeriodVariables = {
  id: ..., 
};

// Call the `adminDeleteCardStatementPeriodRef()` function to get a reference to the mutation.
const ref = adminDeleteCardStatementPeriodRef(adminDeleteCardStatementPeriodVars);
// Variables can be defined inline as well.
const ref = adminDeleteCardStatementPeriodRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteCardStatementPeriodRef(dataConnect, adminDeleteCardStatementPeriodVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cardStatementPeriod_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriod_delete);
});
```

## AdminDeleteUserProfile
You can execute the `AdminDeleteUserProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteUserProfile(vars: AdminDeleteUserProfileVariables): MutationPromise<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;

interface AdminDeleteUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteUserProfileVariables): MutationRef<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;
}
export const adminDeleteUserProfileRef: AdminDeleteUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteUserProfile(dc: DataConnect, vars: AdminDeleteUserProfileVariables): MutationPromise<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;

interface AdminDeleteUserProfileRef {
  ...
  (dc: DataConnect, vars: AdminDeleteUserProfileVariables): MutationRef<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;
}
export const adminDeleteUserProfileRef: AdminDeleteUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteUserProfileRef:
```typescript
const name = adminDeleteUserProfileRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteUserProfile` mutation requires an argument of type `AdminDeleteUserProfileVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteUserProfileVariables {
  id: string;
}
```
### Return Type
Recall that executing the `AdminDeleteUserProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteUserProfileData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteUserProfileData {
  userProfile_delete?: UserProfile_Key | null;
}
```
### Using `AdminDeleteUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteUserProfile, AdminDeleteUserProfileVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteUserProfile` mutation requires an argument of type `AdminDeleteUserProfileVariables`:
const adminDeleteUserProfileVars: AdminDeleteUserProfileVariables = {
  id: ..., 
};

// Call the `adminDeleteUserProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteUserProfile(adminDeleteUserProfileVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteUserProfile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteUserProfile(dataConnect, adminDeleteUserProfileVars);

console.log(data.userProfile_delete);

// Or, you can use the `Promise` API.
adminDeleteUserProfile(adminDeleteUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.userProfile_delete);
});
```

### Using `AdminDeleteUserProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteUserProfileRef, AdminDeleteUserProfileVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteUserProfile` mutation requires an argument of type `AdminDeleteUserProfileVariables`:
const adminDeleteUserProfileVars: AdminDeleteUserProfileVariables = {
  id: ..., 
};

// Call the `adminDeleteUserProfileRef()` function to get a reference to the mutation.
const ref = adminDeleteUserProfileRef(adminDeleteUserProfileVars);
// Variables can be defined inline as well.
const ref = adminDeleteUserProfileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteUserProfileRef(dataConnect, adminDeleteUserProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProfile_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProfile_delete);
});
```

## AdminRecordArchivePurge
You can execute the `AdminRecordArchivePurge` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminRecordArchivePurge(vars: AdminRecordArchivePurgeVariables): MutationPromise<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;

interface AdminRecordArchivePurgeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminRecordArchivePurgeVariables): MutationRef<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;
}
export const adminRecordArchivePurgeRef: AdminRecordArchivePurgeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminRecordArchivePurge(dc: DataConnect, vars: AdminRecordArchivePurgeVariables): MutationPromise<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;

interface AdminRecordArchivePurgeRef {
  ...
  (dc: DataConnect, vars: AdminRecordArchivePurgeVariables): MutationRef<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;
}
export const adminRecordArchivePurgeRef: AdminRecordArchivePurgeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminRecordArchivePurgeRef:
```typescript
const name = adminRecordArchivePurgeRef.operationName;
console.log(name);
```

### Variables
The `AdminRecordArchivePurge` mutation requires an argument of type `AdminRecordArchivePurgeVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminRecordArchivePurgeVariables {
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  archiveId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `AdminRecordArchivePurge` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminRecordArchivePurgeData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminRecordArchivePurgeData {
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `AdminRecordArchivePurge`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminRecordArchivePurge, AdminRecordArchivePurgeVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminRecordArchivePurge` mutation requires an argument of type `AdminRecordArchivePurgeVariables`:
const adminRecordArchivePurgeVars: AdminRecordArchivePurgeVariables = {
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  archiveId: ..., 
  auditDetails: ..., 
};

// Call the `adminRecordArchivePurge()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminRecordArchivePurge(adminRecordArchivePurgeVars);
// Variables can be defined inline as well.
const { data } = await adminRecordArchivePurge({ auditEventId: ..., actorUid: ..., actorRole: ..., archiveId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminRecordArchivePurge(dataConnect, adminRecordArchivePurgeVars);

console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
adminRecordArchivePurge(adminRecordArchivePurgeVars).then((response) => {
  const data = response.data;
  console.log(data.auditEvent_upsert);
});
```

### Using `AdminRecordArchivePurge`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminRecordArchivePurgeRef, AdminRecordArchivePurgeVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminRecordArchivePurge` mutation requires an argument of type `AdminRecordArchivePurgeVariables`:
const adminRecordArchivePurgeVars: AdminRecordArchivePurgeVariables = {
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  archiveId: ..., 
  auditDetails: ..., 
};

// Call the `adminRecordArchivePurgeRef()` function to get a reference to the mutation.
const ref = adminRecordArchivePurgeRef(adminRecordArchivePurgeVars);
// Variables can be defined inline as well.
const ref = adminRecordArchivePurgeRef({ auditEventId: ..., actorUid: ..., actorRole: ..., archiveId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminRecordArchivePurgeRef(dataConnect, adminRecordArchivePurgeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditEvent_upsert);
});
```

## UpsertUserProfile
You can execute the `UpsertUserProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertUserProfile(vars: UpsertUserProfileVariables): MutationPromise<UpsertUserProfileData, UpsertUserProfileVariables>;

interface UpsertUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserProfileVariables): MutationRef<UpsertUserProfileData, UpsertUserProfileVariables>;
}
export const upsertUserProfileRef: UpsertUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUserProfile(dc: DataConnect, vars: UpsertUserProfileVariables): MutationPromise<UpsertUserProfileData, UpsertUserProfileVariables>;

interface UpsertUserProfileRef {
  ...
  (dc: DataConnect, vars: UpsertUserProfileVariables): MutationRef<UpsertUserProfileData, UpsertUserProfileVariables>;
}
export const upsertUserProfileRef: UpsertUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserProfileRef:
```typescript
const name = upsertUserProfileRef.operationName;
console.log(name);
```

### Variables
The `UpsertUserProfile` mutation requires an argument of type `UpsertUserProfileVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserProfileVariables {
  id: string;
  firebaseUid?: string | null;
  displayName: string;
  email?: string | null;
  jobTitle?: string | null;
  role: string;
  status: string;
}
```
### Return Type
Recall that executing the `UpsertUserProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserProfileData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserProfileData {
  userProfile_upsert: UserProfile_Key;
}
```
### Using `UpsertUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUserProfile, UpsertUserProfileVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertUserProfile` mutation requires an argument of type `UpsertUserProfileVariables`:
const upsertUserProfileVars: UpsertUserProfileVariables = {
  id: ..., 
  firebaseUid: ..., // optional
  displayName: ..., 
  email: ..., // optional
  jobTitle: ..., // optional
  role: ..., 
  status: ..., 
};

// Call the `upsertUserProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUserProfile(upsertUserProfileVars);
// Variables can be defined inline as well.
const { data } = await upsertUserProfile({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUserProfile(dataConnect, upsertUserProfileVars);

console.log(data.userProfile_upsert);

// Or, you can use the `Promise` API.
upsertUserProfile(upsertUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.userProfile_upsert);
});
```

### Using `UpsertUserProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserProfileRef, UpsertUserProfileVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertUserProfile` mutation requires an argument of type `UpsertUserProfileVariables`:
const upsertUserProfileVars: UpsertUserProfileVariables = {
  id: ..., 
  firebaseUid: ..., // optional
  displayName: ..., 
  email: ..., // optional
  jobTitle: ..., // optional
  role: ..., 
  status: ..., 
};

// Call the `upsertUserProfileRef()` function to get a reference to the mutation.
const ref = upsertUserProfileRef(upsertUserProfileVars);
// Variables can be defined inline as well.
const ref = upsertUserProfileRef({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserProfileRef(dataConnect, upsertUserProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProfile_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProfile_upsert);
});
```

## UpsertCreditCard
You can execute the `UpsertCreditCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertCreditCard(vars: UpsertCreditCardVariables): MutationPromise<UpsertCreditCardData, UpsertCreditCardVariables>;

interface UpsertCreditCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCreditCardVariables): MutationRef<UpsertCreditCardData, UpsertCreditCardVariables>;
}
export const upsertCreditCardRef: UpsertCreditCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCreditCard(dc: DataConnect, vars: UpsertCreditCardVariables): MutationPromise<UpsertCreditCardData, UpsertCreditCardVariables>;

interface UpsertCreditCardRef {
  ...
  (dc: DataConnect, vars: UpsertCreditCardVariables): MutationRef<UpsertCreditCardData, UpsertCreditCardVariables>;
}
export const upsertCreditCardRef: UpsertCreditCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCreditCardRef:
```typescript
const name = upsertCreditCardRef.operationName;
console.log(name);
```

### Variables
The `UpsertCreditCard` mutation requires an argument of type `UpsertCreditCardVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCreditCardVariables {
  id: string;
  lastFour: string;
  holderId: string;
  cardFunction?: string | null;
  status: string;
  activeFrom?: DateString | null;
  inactiveFrom?: DateString | null;
}
```
### Return Type
Recall that executing the `UpsertCreditCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCreditCardData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCreditCardData {
  creditCard_upsert: CreditCard_Key;
}
```
### Using `UpsertCreditCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCreditCard, UpsertCreditCardVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCreditCard` mutation requires an argument of type `UpsertCreditCardVariables`:
const upsertCreditCardVars: UpsertCreditCardVariables = {
  id: ..., 
  lastFour: ..., 
  holderId: ..., 
  cardFunction: ..., // optional
  status: ..., 
  activeFrom: ..., // optional
  inactiveFrom: ..., // optional
};

// Call the `upsertCreditCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCreditCard(upsertCreditCardVars);
// Variables can be defined inline as well.
const { data } = await upsertCreditCard({ id: ..., lastFour: ..., holderId: ..., cardFunction: ..., status: ..., activeFrom: ..., inactiveFrom: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCreditCard(dataConnect, upsertCreditCardVars);

console.log(data.creditCard_upsert);

// Or, you can use the `Promise` API.
upsertCreditCard(upsertCreditCardVars).then((response) => {
  const data = response.data;
  console.log(data.creditCard_upsert);
});
```

### Using `UpsertCreditCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCreditCardRef, UpsertCreditCardVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCreditCard` mutation requires an argument of type `UpsertCreditCardVariables`:
const upsertCreditCardVars: UpsertCreditCardVariables = {
  id: ..., 
  lastFour: ..., 
  holderId: ..., 
  cardFunction: ..., // optional
  status: ..., 
  activeFrom: ..., // optional
  inactiveFrom: ..., // optional
};

// Call the `upsertCreditCardRef()` function to get a reference to the mutation.
const ref = upsertCreditCardRef(upsertCreditCardVars);
// Variables can be defined inline as well.
const ref = upsertCreditCardRef({ id: ..., lastFour: ..., holderId: ..., cardFunction: ..., status: ..., activeFrom: ..., inactiveFrom: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCreditCardRef(dataConnect, upsertCreditCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCard_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCard_upsert);
});
```

## AdminUpsertUserProfileWithAudit
You can execute the `AdminUpsertUserProfileWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminUpsertUserProfileWithAudit(vars: AdminUpsertUserProfileWithAuditVariables): MutationPromise<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;

interface AdminUpsertUserProfileWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpsertUserProfileWithAuditVariables): MutationRef<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;
}
export const adminUpsertUserProfileWithAuditRef: AdminUpsertUserProfileWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpsertUserProfileWithAudit(dc: DataConnect, vars: AdminUpsertUserProfileWithAuditVariables): MutationPromise<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;

interface AdminUpsertUserProfileWithAuditRef {
  ...
  (dc: DataConnect, vars: AdminUpsertUserProfileWithAuditVariables): MutationRef<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;
}
export const adminUpsertUserProfileWithAuditRef: AdminUpsertUserProfileWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpsertUserProfileWithAuditRef:
```typescript
const name = adminUpsertUserProfileWithAuditRef.operationName;
console.log(name);
```

### Variables
The `AdminUpsertUserProfileWithAudit` mutation requires an argument of type `AdminUpsertUserProfileWithAuditVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpsertUserProfileWithAuditVariables {
  id: string;
  firebaseUid?: string | null;
  displayName: string;
  email?: string | null;
  jobTitle?: string | null;
  role: string;
  status: string;
  invitationStatus: string;
  invitationSentAt?: TimestampString | null;
  invitationSentBy?: string | null;
  lastInvitationError?: string | null;
  activatedAt?: TimestampString | null;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
  deactivateCards?: boolean;
  inactiveFrom?: DateString | null;
}
```
### Return Type
Recall that executing the `AdminUpsertUserProfileWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpsertUserProfileWithAuditData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpsertUserProfileWithAuditData {
  userProfile_upsert: UserProfile_Key;
  creditCard_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `AdminUpsertUserProfileWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpsertUserProfileWithAudit, AdminUpsertUserProfileWithAuditVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminUpsertUserProfileWithAudit` mutation requires an argument of type `AdminUpsertUserProfileWithAuditVariables`:
const adminUpsertUserProfileWithAuditVars: AdminUpsertUserProfileWithAuditVariables = {
  id: ..., 
  firebaseUid: ..., // optional
  displayName: ..., 
  email: ..., // optional
  jobTitle: ..., // optional
  role: ..., 
  status: ..., 
  invitationStatus: ..., 
  invitationSentAt: ..., // optional
  invitationSentBy: ..., // optional
  lastInvitationError: ..., // optional
  activatedAt: ..., // optional
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
  deactivateCards: ..., // optional
  inactiveFrom: ..., // optional
};

// Call the `adminUpsertUserProfileWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpsertUserProfileWithAudit(adminUpsertUserProfileWithAuditVars);
// Variables can be defined inline as well.
const { data } = await adminUpsertUserProfileWithAudit({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., invitationStatus: ..., invitationSentAt: ..., invitationSentBy: ..., lastInvitationError: ..., activatedAt: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., deactivateCards: ..., inactiveFrom: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpsertUserProfileWithAudit(dataConnect, adminUpsertUserProfileWithAuditVars);

console.log(data.userProfile_upsert);
console.log(data.creditCard_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
adminUpsertUserProfileWithAudit(adminUpsertUserProfileWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.userProfile_upsert);
  console.log(data.creditCard_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `AdminUpsertUserProfileWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpsertUserProfileWithAuditRef, AdminUpsertUserProfileWithAuditVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminUpsertUserProfileWithAudit` mutation requires an argument of type `AdminUpsertUserProfileWithAuditVariables`:
const adminUpsertUserProfileWithAuditVars: AdminUpsertUserProfileWithAuditVariables = {
  id: ..., 
  firebaseUid: ..., // optional
  displayName: ..., 
  email: ..., // optional
  jobTitle: ..., // optional
  role: ..., 
  status: ..., 
  invitationStatus: ..., 
  invitationSentAt: ..., // optional
  invitationSentBy: ..., // optional
  lastInvitationError: ..., // optional
  activatedAt: ..., // optional
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
  deactivateCards: ..., // optional
  inactiveFrom: ..., // optional
};

// Call the `adminUpsertUserProfileWithAuditRef()` function to get a reference to the mutation.
const ref = adminUpsertUserProfileWithAuditRef(adminUpsertUserProfileWithAuditVars);
// Variables can be defined inline as well.
const ref = adminUpsertUserProfileWithAuditRef({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., invitationStatus: ..., invitationSentAt: ..., invitationSentBy: ..., lastInvitationError: ..., activatedAt: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., deactivateCards: ..., inactiveFrom: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpsertUserProfileWithAuditRef(dataConnect, adminUpsertUserProfileWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProfile_upsert);
console.log(data.creditCard_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProfile_upsert);
  console.log(data.creditCard_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## AdminRecordUserAudit
You can execute the `AdminRecordUserAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminRecordUserAudit(vars: AdminRecordUserAuditVariables): MutationPromise<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;

interface AdminRecordUserAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminRecordUserAuditVariables): MutationRef<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;
}
export const adminRecordUserAuditRef: AdminRecordUserAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminRecordUserAudit(dc: DataConnect, vars: AdminRecordUserAuditVariables): MutationPromise<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;

interface AdminRecordUserAuditRef {
  ...
  (dc: DataConnect, vars: AdminRecordUserAuditVariables): MutationRef<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;
}
export const adminRecordUserAuditRef: AdminRecordUserAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminRecordUserAuditRef:
```typescript
const name = adminRecordUserAuditRef.operationName;
console.log(name);
```

### Variables
The `AdminRecordUserAudit` mutation requires an argument of type `AdminRecordUserAuditVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminRecordUserAuditVariables {
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  entityId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `AdminRecordUserAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminRecordUserAuditData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminRecordUserAuditData {
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `AdminRecordUserAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminRecordUserAudit, AdminRecordUserAuditVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminRecordUserAudit` mutation requires an argument of type `AdminRecordUserAuditVariables`:
const adminRecordUserAuditVars: AdminRecordUserAuditVariables = {
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  entityId: ..., 
  auditDetails: ..., 
};

// Call the `adminRecordUserAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminRecordUserAudit(adminRecordUserAuditVars);
// Variables can be defined inline as well.
const { data } = await adminRecordUserAudit({ auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., entityId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminRecordUserAudit(dataConnect, adminRecordUserAuditVars);

console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
adminRecordUserAudit(adminRecordUserAuditVars).then((response) => {
  const data = response.data;
  console.log(data.auditEvent_upsert);
});
```

### Using `AdminRecordUserAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminRecordUserAuditRef, AdminRecordUserAuditVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminRecordUserAudit` mutation requires an argument of type `AdminRecordUserAuditVariables`:
const adminRecordUserAuditVars: AdminRecordUserAuditVariables = {
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  entityId: ..., 
  auditDetails: ..., 
};

// Call the `adminRecordUserAuditRef()` function to get a reference to the mutation.
const ref = adminRecordUserAuditRef(adminRecordUserAuditVars);
// Variables can be defined inline as well.
const ref = adminRecordUserAuditRef({ auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., entityId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminRecordUserAuditRef(dataConnect, adminRecordUserAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditEvent_upsert);
});
```

## UpsertProject
You can execute the `UpsertProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertProject(vars: UpsertProjectVariables): MutationPromise<UpsertProjectData, UpsertProjectVariables>;

interface UpsertProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertProjectVariables): MutationRef<UpsertProjectData, UpsertProjectVariables>;
}
export const upsertProjectRef: UpsertProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertProject(dc: DataConnect, vars: UpsertProjectVariables): MutationPromise<UpsertProjectData, UpsertProjectVariables>;

interface UpsertProjectRef {
  ...
  (dc: DataConnect, vars: UpsertProjectVariables): MutationRef<UpsertProjectData, UpsertProjectVariables>;
}
export const upsertProjectRef: UpsertProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertProjectRef:
```typescript
const name = upsertProjectRef.operationName;
console.log(name);
```

### Variables
The `UpsertProject` mutation requires an argument of type `UpsertProjectVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertProjectVariables {
  id: string;
  number: string;
  name: string;
  status: string;
  auditAction: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `UpsertProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertProjectData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertProjectData {
  project_upsert: Project_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpsertProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertProject, UpsertProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertProject` mutation requires an argument of type `UpsertProjectVariables`:
const upsertProjectVars: UpsertProjectVariables = {
  id: ..., 
  number: ..., 
  name: ..., 
  status: ..., 
  auditAction: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `upsertProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertProject(upsertProjectVars);
// Variables can be defined inline as well.
const { data } = await upsertProject({ id: ..., number: ..., name: ..., status: ..., auditAction: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertProject(dataConnect, upsertProjectVars);

console.log(data.project_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
upsertProject(upsertProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_upsert);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpsertProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertProjectRef, UpsertProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertProject` mutation requires an argument of type `UpsertProjectVariables`:
const upsertProjectVars: UpsertProjectVariables = {
  id: ..., 
  number: ..., 
  name: ..., 
  status: ..., 
  auditAction: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `upsertProjectRef()` function to get a reference to the mutation.
const ref = upsertProjectRef(upsertProjectVars);
// Variables can be defined inline as well.
const ref = upsertProjectRef({ id: ..., number: ..., name: ..., status: ..., auditAction: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertProjectRef(dataConnect, upsertProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_upsert);
  console.log(data.auditEvent_upsert);
});
```

## UpsertExpenseAccount
You can execute the `UpsertExpenseAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertExpenseAccount(vars: UpsertExpenseAccountVariables): MutationPromise<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;

interface UpsertExpenseAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertExpenseAccountVariables): MutationRef<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;
}
export const upsertExpenseAccountRef: UpsertExpenseAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertExpenseAccount(dc: DataConnect, vars: UpsertExpenseAccountVariables): MutationPromise<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;

interface UpsertExpenseAccountRef {
  ...
  (dc: DataConnect, vars: UpsertExpenseAccountVariables): MutationRef<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;
}
export const upsertExpenseAccountRef: UpsertExpenseAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertExpenseAccountRef:
```typescript
const name = upsertExpenseAccountRef.operationName;
console.log(name);
```

### Variables
The `UpsertExpenseAccount` mutation requires an argument of type `UpsertExpenseAccountVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertExpenseAccountVariables {
  id: string;
  number: string;
  type: string;
  label: string;
  status: string;
  auditAction: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `UpsertExpenseAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertExpenseAccountData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertExpenseAccountData {
  expenseAccount_upsert: ExpenseAccount_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpsertExpenseAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertExpenseAccount, UpsertExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertExpenseAccount` mutation requires an argument of type `UpsertExpenseAccountVariables`:
const upsertExpenseAccountVars: UpsertExpenseAccountVariables = {
  id: ..., 
  number: ..., 
  type: ..., 
  label: ..., 
  status: ..., 
  auditAction: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `upsertExpenseAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertExpenseAccount(upsertExpenseAccountVars);
// Variables can be defined inline as well.
const { data } = await upsertExpenseAccount({ id: ..., number: ..., type: ..., label: ..., status: ..., auditAction: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertExpenseAccount(dataConnect, upsertExpenseAccountVars);

console.log(data.expenseAccount_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
upsertExpenseAccount(upsertExpenseAccountVars).then((response) => {
  const data = response.data;
  console.log(data.expenseAccount_upsert);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpsertExpenseAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertExpenseAccountRef, UpsertExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertExpenseAccount` mutation requires an argument of type `UpsertExpenseAccountVariables`:
const upsertExpenseAccountVars: UpsertExpenseAccountVariables = {
  id: ..., 
  number: ..., 
  type: ..., 
  label: ..., 
  status: ..., 
  auditAction: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `upsertExpenseAccountRef()` function to get a reference to the mutation.
const ref = upsertExpenseAccountRef(upsertExpenseAccountVars);
// Variables can be defined inline as well.
const ref = upsertExpenseAccountRef({ id: ..., number: ..., type: ..., label: ..., status: ..., auditAction: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertExpenseAccountRef(dataConnect, upsertExpenseAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expenseAccount_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseAccount_upsert);
  console.log(data.auditEvent_upsert);
});
```

## DeleteProject
You can execute the `DeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectRef:
```typescript
const name = deleteProjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectVariables {
  id: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `DeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `DeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProject, DeleteProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProject(deleteProjectVars);
// Variables can be defined inline as well.
const { data } = await deleteProject({ id: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProject(dataConnect, deleteProjectVars);

console.log(data.project_delete);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
deleteProject(deleteProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
  console.log(data.auditEvent_upsert);
});
```

### Using `DeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectRef, DeleteProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deleteProjectRef()` function to get a reference to the mutation.
const ref = deleteProjectRef(deleteProjectVars);
// Variables can be defined inline as well.
const ref = deleteProjectRef({ id: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectRef(dataConnect, deleteProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_delete);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
  console.log(data.auditEvent_upsert);
});
```

## DeleteExpenseAccount
You can execute the `DeleteExpenseAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
deleteExpenseAccount(vars: DeleteExpenseAccountVariables): MutationPromise<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;

interface DeleteExpenseAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExpenseAccountVariables): MutationRef<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;
}
export const deleteExpenseAccountRef: DeleteExpenseAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteExpenseAccount(dc: DataConnect, vars: DeleteExpenseAccountVariables): MutationPromise<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;

interface DeleteExpenseAccountRef {
  ...
  (dc: DataConnect, vars: DeleteExpenseAccountVariables): MutationRef<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;
}
export const deleteExpenseAccountRef: DeleteExpenseAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteExpenseAccountRef:
```typescript
const name = deleteExpenseAccountRef.operationName;
console.log(name);
```

### Variables
The `DeleteExpenseAccount` mutation requires an argument of type `DeleteExpenseAccountVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteExpenseAccountVariables {
  id: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `DeleteExpenseAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteExpenseAccountData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteExpenseAccountData {
  expenseAccount_delete?: ExpenseAccount_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `DeleteExpenseAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteExpenseAccount, DeleteExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `DeleteExpenseAccount` mutation requires an argument of type `DeleteExpenseAccountVariables`:
const deleteExpenseAccountVars: DeleteExpenseAccountVariables = {
  id: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deleteExpenseAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteExpenseAccount(deleteExpenseAccountVars);
// Variables can be defined inline as well.
const { data } = await deleteExpenseAccount({ id: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteExpenseAccount(dataConnect, deleteExpenseAccountVars);

console.log(data.expenseAccount_delete);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
deleteExpenseAccount(deleteExpenseAccountVars).then((response) => {
  const data = response.data;
  console.log(data.expenseAccount_delete);
  console.log(data.auditEvent_upsert);
});
```

### Using `DeleteExpenseAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteExpenseAccountRef, DeleteExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `DeleteExpenseAccount` mutation requires an argument of type `DeleteExpenseAccountVariables`:
const deleteExpenseAccountVars: DeleteExpenseAccountVariables = {
  id: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deleteExpenseAccountRef()` function to get a reference to the mutation.
const ref = deleteExpenseAccountRef(deleteExpenseAccountVars);
// Variables can be defined inline as well.
const ref = deleteExpenseAccountRef({ id: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteExpenseAccountRef(dataConnect, deleteExpenseAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expenseAccount_delete);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseAccount_delete);
  console.log(data.auditEvent_upsert);
});
```

## DeleteCreditCard
You can execute the `DeleteCreditCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
deleteCreditCard(vars: DeleteCreditCardVariables): MutationPromise<DeleteCreditCardData, DeleteCreditCardVariables>;

interface DeleteCreditCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCreditCardVariables): MutationRef<DeleteCreditCardData, DeleteCreditCardVariables>;
}
export const deleteCreditCardRef: DeleteCreditCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCreditCard(dc: DataConnect, vars: DeleteCreditCardVariables): MutationPromise<DeleteCreditCardData, DeleteCreditCardVariables>;

interface DeleteCreditCardRef {
  ...
  (dc: DataConnect, vars: DeleteCreditCardVariables): MutationRef<DeleteCreditCardData, DeleteCreditCardVariables>;
}
export const deleteCreditCardRef: DeleteCreditCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCreditCardRef:
```typescript
const name = deleteCreditCardRef.operationName;
console.log(name);
```

### Variables
The `DeleteCreditCard` mutation requires an argument of type `DeleteCreditCardVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCreditCardVariables {
  id: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `DeleteCreditCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCreditCardData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCreditCardData {
  creditCard_delete?: CreditCard_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `DeleteCreditCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCreditCard, DeleteCreditCardVariables } from '@factures-thibeault/data-connect-generated';

// The `DeleteCreditCard` mutation requires an argument of type `DeleteCreditCardVariables`:
const deleteCreditCardVars: DeleteCreditCardVariables = {
  id: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deleteCreditCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCreditCard(deleteCreditCardVars);
// Variables can be defined inline as well.
const { data } = await deleteCreditCard({ id: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCreditCard(dataConnect, deleteCreditCardVars);

console.log(data.creditCard_delete);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
deleteCreditCard(deleteCreditCardVars).then((response) => {
  const data = response.data;
  console.log(data.creditCard_delete);
  console.log(data.auditEvent_upsert);
});
```

### Using `DeleteCreditCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCreditCardRef, DeleteCreditCardVariables } from '@factures-thibeault/data-connect-generated';

// The `DeleteCreditCard` mutation requires an argument of type `DeleteCreditCardVariables`:
const deleteCreditCardVars: DeleteCreditCardVariables = {
  id: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deleteCreditCardRef()` function to get a reference to the mutation.
const ref = deleteCreditCardRef(deleteCreditCardVars);
// Variables can be defined inline as well.
const ref = deleteCreditCardRef({ id: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCreditCardRef(dataConnect, deleteCreditCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCard_delete);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCard_delete);
  console.log(data.auditEvent_upsert);
});
```

## DeleteCreditCardAndHolder
You can execute the `DeleteCreditCardAndHolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
deleteCreditCardAndHolder(vars: DeleteCreditCardAndHolderVariables): MutationPromise<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;

interface DeleteCreditCardAndHolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCreditCardAndHolderVariables): MutationRef<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;
}
export const deleteCreditCardAndHolderRef: DeleteCreditCardAndHolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCreditCardAndHolder(dc: DataConnect, vars: DeleteCreditCardAndHolderVariables): MutationPromise<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;

interface DeleteCreditCardAndHolderRef {
  ...
  (dc: DataConnect, vars: DeleteCreditCardAndHolderVariables): MutationRef<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;
}
export const deleteCreditCardAndHolderRef: DeleteCreditCardAndHolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCreditCardAndHolderRef:
```typescript
const name = deleteCreditCardAndHolderRef.operationName;
console.log(name);
```

### Variables
The `DeleteCreditCardAndHolder` mutation requires an argument of type `DeleteCreditCardAndHolderVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCreditCardAndHolderVariables {
  cardId: string;
  holderId: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `DeleteCreditCardAndHolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCreditCardAndHolderData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCreditCardAndHolderData {
  creditCard_delete?: CreditCard_Key | null;
  userProfile_delete?: UserProfile_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `DeleteCreditCardAndHolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCreditCardAndHolder, DeleteCreditCardAndHolderVariables } from '@factures-thibeault/data-connect-generated';

// The `DeleteCreditCardAndHolder` mutation requires an argument of type `DeleteCreditCardAndHolderVariables`:
const deleteCreditCardAndHolderVars: DeleteCreditCardAndHolderVariables = {
  cardId: ..., 
  holderId: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deleteCreditCardAndHolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCreditCardAndHolder(deleteCreditCardAndHolderVars);
// Variables can be defined inline as well.
const { data } = await deleteCreditCardAndHolder({ cardId: ..., holderId: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCreditCardAndHolder(dataConnect, deleteCreditCardAndHolderVars);

console.log(data.creditCard_delete);
console.log(data.userProfile_delete);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
deleteCreditCardAndHolder(deleteCreditCardAndHolderVars).then((response) => {
  const data = response.data;
  console.log(data.creditCard_delete);
  console.log(data.userProfile_delete);
  console.log(data.auditEvent_upsert);
});
```

### Using `DeleteCreditCardAndHolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCreditCardAndHolderRef, DeleteCreditCardAndHolderVariables } from '@factures-thibeault/data-connect-generated';

// The `DeleteCreditCardAndHolder` mutation requires an argument of type `DeleteCreditCardAndHolderVariables`:
const deleteCreditCardAndHolderVars: DeleteCreditCardAndHolderVariables = {
  cardId: ..., 
  holderId: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deleteCreditCardAndHolderRef()` function to get a reference to the mutation.
const ref = deleteCreditCardAndHolderRef(deleteCreditCardAndHolderVars);
// Variables can be defined inline as well.
const ref = deleteCreditCardAndHolderRef({ cardId: ..., holderId: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCreditCardAndHolderRef(dataConnect, deleteCreditCardAndHolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCard_delete);
console.log(data.userProfile_delete);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCard_delete);
  console.log(data.userProfile_delete);
  console.log(data.auditEvent_upsert);
});
```

## UpsertCardStatementPeriod
You can execute the `UpsertCardStatementPeriod` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertCardStatementPeriod(vars: UpsertCardStatementPeriodVariables): MutationPromise<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;

interface UpsertCardStatementPeriodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCardStatementPeriodVariables): MutationRef<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;
}
export const upsertCardStatementPeriodRef: UpsertCardStatementPeriodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCardStatementPeriod(dc: DataConnect, vars: UpsertCardStatementPeriodVariables): MutationPromise<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;

interface UpsertCardStatementPeriodRef {
  ...
  (dc: DataConnect, vars: UpsertCardStatementPeriodVariables): MutationRef<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;
}
export const upsertCardStatementPeriodRef: UpsertCardStatementPeriodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCardStatementPeriodRef:
```typescript
const name = upsertCardStatementPeriodRef.operationName;
console.log(name);
```

### Variables
The `UpsertCardStatementPeriod` mutation requires an argument of type `UpsertCardStatementPeriodVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCardStatementPeriodVariables {
  id: string;
  label: string;
  startDate: DateString;
  endDate: DateString;
  statementLabel?: string | null;
  status: string;
}
```
### Return Type
Recall that executing the `UpsertCardStatementPeriod` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCardStatementPeriodData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCardStatementPeriodData {
  cardStatementPeriod_upsert: CardStatementPeriod_Key;
}
```
### Using `UpsertCardStatementPeriod`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCardStatementPeriod, UpsertCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCardStatementPeriod` mutation requires an argument of type `UpsertCardStatementPeriodVariables`:
const upsertCardStatementPeriodVars: UpsertCardStatementPeriodVariables = {
  id: ..., 
  label: ..., 
  startDate: ..., 
  endDate: ..., 
  statementLabel: ..., // optional
  status: ..., 
};

// Call the `upsertCardStatementPeriod()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCardStatementPeriod(upsertCardStatementPeriodVars);
// Variables can be defined inline as well.
const { data } = await upsertCardStatementPeriod({ id: ..., label: ..., startDate: ..., endDate: ..., statementLabel: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCardStatementPeriod(dataConnect, upsertCardStatementPeriodVars);

console.log(data.cardStatementPeriod_upsert);

// Or, you can use the `Promise` API.
upsertCardStatementPeriod(upsertCardStatementPeriodVars).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriod_upsert);
});
```

### Using `UpsertCardStatementPeriod`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCardStatementPeriodRef, UpsertCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCardStatementPeriod` mutation requires an argument of type `UpsertCardStatementPeriodVariables`:
const upsertCardStatementPeriodVars: UpsertCardStatementPeriodVariables = {
  id: ..., 
  label: ..., 
  startDate: ..., 
  endDate: ..., 
  statementLabel: ..., // optional
  status: ..., 
};

// Call the `upsertCardStatementPeriodRef()` function to get a reference to the mutation.
const ref = upsertCardStatementPeriodRef(upsertCardStatementPeriodVars);
// Variables can be defined inline as well.
const ref = upsertCardStatementPeriodRef({ id: ..., label: ..., startDate: ..., endDate: ..., statementLabel: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCardStatementPeriodRef(dataConnect, upsertCardStatementPeriodVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cardStatementPeriod_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriod_upsert);
});
```

## SaveStatementManualAdjustments
You can execute the `SaveStatementManualAdjustments` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
saveStatementManualAdjustments(vars: SaveStatementManualAdjustmentsVariables): MutationPromise<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;

interface SaveStatementManualAdjustmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SaveStatementManualAdjustmentsVariables): MutationRef<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;
}
export const saveStatementManualAdjustmentsRef: SaveStatementManualAdjustmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
saveStatementManualAdjustments(dc: DataConnect, vars: SaveStatementManualAdjustmentsVariables): MutationPromise<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;

interface SaveStatementManualAdjustmentsRef {
  ...
  (dc: DataConnect, vars: SaveStatementManualAdjustmentsVariables): MutationRef<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;
}
export const saveStatementManualAdjustmentsRef: SaveStatementManualAdjustmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the saveStatementManualAdjustmentsRef:
```typescript
const name = saveStatementManualAdjustmentsRef.operationName;
console.log(name);
```

### Variables
The `SaveStatementManualAdjustments` mutation requires an argument of type `SaveStatementManualAdjustmentsVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SaveStatementManualAdjustmentsVariables {
  id: string;
  manualAdjustmentsJson: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `SaveStatementManualAdjustments` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SaveStatementManualAdjustmentsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SaveStatementManualAdjustmentsData {
  cardStatementPeriod_update?: CardStatementPeriod_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `SaveStatementManualAdjustments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, saveStatementManualAdjustments, SaveStatementManualAdjustmentsVariables } from '@factures-thibeault/data-connect-generated';

// The `SaveStatementManualAdjustments` mutation requires an argument of type `SaveStatementManualAdjustmentsVariables`:
const saveStatementManualAdjustmentsVars: SaveStatementManualAdjustmentsVariables = {
  id: ..., 
  manualAdjustmentsJson: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `saveStatementManualAdjustments()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await saveStatementManualAdjustments(saveStatementManualAdjustmentsVars);
// Variables can be defined inline as well.
const { data } = await saveStatementManualAdjustments({ id: ..., manualAdjustmentsJson: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await saveStatementManualAdjustments(dataConnect, saveStatementManualAdjustmentsVars);

console.log(data.cardStatementPeriod_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
saveStatementManualAdjustments(saveStatementManualAdjustmentsVars).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriod_update);
  console.log(data.auditEvent_upsert);
});
```

### Using `SaveStatementManualAdjustments`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, saveStatementManualAdjustmentsRef, SaveStatementManualAdjustmentsVariables } from '@factures-thibeault/data-connect-generated';

// The `SaveStatementManualAdjustments` mutation requires an argument of type `SaveStatementManualAdjustmentsVariables`:
const saveStatementManualAdjustmentsVars: SaveStatementManualAdjustmentsVariables = {
  id: ..., 
  manualAdjustmentsJson: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `saveStatementManualAdjustmentsRef()` function to get a reference to the mutation.
const ref = saveStatementManualAdjustmentsRef(saveStatementManualAdjustmentsVars);
// Variables can be defined inline as well.
const ref = saveStatementManualAdjustmentsRef({ id: ..., manualAdjustmentsJson: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = saveStatementManualAdjustmentsRef(dataConnect, saveStatementManualAdjustmentsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cardStatementPeriod_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cardStatementPeriod_update);
  console.log(data.auditEvent_upsert);
});
```

## UpsertReportAdjustmentSet
You can execute the `UpsertReportAdjustmentSet` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertReportAdjustmentSet(vars: UpsertReportAdjustmentSetVariables): MutationPromise<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;

interface UpsertReportAdjustmentSetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportAdjustmentSetVariables): MutationRef<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;
}
export const upsertReportAdjustmentSetRef: UpsertReportAdjustmentSetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertReportAdjustmentSet(dc: DataConnect, vars: UpsertReportAdjustmentSetVariables): MutationPromise<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;

interface UpsertReportAdjustmentSetRef {
  ...
  (dc: DataConnect, vars: UpsertReportAdjustmentSetVariables): MutationRef<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;
}
export const upsertReportAdjustmentSetRef: UpsertReportAdjustmentSetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertReportAdjustmentSetRef:
```typescript
const name = upsertReportAdjustmentSetRef.operationName;
console.log(name);
```

### Variables
The `UpsertReportAdjustmentSet` mutation requires an argument of type `UpsertReportAdjustmentSetVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertReportAdjustmentSetVariables {
  id: string;
  periodKey: string;
  periodStart: DateString;
  periodEnd: DateString;
  projectId?: string | null;
  holderId?: string | null;
  rowsJson: string;
  actorUid: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `UpsertReportAdjustmentSet` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertReportAdjustmentSetData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertReportAdjustmentSetData {
  reportAdjustmentSet_upsert: ReportAdjustmentSet_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpsertReportAdjustmentSet`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertReportAdjustmentSet, UpsertReportAdjustmentSetVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertReportAdjustmentSet` mutation requires an argument of type `UpsertReportAdjustmentSetVariables`:
const upsertReportAdjustmentSetVars: UpsertReportAdjustmentSetVariables = {
  id: ..., 
  periodKey: ..., 
  periodStart: ..., 
  periodEnd: ..., 
  projectId: ..., // optional
  holderId: ..., // optional
  rowsJson: ..., 
  actorUid: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `upsertReportAdjustmentSet()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertReportAdjustmentSet(upsertReportAdjustmentSetVars);
// Variables can be defined inline as well.
const { data } = await upsertReportAdjustmentSet({ id: ..., periodKey: ..., periodStart: ..., periodEnd: ..., projectId: ..., holderId: ..., rowsJson: ..., actorUid: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertReportAdjustmentSet(dataConnect, upsertReportAdjustmentSetVars);

console.log(data.reportAdjustmentSet_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
upsertReportAdjustmentSet(upsertReportAdjustmentSetVars).then((response) => {
  const data = response.data;
  console.log(data.reportAdjustmentSet_upsert);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpsertReportAdjustmentSet`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertReportAdjustmentSetRef, UpsertReportAdjustmentSetVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertReportAdjustmentSet` mutation requires an argument of type `UpsertReportAdjustmentSetVariables`:
const upsertReportAdjustmentSetVars: UpsertReportAdjustmentSetVariables = {
  id: ..., 
  periodKey: ..., 
  periodStart: ..., 
  periodEnd: ..., 
  projectId: ..., // optional
  holderId: ..., // optional
  rowsJson: ..., 
  actorUid: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `upsertReportAdjustmentSetRef()` function to get a reference to the mutation.
const ref = upsertReportAdjustmentSetRef(upsertReportAdjustmentSetVars);
// Variables can be defined inline as well.
const ref = upsertReportAdjustmentSetRef({ id: ..., periodKey: ..., periodStart: ..., periodEnd: ..., projectId: ..., holderId: ..., rowsJson: ..., actorUid: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertReportAdjustmentSetRef(dataConnect, upsertReportAdjustmentSetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reportAdjustmentSet_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reportAdjustmentSet_upsert);
  console.log(data.auditEvent_upsert);
});
```

## UpsertCreditCardStatement
You can execute the `UpsertCreditCardStatement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertCreditCardStatement(vars: UpsertCreditCardStatementVariables): MutationPromise<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;

interface UpsertCreditCardStatementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCreditCardStatementVariables): MutationRef<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;
}
export const upsertCreditCardStatementRef: UpsertCreditCardStatementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCreditCardStatement(dc: DataConnect, vars: UpsertCreditCardStatementVariables): MutationPromise<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;

interface UpsertCreditCardStatementRef {
  ...
  (dc: DataConnect, vars: UpsertCreditCardStatementVariables): MutationRef<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;
}
export const upsertCreditCardStatementRef: UpsertCreditCardStatementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCreditCardStatementRef:
```typescript
const name = upsertCreditCardStatementRef.operationName;
console.log(name);
```

### Variables
The `UpsertCreditCardStatement` mutation requires an argument of type `UpsertCreditCardStatementVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCreditCardStatementVariables {
  id: string;
  cardId: string;
  holderIdSnapshot: string;
  holderNameSnapshot: string;
  periodStart: DateString;
  periodEnd: DateString;
  originalStoragePath: string;
  originalFilename: string;
  importedById: string;
  statementHash: string;
  status: string;
  lineCount: number;
  totalAmountCents: Int64String;
  actorUid: string;
  actorRole: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `UpsertCreditCardStatement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCreditCardStatementData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCreditCardStatementData {
  creditCardStatement_insert: CreditCardStatement_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpsertCreditCardStatement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCreditCardStatement, UpsertCreditCardStatementVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCreditCardStatement` mutation requires an argument of type `UpsertCreditCardStatementVariables`:
const upsertCreditCardStatementVars: UpsertCreditCardStatementVariables = {
  id: ..., 
  cardId: ..., 
  holderIdSnapshot: ..., 
  holderNameSnapshot: ..., 
  periodStart: ..., 
  periodEnd: ..., 
  originalStoragePath: ..., 
  originalFilename: ..., 
  importedById: ..., 
  statementHash: ..., 
  status: ..., 
  lineCount: ..., 
  totalAmountCents: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `upsertCreditCardStatement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCreditCardStatement(upsertCreditCardStatementVars);
// Variables can be defined inline as well.
const { data } = await upsertCreditCardStatement({ id: ..., cardId: ..., holderIdSnapshot: ..., holderNameSnapshot: ..., periodStart: ..., periodEnd: ..., originalStoragePath: ..., originalFilename: ..., importedById: ..., statementHash: ..., status: ..., lineCount: ..., totalAmountCents: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCreditCardStatement(dataConnect, upsertCreditCardStatementVars);

console.log(data.creditCardStatement_insert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
upsertCreditCardStatement(upsertCreditCardStatementVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatement_insert);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpsertCreditCardStatement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCreditCardStatementRef, UpsertCreditCardStatementVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCreditCardStatement` mutation requires an argument of type `UpsertCreditCardStatementVariables`:
const upsertCreditCardStatementVars: UpsertCreditCardStatementVariables = {
  id: ..., 
  cardId: ..., 
  holderIdSnapshot: ..., 
  holderNameSnapshot: ..., 
  periodStart: ..., 
  periodEnd: ..., 
  originalStoragePath: ..., 
  originalFilename: ..., 
  importedById: ..., 
  statementHash: ..., 
  status: ..., 
  lineCount: ..., 
  totalAmountCents: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `upsertCreditCardStatementRef()` function to get a reference to the mutation.
const ref = upsertCreditCardStatementRef(upsertCreditCardStatementVars);
// Variables can be defined inline as well.
const ref = upsertCreditCardStatementRef({ id: ..., cardId: ..., holderIdSnapshot: ..., holderNameSnapshot: ..., periodStart: ..., periodEnd: ..., originalStoragePath: ..., originalFilename: ..., importedById: ..., statementHash: ..., status: ..., lineCount: ..., totalAmountCents: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCreditCardStatementRef(dataConnect, upsertCreditCardStatementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCardStatement_insert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatement_insert);
  console.log(data.auditEvent_upsert);
});
```

## UpsertCreditCardStatementLine
You can execute the `UpsertCreditCardStatementLine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertCreditCardStatementLine(vars: UpsertCreditCardStatementLineVariables): MutationPromise<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;

interface UpsertCreditCardStatementLineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCreditCardStatementLineVariables): MutationRef<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;
}
export const upsertCreditCardStatementLineRef: UpsertCreditCardStatementLineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCreditCardStatementLine(dc: DataConnect, vars: UpsertCreditCardStatementLineVariables): MutationPromise<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;

interface UpsertCreditCardStatementLineRef {
  ...
  (dc: DataConnect, vars: UpsertCreditCardStatementLineVariables): MutationRef<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;
}
export const upsertCreditCardStatementLineRef: UpsertCreditCardStatementLineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCreditCardStatementLineRef:
```typescript
const name = upsertCreditCardStatementLineRef.operationName;
console.log(name);
```

### Variables
The `UpsertCreditCardStatementLine` mutation requires an argument of type `UpsertCreditCardStatementLineVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCreditCardStatementLineVariables {
  id: string;
  statementId: string;
  sequence: number;
  transactionDate: DateString;
  postedDate?: DateString | null;
  merchantRaw: string;
  merchantNormalized: string;
  amountCents: Int64String;
  externalReference?: string | null;
  status: string;
  rawData?: string | null;
}
```
### Return Type
Recall that executing the `UpsertCreditCardStatementLine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCreditCardStatementLineData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCreditCardStatementLineData {
  creditCardStatementLine_upsert: CreditCardStatementLine_Key;
}
```
### Using `UpsertCreditCardStatementLine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCreditCardStatementLine, UpsertCreditCardStatementLineVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCreditCardStatementLine` mutation requires an argument of type `UpsertCreditCardStatementLineVariables`:
const upsertCreditCardStatementLineVars: UpsertCreditCardStatementLineVariables = {
  id: ..., 
  statementId: ..., 
  sequence: ..., 
  transactionDate: ..., 
  postedDate: ..., // optional
  merchantRaw: ..., 
  merchantNormalized: ..., 
  amountCents: ..., 
  externalReference: ..., // optional
  status: ..., 
  rawData: ..., // optional
};

// Call the `upsertCreditCardStatementLine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCreditCardStatementLine(upsertCreditCardStatementLineVars);
// Variables can be defined inline as well.
const { data } = await upsertCreditCardStatementLine({ id: ..., statementId: ..., sequence: ..., transactionDate: ..., postedDate: ..., merchantRaw: ..., merchantNormalized: ..., amountCents: ..., externalReference: ..., status: ..., rawData: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCreditCardStatementLine(dataConnect, upsertCreditCardStatementLineVars);

console.log(data.creditCardStatementLine_upsert);

// Or, you can use the `Promise` API.
upsertCreditCardStatementLine(upsertCreditCardStatementLineVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLine_upsert);
});
```

### Using `UpsertCreditCardStatementLine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCreditCardStatementLineRef, UpsertCreditCardStatementLineVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCreditCardStatementLine` mutation requires an argument of type `UpsertCreditCardStatementLineVariables`:
const upsertCreditCardStatementLineVars: UpsertCreditCardStatementLineVariables = {
  id: ..., 
  statementId: ..., 
  sequence: ..., 
  transactionDate: ..., 
  postedDate: ..., // optional
  merchantRaw: ..., 
  merchantNormalized: ..., 
  amountCents: ..., 
  externalReference: ..., // optional
  status: ..., 
  rawData: ..., // optional
};

// Call the `upsertCreditCardStatementLineRef()` function to get a reference to the mutation.
const ref = upsertCreditCardStatementLineRef(upsertCreditCardStatementLineVars);
// Variables can be defined inline as well.
const ref = upsertCreditCardStatementLineRef({ id: ..., statementId: ..., sequence: ..., transactionDate: ..., postedDate: ..., merchantRaw: ..., merchantNormalized: ..., amountCents: ..., externalReference: ..., status: ..., rawData: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCreditCardStatementLineRef(dataConnect, upsertCreditCardStatementLineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCardStatementLine_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardStatementLine_upsert);
});
```

## UpsertCreditCardHolderHistory
You can execute the `UpsertCreditCardHolderHistory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertCreditCardHolderHistory(vars: UpsertCreditCardHolderHistoryVariables): MutationPromise<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;

interface UpsertCreditCardHolderHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCreditCardHolderHistoryVariables): MutationRef<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;
}
export const upsertCreditCardHolderHistoryRef: UpsertCreditCardHolderHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCreditCardHolderHistory(dc: DataConnect, vars: UpsertCreditCardHolderHistoryVariables): MutationPromise<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;

interface UpsertCreditCardHolderHistoryRef {
  ...
  (dc: DataConnect, vars: UpsertCreditCardHolderHistoryVariables): MutationRef<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;
}
export const upsertCreditCardHolderHistoryRef: UpsertCreditCardHolderHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCreditCardHolderHistoryRef:
```typescript
const name = upsertCreditCardHolderHistoryRef.operationName;
console.log(name);
```

### Variables
The `UpsertCreditCardHolderHistory` mutation requires an argument of type `UpsertCreditCardHolderHistoryVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCreditCardHolderHistoryVariables {
  id: string;
  cardId: string;
  holderId: string;
  validFrom: DateString;
  validTo?: DateString | null;
  isCurrent: boolean;
  status: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `UpsertCreditCardHolderHistory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCreditCardHolderHistoryData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCreditCardHolderHistoryData {
  creditCardHolderHistory_upsert: CreditCardHolderHistory_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpsertCreditCardHolderHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCreditCardHolderHistory, UpsertCreditCardHolderHistoryVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCreditCardHolderHistory` mutation requires an argument of type `UpsertCreditCardHolderHistoryVariables`:
const upsertCreditCardHolderHistoryVars: UpsertCreditCardHolderHistoryVariables = {
  id: ..., 
  cardId: ..., 
  holderId: ..., 
  validFrom: ..., 
  validTo: ..., // optional
  isCurrent: ..., 
  status: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditDetails: ..., 
};

// Call the `upsertCreditCardHolderHistory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCreditCardHolderHistory(upsertCreditCardHolderHistoryVars);
// Variables can be defined inline as well.
const { data } = await upsertCreditCardHolderHistory({ id: ..., cardId: ..., holderId: ..., validFrom: ..., validTo: ..., isCurrent: ..., status: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCreditCardHolderHistory(dataConnect, upsertCreditCardHolderHistoryVars);

console.log(data.creditCardHolderHistory_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
upsertCreditCardHolderHistory(upsertCreditCardHolderHistoryVars).then((response) => {
  const data = response.data;
  console.log(data.creditCardHolderHistory_upsert);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpsertCreditCardHolderHistory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCreditCardHolderHistoryRef, UpsertCreditCardHolderHistoryVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertCreditCardHolderHistory` mutation requires an argument of type `UpsertCreditCardHolderHistoryVariables`:
const upsertCreditCardHolderHistoryVars: UpsertCreditCardHolderHistoryVariables = {
  id: ..., 
  cardId: ..., 
  holderId: ..., 
  validFrom: ..., 
  validTo: ..., // optional
  isCurrent: ..., 
  status: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditDetails: ..., 
};

// Call the `upsertCreditCardHolderHistoryRef()` function to get a reference to the mutation.
const ref = upsertCreditCardHolderHistoryRef(upsertCreditCardHolderHistoryVars);
// Variables can be defined inline as well.
const ref = upsertCreditCardHolderHistoryRef({ id: ..., cardId: ..., holderId: ..., validFrom: ..., validTo: ..., isCurrent: ..., status: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCreditCardHolderHistoryRef(dataConnect, upsertCreditCardHolderHistoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.creditCardHolderHistory_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.creditCardHolderHistory_upsert);
  console.log(data.auditEvent_upsert);
});
```

## UpsertMerchantAlias
You can execute the `UpsertMerchantAlias` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertMerchantAlias(vars: UpsertMerchantAliasVariables): MutationPromise<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;

interface UpsertMerchantAliasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMerchantAliasVariables): MutationRef<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;
}
export const upsertMerchantAliasRef: UpsertMerchantAliasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertMerchantAlias(dc: DataConnect, vars: UpsertMerchantAliasVariables): MutationPromise<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;

interface UpsertMerchantAliasRef {
  ...
  (dc: DataConnect, vars: UpsertMerchantAliasVariables): MutationRef<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;
}
export const upsertMerchantAliasRef: UpsertMerchantAliasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertMerchantAliasRef:
```typescript
const name = upsertMerchantAliasRef.operationName;
console.log(name);
```

### Variables
The `UpsertMerchantAlias` mutation requires an argument of type `UpsertMerchantAliasVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertMerchantAliasVariables {
  id: string;
  merchantRawKey: string;
  merchantNormalized: string;
  merchantCanonical?: string | null;
  active: boolean;
  status: string;
  source: string;
  confidence?: number | null;
  method?: string | null;
  createdById: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `UpsertMerchantAlias` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertMerchantAliasData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertMerchantAliasData {
  merchantAlias_upsert: MerchantAlias_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpsertMerchantAlias`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertMerchantAlias, UpsertMerchantAliasVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertMerchantAlias` mutation requires an argument of type `UpsertMerchantAliasVariables`:
const upsertMerchantAliasVars: UpsertMerchantAliasVariables = {
  id: ..., 
  merchantRawKey: ..., 
  merchantNormalized: ..., 
  merchantCanonical: ..., // optional
  active: ..., 
  status: ..., 
  source: ..., 
  confidence: ..., // optional
  method: ..., // optional
  createdById: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditDetails: ..., 
};

// Call the `upsertMerchantAlias()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertMerchantAlias(upsertMerchantAliasVars);
// Variables can be defined inline as well.
const { data } = await upsertMerchantAlias({ id: ..., merchantRawKey: ..., merchantNormalized: ..., merchantCanonical: ..., active: ..., status: ..., source: ..., confidence: ..., method: ..., createdById: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertMerchantAlias(dataConnect, upsertMerchantAliasVars);

console.log(data.merchantAlias_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
upsertMerchantAlias(upsertMerchantAliasVars).then((response) => {
  const data = response.data;
  console.log(data.merchantAlias_upsert);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpsertMerchantAlias`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertMerchantAliasRef, UpsertMerchantAliasVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertMerchantAlias` mutation requires an argument of type `UpsertMerchantAliasVariables`:
const upsertMerchantAliasVars: UpsertMerchantAliasVariables = {
  id: ..., 
  merchantRawKey: ..., 
  merchantNormalized: ..., 
  merchantCanonical: ..., // optional
  active: ..., 
  status: ..., 
  source: ..., 
  confidence: ..., // optional
  method: ..., // optional
  createdById: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditDetails: ..., 
};

// Call the `upsertMerchantAliasRef()` function to get a reference to the mutation.
const ref = upsertMerchantAliasRef(upsertMerchantAliasVars);
// Variables can be defined inline as well.
const ref = upsertMerchantAliasRef({ id: ..., merchantRawKey: ..., merchantNormalized: ..., merchantCanonical: ..., active: ..., status: ..., source: ..., confidence: ..., method: ..., createdById: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertMerchantAliasRef(dataConnect, upsertMerchantAliasVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.merchantAlias_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.merchantAlias_upsert);
  console.log(data.auditEvent_upsert);
});
```

## PersistReconciliationMatch
You can execute the `PersistReconciliationMatch` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
persistReconciliationMatch(vars: PersistReconciliationMatchVariables): MutationPromise<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;

interface PersistReconciliationMatchRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PersistReconciliationMatchVariables): MutationRef<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;
}
export const persistReconciliationMatchRef: PersistReconciliationMatchRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
persistReconciliationMatch(dc: DataConnect, vars: PersistReconciliationMatchVariables): MutationPromise<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;

interface PersistReconciliationMatchRef {
  ...
  (dc: DataConnect, vars: PersistReconciliationMatchVariables): MutationRef<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;
}
export const persistReconciliationMatchRef: PersistReconciliationMatchRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the persistReconciliationMatchRef:
```typescript
const name = persistReconciliationMatchRef.operationName;
console.log(name);
```

### Variables
The `PersistReconciliationMatch` mutation requires an argument of type `PersistReconciliationMatchVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PersistReconciliationMatchVariables {
  id: string;
  statementLineId: string;
  expenseTransactionId: string;
  invoiceId: string;
  matchScore?: number | null;
  matchMethod: string;
  status: string;
  confirmedById: string;
  confirmedAt?: TimestampString | null;
  reason?: string | null;
  details?: string | null;
  lineStatus: string;
  transactionReconciliationStatus: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
  expectedMatchId?: string | null;
  expectedExpenseTransactionId?: string | null;
}
```
### Return Type
Recall that executing the `PersistReconciliationMatch` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PersistReconciliationMatchData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PersistReconciliationMatchData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `PersistReconciliationMatch`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, persistReconciliationMatch, PersistReconciliationMatchVariables } from '@factures-thibeault/data-connect-generated';

// The `PersistReconciliationMatch` mutation requires an argument of type `PersistReconciliationMatchVariables`:
const persistReconciliationMatchVars: PersistReconciliationMatchVariables = {
  id: ..., 
  statementLineId: ..., 
  expenseTransactionId: ..., 
  invoiceId: ..., 
  matchScore: ..., // optional
  matchMethod: ..., 
  status: ..., 
  confirmedById: ..., 
  confirmedAt: ..., // optional
  reason: ..., // optional
  details: ..., // optional
  lineStatus: ..., 
  transactionReconciliationStatus: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
  expectedMatchId: ..., // optional
  expectedExpenseTransactionId: ..., // optional
};

// Call the `persistReconciliationMatch()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await persistReconciliationMatch(persistReconciliationMatchVars);
// Variables can be defined inline as well.
const { data } = await persistReconciliationMatch({ id: ..., statementLineId: ..., expenseTransactionId: ..., invoiceId: ..., matchScore: ..., matchMethod: ..., status: ..., confirmedById: ..., confirmedAt: ..., reason: ..., details: ..., lineStatus: ..., transactionReconciliationStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await persistReconciliationMatch(dataConnect, persistReconciliationMatchVars);

console.log(data.reconciliationMatch_upsert);
console.log(data.creditCardStatementLine_update);
console.log(data.expenseTransaction_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
persistReconciliationMatch(persistReconciliationMatchVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatch_upsert);
  console.log(data.creditCardStatementLine_update);
  console.log(data.expenseTransaction_update);
  console.log(data.auditEvent_upsert);
});
```

### Using `PersistReconciliationMatch`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, persistReconciliationMatchRef, PersistReconciliationMatchVariables } from '@factures-thibeault/data-connect-generated';

// The `PersistReconciliationMatch` mutation requires an argument of type `PersistReconciliationMatchVariables`:
const persistReconciliationMatchVars: PersistReconciliationMatchVariables = {
  id: ..., 
  statementLineId: ..., 
  expenseTransactionId: ..., 
  invoiceId: ..., 
  matchScore: ..., // optional
  matchMethod: ..., 
  status: ..., 
  confirmedById: ..., 
  confirmedAt: ..., // optional
  reason: ..., // optional
  details: ..., // optional
  lineStatus: ..., 
  transactionReconciliationStatus: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
  expectedMatchId: ..., // optional
  expectedExpenseTransactionId: ..., // optional
};

// Call the `persistReconciliationMatchRef()` function to get a reference to the mutation.
const ref = persistReconciliationMatchRef(persistReconciliationMatchVars);
// Variables can be defined inline as well.
const ref = persistReconciliationMatchRef({ id: ..., statementLineId: ..., expenseTransactionId: ..., invoiceId: ..., matchScore: ..., matchMethod: ..., status: ..., confirmedById: ..., confirmedAt: ..., reason: ..., details: ..., lineStatus: ..., transactionReconciliationStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = persistReconciliationMatchRef(dataConnect, persistReconciliationMatchVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reconciliationMatch_upsert);
console.log(data.creditCardStatementLine_update);
console.log(data.expenseTransaction_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatch_upsert);
  console.log(data.creditCardStatementLine_update);
  console.log(data.expenseTransaction_update);
  console.log(data.auditEvent_upsert);
});
```

## ClearReconciliationMatch
You can execute the `ClearReconciliationMatch` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
clearReconciliationMatch(vars: ClearReconciliationMatchVariables): MutationPromise<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;

interface ClearReconciliationMatchRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearReconciliationMatchVariables): MutationRef<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;
}
export const clearReconciliationMatchRef: ClearReconciliationMatchRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
clearReconciliationMatch(dc: DataConnect, vars: ClearReconciliationMatchVariables): MutationPromise<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;

interface ClearReconciliationMatchRef {
  ...
  (dc: DataConnect, vars: ClearReconciliationMatchVariables): MutationRef<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;
}
export const clearReconciliationMatchRef: ClearReconciliationMatchRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the clearReconciliationMatchRef:
```typescript
const name = clearReconciliationMatchRef.operationName;
console.log(name);
```

### Variables
The `ClearReconciliationMatch` mutation requires an argument of type `ClearReconciliationMatchVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClearReconciliationMatchVariables {
  id: string;
  statementLineId: string;
  previousExpenseTransactionId: string;
  lineStatus: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `ClearReconciliationMatch` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClearReconciliationMatchData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClearReconciliationMatchData {
  reconciliationMatch_update?: ReconciliationMatch_Key | null;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `ClearReconciliationMatch`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, clearReconciliationMatch, ClearReconciliationMatchVariables } from '@factures-thibeault/data-connect-generated';

// The `ClearReconciliationMatch` mutation requires an argument of type `ClearReconciliationMatchVariables`:
const clearReconciliationMatchVars: ClearReconciliationMatchVariables = {
  id: ..., 
  statementLineId: ..., 
  previousExpenseTransactionId: ..., 
  lineStatus: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
};

// Call the `clearReconciliationMatch()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await clearReconciliationMatch(clearReconciliationMatchVars);
// Variables can be defined inline as well.
const { data } = await clearReconciliationMatch({ id: ..., statementLineId: ..., previousExpenseTransactionId: ..., lineStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await clearReconciliationMatch(dataConnect, clearReconciliationMatchVars);

console.log(data.reconciliationMatch_update);
console.log(data.creditCardStatementLine_update);
console.log(data.expenseTransaction_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
clearReconciliationMatch(clearReconciliationMatchVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatch_update);
  console.log(data.creditCardStatementLine_update);
  console.log(data.expenseTransaction_update);
  console.log(data.auditEvent_upsert);
});
```

### Using `ClearReconciliationMatch`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, clearReconciliationMatchRef, ClearReconciliationMatchVariables } from '@factures-thibeault/data-connect-generated';

// The `ClearReconciliationMatch` mutation requires an argument of type `ClearReconciliationMatchVariables`:
const clearReconciliationMatchVars: ClearReconciliationMatchVariables = {
  id: ..., 
  statementLineId: ..., 
  previousExpenseTransactionId: ..., 
  lineStatus: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
};

// Call the `clearReconciliationMatchRef()` function to get a reference to the mutation.
const ref = clearReconciliationMatchRef(clearReconciliationMatchVars);
// Variables can be defined inline as well.
const ref = clearReconciliationMatchRef({ id: ..., statementLineId: ..., previousExpenseTransactionId: ..., lineStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = clearReconciliationMatchRef(dataConnect, clearReconciliationMatchVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reconciliationMatch_update);
console.log(data.creditCardStatementLine_update);
console.log(data.expenseTransaction_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatch_update);
  console.log(data.creditCardStatementLine_update);
  console.log(data.expenseTransaction_update);
  console.log(data.auditEvent_upsert);
});
```

## PersistReconciliationMatchWithoutInvoice
You can execute the `PersistReconciliationMatchWithoutInvoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
persistReconciliationMatchWithoutInvoice(vars: PersistReconciliationMatchWithoutInvoiceVariables): MutationPromise<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;

interface PersistReconciliationMatchWithoutInvoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PersistReconciliationMatchWithoutInvoiceVariables): MutationRef<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;
}
export const persistReconciliationMatchWithoutInvoiceRef: PersistReconciliationMatchWithoutInvoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
persistReconciliationMatchWithoutInvoice(dc: DataConnect, vars: PersistReconciliationMatchWithoutInvoiceVariables): MutationPromise<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;

interface PersistReconciliationMatchWithoutInvoiceRef {
  ...
  (dc: DataConnect, vars: PersistReconciliationMatchWithoutInvoiceVariables): MutationRef<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;
}
export const persistReconciliationMatchWithoutInvoiceRef: PersistReconciliationMatchWithoutInvoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the persistReconciliationMatchWithoutInvoiceRef:
```typescript
const name = persistReconciliationMatchWithoutInvoiceRef.operationName;
console.log(name);
```

### Variables
The `PersistReconciliationMatchWithoutInvoice` mutation requires an argument of type `PersistReconciliationMatchWithoutInvoiceVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PersistReconciliationMatchWithoutInvoiceVariables {
  id: string;
  statementLineId: string;
  expenseTransactionId: string;
  matchScore?: number | null;
  matchMethod: string;
  status: string;
  confirmedById: string;
  confirmedAt?: TimestampString | null;
  reason?: string | null;
  details?: string | null;
  lineStatus: string;
  transactionReconciliationStatus: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
  expectedMatchId?: string | null;
  expectedExpenseTransactionId?: string | null;
}
```
### Return Type
Recall that executing the `PersistReconciliationMatchWithoutInvoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PersistReconciliationMatchWithoutInvoiceData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PersistReconciliationMatchWithoutInvoiceData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `PersistReconciliationMatchWithoutInvoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, persistReconciliationMatchWithoutInvoice, PersistReconciliationMatchWithoutInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `PersistReconciliationMatchWithoutInvoice` mutation requires an argument of type `PersistReconciliationMatchWithoutInvoiceVariables`:
const persistReconciliationMatchWithoutInvoiceVars: PersistReconciliationMatchWithoutInvoiceVariables = {
  id: ..., 
  statementLineId: ..., 
  expenseTransactionId: ..., 
  matchScore: ..., // optional
  matchMethod: ..., 
  status: ..., 
  confirmedById: ..., 
  confirmedAt: ..., // optional
  reason: ..., // optional
  details: ..., // optional
  lineStatus: ..., 
  transactionReconciliationStatus: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
  expectedMatchId: ..., // optional
  expectedExpenseTransactionId: ..., // optional
};

// Call the `persistReconciliationMatchWithoutInvoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await persistReconciliationMatchWithoutInvoice(persistReconciliationMatchWithoutInvoiceVars);
// Variables can be defined inline as well.
const { data } = await persistReconciliationMatchWithoutInvoice({ id: ..., statementLineId: ..., expenseTransactionId: ..., matchScore: ..., matchMethod: ..., status: ..., confirmedById: ..., confirmedAt: ..., reason: ..., details: ..., lineStatus: ..., transactionReconciliationStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await persistReconciliationMatchWithoutInvoice(dataConnect, persistReconciliationMatchWithoutInvoiceVars);

console.log(data.reconciliationMatch_upsert);
console.log(data.creditCardStatementLine_update);
console.log(data.expenseTransaction_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
persistReconciliationMatchWithoutInvoice(persistReconciliationMatchWithoutInvoiceVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatch_upsert);
  console.log(data.creditCardStatementLine_update);
  console.log(data.expenseTransaction_update);
  console.log(data.auditEvent_upsert);
});
```

### Using `PersistReconciliationMatchWithoutInvoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, persistReconciliationMatchWithoutInvoiceRef, PersistReconciliationMatchWithoutInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `PersistReconciliationMatchWithoutInvoice` mutation requires an argument of type `PersistReconciliationMatchWithoutInvoiceVariables`:
const persistReconciliationMatchWithoutInvoiceVars: PersistReconciliationMatchWithoutInvoiceVariables = {
  id: ..., 
  statementLineId: ..., 
  expenseTransactionId: ..., 
  matchScore: ..., // optional
  matchMethod: ..., 
  status: ..., 
  confirmedById: ..., 
  confirmedAt: ..., // optional
  reason: ..., // optional
  details: ..., // optional
  lineStatus: ..., 
  transactionReconciliationStatus: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
  expectedMatchId: ..., // optional
  expectedExpenseTransactionId: ..., // optional
};

// Call the `persistReconciliationMatchWithoutInvoiceRef()` function to get a reference to the mutation.
const ref = persistReconciliationMatchWithoutInvoiceRef(persistReconciliationMatchWithoutInvoiceVars);
// Variables can be defined inline as well.
const ref = persistReconciliationMatchWithoutInvoiceRef({ id: ..., statementLineId: ..., expenseTransactionId: ..., matchScore: ..., matchMethod: ..., status: ..., confirmedById: ..., confirmedAt: ..., reason: ..., details: ..., lineStatus: ..., transactionReconciliationStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = persistReconciliationMatchWithoutInvoiceRef(dataConnect, persistReconciliationMatchWithoutInvoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reconciliationMatch_upsert);
console.log(data.creditCardStatementLine_update);
console.log(data.expenseTransaction_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatch_upsert);
  console.log(data.creditCardStatementLine_update);
  console.log(data.expenseTransaction_update);
  console.log(data.auditEvent_upsert);
});
```

## PersistReconciliationLineStatus
You can execute the `PersistReconciliationLineStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
persistReconciliationLineStatus(vars: PersistReconciliationLineStatusVariables): MutationPromise<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;

interface PersistReconciliationLineStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PersistReconciliationLineStatusVariables): MutationRef<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;
}
export const persistReconciliationLineStatusRef: PersistReconciliationLineStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
persistReconciliationLineStatus(dc: DataConnect, vars: PersistReconciliationLineStatusVariables): MutationPromise<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;

interface PersistReconciliationLineStatusRef {
  ...
  (dc: DataConnect, vars: PersistReconciliationLineStatusVariables): MutationRef<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;
}
export const persistReconciliationLineStatusRef: PersistReconciliationLineStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the persistReconciliationLineStatusRef:
```typescript
const name = persistReconciliationLineStatusRef.operationName;
console.log(name);
```

### Variables
The `PersistReconciliationLineStatus` mutation requires an argument of type `PersistReconciliationLineStatusVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PersistReconciliationLineStatusVariables {
  id: string;
  statementLineId: string;
  status: string;
  reason: string;
  details?: string | null;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditAction: string;
  auditDetails: string;
  expectedMatchId?: string | null;
  expectedExpenseTransactionId?: string | null;
}
```
### Return Type
Recall that executing the `PersistReconciliationLineStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PersistReconciliationLineStatusData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PersistReconciliationLineStatusData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `PersistReconciliationLineStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, persistReconciliationLineStatus, PersistReconciliationLineStatusVariables } from '@factures-thibeault/data-connect-generated';

// The `PersistReconciliationLineStatus` mutation requires an argument of type `PersistReconciliationLineStatusVariables`:
const persistReconciliationLineStatusVars: PersistReconciliationLineStatusVariables = {
  id: ..., 
  statementLineId: ..., 
  status: ..., 
  reason: ..., 
  details: ..., // optional
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
  expectedMatchId: ..., // optional
  expectedExpenseTransactionId: ..., // optional
};

// Call the `persistReconciliationLineStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await persistReconciliationLineStatus(persistReconciliationLineStatusVars);
// Variables can be defined inline as well.
const { data } = await persistReconciliationLineStatus({ id: ..., statementLineId: ..., status: ..., reason: ..., details: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await persistReconciliationLineStatus(dataConnect, persistReconciliationLineStatusVars);

console.log(data.reconciliationMatch_upsert);
console.log(data.creditCardStatementLine_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
persistReconciliationLineStatus(persistReconciliationLineStatusVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatch_upsert);
  console.log(data.creditCardStatementLine_update);
  console.log(data.auditEvent_upsert);
});
```

### Using `PersistReconciliationLineStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, persistReconciliationLineStatusRef, PersistReconciliationLineStatusVariables } from '@factures-thibeault/data-connect-generated';

// The `PersistReconciliationLineStatus` mutation requires an argument of type `PersistReconciliationLineStatusVariables`:
const persistReconciliationLineStatusVars: PersistReconciliationLineStatusVariables = {
  id: ..., 
  statementLineId: ..., 
  status: ..., 
  reason: ..., 
  details: ..., // optional
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditAction: ..., 
  auditDetails: ..., 
  expectedMatchId: ..., // optional
  expectedExpenseTransactionId: ..., // optional
};

// Call the `persistReconciliationLineStatusRef()` function to get a reference to the mutation.
const ref = persistReconciliationLineStatusRef(persistReconciliationLineStatusVars);
// Variables can be defined inline as well.
const ref = persistReconciliationLineStatusRef({ id: ..., statementLineId: ..., status: ..., reason: ..., details: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = persistReconciliationLineStatusRef(dataConnect, persistReconciliationLineStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reconciliationMatch_upsert);
console.log(data.creditCardStatementLine_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationMatch_upsert);
  console.log(data.creditCardStatementLine_update);
  console.log(data.auditEvent_upsert);
});
```

## UpsertReconciliationOutsideControl
You can execute the `UpsertReconciliationOutsideControl` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
upsertReconciliationOutsideControl(vars: UpsertReconciliationOutsideControlVariables): MutationPromise<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;

interface UpsertReconciliationOutsideControlRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReconciliationOutsideControlVariables): MutationRef<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;
}
export const upsertReconciliationOutsideControlRef: UpsertReconciliationOutsideControlRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertReconciliationOutsideControl(dc: DataConnect, vars: UpsertReconciliationOutsideControlVariables): MutationPromise<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;

interface UpsertReconciliationOutsideControlRef {
  ...
  (dc: DataConnect, vars: UpsertReconciliationOutsideControlVariables): MutationRef<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;
}
export const upsertReconciliationOutsideControlRef: UpsertReconciliationOutsideControlRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertReconciliationOutsideControlRef:
```typescript
const name = upsertReconciliationOutsideControlRef.operationName;
console.log(name);
```

### Variables
The `UpsertReconciliationOutsideControl` mutation requires an argument of type `UpsertReconciliationOutsideControlVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertReconciliationOutsideControlVariables {
  id: string;
  statementId: string;
  expenseTransactionId: string;
  status: string;
  reason: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `UpsertReconciliationOutsideControl` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertReconciliationOutsideControlData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertReconciliationOutsideControlData {
  reconciliationOutsideControl_upsert: ReconciliationOutsideControl_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpsertReconciliationOutsideControl`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertReconciliationOutsideControl, UpsertReconciliationOutsideControlVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertReconciliationOutsideControl` mutation requires an argument of type `UpsertReconciliationOutsideControlVariables`:
const upsertReconciliationOutsideControlVars: UpsertReconciliationOutsideControlVariables = {
  id: ..., 
  statementId: ..., 
  expenseTransactionId: ..., 
  status: ..., 
  reason: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditDetails: ..., 
};

// Call the `upsertReconciliationOutsideControl()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertReconciliationOutsideControl(upsertReconciliationOutsideControlVars);
// Variables can be defined inline as well.
const { data } = await upsertReconciliationOutsideControl({ id: ..., statementId: ..., expenseTransactionId: ..., status: ..., reason: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertReconciliationOutsideControl(dataConnect, upsertReconciliationOutsideControlVars);

console.log(data.reconciliationOutsideControl_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
upsertReconciliationOutsideControl(upsertReconciliationOutsideControlVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationOutsideControl_upsert);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpsertReconciliationOutsideControl`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertReconciliationOutsideControlRef, UpsertReconciliationOutsideControlVariables } from '@factures-thibeault/data-connect-generated';

// The `UpsertReconciliationOutsideControl` mutation requires an argument of type `UpsertReconciliationOutsideControlVariables`:
const upsertReconciliationOutsideControlVars: UpsertReconciliationOutsideControlVariables = {
  id: ..., 
  statementId: ..., 
  expenseTransactionId: ..., 
  status: ..., 
  reason: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditDetails: ..., 
};

// Call the `upsertReconciliationOutsideControlRef()` function to get a reference to the mutation.
const ref = upsertReconciliationOutsideControlRef(upsertReconciliationOutsideControlVars);
// Variables can be defined inline as well.
const ref = upsertReconciliationOutsideControlRef({ id: ..., statementId: ..., expenseTransactionId: ..., status: ..., reason: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertReconciliationOutsideControlRef(dataConnect, upsertReconciliationOutsideControlVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reconciliationOutsideControl_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationOutsideControl_upsert);
  console.log(data.auditEvent_upsert);
});
```

## ResolveReconciliationOutsideControl
You can execute the `ResolveReconciliationOutsideControl` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
resolveReconciliationOutsideControl(vars: ResolveReconciliationOutsideControlVariables): MutationPromise<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;

interface ResolveReconciliationOutsideControlRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveReconciliationOutsideControlVariables): MutationRef<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;
}
export const resolveReconciliationOutsideControlRef: ResolveReconciliationOutsideControlRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
resolveReconciliationOutsideControl(dc: DataConnect, vars: ResolveReconciliationOutsideControlVariables): MutationPromise<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;

interface ResolveReconciliationOutsideControlRef {
  ...
  (dc: DataConnect, vars: ResolveReconciliationOutsideControlVariables): MutationRef<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;
}
export const resolveReconciliationOutsideControlRef: ResolveReconciliationOutsideControlRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the resolveReconciliationOutsideControlRef:
```typescript
const name = resolveReconciliationOutsideControlRef.operationName;
console.log(name);
```

### Variables
The `ResolveReconciliationOutsideControl` mutation requires an argument of type `ResolveReconciliationOutsideControlVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ResolveReconciliationOutsideControlVariables {
  id: string;
  status: string;
  resolvedById: string;
  resolutionNote: string;
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `ResolveReconciliationOutsideControl` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ResolveReconciliationOutsideControlData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ResolveReconciliationOutsideControlData {
  reconciliationOutsideControl_update?: ReconciliationOutsideControl_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `ResolveReconciliationOutsideControl`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, resolveReconciliationOutsideControl, ResolveReconciliationOutsideControlVariables } from '@factures-thibeault/data-connect-generated';

// The `ResolveReconciliationOutsideControl` mutation requires an argument of type `ResolveReconciliationOutsideControlVariables`:
const resolveReconciliationOutsideControlVars: ResolveReconciliationOutsideControlVariables = {
  id: ..., 
  status: ..., 
  resolvedById: ..., 
  resolutionNote: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditDetails: ..., 
};

// Call the `resolveReconciliationOutsideControl()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await resolveReconciliationOutsideControl(resolveReconciliationOutsideControlVars);
// Variables can be defined inline as well.
const { data } = await resolveReconciliationOutsideControl({ id: ..., status: ..., resolvedById: ..., resolutionNote: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await resolveReconciliationOutsideControl(dataConnect, resolveReconciliationOutsideControlVars);

console.log(data.reconciliationOutsideControl_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
resolveReconciliationOutsideControl(resolveReconciliationOutsideControlVars).then((response) => {
  const data = response.data;
  console.log(data.reconciliationOutsideControl_update);
  console.log(data.auditEvent_upsert);
});
```

### Using `ResolveReconciliationOutsideControl`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, resolveReconciliationOutsideControlRef, ResolveReconciliationOutsideControlVariables } from '@factures-thibeault/data-connect-generated';

// The `ResolveReconciliationOutsideControl` mutation requires an argument of type `ResolveReconciliationOutsideControlVariables`:
const resolveReconciliationOutsideControlVars: ResolveReconciliationOutsideControlVariables = {
  id: ..., 
  status: ..., 
  resolvedById: ..., 
  resolutionNote: ..., 
  auditEventId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditDetails: ..., 
};

// Call the `resolveReconciliationOutsideControlRef()` function to get a reference to the mutation.
const ref = resolveReconciliationOutsideControlRef(resolveReconciliationOutsideControlVars);
// Variables can be defined inline as well.
const ref = resolveReconciliationOutsideControlRef({ id: ..., status: ..., resolvedById: ..., resolutionNote: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = resolveReconciliationOutsideControlRef(dataConnect, resolveReconciliationOutsideControlVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reconciliationOutsideControl_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reconciliationOutsideControl_update);
  console.log(data.auditEvent_upsert);
});
```

## CreateInvoiceIntake
You can execute the `CreateInvoiceIntake` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
createInvoiceIntake(vars: CreateInvoiceIntakeVariables): MutationPromise<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;

interface CreateInvoiceIntakeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvoiceIntakeVariables): MutationRef<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;
}
export const createInvoiceIntakeRef: CreateInvoiceIntakeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInvoiceIntake(dc: DataConnect, vars: CreateInvoiceIntakeVariables): MutationPromise<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;

interface CreateInvoiceIntakeRef {
  ...
  (dc: DataConnect, vars: CreateInvoiceIntakeVariables): MutationRef<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;
}
export const createInvoiceIntakeRef: CreateInvoiceIntakeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInvoiceIntakeRef:
```typescript
const name = createInvoiceIntakeRef.operationName;
console.log(name);
```

### Variables
The `CreateInvoiceIntake` mutation requires an argument of type `CreateInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateInvoiceIntakeVariables {
  receiptId: string;
  storageFolder: string;
  photoCount: number;
}
```
### Return Type
Recall that executing the `CreateInvoiceIntake` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInvoiceIntakeData {
  invoiceIntake_upsert: InvoiceIntake_Key;
}
```
### Using `CreateInvoiceIntake`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInvoiceIntake, CreateInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `CreateInvoiceIntake` mutation requires an argument of type `CreateInvoiceIntakeVariables`:
const createInvoiceIntakeVars: CreateInvoiceIntakeVariables = {
  receiptId: ..., 
  storageFolder: ..., 
  photoCount: ..., 
};

// Call the `createInvoiceIntake()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInvoiceIntake(createInvoiceIntakeVars);
// Variables can be defined inline as well.
const { data } = await createInvoiceIntake({ receiptId: ..., storageFolder: ..., photoCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInvoiceIntake(dataConnect, createInvoiceIntakeVars);

console.log(data.invoiceIntake_upsert);

// Or, you can use the `Promise` API.
createInvoiceIntake(createInvoiceIntakeVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_upsert);
});
```

### Using `CreateInvoiceIntake`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInvoiceIntakeRef, CreateInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `CreateInvoiceIntake` mutation requires an argument of type `CreateInvoiceIntakeVariables`:
const createInvoiceIntakeVars: CreateInvoiceIntakeVariables = {
  receiptId: ..., 
  storageFolder: ..., 
  photoCount: ..., 
};

// Call the `createInvoiceIntakeRef()` function to get a reference to the mutation.
const ref = createInvoiceIntakeRef(createInvoiceIntakeVars);
// Variables can be defined inline as well.
const ref = createInvoiceIntakeRef({ receiptId: ..., storageFolder: ..., photoCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInvoiceIntakeRef(dataConnect, createInvoiceIntakeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_upsert);
});
```

## CreateInvoiceIntakeV2
You can execute the `CreateInvoiceIntakeV2` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
createInvoiceIntakeV2(vars: CreateInvoiceIntakeV2Variables): MutationPromise<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;

interface CreateInvoiceIntakeV2Ref {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvoiceIntakeV2Variables): MutationRef<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;
}
export const createInvoiceIntakeV2Ref: CreateInvoiceIntakeV2Ref;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInvoiceIntakeV2(dc: DataConnect, vars: CreateInvoiceIntakeV2Variables): MutationPromise<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;

interface CreateInvoiceIntakeV2Ref {
  ...
  (dc: DataConnect, vars: CreateInvoiceIntakeV2Variables): MutationRef<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;
}
export const createInvoiceIntakeV2Ref: CreateInvoiceIntakeV2Ref;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInvoiceIntakeV2Ref:
```typescript
const name = createInvoiceIntakeV2Ref.operationName;
console.log(name);
```

### Variables
The `CreateInvoiceIntakeV2` mutation requires an argument of type `CreateInvoiceIntakeV2Variables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateInvoiceIntakeV2Variables {
  receiptId: string;
  storageFolder: string;
  photoCount: number;
  clientVersion: string;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}
```
### Return Type
Recall that executing the `CreateInvoiceIntakeV2` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInvoiceIntakeV2Data`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInvoiceIntakeV2Data {
  invoiceIntake_upsert: InvoiceIntake_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `CreateInvoiceIntakeV2`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInvoiceIntakeV2, CreateInvoiceIntakeV2Variables } from '@factures-thibeault/data-connect-generated';

// The `CreateInvoiceIntakeV2` mutation requires an argument of type `CreateInvoiceIntakeV2Variables`:
const createInvoiceIntakeV2Vars: CreateInvoiceIntakeV2Variables = {
  receiptId: ..., 
  storageFolder: ..., 
  photoCount: ..., 
  clientVersion: ..., 
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `createInvoiceIntakeV2()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInvoiceIntakeV2(createInvoiceIntakeV2Vars);
// Variables can be defined inline as well.
const { data } = await createInvoiceIntakeV2({ receiptId: ..., storageFolder: ..., photoCount: ..., clientVersion: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInvoiceIntakeV2(dataConnect, createInvoiceIntakeV2Vars);

console.log(data.invoiceIntake_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
createInvoiceIntakeV2(createInvoiceIntakeV2Vars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_upsert);
  console.log(data.auditEvent_upsert);
});
```

### Using `CreateInvoiceIntakeV2`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInvoiceIntakeV2Ref, CreateInvoiceIntakeV2Variables } from '@factures-thibeault/data-connect-generated';

// The `CreateInvoiceIntakeV2` mutation requires an argument of type `CreateInvoiceIntakeV2Variables`:
const createInvoiceIntakeV2Vars: CreateInvoiceIntakeV2Variables = {
  receiptId: ..., 
  storageFolder: ..., 
  photoCount: ..., 
  clientVersion: ..., 
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `createInvoiceIntakeV2Ref()` function to get a reference to the mutation.
const ref = createInvoiceIntakeV2Ref(createInvoiceIntakeV2Vars);
// Variables can be defined inline as well.
const ref = createInvoiceIntakeV2Ref({ receiptId: ..., storageFolder: ..., photoCount: ..., clientVersion: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInvoiceIntakeV2Ref(dataConnect, createInvoiceIntakeV2Vars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_upsert);
  console.log(data.auditEvent_upsert);
});
```

## ClaimInvoiceIntakeProcessing
You can execute the `ClaimInvoiceIntakeProcessing` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
claimInvoiceIntakeProcessing(vars: ClaimInvoiceIntakeProcessingVariables): MutationPromise<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;

interface ClaimInvoiceIntakeProcessingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClaimInvoiceIntakeProcessingVariables): MutationRef<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;
}
export const claimInvoiceIntakeProcessingRef: ClaimInvoiceIntakeProcessingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
claimInvoiceIntakeProcessing(dc: DataConnect, vars: ClaimInvoiceIntakeProcessingVariables): MutationPromise<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;

interface ClaimInvoiceIntakeProcessingRef {
  ...
  (dc: DataConnect, vars: ClaimInvoiceIntakeProcessingVariables): MutationRef<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;
}
export const claimInvoiceIntakeProcessingRef: ClaimInvoiceIntakeProcessingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the claimInvoiceIntakeProcessingRef:
```typescript
const name = claimInvoiceIntakeProcessingRef.operationName;
console.log(name);
```

### Variables
The `ClaimInvoiceIntakeProcessing` mutation requires an argument of type `ClaimInvoiceIntakeProcessingVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClaimInvoiceIntakeProcessingVariables {
  receiptId: string;
  processingAttempts: number;
  maxAttempts?: number;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}
```
### Return Type
Recall that executing the `ClaimInvoiceIntakeProcessing` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClaimInvoiceIntakeProcessingData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClaimInvoiceIntakeProcessingData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `ClaimInvoiceIntakeProcessing`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, claimInvoiceIntakeProcessing, ClaimInvoiceIntakeProcessingVariables } from '@factures-thibeault/data-connect-generated';

// The `ClaimInvoiceIntakeProcessing` mutation requires an argument of type `ClaimInvoiceIntakeProcessingVariables`:
const claimInvoiceIntakeProcessingVars: ClaimInvoiceIntakeProcessingVariables = {
  receiptId: ..., 
  processingAttempts: ..., 
  maxAttempts: ..., // optional
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `claimInvoiceIntakeProcessing()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await claimInvoiceIntakeProcessing(claimInvoiceIntakeProcessingVars);
// Variables can be defined inline as well.
const { data } = await claimInvoiceIntakeProcessing({ receiptId: ..., processingAttempts: ..., maxAttempts: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await claimInvoiceIntakeProcessing(dataConnect, claimInvoiceIntakeProcessingVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
claimInvoiceIntakeProcessing(claimInvoiceIntakeProcessingVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `ClaimInvoiceIntakeProcessing`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, claimInvoiceIntakeProcessingRef, ClaimInvoiceIntakeProcessingVariables } from '@factures-thibeault/data-connect-generated';

// The `ClaimInvoiceIntakeProcessing` mutation requires an argument of type `ClaimInvoiceIntakeProcessingVariables`:
const claimInvoiceIntakeProcessingVars: ClaimInvoiceIntakeProcessingVariables = {
  receiptId: ..., 
  processingAttempts: ..., 
  maxAttempts: ..., // optional
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `claimInvoiceIntakeProcessingRef()` function to get a reference to the mutation.
const ref = claimInvoiceIntakeProcessingRef(claimInvoiceIntakeProcessingVars);
// Variables can be defined inline as well.
const ref = claimInvoiceIntakeProcessingRef({ receiptId: ..., processingAttempts: ..., maxAttempts: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = claimInvoiceIntakeProcessingRef(dataConnect, claimInvoiceIntakeProcessingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## RequeueStaleInvoiceIntake
You can execute the `RequeueStaleInvoiceIntake` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
requeueStaleInvoiceIntake(vars: RequeueStaleInvoiceIntakeVariables): MutationPromise<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;

interface RequeueStaleInvoiceIntakeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequeueStaleInvoiceIntakeVariables): MutationRef<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;
}
export const requeueStaleInvoiceIntakeRef: RequeueStaleInvoiceIntakeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
requeueStaleInvoiceIntake(dc: DataConnect, vars: RequeueStaleInvoiceIntakeVariables): MutationPromise<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;

interface RequeueStaleInvoiceIntakeRef {
  ...
  (dc: DataConnect, vars: RequeueStaleInvoiceIntakeVariables): MutationRef<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;
}
export const requeueStaleInvoiceIntakeRef: RequeueStaleInvoiceIntakeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the requeueStaleInvoiceIntakeRef:
```typescript
const name = requeueStaleInvoiceIntakeRef.operationName;
console.log(name);
```

### Variables
The `RequeueStaleInvoiceIntake` mutation requires an argument of type `RequeueStaleInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RequeueStaleInvoiceIntakeVariables {
  receiptId: string;
  staleBefore: TimestampString;
  maxAttempts: number;
  actorUid: string;
  actorRole: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `RequeueStaleInvoiceIntake` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RequeueStaleInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RequeueStaleInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `RequeueStaleInvoiceIntake`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, requeueStaleInvoiceIntake, RequeueStaleInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `RequeueStaleInvoiceIntake` mutation requires an argument of type `RequeueStaleInvoiceIntakeVariables`:
const requeueStaleInvoiceIntakeVars: RequeueStaleInvoiceIntakeVariables = {
  receiptId: ..., 
  staleBefore: ..., 
  maxAttempts: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `requeueStaleInvoiceIntake()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await requeueStaleInvoiceIntake(requeueStaleInvoiceIntakeVars);
// Variables can be defined inline as well.
const { data } = await requeueStaleInvoiceIntake({ receiptId: ..., staleBefore: ..., maxAttempts: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await requeueStaleInvoiceIntake(dataConnect, requeueStaleInvoiceIntakeVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
requeueStaleInvoiceIntake(requeueStaleInvoiceIntakeVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `RequeueStaleInvoiceIntake`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, requeueStaleInvoiceIntakeRef, RequeueStaleInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `RequeueStaleInvoiceIntake` mutation requires an argument of type `RequeueStaleInvoiceIntakeVariables`:
const requeueStaleInvoiceIntakeVars: RequeueStaleInvoiceIntakeVariables = {
  receiptId: ..., 
  staleBefore: ..., 
  maxAttempts: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `requeueStaleInvoiceIntakeRef()` function to get a reference to the mutation.
const ref = requeueStaleInvoiceIntakeRef(requeueStaleInvoiceIntakeVars);
// Variables can be defined inline as well.
const ref = requeueStaleInvoiceIntakeRef({ receiptId: ..., staleBefore: ..., maxAttempts: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = requeueStaleInvoiceIntakeRef(dataConnect, requeueStaleInvoiceIntakeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## UpdateInvoiceIntakeAiResult
You can execute the `UpdateInvoiceIntakeAiResult` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
updateInvoiceIntakeAiResult(vars: UpdateInvoiceIntakeAiResultVariables): MutationPromise<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;

interface UpdateInvoiceIntakeAiResultRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInvoiceIntakeAiResultVariables): MutationRef<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;
}
export const updateInvoiceIntakeAiResultRef: UpdateInvoiceIntakeAiResultRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInvoiceIntakeAiResult(dc: DataConnect, vars: UpdateInvoiceIntakeAiResultVariables): MutationPromise<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;

interface UpdateInvoiceIntakeAiResultRef {
  ...
  (dc: DataConnect, vars: UpdateInvoiceIntakeAiResultVariables): MutationRef<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;
}
export const updateInvoiceIntakeAiResultRef: UpdateInvoiceIntakeAiResultRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInvoiceIntakeAiResultRef:
```typescript
const name = updateInvoiceIntakeAiResultRef.operationName;
console.log(name);
```

### Variables
The `UpdateInvoiceIntakeAiResult` mutation requires an argument of type `UpdateInvoiceIntakeAiResultVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInvoiceIntakeAiResultVariables {
  receiptId: string;
  aiModel: string;
  aiConfidence: number;
  extractedVendor: string;
  extractedInvoiceNumber?: string | null;
  extractedInvoiceDate?: DateString | null;
  extractedSubtotalCents: Int64String;
  extractedTpsCents: Int64String;
  extractedTvqCents: Int64String;
  extractedTotalCents: Int64String;
  extractedLineItems: string;
  extractedCurrency: string;
  extractedSku?: string | null;
  extractedCategory?: string | null;
  extractedProjectId?: string | null;
  classificationAccountCode?: string | null;
  classificationCategory?: string | null;
  classificationSource: string;
  classificationConfidence: number;
  classificationStatus: string;
  aiNotes: string;
  processingStatus?: string | null;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}
```
### Return Type
Recall that executing the `UpdateInvoiceIntakeAiResult` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInvoiceIntakeAiResultData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInvoiceIntakeAiResultData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpdateInvoiceIntakeAiResult`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInvoiceIntakeAiResult, UpdateInvoiceIntakeAiResultVariables } from '@factures-thibeault/data-connect-generated';

// The `UpdateInvoiceIntakeAiResult` mutation requires an argument of type `UpdateInvoiceIntakeAiResultVariables`:
const updateInvoiceIntakeAiResultVars: UpdateInvoiceIntakeAiResultVariables = {
  receiptId: ..., 
  aiModel: ..., 
  aiConfidence: ..., 
  extractedVendor: ..., 
  extractedInvoiceNumber: ..., // optional
  extractedInvoiceDate: ..., // optional
  extractedSubtotalCents: ..., 
  extractedTpsCents: ..., 
  extractedTvqCents: ..., 
  extractedTotalCents: ..., 
  extractedLineItems: ..., 
  extractedCurrency: ..., 
  extractedSku: ..., // optional
  extractedCategory: ..., // optional
  extractedProjectId: ..., // optional
  classificationAccountCode: ..., // optional
  classificationCategory: ..., // optional
  classificationSource: ..., 
  classificationConfidence: ..., 
  classificationStatus: ..., 
  aiNotes: ..., 
  processingStatus: ..., // optional
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `updateInvoiceIntakeAiResult()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInvoiceIntakeAiResult(updateInvoiceIntakeAiResultVars);
// Variables can be defined inline as well.
const { data } = await updateInvoiceIntakeAiResult({ receiptId: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedLineItems: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., processingStatus: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInvoiceIntakeAiResult(dataConnect, updateInvoiceIntakeAiResultVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
updateInvoiceIntakeAiResult(updateInvoiceIntakeAiResultVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpdateInvoiceIntakeAiResult`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInvoiceIntakeAiResultRef, UpdateInvoiceIntakeAiResultVariables } from '@factures-thibeault/data-connect-generated';

// The `UpdateInvoiceIntakeAiResult` mutation requires an argument of type `UpdateInvoiceIntakeAiResultVariables`:
const updateInvoiceIntakeAiResultVars: UpdateInvoiceIntakeAiResultVariables = {
  receiptId: ..., 
  aiModel: ..., 
  aiConfidence: ..., 
  extractedVendor: ..., 
  extractedInvoiceNumber: ..., // optional
  extractedInvoiceDate: ..., // optional
  extractedSubtotalCents: ..., 
  extractedTpsCents: ..., 
  extractedTvqCents: ..., 
  extractedTotalCents: ..., 
  extractedLineItems: ..., 
  extractedCurrency: ..., 
  extractedSku: ..., // optional
  extractedCategory: ..., // optional
  extractedProjectId: ..., // optional
  classificationAccountCode: ..., // optional
  classificationCategory: ..., // optional
  classificationSource: ..., 
  classificationConfidence: ..., 
  classificationStatus: ..., 
  aiNotes: ..., 
  processingStatus: ..., // optional
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `updateInvoiceIntakeAiResultRef()` function to get a reference to the mutation.
const ref = updateInvoiceIntakeAiResultRef(updateInvoiceIntakeAiResultVars);
// Variables can be defined inline as well.
const ref = updateInvoiceIntakeAiResultRef({ receiptId: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedLineItems: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., processingStatus: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInvoiceIntakeAiResultRef(dataConnect, updateInvoiceIntakeAiResultVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## MarkInvoiceIntakeAiError
You can execute the `MarkInvoiceIntakeAiError` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
markInvoiceIntakeAiError(vars: MarkInvoiceIntakeAiErrorVariables): MutationPromise<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;

interface MarkInvoiceIntakeAiErrorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvoiceIntakeAiErrorVariables): MutationRef<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;
}
export const markInvoiceIntakeAiErrorRef: MarkInvoiceIntakeAiErrorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markInvoiceIntakeAiError(dc: DataConnect, vars: MarkInvoiceIntakeAiErrorVariables): MutationPromise<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;

interface MarkInvoiceIntakeAiErrorRef {
  ...
  (dc: DataConnect, vars: MarkInvoiceIntakeAiErrorVariables): MutationRef<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;
}
export const markInvoiceIntakeAiErrorRef: MarkInvoiceIntakeAiErrorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markInvoiceIntakeAiErrorRef:
```typescript
const name = markInvoiceIntakeAiErrorRef.operationName;
console.log(name);
```

### Variables
The `MarkInvoiceIntakeAiError` mutation requires an argument of type `MarkInvoiceIntakeAiErrorVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkInvoiceIntakeAiErrorVariables {
  receiptId: string;
  error: string;
  aiErrorCode?: string | null;
  accountingStatus?: string | null;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}
```
### Return Type
Recall that executing the `MarkInvoiceIntakeAiError` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkInvoiceIntakeAiErrorData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkInvoiceIntakeAiErrorData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `MarkInvoiceIntakeAiError`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markInvoiceIntakeAiError, MarkInvoiceIntakeAiErrorVariables } from '@factures-thibeault/data-connect-generated';

// The `MarkInvoiceIntakeAiError` mutation requires an argument of type `MarkInvoiceIntakeAiErrorVariables`:
const markInvoiceIntakeAiErrorVars: MarkInvoiceIntakeAiErrorVariables = {
  receiptId: ..., 
  error: ..., 
  aiErrorCode: ..., // optional
  accountingStatus: ..., // optional
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `markInvoiceIntakeAiError()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markInvoiceIntakeAiError(markInvoiceIntakeAiErrorVars);
// Variables can be defined inline as well.
const { data } = await markInvoiceIntakeAiError({ receiptId: ..., error: ..., aiErrorCode: ..., accountingStatus: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markInvoiceIntakeAiError(dataConnect, markInvoiceIntakeAiErrorVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
markInvoiceIntakeAiError(markInvoiceIntakeAiErrorVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `MarkInvoiceIntakeAiError`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markInvoiceIntakeAiErrorRef, MarkInvoiceIntakeAiErrorVariables } from '@factures-thibeault/data-connect-generated';

// The `MarkInvoiceIntakeAiError` mutation requires an argument of type `MarkInvoiceIntakeAiErrorVariables`:
const markInvoiceIntakeAiErrorVars: MarkInvoiceIntakeAiErrorVariables = {
  receiptId: ..., 
  error: ..., 
  aiErrorCode: ..., // optional
  accountingStatus: ..., // optional
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `markInvoiceIntakeAiErrorRef()` function to get a reference to the mutation.
const ref = markInvoiceIntakeAiErrorRef(markInvoiceIntakeAiErrorVars);
// Variables can be defined inline as well.
const ref = markInvoiceIntakeAiErrorRef({ receiptId: ..., error: ..., aiErrorCode: ..., accountingStatus: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markInvoiceIntakeAiErrorRef(dataConnect, markInvoiceIntakeAiErrorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## MarkInvoiceIntakeAiMaxAttempts
You can execute the `MarkInvoiceIntakeAiMaxAttempts` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
markInvoiceIntakeAiMaxAttempts(vars: MarkInvoiceIntakeAiMaxAttemptsVariables): MutationPromise<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;

interface MarkInvoiceIntakeAiMaxAttemptsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvoiceIntakeAiMaxAttemptsVariables): MutationRef<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;
}
export const markInvoiceIntakeAiMaxAttemptsRef: MarkInvoiceIntakeAiMaxAttemptsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markInvoiceIntakeAiMaxAttempts(dc: DataConnect, vars: MarkInvoiceIntakeAiMaxAttemptsVariables): MutationPromise<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;

interface MarkInvoiceIntakeAiMaxAttemptsRef {
  ...
  (dc: DataConnect, vars: MarkInvoiceIntakeAiMaxAttemptsVariables): MutationRef<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;
}
export const markInvoiceIntakeAiMaxAttemptsRef: MarkInvoiceIntakeAiMaxAttemptsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markInvoiceIntakeAiMaxAttemptsRef:
```typescript
const name = markInvoiceIntakeAiMaxAttemptsRef.operationName;
console.log(name);
```

### Variables
The `MarkInvoiceIntakeAiMaxAttempts` mutation requires an argument of type `MarkInvoiceIntakeAiMaxAttemptsVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkInvoiceIntakeAiMaxAttemptsVariables {
  receiptId: string;
  currentAttempts: number;
  decisionExceptions: string;
  decisionChecks: string;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}
```
### Return Type
Recall that executing the `MarkInvoiceIntakeAiMaxAttempts` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkInvoiceIntakeAiMaxAttemptsData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkInvoiceIntakeAiMaxAttemptsData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `MarkInvoiceIntakeAiMaxAttempts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markInvoiceIntakeAiMaxAttempts, MarkInvoiceIntakeAiMaxAttemptsVariables } from '@factures-thibeault/data-connect-generated';

// The `MarkInvoiceIntakeAiMaxAttempts` mutation requires an argument of type `MarkInvoiceIntakeAiMaxAttemptsVariables`:
const markInvoiceIntakeAiMaxAttemptsVars: MarkInvoiceIntakeAiMaxAttemptsVariables = {
  receiptId: ..., 
  currentAttempts: ..., 
  decisionExceptions: ..., 
  decisionChecks: ..., 
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `markInvoiceIntakeAiMaxAttempts()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markInvoiceIntakeAiMaxAttempts(markInvoiceIntakeAiMaxAttemptsVars);
// Variables can be defined inline as well.
const { data } = await markInvoiceIntakeAiMaxAttempts({ receiptId: ..., currentAttempts: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markInvoiceIntakeAiMaxAttempts(dataConnect, markInvoiceIntakeAiMaxAttemptsVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
markInvoiceIntakeAiMaxAttempts(markInvoiceIntakeAiMaxAttemptsVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `MarkInvoiceIntakeAiMaxAttempts`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markInvoiceIntakeAiMaxAttemptsRef, MarkInvoiceIntakeAiMaxAttemptsVariables } from '@factures-thibeault/data-connect-generated';

// The `MarkInvoiceIntakeAiMaxAttempts` mutation requires an argument of type `MarkInvoiceIntakeAiMaxAttemptsVariables`:
const markInvoiceIntakeAiMaxAttemptsVars: MarkInvoiceIntakeAiMaxAttemptsVariables = {
  receiptId: ..., 
  currentAttempts: ..., 
  decisionExceptions: ..., 
  decisionChecks: ..., 
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `markInvoiceIntakeAiMaxAttemptsRef()` function to get a reference to the mutation.
const ref = markInvoiceIntakeAiMaxAttemptsRef(markInvoiceIntakeAiMaxAttemptsVars);
// Variables can be defined inline as well.
const ref = markInvoiceIntakeAiMaxAttemptsRef({ receiptId: ..., currentAttempts: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markInvoiceIntakeAiMaxAttemptsRef(dataConnect, markInvoiceIntakeAiMaxAttemptsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## MarkInvoiceIntakeAutoPostingError
You can execute the `MarkInvoiceIntakeAutoPostingError` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
markInvoiceIntakeAutoPostingError(vars: MarkInvoiceIntakeAutoPostingErrorVariables): MutationPromise<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;

interface MarkInvoiceIntakeAutoPostingErrorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvoiceIntakeAutoPostingErrorVariables): MutationRef<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;
}
export const markInvoiceIntakeAutoPostingErrorRef: MarkInvoiceIntakeAutoPostingErrorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markInvoiceIntakeAutoPostingError(dc: DataConnect, vars: MarkInvoiceIntakeAutoPostingErrorVariables): MutationPromise<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;

interface MarkInvoiceIntakeAutoPostingErrorRef {
  ...
  (dc: DataConnect, vars: MarkInvoiceIntakeAutoPostingErrorVariables): MutationRef<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;
}
export const markInvoiceIntakeAutoPostingErrorRef: MarkInvoiceIntakeAutoPostingErrorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markInvoiceIntakeAutoPostingErrorRef:
```typescript
const name = markInvoiceIntakeAutoPostingErrorRef.operationName;
console.log(name);
```

### Variables
The `MarkInvoiceIntakeAutoPostingError` mutation requires an argument of type `MarkInvoiceIntakeAutoPostingErrorVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkInvoiceIntakeAutoPostingErrorVariables {
  receiptId: string;
  error: string;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
}
```
### Return Type
Recall that executing the `MarkInvoiceIntakeAutoPostingError` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkInvoiceIntakeAutoPostingErrorData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkInvoiceIntakeAutoPostingErrorData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `MarkInvoiceIntakeAutoPostingError`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markInvoiceIntakeAutoPostingError, MarkInvoiceIntakeAutoPostingErrorVariables } from '@factures-thibeault/data-connect-generated';

// The `MarkInvoiceIntakeAutoPostingError` mutation requires an argument of type `MarkInvoiceIntakeAutoPostingErrorVariables`:
const markInvoiceIntakeAutoPostingErrorVars: MarkInvoiceIntakeAutoPostingErrorVariables = {
  receiptId: ..., 
  error: ..., 
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `markInvoiceIntakeAutoPostingError()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markInvoiceIntakeAutoPostingError(markInvoiceIntakeAutoPostingErrorVars);
// Variables can be defined inline as well.
const { data } = await markInvoiceIntakeAutoPostingError({ receiptId: ..., error: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markInvoiceIntakeAutoPostingError(dataConnect, markInvoiceIntakeAutoPostingErrorVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
markInvoiceIntakeAutoPostingError(markInvoiceIntakeAutoPostingErrorVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `MarkInvoiceIntakeAutoPostingError`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markInvoiceIntakeAutoPostingErrorRef, MarkInvoiceIntakeAutoPostingErrorVariables } from '@factures-thibeault/data-connect-generated';

// The `MarkInvoiceIntakeAutoPostingError` mutation requires an argument of type `MarkInvoiceIntakeAutoPostingErrorVariables`:
const markInvoiceIntakeAutoPostingErrorVars: MarkInvoiceIntakeAutoPostingErrorVariables = {
  receiptId: ..., 
  error: ..., 
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
};

// Call the `markInvoiceIntakeAutoPostingErrorRef()` function to get a reference to the mutation.
const ref = markInvoiceIntakeAutoPostingErrorRef(markInvoiceIntakeAutoPostingErrorVars);
// Variables can be defined inline as well.
const ref = markInvoiceIntakeAutoPostingErrorRef({ receiptId: ..., error: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markInvoiceIntakeAutoPostingErrorRef(dataConnect, markInvoiceIntakeAutoPostingErrorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## UpdateInvoiceIntakeReview
You can execute the `UpdateInvoiceIntakeReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
updateInvoiceIntakeReview(vars: UpdateInvoiceIntakeReviewVariables): MutationPromise<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;

interface UpdateInvoiceIntakeReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInvoiceIntakeReviewVariables): MutationRef<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;
}
export const updateInvoiceIntakeReviewRef: UpdateInvoiceIntakeReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInvoiceIntakeReview(dc: DataConnect, vars: UpdateInvoiceIntakeReviewVariables): MutationPromise<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;

interface UpdateInvoiceIntakeReviewRef {
  ...
  (dc: DataConnect, vars: UpdateInvoiceIntakeReviewVariables): MutationRef<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;
}
export const updateInvoiceIntakeReviewRef: UpdateInvoiceIntakeReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInvoiceIntakeReviewRef:
```typescript
const name = updateInvoiceIntakeReviewRef.operationName;
console.log(name);
```

### Variables
The `UpdateInvoiceIntakeReview` mutation requires an argument of type `UpdateInvoiceIntakeReviewVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInvoiceIntakeReviewVariables {
  receiptId: string;
  status: string;
  extractedVendor: string;
  extractedInvoiceNumber?: string | null;
  extractedInvoiceDate?: DateString | null;
  extractedSubtotalCents: Int64String;
  extractedTpsCents: Int64String;
  extractedTvqCents: Int64String;
  extractedTotalCents: Int64String;
  extractedLineItems: string;
  extractedCurrency: string;
  extractedSku?: string | null;
  extractedCategory?: string | null;
  extractedProjectId?: string | null;
  classificationAccountCode?: string | null;
  classificationCategory?: string | null;
  classificationSource: string;
  classificationConfidence: number;
  classificationStatus: string;
  aiNotes: string;
  decisionExceptions?: string | null;
  decisionChecks?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
  expectedReviewRevision?: number;
  nextReviewRevision: number;
}
```
### Return Type
Recall that executing the `UpdateInvoiceIntakeReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInvoiceIntakeReviewData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInvoiceIntakeReviewData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `UpdateInvoiceIntakeReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInvoiceIntakeReview, UpdateInvoiceIntakeReviewVariables } from '@factures-thibeault/data-connect-generated';

// The `UpdateInvoiceIntakeReview` mutation requires an argument of type `UpdateInvoiceIntakeReviewVariables`:
const updateInvoiceIntakeReviewVars: UpdateInvoiceIntakeReviewVariables = {
  receiptId: ..., 
  status: ..., 
  extractedVendor: ..., 
  extractedInvoiceNumber: ..., // optional
  extractedInvoiceDate: ..., // optional
  extractedSubtotalCents: ..., 
  extractedTpsCents: ..., 
  extractedTvqCents: ..., 
  extractedTotalCents: ..., 
  extractedLineItems: ..., 
  extractedCurrency: ..., 
  extractedSku: ..., // optional
  extractedCategory: ..., // optional
  extractedProjectId: ..., // optional
  classificationAccountCode: ..., // optional
  classificationCategory: ..., // optional
  classificationSource: ..., 
  classificationConfidence: ..., 
  classificationStatus: ..., 
  aiNotes: ..., 
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
  expectedReviewRevision: ..., // optional
  nextReviewRevision: ..., 
};

// Call the `updateInvoiceIntakeReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInvoiceIntakeReview(updateInvoiceIntakeReviewVars);
// Variables can be defined inline as well.
const { data } = await updateInvoiceIntakeReview({ receiptId: ..., status: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedLineItems: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., decisionExceptions: ..., decisionChecks: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., expectedReviewRevision: ..., nextReviewRevision: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInvoiceIntakeReview(dataConnect, updateInvoiceIntakeReviewVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
updateInvoiceIntakeReview(updateInvoiceIntakeReviewVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `UpdateInvoiceIntakeReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInvoiceIntakeReviewRef, UpdateInvoiceIntakeReviewVariables } from '@factures-thibeault/data-connect-generated';

// The `UpdateInvoiceIntakeReview` mutation requires an argument of type `UpdateInvoiceIntakeReviewVariables`:
const updateInvoiceIntakeReviewVars: UpdateInvoiceIntakeReviewVariables = {
  receiptId: ..., 
  status: ..., 
  extractedVendor: ..., 
  extractedInvoiceNumber: ..., // optional
  extractedInvoiceDate: ..., // optional
  extractedSubtotalCents: ..., 
  extractedTpsCents: ..., 
  extractedTvqCents: ..., 
  extractedTotalCents: ..., 
  extractedLineItems: ..., 
  extractedCurrency: ..., 
  extractedSku: ..., // optional
  extractedCategory: ..., // optional
  extractedProjectId: ..., // optional
  classificationAccountCode: ..., // optional
  classificationCategory: ..., // optional
  classificationSource: ..., 
  classificationConfidence: ..., 
  classificationStatus: ..., 
  aiNotes: ..., 
  decisionExceptions: ..., // optional
  decisionChecks: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
  expectedReviewRevision: ..., // optional
  nextReviewRevision: ..., 
};

// Call the `updateInvoiceIntakeReviewRef()` function to get a reference to the mutation.
const ref = updateInvoiceIntakeReviewRef(updateInvoiceIntakeReviewVars);
// Variables can be defined inline as well.
const ref = updateInvoiceIntakeReviewRef({ receiptId: ..., status: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedLineItems: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., decisionExceptions: ..., decisionChecks: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., expectedReviewRevision: ..., nextReviewRevision: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInvoiceIntakeReviewRef(dataConnect, updateInvoiceIntakeReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## DiscardInvoiceIntake
You can execute the `DiscardInvoiceIntake` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
discardInvoiceIntake(vars: DiscardInvoiceIntakeVariables): MutationPromise<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;

interface DiscardInvoiceIntakeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DiscardInvoiceIntakeVariables): MutationRef<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;
}
export const discardInvoiceIntakeRef: DiscardInvoiceIntakeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
discardInvoiceIntake(dc: DataConnect, vars: DiscardInvoiceIntakeVariables): MutationPromise<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;

interface DiscardInvoiceIntakeRef {
  ...
  (dc: DataConnect, vars: DiscardInvoiceIntakeVariables): MutationRef<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;
}
export const discardInvoiceIntakeRef: DiscardInvoiceIntakeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the discardInvoiceIntakeRef:
```typescript
const name = discardInvoiceIntakeRef.operationName;
console.log(name);
```

### Variables
The `DiscardInvoiceIntake` mutation requires an argument of type `DiscardInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DiscardInvoiceIntakeVariables {
  receiptId: string;
  actorUid: string;
  actorRole: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `DiscardInvoiceIntake` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DiscardInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DiscardInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `DiscardInvoiceIntake`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, discardInvoiceIntake, DiscardInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `DiscardInvoiceIntake` mutation requires an argument of type `DiscardInvoiceIntakeVariables`:
const discardInvoiceIntakeVars: DiscardInvoiceIntakeVariables = {
  receiptId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `discardInvoiceIntake()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await discardInvoiceIntake(discardInvoiceIntakeVars);
// Variables can be defined inline as well.
const { data } = await discardInvoiceIntake({ receiptId: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await discardInvoiceIntake(dataConnect, discardInvoiceIntakeVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
discardInvoiceIntake(discardInvoiceIntakeVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `DiscardInvoiceIntake`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, discardInvoiceIntakeRef, DiscardInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `DiscardInvoiceIntake` mutation requires an argument of type `DiscardInvoiceIntakeVariables`:
const discardInvoiceIntakeVars: DiscardInvoiceIntakeVariables = {
  receiptId: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `discardInvoiceIntakeRef()` function to get a reference to the mutation.
const ref = discardInvoiceIntakeRef(discardInvoiceIntakeVars);
// Variables can be defined inline as well.
const ref = discardInvoiceIntakeRef({ receiptId: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = discardInvoiceIntakeRef(dataConnect, discardInvoiceIntakeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## DeletePostedInvoice
You can execute the `DeletePostedInvoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
deletePostedInvoice(vars: DeletePostedInvoiceVariables): MutationPromise<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;

interface DeletePostedInvoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePostedInvoiceVariables): MutationRef<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;
}
export const deletePostedInvoiceRef: DeletePostedInvoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePostedInvoice(dc: DataConnect, vars: DeletePostedInvoiceVariables): MutationPromise<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;

interface DeletePostedInvoiceRef {
  ...
  (dc: DataConnect, vars: DeletePostedInvoiceVariables): MutationRef<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;
}
export const deletePostedInvoiceRef: DeletePostedInvoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePostedInvoiceRef:
```typescript
const name = deletePostedInvoiceRef.operationName;
console.log(name);
```

### Variables
The `DeletePostedInvoice` mutation requires an argument of type `DeletePostedInvoiceVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePostedInvoiceVariables {
  invoiceId: string;
  transactionId: string;
  receiptId: string;
  writeIntake: boolean;
  reason: string;
  actorUid: string;
  actorRole: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `DeletePostedInvoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePostedInvoiceData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePostedInvoiceData {
  invoice_updateMany: number;
  expenseTransaction_updateMany: number;
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `DeletePostedInvoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePostedInvoice, DeletePostedInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `DeletePostedInvoice` mutation requires an argument of type `DeletePostedInvoiceVariables`:
const deletePostedInvoiceVars: DeletePostedInvoiceVariables = {
  invoiceId: ..., 
  transactionId: ..., 
  receiptId: ..., 
  writeIntake: ..., 
  reason: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deletePostedInvoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePostedInvoice(deletePostedInvoiceVars);
// Variables can be defined inline as well.
const { data } = await deletePostedInvoice({ invoiceId: ..., transactionId: ..., receiptId: ..., writeIntake: ..., reason: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePostedInvoice(dataConnect, deletePostedInvoiceVars);

console.log(data.invoice_updateMany);
console.log(data.expenseTransaction_updateMany);
console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
deletePostedInvoice(deletePostedInvoiceVars).then((response) => {
  const data = response.data;
  console.log(data.invoice_updateMany);
  console.log(data.expenseTransaction_updateMany);
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

### Using `DeletePostedInvoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePostedInvoiceRef, DeletePostedInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `DeletePostedInvoice` mutation requires an argument of type `DeletePostedInvoiceVariables`:
const deletePostedInvoiceVars: DeletePostedInvoiceVariables = {
  invoiceId: ..., 
  transactionId: ..., 
  receiptId: ..., 
  writeIntake: ..., 
  reason: ..., 
  actorUid: ..., 
  actorRole: ..., 
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `deletePostedInvoiceRef()` function to get a reference to the mutation.
const ref = deletePostedInvoiceRef(deletePostedInvoiceVars);
// Variables can be defined inline as well.
const ref = deletePostedInvoiceRef({ invoiceId: ..., transactionId: ..., receiptId: ..., writeIntake: ..., reason: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePostedInvoiceRef(dataConnect, deletePostedInvoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoice_updateMany);
console.log(data.expenseTransaction_updateMany);
console.log(data.invoiceIntake_updateMany);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoice_updateMany);
  console.log(data.expenseTransaction_updateMany);
  console.log(data.invoiceIntake_updateMany);
  console.log(data.auditEvent_upsert);
});
```

## MarkInvoiceIntakePostingError
You can execute the `MarkInvoiceIntakePostingError` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
markInvoiceIntakePostingError(vars: MarkInvoiceIntakePostingErrorVariables): MutationPromise<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;

interface MarkInvoiceIntakePostingErrorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvoiceIntakePostingErrorVariables): MutationRef<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;
}
export const markInvoiceIntakePostingErrorRef: MarkInvoiceIntakePostingErrorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markInvoiceIntakePostingError(dc: DataConnect, vars: MarkInvoiceIntakePostingErrorVariables): MutationPromise<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;

interface MarkInvoiceIntakePostingErrorRef {
  ...
  (dc: DataConnect, vars: MarkInvoiceIntakePostingErrorVariables): MutationRef<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;
}
export const markInvoiceIntakePostingErrorRef: MarkInvoiceIntakePostingErrorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markInvoiceIntakePostingErrorRef:
```typescript
const name = markInvoiceIntakePostingErrorRef.operationName;
console.log(name);
```

### Variables
The `MarkInvoiceIntakePostingError` mutation requires an argument of type `MarkInvoiceIntakePostingErrorVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkInvoiceIntakePostingErrorVariables {
  receiptId: string;
}
```
### Return Type
Recall that executing the `MarkInvoiceIntakePostingError` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkInvoiceIntakePostingErrorData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkInvoiceIntakePostingErrorData {
  invoiceIntake_updateMany: number;
}
```
### Using `MarkInvoiceIntakePostingError`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markInvoiceIntakePostingError, MarkInvoiceIntakePostingErrorVariables } from '@factures-thibeault/data-connect-generated';

// The `MarkInvoiceIntakePostingError` mutation requires an argument of type `MarkInvoiceIntakePostingErrorVariables`:
const markInvoiceIntakePostingErrorVars: MarkInvoiceIntakePostingErrorVariables = {
  receiptId: ..., 
};

// Call the `markInvoiceIntakePostingError()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markInvoiceIntakePostingError(markInvoiceIntakePostingErrorVars);
// Variables can be defined inline as well.
const { data } = await markInvoiceIntakePostingError({ receiptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markInvoiceIntakePostingError(dataConnect, markInvoiceIntakePostingErrorVars);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
markInvoiceIntakePostingError(markInvoiceIntakePostingErrorVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

### Using `MarkInvoiceIntakePostingError`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markInvoiceIntakePostingErrorRef, MarkInvoiceIntakePostingErrorVariables } from '@factures-thibeault/data-connect-generated';

// The `MarkInvoiceIntakePostingError` mutation requires an argument of type `MarkInvoiceIntakePostingErrorVariables`:
const markInvoiceIntakePostingErrorVars: MarkInvoiceIntakePostingErrorVariables = {
  receiptId: ..., 
};

// Call the `markInvoiceIntakePostingErrorRef()` function to get a reference to the mutation.
const ref = markInvoiceIntakePostingErrorRef(markInvoiceIntakePostingErrorVars);
// Variables can be defined inline as well.
const ref = markInvoiceIntakePostingErrorRef({ receiptId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markInvoiceIntakePostingErrorRef(dataConnect, markInvoiceIntakePostingErrorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

## RetryInvoiceIntakeAi
You can execute the `RetryInvoiceIntakeAi` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
retryInvoiceIntakeAi(vars: RetryInvoiceIntakeAiVariables): MutationPromise<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;

interface RetryInvoiceIntakeAiRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RetryInvoiceIntakeAiVariables): MutationRef<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;
}
export const retryInvoiceIntakeAiRef: RetryInvoiceIntakeAiRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
retryInvoiceIntakeAi(dc: DataConnect, vars: RetryInvoiceIntakeAiVariables): MutationPromise<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;

interface RetryInvoiceIntakeAiRef {
  ...
  (dc: DataConnect, vars: RetryInvoiceIntakeAiVariables): MutationRef<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;
}
export const retryInvoiceIntakeAiRef: RetryInvoiceIntakeAiRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the retryInvoiceIntakeAiRef:
```typescript
const name = retryInvoiceIntakeAiRef.operationName;
console.log(name);
```

### Variables
The `RetryInvoiceIntakeAi` mutation requires an argument of type `RetryInvoiceIntakeAiVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RetryInvoiceIntakeAiVariables {
  receiptId: string;
}
```
### Return Type
Recall that executing the `RetryInvoiceIntakeAi` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RetryInvoiceIntakeAiData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RetryInvoiceIntakeAiData {
  invoiceIntake_updateMany: number;
}
```
### Using `RetryInvoiceIntakeAi`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, retryInvoiceIntakeAi, RetryInvoiceIntakeAiVariables } from '@factures-thibeault/data-connect-generated';

// The `RetryInvoiceIntakeAi` mutation requires an argument of type `RetryInvoiceIntakeAiVariables`:
const retryInvoiceIntakeAiVars: RetryInvoiceIntakeAiVariables = {
  receiptId: ..., 
};

// Call the `retryInvoiceIntakeAi()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await retryInvoiceIntakeAi(retryInvoiceIntakeAiVars);
// Variables can be defined inline as well.
const { data } = await retryInvoiceIntakeAi({ receiptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await retryInvoiceIntakeAi(dataConnect, retryInvoiceIntakeAiVars);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
retryInvoiceIntakeAi(retryInvoiceIntakeAiVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

### Using `RetryInvoiceIntakeAi`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, retryInvoiceIntakeAiRef, RetryInvoiceIntakeAiVariables } from '@factures-thibeault/data-connect-generated';

// The `RetryInvoiceIntakeAi` mutation requires an argument of type `RetryInvoiceIntakeAiVariables`:
const retryInvoiceIntakeAiVars: RetryInvoiceIntakeAiVariables = {
  receiptId: ..., 
};

// Call the `retryInvoiceIntakeAiRef()` function to get a reference to the mutation.
const ref = retryInvoiceIntakeAiRef(retryInvoiceIntakeAiVars);
// Variables can be defined inline as well.
const ref = retryInvoiceIntakeAiRef({ receiptId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = retryInvoiceIntakeAiRef(dataConnect, retryInvoiceIntakeAiVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

## RetryInvoiceIntakeAiTransient
You can execute the `RetryInvoiceIntakeAiTransient` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
retryInvoiceIntakeAiTransient(vars: RetryInvoiceIntakeAiTransientVariables): MutationPromise<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;

interface RetryInvoiceIntakeAiTransientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RetryInvoiceIntakeAiTransientVariables): MutationRef<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;
}
export const retryInvoiceIntakeAiTransientRef: RetryInvoiceIntakeAiTransientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
retryInvoiceIntakeAiTransient(dc: DataConnect, vars: RetryInvoiceIntakeAiTransientVariables): MutationPromise<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;

interface RetryInvoiceIntakeAiTransientRef {
  ...
  (dc: DataConnect, vars: RetryInvoiceIntakeAiTransientVariables): MutationRef<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;
}
export const retryInvoiceIntakeAiTransientRef: RetryInvoiceIntakeAiTransientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the retryInvoiceIntakeAiTransientRef:
```typescript
const name = retryInvoiceIntakeAiTransientRef.operationName;
console.log(name);
```

### Variables
The `RetryInvoiceIntakeAiTransient` mutation requires an argument of type `RetryInvoiceIntakeAiTransientVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RetryInvoiceIntakeAiTransientVariables {
  receiptId: string;
}
```
### Return Type
Recall that executing the `RetryInvoiceIntakeAiTransient` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RetryInvoiceIntakeAiTransientData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RetryInvoiceIntakeAiTransientData {
  invoiceIntake_updateMany: number;
}
```
### Using `RetryInvoiceIntakeAiTransient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, retryInvoiceIntakeAiTransient, RetryInvoiceIntakeAiTransientVariables } from '@factures-thibeault/data-connect-generated';

// The `RetryInvoiceIntakeAiTransient` mutation requires an argument of type `RetryInvoiceIntakeAiTransientVariables`:
const retryInvoiceIntakeAiTransientVars: RetryInvoiceIntakeAiTransientVariables = {
  receiptId: ..., 
};

// Call the `retryInvoiceIntakeAiTransient()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await retryInvoiceIntakeAiTransient(retryInvoiceIntakeAiTransientVars);
// Variables can be defined inline as well.
const { data } = await retryInvoiceIntakeAiTransient({ receiptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await retryInvoiceIntakeAiTransient(dataConnect, retryInvoiceIntakeAiTransientVars);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
retryInvoiceIntakeAiTransient(retryInvoiceIntakeAiTransientVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

### Using `RetryInvoiceIntakeAiTransient`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, retryInvoiceIntakeAiTransientRef, RetryInvoiceIntakeAiTransientVariables } from '@factures-thibeault/data-connect-generated';

// The `RetryInvoiceIntakeAiTransient` mutation requires an argument of type `RetryInvoiceIntakeAiTransientVariables`:
const retryInvoiceIntakeAiTransientVars: RetryInvoiceIntakeAiTransientVariables = {
  receiptId: ..., 
};

// Call the `retryInvoiceIntakeAiTransientRef()` function to get a reference to the mutation.
const ref = retryInvoiceIntakeAiTransientRef(retryInvoiceIntakeAiTransientVars);
// Variables can be defined inline as well.
const ref = retryInvoiceIntakeAiTransientRef({ receiptId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = retryInvoiceIntakeAiTransientRef(dataConnect, retryInvoiceIntakeAiTransientVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

## RetryInvoiceIntakeAiTransientV2
You can execute the `RetryInvoiceIntakeAiTransientV2` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
retryInvoiceIntakeAiTransientV2(vars: RetryInvoiceIntakeAiTransientV2Variables): MutationPromise<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;

interface RetryInvoiceIntakeAiTransientV2Ref {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RetryInvoiceIntakeAiTransientV2Variables): MutationRef<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;
}
export const retryInvoiceIntakeAiTransientV2Ref: RetryInvoiceIntakeAiTransientV2Ref;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
retryInvoiceIntakeAiTransientV2(dc: DataConnect, vars: RetryInvoiceIntakeAiTransientV2Variables): MutationPromise<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;

interface RetryInvoiceIntakeAiTransientV2Ref {
  ...
  (dc: DataConnect, vars: RetryInvoiceIntakeAiTransientV2Variables): MutationRef<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;
}
export const retryInvoiceIntakeAiTransientV2Ref: RetryInvoiceIntakeAiTransientV2Ref;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the retryInvoiceIntakeAiTransientV2Ref:
```typescript
const name = retryInvoiceIntakeAiTransientV2Ref.operationName;
console.log(name);
```

### Variables
The `RetryInvoiceIntakeAiTransientV2` mutation requires an argument of type `RetryInvoiceIntakeAiTransientV2Variables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RetryInvoiceIntakeAiTransientV2Variables {
  receiptId: string;
  invoiceId: string;
  storageFolder: string;
}
```
### Return Type
Recall that executing the `RetryInvoiceIntakeAiTransientV2` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RetryInvoiceIntakeAiTransientV2Data`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RetryInvoiceIntakeAiTransientV2Data {
  invoiceIntake_updateMany: number;
}
```
### Using `RetryInvoiceIntakeAiTransientV2`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, retryInvoiceIntakeAiTransientV2, RetryInvoiceIntakeAiTransientV2Variables } from '@factures-thibeault/data-connect-generated';

// The `RetryInvoiceIntakeAiTransientV2` mutation requires an argument of type `RetryInvoiceIntakeAiTransientV2Variables`:
const retryInvoiceIntakeAiTransientV2Vars: RetryInvoiceIntakeAiTransientV2Variables = {
  receiptId: ..., 
  invoiceId: ..., 
  storageFolder: ..., 
};

// Call the `retryInvoiceIntakeAiTransientV2()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await retryInvoiceIntakeAiTransientV2(retryInvoiceIntakeAiTransientV2Vars);
// Variables can be defined inline as well.
const { data } = await retryInvoiceIntakeAiTransientV2({ receiptId: ..., invoiceId: ..., storageFolder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await retryInvoiceIntakeAiTransientV2(dataConnect, retryInvoiceIntakeAiTransientV2Vars);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
retryInvoiceIntakeAiTransientV2(retryInvoiceIntakeAiTransientV2Vars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

### Using `RetryInvoiceIntakeAiTransientV2`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, retryInvoiceIntakeAiTransientV2Ref, RetryInvoiceIntakeAiTransientV2Variables } from '@factures-thibeault/data-connect-generated';

// The `RetryInvoiceIntakeAiTransientV2` mutation requires an argument of type `RetryInvoiceIntakeAiTransientV2Variables`:
const retryInvoiceIntakeAiTransientV2Vars: RetryInvoiceIntakeAiTransientV2Variables = {
  receiptId: ..., 
  invoiceId: ..., 
  storageFolder: ..., 
};

// Call the `retryInvoiceIntakeAiTransientV2Ref()` function to get a reference to the mutation.
const ref = retryInvoiceIntakeAiTransientV2Ref(retryInvoiceIntakeAiTransientV2Vars);
// Variables can be defined inline as well.
const ref = retryInvoiceIntakeAiTransientV2Ref({ receiptId: ..., invoiceId: ..., storageFolder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = retryInvoiceIntakeAiTransientV2Ref(dataConnect, retryInvoiceIntakeAiTransientV2Vars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

## RetryInvoiceIntakeAiReviewV2
You can execute the `RetryInvoiceIntakeAiReviewV2` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
retryInvoiceIntakeAiReviewV2(vars: RetryInvoiceIntakeAiReviewV2Variables): MutationPromise<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;

interface RetryInvoiceIntakeAiReviewV2Ref {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RetryInvoiceIntakeAiReviewV2Variables): MutationRef<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;
}
export const retryInvoiceIntakeAiReviewV2Ref: RetryInvoiceIntakeAiReviewV2Ref;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
retryInvoiceIntakeAiReviewV2(dc: DataConnect, vars: RetryInvoiceIntakeAiReviewV2Variables): MutationPromise<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;

interface RetryInvoiceIntakeAiReviewV2Ref {
  ...
  (dc: DataConnect, vars: RetryInvoiceIntakeAiReviewV2Variables): MutationRef<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;
}
export const retryInvoiceIntakeAiReviewV2Ref: RetryInvoiceIntakeAiReviewV2Ref;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the retryInvoiceIntakeAiReviewV2Ref:
```typescript
const name = retryInvoiceIntakeAiReviewV2Ref.operationName;
console.log(name);
```

### Variables
The `RetryInvoiceIntakeAiReviewV2` mutation requires an argument of type `RetryInvoiceIntakeAiReviewV2Variables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RetryInvoiceIntakeAiReviewV2Variables {
  receiptId: string;
  currentAttempts: number;
  maxAttempts: number;
}
```
### Return Type
Recall that executing the `RetryInvoiceIntakeAiReviewV2` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RetryInvoiceIntakeAiReviewV2Data`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RetryInvoiceIntakeAiReviewV2Data {
  invoiceIntake_updateMany: number;
}
```
### Using `RetryInvoiceIntakeAiReviewV2`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, retryInvoiceIntakeAiReviewV2, RetryInvoiceIntakeAiReviewV2Variables } from '@factures-thibeault/data-connect-generated';

// The `RetryInvoiceIntakeAiReviewV2` mutation requires an argument of type `RetryInvoiceIntakeAiReviewV2Variables`:
const retryInvoiceIntakeAiReviewV2Vars: RetryInvoiceIntakeAiReviewV2Variables = {
  receiptId: ..., 
  currentAttempts: ..., 
  maxAttempts: ..., 
};

// Call the `retryInvoiceIntakeAiReviewV2()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await retryInvoiceIntakeAiReviewV2(retryInvoiceIntakeAiReviewV2Vars);
// Variables can be defined inline as well.
const { data } = await retryInvoiceIntakeAiReviewV2({ receiptId: ..., currentAttempts: ..., maxAttempts: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await retryInvoiceIntakeAiReviewV2(dataConnect, retryInvoiceIntakeAiReviewV2Vars);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
retryInvoiceIntakeAiReviewV2(retryInvoiceIntakeAiReviewV2Vars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

### Using `RetryInvoiceIntakeAiReviewV2`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, retryInvoiceIntakeAiReviewV2Ref, RetryInvoiceIntakeAiReviewV2Variables } from '@factures-thibeault/data-connect-generated';

// The `RetryInvoiceIntakeAiReviewV2` mutation requires an argument of type `RetryInvoiceIntakeAiReviewV2Variables`:
const retryInvoiceIntakeAiReviewV2Vars: RetryInvoiceIntakeAiReviewV2Variables = {
  receiptId: ..., 
  currentAttempts: ..., 
  maxAttempts: ..., 
};

// Call the `retryInvoiceIntakeAiReviewV2Ref()` function to get a reference to the mutation.
const ref = retryInvoiceIntakeAiReviewV2Ref(retryInvoiceIntakeAiReviewV2Vars);
// Variables can be defined inline as well.
const ref = retryInvoiceIntakeAiReviewV2Ref({ receiptId: ..., currentAttempts: ..., maxAttempts: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = retryInvoiceIntakeAiReviewV2Ref(dataConnect, retryInvoiceIntakeAiReviewV2Vars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
});
```

## MaterializeInvoiceIntakeV2
You can execute the `MaterializeInvoiceIntakeV2` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
materializeInvoiceIntakeV2(vars: MaterializeInvoiceIntakeV2Variables): MutationPromise<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;

interface MaterializeInvoiceIntakeV2Ref {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MaterializeInvoiceIntakeV2Variables): MutationRef<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;
}
export const materializeInvoiceIntakeV2Ref: MaterializeInvoiceIntakeV2Ref;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
materializeInvoiceIntakeV2(dc: DataConnect, vars: MaterializeInvoiceIntakeV2Variables): MutationPromise<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;

interface MaterializeInvoiceIntakeV2Ref {
  ...
  (dc: DataConnect, vars: MaterializeInvoiceIntakeV2Variables): MutationRef<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;
}
export const materializeInvoiceIntakeV2Ref: MaterializeInvoiceIntakeV2Ref;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the materializeInvoiceIntakeV2Ref:
```typescript
const name = materializeInvoiceIntakeV2Ref.operationName;
console.log(name);
```

### Variables
The `MaterializeInvoiceIntakeV2` mutation requires an argument of type `MaterializeInvoiceIntakeV2Variables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MaterializeInvoiceIntakeV2Variables {
  receiptId: string;
  transactionId: string;
  invoiceId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  lineItems: string;
  currency: string;
  sku?: string | null;
  category: string;
  account?: ExpenseAccount_Key | null;
  cardId: string;
  statementPeriod?: CardStatementPeriod_Key | null;
  project?: Project_Key | null;
  storageFolder: string;
  classificationNote: string;
  expectedProcessingStatus: string;
  classificationSource: string;
  classificationStatus: string;
  actorUid?: string | null;
  actorRole?: string | null;
  writeAudit?: boolean | null;
  auditEventId?: string | null;
  auditDetails?: string | null;
  photoCount: number;
  photo1Id: string;
  photo1StoragePath: string;
  photo1ContentType: string;
  hasPhoto2: boolean;
  photo2Id: string;
  photo2StoragePath: string;
  photo2ContentType: string;
  hasPhoto3: boolean;
  photo3Id: string;
  photo3StoragePath: string;
  photo3ContentType: string;
  hasPhoto4: boolean;
  photo4Id: string;
  photo4StoragePath: string;
  photo4ContentType: string;
  hasPhoto5: boolean;
  photo5Id: string;
  photo5StoragePath: string;
  photo5ContentType: string;
}
```
### Return Type
Recall that executing the `MaterializeInvoiceIntakeV2` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MaterializeInvoiceIntakeV2Data`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MaterializeInvoiceIntakeV2Data {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoicePhoto1: InvoicePhoto_Key;
  invoicePhoto2: InvoicePhoto_Key;
  invoicePhoto3: InvoicePhoto_Key;
  invoicePhoto4: InvoicePhoto_Key;
  invoicePhoto5: InvoicePhoto_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `MaterializeInvoiceIntakeV2`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, materializeInvoiceIntakeV2, MaterializeInvoiceIntakeV2Variables } from '@factures-thibeault/data-connect-generated';

// The `MaterializeInvoiceIntakeV2` mutation requires an argument of type `MaterializeInvoiceIntakeV2Variables`:
const materializeInvoiceIntakeV2Vars: MaterializeInvoiceIntakeV2Variables = {
  receiptId: ..., 
  transactionId: ..., 
  invoiceId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  lineItems: ..., 
  currency: ..., 
  sku: ..., // optional
  category: ..., 
  account: ..., // optional
  cardId: ..., 
  statementPeriod: ..., // optional
  project: ..., // optional
  storageFolder: ..., 
  classificationNote: ..., 
  expectedProcessingStatus: ..., 
  classificationSource: ..., 
  classificationStatus: ..., 
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
  photoCount: ..., 
  photo1Id: ..., 
  photo1StoragePath: ..., 
  photo1ContentType: ..., 
  hasPhoto2: ..., 
  photo2Id: ..., 
  photo2StoragePath: ..., 
  photo2ContentType: ..., 
  hasPhoto3: ..., 
  photo3Id: ..., 
  photo3StoragePath: ..., 
  photo3ContentType: ..., 
  hasPhoto4: ..., 
  photo4Id: ..., 
  photo4StoragePath: ..., 
  photo4ContentType: ..., 
  hasPhoto5: ..., 
  photo5Id: ..., 
  photo5StoragePath: ..., 
  photo5ContentType: ..., 
};

// Call the `materializeInvoiceIntakeV2()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await materializeInvoiceIntakeV2(materializeInvoiceIntakeV2Vars);
// Variables can be defined inline as well.
const { data } = await materializeInvoiceIntakeV2({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., lineItems: ..., currency: ..., sku: ..., category: ..., account: ..., cardId: ..., statementPeriod: ..., project: ..., storageFolder: ..., classificationNote: ..., expectedProcessingStatus: ..., classificationSource: ..., classificationStatus: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., photoCount: ..., photo1Id: ..., photo1StoragePath: ..., photo1ContentType: ..., hasPhoto2: ..., photo2Id: ..., photo2StoragePath: ..., photo2ContentType: ..., hasPhoto3: ..., photo3Id: ..., photo3StoragePath: ..., photo3ContentType: ..., hasPhoto4: ..., photo4Id: ..., photo4StoragePath: ..., photo4ContentType: ..., hasPhoto5: ..., photo5Id: ..., photo5StoragePath: ..., photo5ContentType: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await materializeInvoiceIntakeV2(dataConnect, materializeInvoiceIntakeV2Vars);

console.log(data.invoiceIntake_updateMany);
console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoicePhoto1);
console.log(data.invoicePhoto2);
console.log(data.invoicePhoto3);
console.log(data.invoicePhoto4);
console.log(data.invoicePhoto5);
console.log(data.invoiceIntake_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
materializeInvoiceIntakeV2(materializeInvoiceIntakeV2Vars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoicePhoto1);
  console.log(data.invoicePhoto2);
  console.log(data.invoicePhoto3);
  console.log(data.invoicePhoto4);
  console.log(data.invoicePhoto5);
  console.log(data.invoiceIntake_update);
  console.log(data.auditEvent_upsert);
});
```

### Using `MaterializeInvoiceIntakeV2`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, materializeInvoiceIntakeV2Ref, MaterializeInvoiceIntakeV2Variables } from '@factures-thibeault/data-connect-generated';

// The `MaterializeInvoiceIntakeV2` mutation requires an argument of type `MaterializeInvoiceIntakeV2Variables`:
const materializeInvoiceIntakeV2Vars: MaterializeInvoiceIntakeV2Variables = {
  receiptId: ..., 
  transactionId: ..., 
  invoiceId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  lineItems: ..., 
  currency: ..., 
  sku: ..., // optional
  category: ..., 
  account: ..., // optional
  cardId: ..., 
  statementPeriod: ..., // optional
  project: ..., // optional
  storageFolder: ..., 
  classificationNote: ..., 
  expectedProcessingStatus: ..., 
  classificationSource: ..., 
  classificationStatus: ..., 
  actorUid: ..., // optional
  actorRole: ..., // optional
  writeAudit: ..., // optional
  auditEventId: ..., // optional
  auditDetails: ..., // optional
  photoCount: ..., 
  photo1Id: ..., 
  photo1StoragePath: ..., 
  photo1ContentType: ..., 
  hasPhoto2: ..., 
  photo2Id: ..., 
  photo2StoragePath: ..., 
  photo2ContentType: ..., 
  hasPhoto3: ..., 
  photo3Id: ..., 
  photo3StoragePath: ..., 
  photo3ContentType: ..., 
  hasPhoto4: ..., 
  photo4Id: ..., 
  photo4StoragePath: ..., 
  photo4ContentType: ..., 
  hasPhoto5: ..., 
  photo5Id: ..., 
  photo5StoragePath: ..., 
  photo5ContentType: ..., 
};

// Call the `materializeInvoiceIntakeV2Ref()` function to get a reference to the mutation.
const ref = materializeInvoiceIntakeV2Ref(materializeInvoiceIntakeV2Vars);
// Variables can be defined inline as well.
const ref = materializeInvoiceIntakeV2Ref({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., lineItems: ..., currency: ..., sku: ..., category: ..., account: ..., cardId: ..., statementPeriod: ..., project: ..., storageFolder: ..., classificationNote: ..., expectedProcessingStatus: ..., classificationSource: ..., classificationStatus: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., photoCount: ..., photo1Id: ..., photo1StoragePath: ..., photo1ContentType: ..., hasPhoto2: ..., photo2Id: ..., photo2StoragePath: ..., photo2ContentType: ..., hasPhoto3: ..., photo3Id: ..., photo3StoragePath: ..., photo3ContentType: ..., hasPhoto4: ..., photo4Id: ..., photo4StoragePath: ..., photo4ContentType: ..., hasPhoto5: ..., photo5Id: ..., photo5StoragePath: ..., photo5ContentType: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = materializeInvoiceIntakeV2Ref(dataConnect, materializeInvoiceIntakeV2Vars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoicePhoto1);
console.log(data.invoicePhoto2);
console.log(data.invoicePhoto3);
console.log(data.invoicePhoto4);
console.log(data.invoicePhoto5);
console.log(data.invoiceIntake_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoicePhoto1);
  console.log(data.invoicePhoto2);
  console.log(data.invoicePhoto3);
  console.log(data.invoicePhoto4);
  console.log(data.invoicePhoto5);
  console.log(data.invoiceIntake_update);
  console.log(data.auditEvent_upsert);
});
```

## CorrectPostedInvoice
You can execute the `CorrectPostedInvoice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
correctPostedInvoice(vars: CorrectPostedInvoiceVariables): MutationPromise<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;

interface CorrectPostedInvoiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CorrectPostedInvoiceVariables): MutationRef<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;
}
export const correctPostedInvoiceRef: CorrectPostedInvoiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
correctPostedInvoice(dc: DataConnect, vars: CorrectPostedInvoiceVariables): MutationPromise<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;

interface CorrectPostedInvoiceRef {
  ...
  (dc: DataConnect, vars: CorrectPostedInvoiceVariables): MutationRef<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;
}
export const correctPostedInvoiceRef: CorrectPostedInvoiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the correctPostedInvoiceRef:
```typescript
const name = correctPostedInvoiceRef.operationName;
console.log(name);
```

### Variables
The `CorrectPostedInvoice` mutation requires an argument of type `CorrectPostedInvoiceVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CorrectPostedInvoiceVariables {
  correctionId: string;
  invoiceId: string;
  transactionId: string;
  actorUserId: string;
  fieldName: string;
  previousValue?: string | null;
  correctedValue: string;
  note: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  lineItems: string;
  category: string;
  account?: ExpenseAccount_Key | null;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that executing the `CorrectPostedInvoice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CorrectPostedInvoiceData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CorrectPostedInvoiceData {
  transactionCorrection_upsert: TransactionCorrection_Key;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  invoice_update?: Invoice_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `CorrectPostedInvoice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, correctPostedInvoice, CorrectPostedInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `CorrectPostedInvoice` mutation requires an argument of type `CorrectPostedInvoiceVariables`:
const correctPostedInvoiceVars: CorrectPostedInvoiceVariables = {
  correctionId: ..., 
  invoiceId: ..., 
  transactionId: ..., 
  actorUserId: ..., 
  fieldName: ..., 
  previousValue: ..., // optional
  correctedValue: ..., 
  note: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  lineItems: ..., 
  category: ..., 
  account: ..., // optional
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `correctPostedInvoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await correctPostedInvoice(correctPostedInvoiceVars);
// Variables can be defined inline as well.
const { data } = await correctPostedInvoice({ correctionId: ..., invoiceId: ..., transactionId: ..., actorUserId: ..., fieldName: ..., previousValue: ..., correctedValue: ..., note: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., lineItems: ..., category: ..., account: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await correctPostedInvoice(dataConnect, correctPostedInvoiceVars);

console.log(data.transactionCorrection_upsert);
console.log(data.expenseTransaction_update);
console.log(data.invoice_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
correctPostedInvoice(correctPostedInvoiceVars).then((response) => {
  const data = response.data;
  console.log(data.transactionCorrection_upsert);
  console.log(data.expenseTransaction_update);
  console.log(data.invoice_update);
  console.log(data.auditEvent_upsert);
});
```

### Using `CorrectPostedInvoice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, correctPostedInvoiceRef, CorrectPostedInvoiceVariables } from '@factures-thibeault/data-connect-generated';

// The `CorrectPostedInvoice` mutation requires an argument of type `CorrectPostedInvoiceVariables`:
const correctPostedInvoiceVars: CorrectPostedInvoiceVariables = {
  correctionId: ..., 
  invoiceId: ..., 
  transactionId: ..., 
  actorUserId: ..., 
  fieldName: ..., 
  previousValue: ..., // optional
  correctedValue: ..., 
  note: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  lineItems: ..., 
  category: ..., 
  account: ..., // optional
  auditEventId: ..., 
  auditDetails: ..., 
};

// Call the `correctPostedInvoiceRef()` function to get a reference to the mutation.
const ref = correctPostedInvoiceRef(correctPostedInvoiceVars);
// Variables can be defined inline as well.
const ref = correctPostedInvoiceRef({ correctionId: ..., invoiceId: ..., transactionId: ..., actorUserId: ..., fieldName: ..., previousValue: ..., correctedValue: ..., note: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., lineItems: ..., category: ..., account: ..., auditEventId: ..., auditDetails: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = correctPostedInvoiceRef(dataConnect, correctPostedInvoiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transactionCorrection_upsert);
console.log(data.expenseTransaction_update);
console.log(data.invoice_update);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transactionCorrection_upsert);
  console.log(data.expenseTransaction_update);
  console.log(data.invoice_update);
  console.log(data.auditEvent_upsert);
});
```

## CommitInvoiceIntake
You can execute the `CommitInvoiceIntake` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
commitInvoiceIntake(vars: CommitInvoiceIntakeVariables): MutationPromise<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;

interface CommitInvoiceIntakeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CommitInvoiceIntakeVariables): MutationRef<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;
}
export const commitInvoiceIntakeRef: CommitInvoiceIntakeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
commitInvoiceIntake(dc: DataConnect, vars: CommitInvoiceIntakeVariables): MutationPromise<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;

interface CommitInvoiceIntakeRef {
  ...
  (dc: DataConnect, vars: CommitInvoiceIntakeVariables): MutationRef<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;
}
export const commitInvoiceIntakeRef: CommitInvoiceIntakeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the commitInvoiceIntakeRef:
```typescript
const name = commitInvoiceIntakeRef.operationName;
console.log(name);
```

### Variables
The `CommitInvoiceIntake` mutation requires an argument of type `CommitInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CommitInvoiceIntakeVariables {
  receiptId: string;
  transactionId: string;
  invoiceId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  sku?: string | null;
  category: string;
  accountId: string;
  cardId: string;
  statementPeriodId: string;
  projectId: string;
  storageFolder: string;
  classificationNote: string;
}
```
### Return Type
Recall that executing the `CommitInvoiceIntake` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CommitInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CommitInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}
```
### Using `CommitInvoiceIntake`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, commitInvoiceIntake, CommitInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `CommitInvoiceIntake` mutation requires an argument of type `CommitInvoiceIntakeVariables`:
const commitInvoiceIntakeVars: CommitInvoiceIntakeVariables = {
  receiptId: ..., 
  transactionId: ..., 
  invoiceId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  currency: ..., 
  sku: ..., // optional
  category: ..., 
  accountId: ..., 
  cardId: ..., 
  statementPeriodId: ..., 
  projectId: ..., 
  storageFolder: ..., 
  classificationNote: ..., 
};

// Call the `commitInvoiceIntake()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await commitInvoiceIntake(commitInvoiceIntakeVars);
// Variables can be defined inline as well.
const { data } = await commitInvoiceIntake({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await commitInvoiceIntake(dataConnect, commitInvoiceIntakeVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
commitInvoiceIntake(commitInvoiceIntakeVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoiceIntake_update);
});
```

### Using `CommitInvoiceIntake`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, commitInvoiceIntakeRef, CommitInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `CommitInvoiceIntake` mutation requires an argument of type `CommitInvoiceIntakeVariables`:
const commitInvoiceIntakeVars: CommitInvoiceIntakeVariables = {
  receiptId: ..., 
  transactionId: ..., 
  invoiceId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  currency: ..., 
  sku: ..., // optional
  category: ..., 
  accountId: ..., 
  cardId: ..., 
  statementPeriodId: ..., 
  projectId: ..., 
  storageFolder: ..., 
  classificationNote: ..., 
};

// Call the `commitInvoiceIntakeRef()` function to get a reference to the mutation.
const ref = commitInvoiceIntakeRef(commitInvoiceIntakeVars);
// Variables can be defined inline as well.
const ref = commitInvoiceIntakeRef({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = commitInvoiceIntakeRef(dataConnect, commitInvoiceIntakeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoiceIntake_update);
});
```

## CommitInvoiceIntakeWithoutProject
You can execute the `CommitInvoiceIntakeWithoutProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
commitInvoiceIntakeWithoutProject(vars: CommitInvoiceIntakeWithoutProjectVariables): MutationPromise<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;

interface CommitInvoiceIntakeWithoutProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CommitInvoiceIntakeWithoutProjectVariables): MutationRef<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;
}
export const commitInvoiceIntakeWithoutProjectRef: CommitInvoiceIntakeWithoutProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
commitInvoiceIntakeWithoutProject(dc: DataConnect, vars: CommitInvoiceIntakeWithoutProjectVariables): MutationPromise<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;

interface CommitInvoiceIntakeWithoutProjectRef {
  ...
  (dc: DataConnect, vars: CommitInvoiceIntakeWithoutProjectVariables): MutationRef<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;
}
export const commitInvoiceIntakeWithoutProjectRef: CommitInvoiceIntakeWithoutProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the commitInvoiceIntakeWithoutProjectRef:
```typescript
const name = commitInvoiceIntakeWithoutProjectRef.operationName;
console.log(name);
```

### Variables
The `CommitInvoiceIntakeWithoutProject` mutation requires an argument of type `CommitInvoiceIntakeWithoutProjectVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CommitInvoiceIntakeWithoutProjectVariables {
  receiptId: string;
  transactionId: string;
  invoiceId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  sku?: string | null;
  category: string;
  accountId: string;
  cardId: string;
  statementPeriodId: string;
  storageFolder: string;
  classificationNote: string;
}
```
### Return Type
Recall that executing the `CommitInvoiceIntakeWithoutProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CommitInvoiceIntakeWithoutProjectData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CommitInvoiceIntakeWithoutProjectData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}
```
### Using `CommitInvoiceIntakeWithoutProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, commitInvoiceIntakeWithoutProject, CommitInvoiceIntakeWithoutProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `CommitInvoiceIntakeWithoutProject` mutation requires an argument of type `CommitInvoiceIntakeWithoutProjectVariables`:
const commitInvoiceIntakeWithoutProjectVars: CommitInvoiceIntakeWithoutProjectVariables = {
  receiptId: ..., 
  transactionId: ..., 
  invoiceId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  currency: ..., 
  sku: ..., // optional
  category: ..., 
  accountId: ..., 
  cardId: ..., 
  statementPeriodId: ..., 
  storageFolder: ..., 
  classificationNote: ..., 
};

// Call the `commitInvoiceIntakeWithoutProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await commitInvoiceIntakeWithoutProject(commitInvoiceIntakeWithoutProjectVars);
// Variables can be defined inline as well.
const { data } = await commitInvoiceIntakeWithoutProject({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await commitInvoiceIntakeWithoutProject(dataConnect, commitInvoiceIntakeWithoutProjectVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
commitInvoiceIntakeWithoutProject(commitInvoiceIntakeWithoutProjectVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoiceIntake_update);
});
```

### Using `CommitInvoiceIntakeWithoutProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, commitInvoiceIntakeWithoutProjectRef, CommitInvoiceIntakeWithoutProjectVariables } from '@factures-thibeault/data-connect-generated';

// The `CommitInvoiceIntakeWithoutProject` mutation requires an argument of type `CommitInvoiceIntakeWithoutProjectVariables`:
const commitInvoiceIntakeWithoutProjectVars: CommitInvoiceIntakeWithoutProjectVariables = {
  receiptId: ..., 
  transactionId: ..., 
  invoiceId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  currency: ..., 
  sku: ..., // optional
  category: ..., 
  accountId: ..., 
  cardId: ..., 
  statementPeriodId: ..., 
  storageFolder: ..., 
  classificationNote: ..., 
};

// Call the `commitInvoiceIntakeWithoutProjectRef()` function to get a reference to the mutation.
const ref = commitInvoiceIntakeWithoutProjectRef(commitInvoiceIntakeWithoutProjectVars);
// Variables can be defined inline as well.
const ref = commitInvoiceIntakeWithoutProjectRef({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = commitInvoiceIntakeWithoutProjectRef(dataConnect, commitInvoiceIntakeWithoutProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoiceIntake_update);
});
```

## AutoCommitInvoiceIntake
You can execute the `AutoCommitInvoiceIntake` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
autoCommitInvoiceIntake(vars: AutoCommitInvoiceIntakeVariables): MutationPromise<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;

interface AutoCommitInvoiceIntakeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AutoCommitInvoiceIntakeVariables): MutationRef<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;
}
export const autoCommitInvoiceIntakeRef: AutoCommitInvoiceIntakeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
autoCommitInvoiceIntake(dc: DataConnect, vars: AutoCommitInvoiceIntakeVariables): MutationPromise<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;

interface AutoCommitInvoiceIntakeRef {
  ...
  (dc: DataConnect, vars: AutoCommitInvoiceIntakeVariables): MutationRef<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;
}
export const autoCommitInvoiceIntakeRef: AutoCommitInvoiceIntakeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the autoCommitInvoiceIntakeRef:
```typescript
const name = autoCommitInvoiceIntakeRef.operationName;
console.log(name);
```

### Variables
The `AutoCommitInvoiceIntake` mutation requires an argument of type `AutoCommitInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AutoCommitInvoiceIntakeVariables {
  receiptId: string;
  transactionId: string;
  invoiceId: string;
  vendor: string;
  invoiceNumber?: string | null;
  invoiceDate: DateString;
  subtotalCents: Int64String;
  tpsCents: Int64String;
  tvqCents: Int64String;
  totalCents: Int64String;
  currency: string;
  sku?: string | null;
  category: string;
  accountId: string;
  cardId: string;
  statementPeriodId: string;
  projectId: string;
  storageFolder: string;
  classificationNote: string;
}
```
### Return Type
Recall that executing the `AutoCommitInvoiceIntake` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AutoCommitInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AutoCommitInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}
```
### Using `AutoCommitInvoiceIntake`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, autoCommitInvoiceIntake, AutoCommitInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `AutoCommitInvoiceIntake` mutation requires an argument of type `AutoCommitInvoiceIntakeVariables`:
const autoCommitInvoiceIntakeVars: AutoCommitInvoiceIntakeVariables = {
  receiptId: ..., 
  transactionId: ..., 
  invoiceId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  currency: ..., 
  sku: ..., // optional
  category: ..., 
  accountId: ..., 
  cardId: ..., 
  statementPeriodId: ..., 
  projectId: ..., 
  storageFolder: ..., 
  classificationNote: ..., 
};

// Call the `autoCommitInvoiceIntake()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await autoCommitInvoiceIntake(autoCommitInvoiceIntakeVars);
// Variables can be defined inline as well.
const { data } = await autoCommitInvoiceIntake({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await autoCommitInvoiceIntake(dataConnect, autoCommitInvoiceIntakeVars);

console.log(data.invoiceIntake_updateMany);
console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
autoCommitInvoiceIntake(autoCommitInvoiceIntakeVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoiceIntake_update);
});
```

### Using `AutoCommitInvoiceIntake`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, autoCommitInvoiceIntakeRef, AutoCommitInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';

// The `AutoCommitInvoiceIntake` mutation requires an argument of type `AutoCommitInvoiceIntakeVariables`:
const autoCommitInvoiceIntakeVars: AutoCommitInvoiceIntakeVariables = {
  receiptId: ..., 
  transactionId: ..., 
  invoiceId: ..., 
  vendor: ..., 
  invoiceNumber: ..., // optional
  invoiceDate: ..., 
  subtotalCents: ..., 
  tpsCents: ..., 
  tvqCents: ..., 
  totalCents: ..., 
  currency: ..., 
  sku: ..., // optional
  category: ..., 
  accountId: ..., 
  cardId: ..., 
  statementPeriodId: ..., 
  projectId: ..., 
  storageFolder: ..., 
  classificationNote: ..., 
};

// Call the `autoCommitInvoiceIntakeRef()` function to get a reference to the mutation.
const ref = autoCommitInvoiceIntakeRef(autoCommitInvoiceIntakeVars);
// Variables can be defined inline as well.
const ref = autoCommitInvoiceIntakeRef({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = autoCommitInvoiceIntakeRef(dataConnect, autoCommitInvoiceIntakeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_updateMany);
console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_updateMany);
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoiceIntake_update);
});
```

