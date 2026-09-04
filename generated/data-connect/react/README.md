# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `accounting`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`data-connect/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@factures-thibeault/data-connect-generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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
  - [*DeleteUserProfile*](#deleteuserprofile)
  - [*UpsertExpenseAccount*](#upsertexpenseaccount)
  - [*DeleteExpenseAccount*](#deleteexpenseaccount)
  - [*UpsertSkuReference*](#upsertskureference)
  - [*DeleteSkuReference*](#deleteskureference)
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
  - [*CacheCanadianTireSkuReference*](#cachecanadiantireskureference)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `accounting`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `accounting`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `accounting` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## AdminListInvoices
You can execute the `AdminListInvoices` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useAdminListInvoices(dc: DataConnect, vars: AdminListInvoicesVariables, options?: useDataConnectQueryOptions<AdminListInvoicesData>): UseDataConnectQueryResult<AdminListInvoicesData, AdminListInvoicesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminListInvoices(vars: AdminListInvoicesVariables, options?: useDataConnectQueryOptions<AdminListInvoicesData>): UseDataConnectQueryResult<AdminListInvoicesData, AdminListInvoicesVariables>;
```

### Variables
The `AdminListInvoices` Query requires an argument of type `AdminListInvoicesVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminListInvoicesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `AdminListInvoices` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `AdminListInvoices` Query is of type `AdminListInvoicesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `AdminListInvoices`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminListInvoicesVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminListInvoices } from '@factures-thibeault/data-connect-generated/react'

export default function AdminListInvoicesComponent() {
  // The `useAdminListInvoices` Query hook requires an argument of type `AdminListInvoicesVariables`:
  const adminListInvoicesVars: AdminListInvoicesVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminListInvoices(adminListInvoicesVars);
  // Variables can be defined inline as well.
  const query = useAdminListInvoices({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminListInvoices(dataConnect, adminListInvoicesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListInvoices(adminListInvoicesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListInvoices(dataConnect, adminListInvoicesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invoices);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminListInvoicePhotos
You can execute the `AdminListInvoicePhotos` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useAdminListInvoicePhotos(dc: DataConnect, vars: AdminListInvoicePhotosVariables, options?: useDataConnectQueryOptions<AdminListInvoicePhotosData>): UseDataConnectQueryResult<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminListInvoicePhotos(vars: AdminListInvoicePhotosVariables, options?: useDataConnectQueryOptions<AdminListInvoicePhotosData>): UseDataConnectQueryResult<AdminListInvoicePhotosData, AdminListInvoicePhotosVariables>;
```

### Variables
The `AdminListInvoicePhotos` Query requires an argument of type `AdminListInvoicePhotosVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminListInvoicePhotosVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `AdminListInvoicePhotos` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `AdminListInvoicePhotos` Query is of type `AdminListInvoicePhotosData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `AdminListInvoicePhotos`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminListInvoicePhotosVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminListInvoicePhotos } from '@factures-thibeault/data-connect-generated/react'

export default function AdminListInvoicePhotosComponent() {
  // The `useAdminListInvoicePhotos` Query hook requires an argument of type `AdminListInvoicePhotosVariables`:
  const adminListInvoicePhotosVars: AdminListInvoicePhotosVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminListInvoicePhotos(adminListInvoicePhotosVars);
  // Variables can be defined inline as well.
  const query = useAdminListInvoicePhotos({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminListInvoicePhotos(dataConnect, adminListInvoicePhotosVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListInvoicePhotos(adminListInvoicePhotosVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListInvoicePhotos(dataConnect, adminListInvoicePhotosVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invoicePhotos);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListUserProfiles
You can execute the `ListUserProfiles` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListUserProfiles(dc: DataConnect, vars: ListUserProfilesVariables, options?: useDataConnectQueryOptions<ListUserProfilesData>): UseDataConnectQueryResult<ListUserProfilesData, ListUserProfilesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListUserProfiles(vars: ListUserProfilesVariables, options?: useDataConnectQueryOptions<ListUserProfilesData>): UseDataConnectQueryResult<ListUserProfilesData, ListUserProfilesVariables>;
```

### Variables
The `ListUserProfiles` Query requires an argument of type `ListUserProfilesVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListUserProfilesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListUserProfiles` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListUserProfiles` Query is of type `ListUserProfilesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListUserProfiles`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListUserProfilesVariables } from '@factures-thibeault/data-connect-generated';
import { useListUserProfiles } from '@factures-thibeault/data-connect-generated/react'

export default function ListUserProfilesComponent() {
  // The `useListUserProfiles` Query hook requires an argument of type `ListUserProfilesVariables`:
  const listUserProfilesVars: ListUserProfilesVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListUserProfiles(listUserProfilesVars);
  // Variables can be defined inline as well.
  const query = useListUserProfiles({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListUserProfiles(dataConnect, listUserProfilesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListUserProfiles(listUserProfilesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListUserProfiles(dataConnect, listUserProfilesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.userProfiles);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCreditCards
You can execute the `ListCreditCards` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCreditCards(dc: DataConnect, options?: useDataConnectQueryOptions<ListCreditCardsData>): UseDataConnectQueryResult<ListCreditCardsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCreditCards(options?: useDataConnectQueryOptions<ListCreditCardsData>): UseDataConnectQueryResult<ListCreditCardsData, undefined>;
```

### Variables
The `ListCreditCards` Query has no variables.
### Return Type
Recall that calling the `ListCreditCards` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCreditCards` Query is of type `ListCreditCardsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCreditCards`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListCreditCards } from '@factures-thibeault/data-connect-generated/react'

export default function ListCreditCardsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCreditCards();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCreditCards(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCards(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCards(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCards);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCardStatementPeriods
You can execute the `ListCardStatementPeriods` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCardStatementPeriods(dc: DataConnect, options?: useDataConnectQueryOptions<ListCardStatementPeriodsData>): UseDataConnectQueryResult<ListCardStatementPeriodsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCardStatementPeriods(options?: useDataConnectQueryOptions<ListCardStatementPeriodsData>): UseDataConnectQueryResult<ListCardStatementPeriodsData, undefined>;
```

### Variables
The `ListCardStatementPeriods` Query has no variables.
### Return Type
Recall that calling the `ListCardStatementPeriods` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCardStatementPeriods` Query is of type `ListCardStatementPeriodsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCardStatementPeriods`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListCardStatementPeriods } from '@factures-thibeault/data-connect-generated/react'

export default function ListCardStatementPeriodsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCardStatementPeriods();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCardStatementPeriods(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCardStatementPeriods(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCardStatementPeriods(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.cardStatementPeriods);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListExpenseAccounts
You can execute the `ListExpenseAccounts` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListExpenseAccounts(dc: DataConnect, options?: useDataConnectQueryOptions<ListExpenseAccountsData>): UseDataConnectQueryResult<ListExpenseAccountsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListExpenseAccounts(options?: useDataConnectQueryOptions<ListExpenseAccountsData>): UseDataConnectQueryResult<ListExpenseAccountsData, undefined>;
```

### Variables
The `ListExpenseAccounts` Query has no variables.
### Return Type
Recall that calling the `ListExpenseAccounts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListExpenseAccounts` Query is of type `ListExpenseAccountsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListExpenseAccounts`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListExpenseAccounts } from '@factures-thibeault/data-connect-generated/react'

export default function ListExpenseAccountsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListExpenseAccounts();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListExpenseAccounts(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseAccounts(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseAccounts(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.expenseAccounts);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCreditCardHolderHistories
You can execute the `ListCreditCardHolderHistories` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCreditCardHolderHistories(dc: DataConnect, vars: ListCreditCardHolderHistoriesVariables, options?: useDataConnectQueryOptions<ListCreditCardHolderHistoriesData>): UseDataConnectQueryResult<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCreditCardHolderHistories(vars: ListCreditCardHolderHistoriesVariables, options?: useDataConnectQueryOptions<ListCreditCardHolderHistoriesData>): UseDataConnectQueryResult<ListCreditCardHolderHistoriesData, ListCreditCardHolderHistoriesVariables>;
```

### Variables
The `ListCreditCardHolderHistories` Query requires an argument of type `ListCreditCardHolderHistoriesVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListCreditCardHolderHistoriesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListCreditCardHolderHistories` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCreditCardHolderHistories` Query is of type `ListCreditCardHolderHistoriesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCreditCardHolderHistories`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListCreditCardHolderHistoriesVariables } from '@factures-thibeault/data-connect-generated';
import { useListCreditCardHolderHistories } from '@factures-thibeault/data-connect-generated/react'

export default function ListCreditCardHolderHistoriesComponent() {
  // The `useListCreditCardHolderHistories` Query hook requires an argument of type `ListCreditCardHolderHistoriesVariables`:
  const listCreditCardHolderHistoriesVars: ListCreditCardHolderHistoriesVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCreditCardHolderHistories(listCreditCardHolderHistoriesVars);
  // Variables can be defined inline as well.
  const query = useListCreditCardHolderHistories({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCreditCardHolderHistories(dataConnect, listCreditCardHolderHistoriesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardHolderHistories(listCreditCardHolderHistoriesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardHolderHistories(dataConnect, listCreditCardHolderHistoriesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCardHolderHistories);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCreditCardStatements
You can execute the `ListCreditCardStatements` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCreditCardStatements(dc: DataConnect, vars: ListCreditCardStatementsVariables, options?: useDataConnectQueryOptions<ListCreditCardStatementsData>): UseDataConnectQueryResult<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCreditCardStatements(vars: ListCreditCardStatementsVariables, options?: useDataConnectQueryOptions<ListCreditCardStatementsData>): UseDataConnectQueryResult<ListCreditCardStatementsData, ListCreditCardStatementsVariables>;
```

### Variables
The `ListCreditCardStatements` Query requires an argument of type `ListCreditCardStatementsVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListCreditCardStatementsVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListCreditCardStatements` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCreditCardStatements` Query is of type `ListCreditCardStatementsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCreditCardStatements`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListCreditCardStatementsVariables } from '@factures-thibeault/data-connect-generated';
import { useListCreditCardStatements } from '@factures-thibeault/data-connect-generated/react'

export default function ListCreditCardStatementsComponent() {
  // The `useListCreditCardStatements` Query hook requires an argument of type `ListCreditCardStatementsVariables`:
  const listCreditCardStatementsVars: ListCreditCardStatementsVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCreditCardStatements(listCreditCardStatementsVars);
  // Variables can be defined inline as well.
  const query = useListCreditCardStatements({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCreditCardStatements(dataConnect, listCreditCardStatementsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardStatements(listCreditCardStatementsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardStatements(dataConnect, listCreditCardStatementsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCardStatements);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCreditCardStatementsPage
You can execute the `ListCreditCardStatementsPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCreditCardStatementsPage(dc: DataConnect, vars: ListCreditCardStatementsPageVariables, options?: useDataConnectQueryOptions<ListCreditCardStatementsPageData>): UseDataConnectQueryResult<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCreditCardStatementsPage(vars: ListCreditCardStatementsPageVariables, options?: useDataConnectQueryOptions<ListCreditCardStatementsPageData>): UseDataConnectQueryResult<ListCreditCardStatementsPageData, ListCreditCardStatementsPageVariables>;
```

### Variables
The `ListCreditCardStatementsPage` Query requires an argument of type `ListCreditCardStatementsPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListCreditCardStatementsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListCreditCardStatementsPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCreditCardStatementsPage` Query is of type `ListCreditCardStatementsPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCreditCardStatementsPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListCreditCardStatementsPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListCreditCardStatementsPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListCreditCardStatementsPageComponent() {
  // The `useListCreditCardStatementsPage` Query hook requires an argument of type `ListCreditCardStatementsPageVariables`:
  const listCreditCardStatementsPageVars: ListCreditCardStatementsPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCreditCardStatementsPage(listCreditCardStatementsPageVars);
  // Variables can be defined inline as well.
  const query = useListCreditCardStatementsPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCreditCardStatementsPage(dataConnect, listCreditCardStatementsPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardStatementsPage(listCreditCardStatementsPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardStatementsPage(dataConnect, listCreditCardStatementsPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCardStatements);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCreditCardStatementLines
You can execute the `ListCreditCardStatementLines` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCreditCardStatementLines(dc: DataConnect, vars: ListCreditCardStatementLinesVariables, options?: useDataConnectQueryOptions<ListCreditCardStatementLinesData>): UseDataConnectQueryResult<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCreditCardStatementLines(vars: ListCreditCardStatementLinesVariables, options?: useDataConnectQueryOptions<ListCreditCardStatementLinesData>): UseDataConnectQueryResult<ListCreditCardStatementLinesData, ListCreditCardStatementLinesVariables>;
```

### Variables
The `ListCreditCardStatementLines` Query requires an argument of type `ListCreditCardStatementLinesVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListCreditCardStatementLinesVariables {
  statementId: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListCreditCardStatementLines` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCreditCardStatementLines` Query is of type `ListCreditCardStatementLinesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCreditCardStatementLines`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListCreditCardStatementLinesVariables } from '@factures-thibeault/data-connect-generated';
import { useListCreditCardStatementLines } from '@factures-thibeault/data-connect-generated/react'

export default function ListCreditCardStatementLinesComponent() {
  // The `useListCreditCardStatementLines` Query hook requires an argument of type `ListCreditCardStatementLinesVariables`:
  const listCreditCardStatementLinesVars: ListCreditCardStatementLinesVariables = {
    statementId: ..., 
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCreditCardStatementLines(listCreditCardStatementLinesVars);
  // Variables can be defined inline as well.
  const query = useListCreditCardStatementLines({ statementId: ..., limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCreditCardStatementLines(dataConnect, listCreditCardStatementLinesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardStatementLines(listCreditCardStatementLinesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardStatementLines(dataConnect, listCreditCardStatementLinesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCardStatementLines);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCreditCardStatementLinesPage
You can execute the `ListCreditCardStatementLinesPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCreditCardStatementLinesPage(dc: DataConnect, vars: ListCreditCardStatementLinesPageVariables, options?: useDataConnectQueryOptions<ListCreditCardStatementLinesPageData>): UseDataConnectQueryResult<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCreditCardStatementLinesPage(vars: ListCreditCardStatementLinesPageVariables, options?: useDataConnectQueryOptions<ListCreditCardStatementLinesPageData>): UseDataConnectQueryResult<ListCreditCardStatementLinesPageData, ListCreditCardStatementLinesPageVariables>;
```

### Variables
The `ListCreditCardStatementLinesPage` Query requires an argument of type `ListCreditCardStatementLinesPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListCreditCardStatementLinesPageVariables {
  statementId: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListCreditCardStatementLinesPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCreditCardStatementLinesPage` Query is of type `ListCreditCardStatementLinesPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCreditCardStatementLinesPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListCreditCardStatementLinesPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListCreditCardStatementLinesPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListCreditCardStatementLinesPageComponent() {
  // The `useListCreditCardStatementLinesPage` Query hook requires an argument of type `ListCreditCardStatementLinesPageVariables`:
  const listCreditCardStatementLinesPageVars: ListCreditCardStatementLinesPageVariables = {
    statementId: ..., 
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCreditCardStatementLinesPage(listCreditCardStatementLinesPageVars);
  // Variables can be defined inline as well.
  const query = useListCreditCardStatementLinesPage({ statementId: ..., limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCreditCardStatementLinesPage(dataConnect, listCreditCardStatementLinesPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardStatementLinesPage(listCreditCardStatementLinesPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardStatementLinesPage(dataConnect, listCreditCardStatementLinesPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCardStatementLines);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListAllCreditCardStatementLines
You can execute the `ListAllCreditCardStatementLines` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListAllCreditCardStatementLines(dc: DataConnect, vars: ListAllCreditCardStatementLinesVariables, options?: useDataConnectQueryOptions<ListAllCreditCardStatementLinesData>): UseDataConnectQueryResult<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListAllCreditCardStatementLines(vars: ListAllCreditCardStatementLinesVariables, options?: useDataConnectQueryOptions<ListAllCreditCardStatementLinesData>): UseDataConnectQueryResult<ListAllCreditCardStatementLinesData, ListAllCreditCardStatementLinesVariables>;
```

### Variables
The `ListAllCreditCardStatementLines` Query requires an argument of type `ListAllCreditCardStatementLinesVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListAllCreditCardStatementLinesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListAllCreditCardStatementLines` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListAllCreditCardStatementLines` Query is of type `ListAllCreditCardStatementLinesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListAllCreditCardStatementLines`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListAllCreditCardStatementLinesVariables } from '@factures-thibeault/data-connect-generated';
import { useListAllCreditCardStatementLines } from '@factures-thibeault/data-connect-generated/react'

export default function ListAllCreditCardStatementLinesComponent() {
  // The `useListAllCreditCardStatementLines` Query hook requires an argument of type `ListAllCreditCardStatementLinesVariables`:
  const listAllCreditCardStatementLinesVars: ListAllCreditCardStatementLinesVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListAllCreditCardStatementLines(listAllCreditCardStatementLinesVars);
  // Variables can be defined inline as well.
  const query = useListAllCreditCardStatementLines({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListAllCreditCardStatementLines(dataConnect, listAllCreditCardStatementLinesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListAllCreditCardStatementLines(listAllCreditCardStatementLinesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListAllCreditCardStatementLines(dataConnect, listAllCreditCardStatementLinesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCardStatementLines);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListAllCreditCardStatementLinesPage
You can execute the `ListAllCreditCardStatementLinesPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListAllCreditCardStatementLinesPage(dc: DataConnect, vars: ListAllCreditCardStatementLinesPageVariables, options?: useDataConnectQueryOptions<ListAllCreditCardStatementLinesPageData>): UseDataConnectQueryResult<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListAllCreditCardStatementLinesPage(vars: ListAllCreditCardStatementLinesPageVariables, options?: useDataConnectQueryOptions<ListAllCreditCardStatementLinesPageData>): UseDataConnectQueryResult<ListAllCreditCardStatementLinesPageData, ListAllCreditCardStatementLinesPageVariables>;
```

### Variables
The `ListAllCreditCardStatementLinesPage` Query requires an argument of type `ListAllCreditCardStatementLinesPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListAllCreditCardStatementLinesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListAllCreditCardStatementLinesPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListAllCreditCardStatementLinesPage` Query is of type `ListAllCreditCardStatementLinesPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListAllCreditCardStatementLinesPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListAllCreditCardStatementLinesPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListAllCreditCardStatementLinesPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListAllCreditCardStatementLinesPageComponent() {
  // The `useListAllCreditCardStatementLinesPage` Query hook requires an argument of type `ListAllCreditCardStatementLinesPageVariables`:
  const listAllCreditCardStatementLinesPageVars: ListAllCreditCardStatementLinesPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListAllCreditCardStatementLinesPage(listAllCreditCardStatementLinesPageVars);
  // Variables can be defined inline as well.
  const query = useListAllCreditCardStatementLinesPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListAllCreditCardStatementLinesPage(dataConnect, listAllCreditCardStatementLinesPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListAllCreditCardStatementLinesPage(listAllCreditCardStatementLinesPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListAllCreditCardStatementLinesPage(dataConnect, listAllCreditCardStatementLinesPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCardStatementLines);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListMerchantAliases
You can execute the `ListMerchantAliases` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListMerchantAliases(dc: DataConnect, vars: ListMerchantAliasesVariables, options?: useDataConnectQueryOptions<ListMerchantAliasesData>): UseDataConnectQueryResult<ListMerchantAliasesData, ListMerchantAliasesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListMerchantAliases(vars: ListMerchantAliasesVariables, options?: useDataConnectQueryOptions<ListMerchantAliasesData>): UseDataConnectQueryResult<ListMerchantAliasesData, ListMerchantAliasesVariables>;
```

### Variables
The `ListMerchantAliases` Query requires an argument of type `ListMerchantAliasesVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListMerchantAliasesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListMerchantAliases` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListMerchantAliases` Query is of type `ListMerchantAliasesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListMerchantAliases`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListMerchantAliasesVariables } from '@factures-thibeault/data-connect-generated';
import { useListMerchantAliases } from '@factures-thibeault/data-connect-generated/react'

export default function ListMerchantAliasesComponent() {
  // The `useListMerchantAliases` Query hook requires an argument of type `ListMerchantAliasesVariables`:
  const listMerchantAliasesVars: ListMerchantAliasesVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListMerchantAliases(listMerchantAliasesVars);
  // Variables can be defined inline as well.
  const query = useListMerchantAliases({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListMerchantAliases(dataConnect, listMerchantAliasesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListMerchantAliases(listMerchantAliasesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListMerchantAliases(dataConnect, listMerchantAliasesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.merchantAliases);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListMerchantAliasesPage
You can execute the `ListMerchantAliasesPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListMerchantAliasesPage(dc: DataConnect, vars: ListMerchantAliasesPageVariables, options?: useDataConnectQueryOptions<ListMerchantAliasesPageData>): UseDataConnectQueryResult<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListMerchantAliasesPage(vars: ListMerchantAliasesPageVariables, options?: useDataConnectQueryOptions<ListMerchantAliasesPageData>): UseDataConnectQueryResult<ListMerchantAliasesPageData, ListMerchantAliasesPageVariables>;
```

### Variables
The `ListMerchantAliasesPage` Query requires an argument of type `ListMerchantAliasesPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListMerchantAliasesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListMerchantAliasesPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListMerchantAliasesPage` Query is of type `ListMerchantAliasesPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListMerchantAliasesPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListMerchantAliasesPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListMerchantAliasesPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListMerchantAliasesPageComponent() {
  // The `useListMerchantAliasesPage` Query hook requires an argument of type `ListMerchantAliasesPageVariables`:
  const listMerchantAliasesPageVars: ListMerchantAliasesPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListMerchantAliasesPage(listMerchantAliasesPageVars);
  // Variables can be defined inline as well.
  const query = useListMerchantAliasesPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListMerchantAliasesPage(dataConnect, listMerchantAliasesPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListMerchantAliasesPage(listMerchantAliasesPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListMerchantAliasesPage(dataConnect, listMerchantAliasesPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.merchantAliases);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListReconciliationMatches
You can execute the `ListReconciliationMatches` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListReconciliationMatches(dc: DataConnect, vars: ListReconciliationMatchesVariables, options?: useDataConnectQueryOptions<ListReconciliationMatchesData>): UseDataConnectQueryResult<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListReconciliationMatches(vars: ListReconciliationMatchesVariables, options?: useDataConnectQueryOptions<ListReconciliationMatchesData>): UseDataConnectQueryResult<ListReconciliationMatchesData, ListReconciliationMatchesVariables>;
```

### Variables
The `ListReconciliationMatches` Query requires an argument of type `ListReconciliationMatchesVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListReconciliationMatchesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListReconciliationMatches` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListReconciliationMatches` Query is of type `ListReconciliationMatchesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListReconciliationMatches`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListReconciliationMatchesVariables } from '@factures-thibeault/data-connect-generated';
import { useListReconciliationMatches } from '@factures-thibeault/data-connect-generated/react'

export default function ListReconciliationMatchesComponent() {
  // The `useListReconciliationMatches` Query hook requires an argument of type `ListReconciliationMatchesVariables`:
  const listReconciliationMatchesVars: ListReconciliationMatchesVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListReconciliationMatches(listReconciliationMatchesVars);
  // Variables can be defined inline as well.
  const query = useListReconciliationMatches({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListReconciliationMatches(dataConnect, listReconciliationMatchesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListReconciliationMatches(listReconciliationMatchesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListReconciliationMatches(dataConnect, listReconciliationMatchesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.reconciliationMatches);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListReconciliationMatchesPage
You can execute the `ListReconciliationMatchesPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListReconciliationMatchesPage(dc: DataConnect, vars: ListReconciliationMatchesPageVariables, options?: useDataConnectQueryOptions<ListReconciliationMatchesPageData>): UseDataConnectQueryResult<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListReconciliationMatchesPage(vars: ListReconciliationMatchesPageVariables, options?: useDataConnectQueryOptions<ListReconciliationMatchesPageData>): UseDataConnectQueryResult<ListReconciliationMatchesPageData, ListReconciliationMatchesPageVariables>;
```

### Variables
The `ListReconciliationMatchesPage` Query requires an argument of type `ListReconciliationMatchesPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListReconciliationMatchesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListReconciliationMatchesPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListReconciliationMatchesPage` Query is of type `ListReconciliationMatchesPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListReconciliationMatchesPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListReconciliationMatchesPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListReconciliationMatchesPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListReconciliationMatchesPageComponent() {
  // The `useListReconciliationMatchesPage` Query hook requires an argument of type `ListReconciliationMatchesPageVariables`:
  const listReconciliationMatchesPageVars: ListReconciliationMatchesPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListReconciliationMatchesPage(listReconciliationMatchesPageVars);
  // Variables can be defined inline as well.
  const query = useListReconciliationMatchesPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListReconciliationMatchesPage(dataConnect, listReconciliationMatchesPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListReconciliationMatchesPage(listReconciliationMatchesPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListReconciliationMatchesPage(dataConnect, listReconciliationMatchesPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.reconciliationMatches);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjects
You can execute the `ListProjects` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListProjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjects(options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;
```

### Variables
The `ListProjects` Query has no variables.
### Return Type
Recall that calling the `ListProjects` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjects` Query is of type `ListProjectsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListProjectsData {
  projects: ({
    id: string;
    number: string;
    name: string;
    status: string;
  } & Project_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjects`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListProjects } from '@factures-thibeault/data-connect-generated/react'

export default function ListProjectsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjects();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjects(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjects(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjects(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListSkuReferences
You can execute the `ListSkuReferences` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListSkuReferences(dc: DataConnect, options?: useDataConnectQueryOptions<ListSkuReferencesData>): UseDataConnectQueryResult<ListSkuReferencesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListSkuReferences(options?: useDataConnectQueryOptions<ListSkuReferencesData>): UseDataConnectQueryResult<ListSkuReferencesData, undefined>;
```

### Variables
The `ListSkuReferences` Query has no variables.
### Return Type
Recall that calling the `ListSkuReferences` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListSkuReferences` Query is of type `ListSkuReferencesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListSkuReferences`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListSkuReferences } from '@factures-thibeault/data-connect-generated/react'

export default function ListSkuReferencesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListSkuReferences();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListSkuReferences(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListSkuReferences(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListSkuReferences(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.skuReferences);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListExpenseTransactions
You can execute the `ListExpenseTransactions` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListExpenseTransactions(dc: DataConnect, vars: ListExpenseTransactionsVariables, options?: useDataConnectQueryOptions<ListExpenseTransactionsData>): UseDataConnectQueryResult<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListExpenseTransactions(vars: ListExpenseTransactionsVariables, options?: useDataConnectQueryOptions<ListExpenseTransactionsData>): UseDataConnectQueryResult<ListExpenseTransactionsData, ListExpenseTransactionsVariables>;
```

### Variables
The `ListExpenseTransactions` Query requires an argument of type `ListExpenseTransactionsVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListExpenseTransactionsVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListExpenseTransactions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListExpenseTransactions` Query is of type `ListExpenseTransactionsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    projectNumber?: string | null;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListExpenseTransactions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListExpenseTransactionsVariables } from '@factures-thibeault/data-connect-generated';
import { useListExpenseTransactions } from '@factures-thibeault/data-connect-generated/react'

export default function ListExpenseTransactionsComponent() {
  // The `useListExpenseTransactions` Query hook requires an argument of type `ListExpenseTransactionsVariables`:
  const listExpenseTransactionsVars: ListExpenseTransactionsVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListExpenseTransactions(listExpenseTransactionsVars);
  // Variables can be defined inline as well.
  const query = useListExpenseTransactions({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListExpenseTransactions(dataConnect, listExpenseTransactionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseTransactions(listExpenseTransactionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseTransactions(dataConnect, listExpenseTransactionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.expenseTransactions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListExpenseTransactionsPage
You can execute the `ListExpenseTransactionsPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListExpenseTransactionsPage(dc: DataConnect, vars: ListExpenseTransactionsPageVariables, options?: useDataConnectQueryOptions<ListExpenseTransactionsPageData>): UseDataConnectQueryResult<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListExpenseTransactionsPage(vars: ListExpenseTransactionsPageVariables, options?: useDataConnectQueryOptions<ListExpenseTransactionsPageData>): UseDataConnectQueryResult<ListExpenseTransactionsPageData, ListExpenseTransactionsPageVariables>;
```

### Variables
The `ListExpenseTransactionsPage` Query requires an argument of type `ListExpenseTransactionsPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListExpenseTransactionsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListExpenseTransactionsPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListExpenseTransactionsPage` Query is of type `ListExpenseTransactionsPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    projectNumber?: string | null;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListExpenseTransactionsPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListExpenseTransactionsPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListExpenseTransactionsPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListExpenseTransactionsPageComponent() {
  // The `useListExpenseTransactionsPage` Query hook requires an argument of type `ListExpenseTransactionsPageVariables`:
  const listExpenseTransactionsPageVars: ListExpenseTransactionsPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListExpenseTransactionsPage(listExpenseTransactionsPageVars);
  // Variables can be defined inline as well.
  const query = useListExpenseTransactionsPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListExpenseTransactionsPage(dataConnect, listExpenseTransactionsPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseTransactionsPage(listExpenseTransactionsPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseTransactionsPage(dataConnect, listExpenseTransactionsPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.expenseTransactions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListInvoicesToReview
You can execute the `ListInvoicesToReview` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListInvoicesToReview(dc: DataConnect, vars: ListInvoicesToReviewVariables, options?: useDataConnectQueryOptions<ListInvoicesToReviewData>): UseDataConnectQueryResult<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListInvoicesToReview(vars: ListInvoicesToReviewVariables, options?: useDataConnectQueryOptions<ListInvoicesToReviewData>): UseDataConnectQueryResult<ListInvoicesToReviewData, ListInvoicesToReviewVariables>;
```

### Variables
The `ListInvoicesToReview` Query requires an argument of type `ListInvoicesToReviewVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListInvoicesToReviewVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListInvoicesToReview` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListInvoicesToReview` Query is of type `ListInvoicesToReviewData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListInvoicesToReview`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListInvoicesToReviewVariables } from '@factures-thibeault/data-connect-generated';
import { useListInvoicesToReview } from '@factures-thibeault/data-connect-generated/react'

export default function ListInvoicesToReviewComponent() {
  // The `useListInvoicesToReview` Query hook requires an argument of type `ListInvoicesToReviewVariables`:
  const listInvoicesToReviewVars: ListInvoicesToReviewVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListInvoicesToReview(listInvoicesToReviewVars);
  // Variables can be defined inline as well.
  const query = useListInvoicesToReview({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListInvoicesToReview(dataConnect, listInvoicesToReviewVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesToReview(listInvoicesToReviewVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesToReview(dataConnect, listInvoicesToReviewVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invoices);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListInvoicesToReviewPage
You can execute the `ListInvoicesToReviewPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListInvoicesToReviewPage(dc: DataConnect, vars: ListInvoicesToReviewPageVariables, options?: useDataConnectQueryOptions<ListInvoicesToReviewPageData>): UseDataConnectQueryResult<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListInvoicesToReviewPage(vars: ListInvoicesToReviewPageVariables, options?: useDataConnectQueryOptions<ListInvoicesToReviewPageData>): UseDataConnectQueryResult<ListInvoicesToReviewPageData, ListInvoicesToReviewPageVariables>;
```

### Variables
The `ListInvoicesToReviewPage` Query requires an argument of type `ListInvoicesToReviewPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListInvoicesToReviewPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListInvoicesToReviewPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListInvoicesToReviewPage` Query is of type `ListInvoicesToReviewPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListInvoicesToReviewPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListInvoicesToReviewPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListInvoicesToReviewPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListInvoicesToReviewPageComponent() {
  // The `useListInvoicesToReviewPage` Query hook requires an argument of type `ListInvoicesToReviewPageVariables`:
  const listInvoicesToReviewPageVars: ListInvoicesToReviewPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListInvoicesToReviewPage(listInvoicesToReviewPageVars);
  // Variables can be defined inline as well.
  const query = useListInvoicesToReviewPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListInvoicesToReviewPage(dataConnect, listInvoicesToReviewPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesToReviewPage(listInvoicesToReviewPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesToReviewPage(dataConnect, listInvoicesToReviewPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invoices);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListInvoiceIntakes
You can execute the `ListInvoiceIntakes` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListInvoiceIntakes(dc: DataConnect, vars: ListInvoiceIntakesVariables, options?: useDataConnectQueryOptions<ListInvoiceIntakesData>): UseDataConnectQueryResult<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListInvoiceIntakes(vars: ListInvoiceIntakesVariables, options?: useDataConnectQueryOptions<ListInvoiceIntakesData>): UseDataConnectQueryResult<ListInvoiceIntakesData, ListInvoiceIntakesVariables>;
```

### Variables
The `ListInvoiceIntakes` Query requires an argument of type `ListInvoiceIntakesVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListInvoiceIntakesVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListInvoiceIntakes` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListInvoiceIntakes` Query is of type `ListInvoiceIntakesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    extractedProjectNumber?: string | null;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListInvoiceIntakes`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListInvoiceIntakesVariables } from '@factures-thibeault/data-connect-generated';
import { useListInvoiceIntakes } from '@factures-thibeault/data-connect-generated/react'

export default function ListInvoiceIntakesComponent() {
  // The `useListInvoiceIntakes` Query hook requires an argument of type `ListInvoiceIntakesVariables`:
  const listInvoiceIntakesVars: ListInvoiceIntakesVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListInvoiceIntakes(listInvoiceIntakesVars);
  // Variables can be defined inline as well.
  const query = useListInvoiceIntakes({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListInvoiceIntakes(dataConnect, listInvoiceIntakesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoiceIntakes(listInvoiceIntakesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoiceIntakes(dataConnect, listInvoiceIntakesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invoiceIntakes);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListInvoiceIntakesPage
You can execute the `ListInvoiceIntakesPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListInvoiceIntakesPage(dc: DataConnect, vars: ListInvoiceIntakesPageVariables, options?: useDataConnectQueryOptions<ListInvoiceIntakesPageData>): UseDataConnectQueryResult<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListInvoiceIntakesPage(vars: ListInvoiceIntakesPageVariables, options?: useDataConnectQueryOptions<ListInvoiceIntakesPageData>): UseDataConnectQueryResult<ListInvoiceIntakesPageData, ListInvoiceIntakesPageVariables>;
```

### Variables
The `ListInvoiceIntakesPage` Query requires an argument of type `ListInvoiceIntakesPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListInvoiceIntakesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListInvoiceIntakesPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListInvoiceIntakesPage` Query is of type `ListInvoiceIntakesPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    extractedProjectNumber?: string | null;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListInvoiceIntakesPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListInvoiceIntakesPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListInvoiceIntakesPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListInvoiceIntakesPageComponent() {
  // The `useListInvoiceIntakesPage` Query hook requires an argument of type `ListInvoiceIntakesPageVariables`:
  const listInvoiceIntakesPageVars: ListInvoiceIntakesPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListInvoiceIntakesPage(listInvoiceIntakesPageVars);
  // Variables can be defined inline as well.
  const query = useListInvoiceIntakesPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListInvoiceIntakesPage(dataConnect, listInvoiceIntakesPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoiceIntakesPage(listInvoiceIntakesPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoiceIntakesPage(dataConnect, listInvoiceIntakesPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invoiceIntakes);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListInvoicesForReconciliation
You can execute the `ListInvoicesForReconciliation` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListInvoicesForReconciliation(dc: DataConnect, vars: ListInvoicesForReconciliationVariables, options?: useDataConnectQueryOptions<ListInvoicesForReconciliationData>): UseDataConnectQueryResult<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListInvoicesForReconciliation(vars: ListInvoicesForReconciliationVariables, options?: useDataConnectQueryOptions<ListInvoicesForReconciliationData>): UseDataConnectQueryResult<ListInvoicesForReconciliationData, ListInvoicesForReconciliationVariables>;
```

### Variables
The `ListInvoicesForReconciliation` Query requires an argument of type `ListInvoicesForReconciliationVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListInvoicesForReconciliationVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListInvoicesForReconciliation` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListInvoicesForReconciliation` Query is of type `ListInvoicesForReconciliationData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListInvoicesForReconciliation`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListInvoicesForReconciliationVariables } from '@factures-thibeault/data-connect-generated';
import { useListInvoicesForReconciliation } from '@factures-thibeault/data-connect-generated/react'

export default function ListInvoicesForReconciliationComponent() {
  // The `useListInvoicesForReconciliation` Query hook requires an argument of type `ListInvoicesForReconciliationVariables`:
  const listInvoicesForReconciliationVars: ListInvoicesForReconciliationVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListInvoicesForReconciliation(listInvoicesForReconciliationVars);
  // Variables can be defined inline as well.
  const query = useListInvoicesForReconciliation({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListInvoicesForReconciliation(dataConnect, listInvoicesForReconciliationVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesForReconciliation(listInvoicesForReconciliationVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesForReconciliation(dataConnect, listInvoicesForReconciliationVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invoices);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListInvoicesForReconciliationPage
You can execute the `ListInvoicesForReconciliationPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListInvoicesForReconciliationPage(dc: DataConnect, vars: ListInvoicesForReconciliationPageVariables, options?: useDataConnectQueryOptions<ListInvoicesForReconciliationPageData>): UseDataConnectQueryResult<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListInvoicesForReconciliationPage(vars: ListInvoicesForReconciliationPageVariables, options?: useDataConnectQueryOptions<ListInvoicesForReconciliationPageData>): UseDataConnectQueryResult<ListInvoicesForReconciliationPageData, ListInvoicesForReconciliationPageVariables>;
```

### Variables
The `ListInvoicesForReconciliationPage` Query requires an argument of type `ListInvoicesForReconciliationPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListInvoicesForReconciliationPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListInvoicesForReconciliationPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListInvoicesForReconciliationPage` Query is of type `ListInvoicesForReconciliationPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListInvoicesForReconciliationPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListInvoicesForReconciliationPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListInvoicesForReconciliationPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListInvoicesForReconciliationPageComponent() {
  // The `useListInvoicesForReconciliationPage` Query hook requires an argument of type `ListInvoicesForReconciliationPageVariables`:
  const listInvoicesForReconciliationPageVars: ListInvoicesForReconciliationPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListInvoicesForReconciliationPage(listInvoicesForReconciliationPageVars);
  // Variables can be defined inline as well.
  const query = useListInvoicesForReconciliationPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListInvoicesForReconciliationPage(dataConnect, listInvoicesForReconciliationPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesForReconciliationPage(listInvoicesForReconciliationPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesForReconciliationPage(dataConnect, listInvoicesForReconciliationPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invoices);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTransactionCorrections
You can execute the `ListTransactionCorrections` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTransactionCorrections(dc: DataConnect, vars: ListTransactionCorrectionsVariables, options?: useDataConnectQueryOptions<ListTransactionCorrectionsData>): UseDataConnectQueryResult<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTransactionCorrections(vars: ListTransactionCorrectionsVariables, options?: useDataConnectQueryOptions<ListTransactionCorrectionsData>): UseDataConnectQueryResult<ListTransactionCorrectionsData, ListTransactionCorrectionsVariables>;
```

### Variables
The `ListTransactionCorrections` Query requires an argument of type `ListTransactionCorrectionsVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTransactionCorrectionsVariables {
  transactionId: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListTransactionCorrections` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTransactionCorrections` Query is of type `ListTransactionCorrectionsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTransactionCorrections`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTransactionCorrectionsVariables } from '@factures-thibeault/data-connect-generated';
import { useListTransactionCorrections } from '@factures-thibeault/data-connect-generated/react'

export default function ListTransactionCorrectionsComponent() {
  // The `useListTransactionCorrections` Query hook requires an argument of type `ListTransactionCorrectionsVariables`:
  const listTransactionCorrectionsVars: ListTransactionCorrectionsVariables = {
    transactionId: ..., 
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTransactionCorrections(listTransactionCorrectionsVars);
  // Variables can be defined inline as well.
  const query = useListTransactionCorrections({ transactionId: ..., limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTransactionCorrections(dataConnect, listTransactionCorrectionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTransactionCorrections(listTransactionCorrectionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTransactionCorrections(dataConnect, listTransactionCorrectionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.transactionCorrections);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListReportAdjustmentSets
You can execute the `ListReportAdjustmentSets` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListReportAdjustmentSets(dc: DataConnect, vars: ListReportAdjustmentSetsVariables, options?: useDataConnectQueryOptions<ListReportAdjustmentSetsData>): UseDataConnectQueryResult<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListReportAdjustmentSets(vars: ListReportAdjustmentSetsVariables, options?: useDataConnectQueryOptions<ListReportAdjustmentSetsData>): UseDataConnectQueryResult<ListReportAdjustmentSetsData, ListReportAdjustmentSetsVariables>;
```

### Variables
The `ListReportAdjustmentSets` Query requires an argument of type `ListReportAdjustmentSetsVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListReportAdjustmentSetsVariables {
  periodKey: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListReportAdjustmentSets` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListReportAdjustmentSets` Query is of type `ListReportAdjustmentSetsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListReportAdjustmentSets`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListReportAdjustmentSetsVariables } from '@factures-thibeault/data-connect-generated';
import { useListReportAdjustmentSets } from '@factures-thibeault/data-connect-generated/react'

export default function ListReportAdjustmentSetsComponent() {
  // The `useListReportAdjustmentSets` Query hook requires an argument of type `ListReportAdjustmentSetsVariables`:
  const listReportAdjustmentSetsVars: ListReportAdjustmentSetsVariables = {
    periodKey: ..., 
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListReportAdjustmentSets(listReportAdjustmentSetsVars);
  // Variables can be defined inline as well.
  const query = useListReportAdjustmentSets({ periodKey: ..., limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListReportAdjustmentSets(dataConnect, listReportAdjustmentSetsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListReportAdjustmentSets(listReportAdjustmentSetsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListReportAdjustmentSets(dataConnect, listReportAdjustmentSetsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.reportAdjustmentSets);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListAuditEvents
You can execute the `ListAuditEvents` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListAuditEvents(dc: DataConnect, vars: ListAuditEventsVariables, options?: useDataConnectQueryOptions<ListAuditEventsData>): UseDataConnectQueryResult<ListAuditEventsData, ListAuditEventsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListAuditEvents(vars: ListAuditEventsVariables, options?: useDataConnectQueryOptions<ListAuditEventsData>): UseDataConnectQueryResult<ListAuditEventsData, ListAuditEventsVariables>;
```

### Variables
The `ListAuditEvents` Query requires an argument of type `ListAuditEventsVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListAuditEventsVariables {
  entityType: string;
  entityId: string;
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListAuditEvents` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListAuditEvents` Query is of type `ListAuditEventsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListAuditEvents`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListAuditEventsVariables } from '@factures-thibeault/data-connect-generated';
import { useListAuditEvents } from '@factures-thibeault/data-connect-generated/react'

export default function ListAuditEventsComponent() {
  // The `useListAuditEvents` Query hook requires an argument of type `ListAuditEventsVariables`:
  const listAuditEventsVars: ListAuditEventsVariables = {
    entityType: ..., 
    entityId: ..., 
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListAuditEvents(listAuditEventsVars);
  // Variables can be defined inline as well.
  const query = useListAuditEvents({ entityType: ..., entityId: ..., limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListAuditEvents(dataConnect, listAuditEventsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListAuditEvents(listAuditEventsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListAuditEvents(dataConnect, listAuditEventsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.auditEvents);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListReconciliationOutsideControls
You can execute the `ListReconciliationOutsideControls` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListReconciliationOutsideControls(dc: DataConnect, vars: ListReconciliationOutsideControlsVariables, options?: useDataConnectQueryOptions<ListReconciliationOutsideControlsData>): UseDataConnectQueryResult<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListReconciliationOutsideControls(vars: ListReconciliationOutsideControlsVariables, options?: useDataConnectQueryOptions<ListReconciliationOutsideControlsData>): UseDataConnectQueryResult<ListReconciliationOutsideControlsData, ListReconciliationOutsideControlsVariables>;
```

### Variables
The `ListReconciliationOutsideControls` Query requires an argument of type `ListReconciliationOutsideControlsVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListReconciliationOutsideControlsVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListReconciliationOutsideControls` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListReconciliationOutsideControls` Query is of type `ListReconciliationOutsideControlsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListReconciliationOutsideControls`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListReconciliationOutsideControlsVariables } from '@factures-thibeault/data-connect-generated';
import { useListReconciliationOutsideControls } from '@factures-thibeault/data-connect-generated/react'

export default function ListReconciliationOutsideControlsComponent() {
  // The `useListReconciliationOutsideControls` Query hook requires an argument of type `ListReconciliationOutsideControlsVariables`:
  const listReconciliationOutsideControlsVars: ListReconciliationOutsideControlsVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListReconciliationOutsideControls(listReconciliationOutsideControlsVars);
  // Variables can be defined inline as well.
  const query = useListReconciliationOutsideControls({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListReconciliationOutsideControls(dataConnect, listReconciliationOutsideControlsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListReconciliationOutsideControls(listReconciliationOutsideControlsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListReconciliationOutsideControls(dataConnect, listReconciliationOutsideControlsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.reconciliationOutsideControls);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListReconciliationOutsideControlsPage
You can execute the `ListReconciliationOutsideControlsPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListReconciliationOutsideControlsPage(dc: DataConnect, vars: ListReconciliationOutsideControlsPageVariables, options?: useDataConnectQueryOptions<ListReconciliationOutsideControlsPageData>): UseDataConnectQueryResult<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListReconciliationOutsideControlsPage(vars: ListReconciliationOutsideControlsPageVariables, options?: useDataConnectQueryOptions<ListReconciliationOutsideControlsPageData>): UseDataConnectQueryResult<ListReconciliationOutsideControlsPageData, ListReconciliationOutsideControlsPageVariables>;
```

### Variables
The `ListReconciliationOutsideControlsPage` Query requires an argument of type `ListReconciliationOutsideControlsPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListReconciliationOutsideControlsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListReconciliationOutsideControlsPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListReconciliationOutsideControlsPage` Query is of type `ListReconciliationOutsideControlsPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListReconciliationOutsideControlsPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListReconciliationOutsideControlsPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListReconciliationOutsideControlsPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListReconciliationOutsideControlsPageComponent() {
  // The `useListReconciliationOutsideControlsPage` Query hook requires an argument of type `ListReconciliationOutsideControlsPageVariables`:
  const listReconciliationOutsideControlsPageVars: ListReconciliationOutsideControlsPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListReconciliationOutsideControlsPage(listReconciliationOutsideControlsPageVars);
  // Variables can be defined inline as well.
  const query = useListReconciliationOutsideControlsPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListReconciliationOutsideControlsPage(dataConnect, listReconciliationOutsideControlsPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListReconciliationOutsideControlsPage(listReconciliationOutsideControlsPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListReconciliationOutsideControlsPage(dataConnect, listReconciliationOutsideControlsPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.reconciliationOutsideControls);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCreditCardsPage
You can execute the `ListCreditCardsPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCreditCardsPage(dc: DataConnect, vars: ListCreditCardsPageVariables, options?: useDataConnectQueryOptions<ListCreditCardsPageData>): UseDataConnectQueryResult<ListCreditCardsPageData, ListCreditCardsPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCreditCardsPage(vars: ListCreditCardsPageVariables, options?: useDataConnectQueryOptions<ListCreditCardsPageData>): UseDataConnectQueryResult<ListCreditCardsPageData, ListCreditCardsPageVariables>;
```

### Variables
The `ListCreditCardsPage` Query requires an argument of type `ListCreditCardsPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListCreditCardsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListCreditCardsPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCreditCardsPage` Query is of type `ListCreditCardsPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCreditCardsPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListCreditCardsPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListCreditCardsPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListCreditCardsPageComponent() {
  // The `useListCreditCardsPage` Query hook requires an argument of type `ListCreditCardsPageVariables`:
  const listCreditCardsPageVars: ListCreditCardsPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCreditCardsPage(listCreditCardsPageVars);
  // Variables can be defined inline as well.
  const query = useListCreditCardsPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCreditCardsPage(dataConnect, listCreditCardsPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardsPage(listCreditCardsPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCreditCardsPage(dataConnect, listCreditCardsPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.creditCards);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCardStatementPeriodsPage
You can execute the `ListCardStatementPeriodsPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListCardStatementPeriodsPage(dc: DataConnect, vars: ListCardStatementPeriodsPageVariables, options?: useDataConnectQueryOptions<ListCardStatementPeriodsPageData>): UseDataConnectQueryResult<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCardStatementPeriodsPage(vars: ListCardStatementPeriodsPageVariables, options?: useDataConnectQueryOptions<ListCardStatementPeriodsPageData>): UseDataConnectQueryResult<ListCardStatementPeriodsPageData, ListCardStatementPeriodsPageVariables>;
```

### Variables
The `ListCardStatementPeriodsPage` Query requires an argument of type `ListCardStatementPeriodsPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListCardStatementPeriodsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListCardStatementPeriodsPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCardStatementPeriodsPage` Query is of type `ListCardStatementPeriodsPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCardStatementPeriodsPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListCardStatementPeriodsPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListCardStatementPeriodsPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListCardStatementPeriodsPageComponent() {
  // The `useListCardStatementPeriodsPage` Query hook requires an argument of type `ListCardStatementPeriodsPageVariables`:
  const listCardStatementPeriodsPageVars: ListCardStatementPeriodsPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCardStatementPeriodsPage(listCardStatementPeriodsPageVars);
  // Variables can be defined inline as well.
  const query = useListCardStatementPeriodsPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCardStatementPeriodsPage(dataConnect, listCardStatementPeriodsPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCardStatementPeriodsPage(listCardStatementPeriodsPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCardStatementPeriodsPage(dataConnect, listCardStatementPeriodsPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.cardStatementPeriods);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListExpenseAccountsPage
You can execute the `ListExpenseAccountsPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListExpenseAccountsPage(dc: DataConnect, vars: ListExpenseAccountsPageVariables, options?: useDataConnectQueryOptions<ListExpenseAccountsPageData>): UseDataConnectQueryResult<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListExpenseAccountsPage(vars: ListExpenseAccountsPageVariables, options?: useDataConnectQueryOptions<ListExpenseAccountsPageData>): UseDataConnectQueryResult<ListExpenseAccountsPageData, ListExpenseAccountsPageVariables>;
```

### Variables
The `ListExpenseAccountsPage` Query requires an argument of type `ListExpenseAccountsPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListExpenseAccountsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListExpenseAccountsPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListExpenseAccountsPage` Query is of type `ListExpenseAccountsPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListExpenseAccountsPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListExpenseAccountsPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListExpenseAccountsPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListExpenseAccountsPageComponent() {
  // The `useListExpenseAccountsPage` Query hook requires an argument of type `ListExpenseAccountsPageVariables`:
  const listExpenseAccountsPageVars: ListExpenseAccountsPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListExpenseAccountsPage(listExpenseAccountsPageVars);
  // Variables can be defined inline as well.
  const query = useListExpenseAccountsPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListExpenseAccountsPage(dataConnect, listExpenseAccountsPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseAccountsPage(listExpenseAccountsPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseAccountsPage(dataConnect, listExpenseAccountsPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.expenseAccounts);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjectsPage
You can execute the `ListProjectsPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListProjectsPage(dc: DataConnect, vars: ListProjectsPageVariables, options?: useDataConnectQueryOptions<ListProjectsPageData>): UseDataConnectQueryResult<ListProjectsPageData, ListProjectsPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjectsPage(vars: ListProjectsPageVariables, options?: useDataConnectQueryOptions<ListProjectsPageData>): UseDataConnectQueryResult<ListProjectsPageData, ListProjectsPageVariables>;
```

### Variables
The `ListProjectsPage` Query requires an argument of type `ListProjectsPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectsPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListProjectsPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjectsPage` Query is of type `ListProjectsPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListProjectsPageData {
  projects: ({
    id: string;
    number: string;
    name: string;
    status: string;
  } & Project_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjectsPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProjectsPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListProjectsPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListProjectsPageComponent() {
  // The `useListProjectsPage` Query hook requires an argument of type `ListProjectsPageVariables`:
  const listProjectsPageVars: ListProjectsPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjectsPage(listProjectsPageVars);
  // Variables can be defined inline as well.
  const query = useListProjectsPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjectsPage(dataConnect, listProjectsPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectsPage(listProjectsPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectsPage(dataConnect, listProjectsPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListSkuReferencesPage
You can execute the `ListSkuReferencesPage` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListSkuReferencesPage(dc: DataConnect, vars: ListSkuReferencesPageVariables, options?: useDataConnectQueryOptions<ListSkuReferencesPageData>): UseDataConnectQueryResult<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListSkuReferencesPage(vars: ListSkuReferencesPageVariables, options?: useDataConnectQueryOptions<ListSkuReferencesPageData>): UseDataConnectQueryResult<ListSkuReferencesPageData, ListSkuReferencesPageVariables>;
```

### Variables
The `ListSkuReferencesPage` Query requires an argument of type `ListSkuReferencesPageVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListSkuReferencesPageVariables {
  limit: number;
  offset: number;
}
```
### Return Type
Recall that calling the `ListSkuReferencesPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListSkuReferencesPage` Query is of type `ListSkuReferencesPageData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListSkuReferencesPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListSkuReferencesPageVariables } from '@factures-thibeault/data-connect-generated';
import { useListSkuReferencesPage } from '@factures-thibeault/data-connect-generated/react'

export default function ListSkuReferencesPageComponent() {
  // The `useListSkuReferencesPage` Query hook requires an argument of type `ListSkuReferencesPageVariables`:
  const listSkuReferencesPageVars: ListSkuReferencesPageVariables = {
    limit: ..., 
    offset: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListSkuReferencesPage(listSkuReferencesPageVars);
  // Variables can be defined inline as well.
  const query = useListSkuReferencesPage({ limit: ..., offset: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListSkuReferencesPage(dataConnect, listSkuReferencesPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListSkuReferencesPage(listSkuReferencesPageVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListSkuReferencesPage(dataConnect, listSkuReferencesPageVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.skuReferences);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `accounting` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## AdminSeedUserProfile
You can execute the `AdminSeedUserProfile` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedUserProfile(options?: useDataConnectMutationOptions<AdminSeedUserProfileData, FirebaseError, AdminSeedUserProfileVariables>): UseDataConnectMutationResult<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedUserProfile(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedUserProfileData, FirebaseError, AdminSeedUserProfileVariables>): UseDataConnectMutationResult<AdminSeedUserProfileData, AdminSeedUserProfileVariables>;
```

### Variables
The `AdminSeedUserProfile` Mutation requires an argument of type `AdminSeedUserProfileVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedUserProfile` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedUserProfile` Mutation is of type `AdminSeedUserProfileData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedUserProfileData {
  userProfile_upsert: UserProfile_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedUserProfile`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedUserProfileVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedUserProfile } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedUserProfileComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedUserProfile();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedUserProfile(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedUserProfile(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedUserProfile(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedUserProfile` Mutation requires an argument of type `AdminSeedUserProfileVariables`:
  const adminSeedUserProfileVars: AdminSeedUserProfileVariables = {
    id: ..., 
    firebaseUid: ..., 
    displayName: ..., 
    email: ..., // optional
    jobTitle: ..., // optional
    role: ..., 
    status: ..., 
  };
  mutation.mutate(adminSeedUserProfileVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedUserProfileVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userProfile_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedProject
You can execute the `AdminSeedProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedProject(options?: useDataConnectMutationOptions<AdminSeedProjectData, FirebaseError, AdminSeedProjectVariables>): UseDataConnectMutationResult<AdminSeedProjectData, AdminSeedProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedProject(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedProjectData, FirebaseError, AdminSeedProjectVariables>): UseDataConnectMutationResult<AdminSeedProjectData, AdminSeedProjectVariables>;
```

### Variables
The `AdminSeedProject` Mutation requires an argument of type `AdminSeedProjectVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminSeedProjectVariables {
  id: string;
  number: string;
  name: string;
  status: string;
}
```
### Return Type
Recall that calling the `AdminSeedProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedProject` Mutation is of type `AdminSeedProjectData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedProjectData {
  project_upsert: Project_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedProjectVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedProject } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedProject` Mutation requires an argument of type `AdminSeedProjectVariables`:
  const adminSeedProjectVars: AdminSeedProjectVariables = {
    id: ..., 
    number: ..., 
    name: ..., 
    status: ..., 
  };
  mutation.mutate(adminSeedProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., number: ..., name: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedExpenseAccount
You can execute the `AdminSeedExpenseAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedExpenseAccount(options?: useDataConnectMutationOptions<AdminSeedExpenseAccountData, FirebaseError, AdminSeedExpenseAccountVariables>): UseDataConnectMutationResult<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedExpenseAccount(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedExpenseAccountData, FirebaseError, AdminSeedExpenseAccountVariables>): UseDataConnectMutationResult<AdminSeedExpenseAccountData, AdminSeedExpenseAccountVariables>;
```

### Variables
The `AdminSeedExpenseAccount` Mutation requires an argument of type `AdminSeedExpenseAccountVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminSeedExpenseAccountVariables {
  id: string;
  number: string;
  label: string;
  type: string;
  status: string;
}
```
### Return Type
Recall that calling the `AdminSeedExpenseAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedExpenseAccount` Mutation is of type `AdminSeedExpenseAccountData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedExpenseAccountData {
  expenseAccount_upsert: ExpenseAccount_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedExpenseAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedExpenseAccount } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedExpenseAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedExpenseAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedExpenseAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedExpenseAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedExpenseAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedExpenseAccount` Mutation requires an argument of type `AdminSeedExpenseAccountVariables`:
  const adminSeedExpenseAccountVars: AdminSeedExpenseAccountVariables = {
    id: ..., 
    number: ..., 
    label: ..., 
    type: ..., 
    status: ..., 
  };
  mutation.mutate(adminSeedExpenseAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., number: ..., label: ..., type: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedExpenseAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expenseAccount_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedCardStatementPeriod
You can execute the `AdminSeedCardStatementPeriod` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedCardStatementPeriod(options?: useDataConnectMutationOptions<AdminSeedCardStatementPeriodData, FirebaseError, AdminSeedCardStatementPeriodVariables>): UseDataConnectMutationResult<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedCardStatementPeriod(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedCardStatementPeriodData, FirebaseError, AdminSeedCardStatementPeriodVariables>): UseDataConnectMutationResult<AdminSeedCardStatementPeriodData, AdminSeedCardStatementPeriodVariables>;
```

### Variables
The `AdminSeedCardStatementPeriod` Mutation requires an argument of type `AdminSeedCardStatementPeriodVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedCardStatementPeriod` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedCardStatementPeriod` Mutation is of type `AdminSeedCardStatementPeriodData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedCardStatementPeriodData {
  cardStatementPeriod_upsert: CardStatementPeriod_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedCardStatementPeriod`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedCardStatementPeriod } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedCardStatementPeriodComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedCardStatementPeriod();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedCardStatementPeriod(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCardStatementPeriod(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCardStatementPeriod(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedCardStatementPeriod` Mutation requires an argument of type `AdminSeedCardStatementPeriodVariables`:
  const adminSeedCardStatementPeriodVars: AdminSeedCardStatementPeriodVariables = {
    id: ..., 
    label: ..., 
    startDate: ..., 
    endDate: ..., 
    statementLabel: ..., // optional
    status: ..., 
  };
  mutation.mutate(adminSeedCardStatementPeriodVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., label: ..., startDate: ..., endDate: ..., statementLabel: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedCardStatementPeriodVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.cardStatementPeriod_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedInvoiceIntake
You can execute the `AdminSeedInvoiceIntake` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedInvoiceIntake(options?: useDataConnectMutationOptions<AdminSeedInvoiceIntakeData, FirebaseError, AdminSeedInvoiceIntakeVariables>): UseDataConnectMutationResult<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedInvoiceIntake(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedInvoiceIntakeData, FirebaseError, AdminSeedInvoiceIntakeVariables>): UseDataConnectMutationResult<AdminSeedInvoiceIntakeData, AdminSeedInvoiceIntakeVariables>;
```

### Variables
The `AdminSeedInvoiceIntake` Mutation requires an argument of type `AdminSeedInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedInvoiceIntake` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedInvoiceIntake` Mutation is of type `AdminSeedInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedInvoiceIntakeData {
  invoiceIntake_upsert: InvoiceIntake_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedInvoiceIntake`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedInvoiceIntake } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedInvoiceIntakeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedInvoiceIntake();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedInvoiceIntake(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedInvoiceIntake(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedInvoiceIntake(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedInvoiceIntake` Mutation requires an argument of type `AdminSeedInvoiceIntakeVariables`:
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
  mutation.mutate(adminSeedInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., uploaderUid: ..., storageFolder: ..., photoCount: ..., status: ..., processingStatus: ..., accountingStatus: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., decisionExceptions: ..., decisionChecks: ..., aiNotes: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedInvoiceIntakeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedCreditCard
You can execute the `AdminSeedCreditCard` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedCreditCard(options?: useDataConnectMutationOptions<AdminSeedCreditCardData, FirebaseError, AdminSeedCreditCardVariables>): UseDataConnectMutationResult<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedCreditCard(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedCreditCardData, FirebaseError, AdminSeedCreditCardVariables>): UseDataConnectMutationResult<AdminSeedCreditCardData, AdminSeedCreditCardVariables>;
```

### Variables
The `AdminSeedCreditCard` Mutation requires an argument of type `AdminSeedCreditCardVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedCreditCard` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedCreditCard` Mutation is of type `AdminSeedCreditCardData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedCreditCardData {
  creditCard_upsert: CreditCard_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedCreditCard`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedCreditCardVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedCreditCard } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedCreditCardComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedCreditCard();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedCreditCard(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCreditCard(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCreditCard(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedCreditCard` Mutation requires an argument of type `AdminSeedCreditCardVariables`:
  const adminSeedCreditCardVars: AdminSeedCreditCardVariables = {
    id: ..., 
    lastFour: ..., 
    holderId: ..., 
    cardFunction: ..., // optional
    status: ..., 
    activeFrom: ..., // optional
  };
  mutation.mutate(adminSeedCreditCardVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., lastFour: ..., holderId: ..., cardFunction: ..., status: ..., activeFrom: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedCreditCardVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCard_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedCreditCardStatement
You can execute the `AdminSeedCreditCardStatement` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedCreditCardStatement(options?: useDataConnectMutationOptions<AdminSeedCreditCardStatementData, FirebaseError, AdminSeedCreditCardStatementVariables>): UseDataConnectMutationResult<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedCreditCardStatement(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedCreditCardStatementData, FirebaseError, AdminSeedCreditCardStatementVariables>): UseDataConnectMutationResult<AdminSeedCreditCardStatementData, AdminSeedCreditCardStatementVariables>;
```

### Variables
The `AdminSeedCreditCardStatement` Mutation requires an argument of type `AdminSeedCreditCardStatementVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedCreditCardStatement` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedCreditCardStatement` Mutation is of type `AdminSeedCreditCardStatementData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedCreditCardStatementData {
  creditCardStatement_upsert: CreditCardStatement_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedCreditCardStatement`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedCreditCardStatementVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedCreditCardStatement } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedCreditCardStatementComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedCreditCardStatement();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedCreditCardStatement(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCreditCardStatement(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCreditCardStatement(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedCreditCardStatement` Mutation requires an argument of type `AdminSeedCreditCardStatementVariables`:
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
  mutation.mutate(adminSeedCreditCardStatementVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., cardId: ..., holderIdSnapshot: ..., holderNameSnapshot: ..., periodStart: ..., periodEnd: ..., originalStoragePath: ..., originalFilename: ..., importedById: ..., statementHash: ..., status: ..., lineCount: ..., totalAmountCents: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedCreditCardStatementVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCardStatement_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedCreditCardStatementLine
You can execute the `AdminSeedCreditCardStatementLine` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedCreditCardStatementLine(options?: useDataConnectMutationOptions<AdminSeedCreditCardStatementLineData, FirebaseError, AdminSeedCreditCardStatementLineVariables>): UseDataConnectMutationResult<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedCreditCardStatementLine(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedCreditCardStatementLineData, FirebaseError, AdminSeedCreditCardStatementLineVariables>): UseDataConnectMutationResult<AdminSeedCreditCardStatementLineData, AdminSeedCreditCardStatementLineVariables>;
```

### Variables
The `AdminSeedCreditCardStatementLine` Mutation requires an argument of type `AdminSeedCreditCardStatementLineVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedCreditCardStatementLine` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedCreditCardStatementLine` Mutation is of type `AdminSeedCreditCardStatementLineData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedCreditCardStatementLineData {
  creditCardStatementLine_upsert: CreditCardStatementLine_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedCreditCardStatementLine`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedCreditCardStatementLineVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedCreditCardStatementLine } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedCreditCardStatementLineComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedCreditCardStatementLine();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedCreditCardStatementLine(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCreditCardStatementLine(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCreditCardStatementLine(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedCreditCardStatementLine` Mutation requires an argument of type `AdminSeedCreditCardStatementLineVariables`:
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
  mutation.mutate(adminSeedCreditCardStatementLineVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., statementId: ..., sequence: ..., transactionDate: ..., postedDate: ..., merchantRaw: ..., merchantNormalized: ..., amountCents: ..., externalReference: ..., status: ..., rawData: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedCreditCardStatementLineVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCardStatementLine_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedSkuReference
You can execute the `AdminSeedSkuReference` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedSkuReference(options?: useDataConnectMutationOptions<AdminSeedSkuReferenceData, FirebaseError, AdminSeedSkuReferenceVariables>): UseDataConnectMutationResult<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedSkuReference(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedSkuReferenceData, FirebaseError, AdminSeedSkuReferenceVariables>): UseDataConnectMutationResult<AdminSeedSkuReferenceData, AdminSeedSkuReferenceVariables>;
```

### Variables
The `AdminSeedSkuReference` Mutation requires an argument of type `AdminSeedSkuReferenceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedSkuReference` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedSkuReference` Mutation is of type `AdminSeedSkuReferenceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedSkuReferenceData {
  skuReference_upsert: SkuReference_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedSkuReference`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedSkuReference } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedSkuReferenceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedSkuReference();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedSkuReference(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedSkuReference(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedSkuReference(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedSkuReference` Mutation requires an argument of type `AdminSeedSkuReferenceVariables`:
  const adminSeedSkuReferenceVars: AdminSeedSkuReferenceVariables = {
    merchant: ..., 
    sku: ..., 
    productLabel: ..., // optional
    categoryLabel: ..., // optional
    accountId: ..., 
    verificationStatus: ..., 
  };
  mutation.mutate(adminSeedSkuReferenceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ merchant: ..., sku: ..., productLabel: ..., categoryLabel: ..., accountId: ..., verificationStatus: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedSkuReferenceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.skuReference_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedExpenseTransaction
You can execute the `AdminSeedExpenseTransaction` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedExpenseTransaction(options?: useDataConnectMutationOptions<AdminSeedExpenseTransactionData, FirebaseError, AdminSeedExpenseTransactionVariables>): UseDataConnectMutationResult<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedExpenseTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedExpenseTransactionData, FirebaseError, AdminSeedExpenseTransactionVariables>): UseDataConnectMutationResult<AdminSeedExpenseTransactionData, AdminSeedExpenseTransactionVariables>;
```

### Variables
The `AdminSeedExpenseTransaction` Mutation requires an argument of type `AdminSeedExpenseTransactionVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedExpenseTransaction` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedExpenseTransaction` Mutation is of type `AdminSeedExpenseTransactionData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedExpenseTransactionData {
  expenseTransaction_upsert: ExpenseTransaction_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedExpenseTransaction`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedExpenseTransactionVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedExpenseTransaction } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedExpenseTransactionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedExpenseTransaction();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedExpenseTransaction(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedExpenseTransaction(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedExpenseTransaction(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedExpenseTransaction` Mutation requires an argument of type `AdminSeedExpenseTransactionVariables`:
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
  mutation.mutate(adminSeedExpenseTransactionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., transactionDate: ..., vendor: ..., cardId: ..., statementPeriodId: ..., projectId: ..., accountId: ..., categoryLabel: ..., sku: ..., amountBeforeTaxCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., status: ..., processingStatus: ..., accountingStatus: ..., reconciliationStatus: ..., classificationSource: ..., classificationConfidence: ..., classificationNote: ..., invoiceNumber: ..., issue: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedExpenseTransactionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expenseTransaction_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedInvoice
You can execute the `AdminSeedInvoice` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedInvoice(options?: useDataConnectMutationOptions<AdminSeedInvoiceData, FirebaseError, AdminSeedInvoiceVariables>): UseDataConnectMutationResult<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedInvoice(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedInvoiceData, FirebaseError, AdminSeedInvoiceVariables>): UseDataConnectMutationResult<AdminSeedInvoiceData, AdminSeedInvoiceVariables>;
```

### Variables
The `AdminSeedInvoice` Mutation requires an argument of type `AdminSeedInvoiceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedInvoice` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedInvoice` Mutation is of type `AdminSeedInvoiceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedInvoiceData {
  invoice_upsert: Invoice_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedInvoice`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedInvoiceVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedInvoice } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedInvoiceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedInvoice();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedInvoice(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedInvoice(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedInvoice(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedInvoice` Mutation requires an argument of type `AdminSeedInvoiceVariables`:
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
  mutation.mutate(adminSeedInvoiceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., transactionId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., processingStatus: ..., accountingStatus: ..., reviewStatus: ..., storageFolder: ..., createdById: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedInvoiceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoice_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedInvoicePhoto
You can execute the `AdminSeedInvoicePhoto` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedInvoicePhoto(options?: useDataConnectMutationOptions<AdminSeedInvoicePhotoData, FirebaseError, AdminSeedInvoicePhotoVariables>): UseDataConnectMutationResult<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedInvoicePhoto(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedInvoicePhotoData, FirebaseError, AdminSeedInvoicePhotoVariables>): UseDataConnectMutationResult<AdminSeedInvoicePhotoData, AdminSeedInvoicePhotoVariables>;
```

### Variables
The `AdminSeedInvoicePhoto` Mutation requires an argument of type `AdminSeedInvoicePhotoVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminSeedInvoicePhotoVariables {
  id: string;
  invoiceId: string;
  storagePath: string;
  contentType: string;
  sequence: number;
}
```
### Return Type
Recall that calling the `AdminSeedInvoicePhoto` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedInvoicePhoto` Mutation is of type `AdminSeedInvoicePhotoData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedInvoicePhotoData {
  invoicePhoto_upsert: InvoicePhoto_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedInvoicePhoto`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedInvoicePhotoVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedInvoicePhoto } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedInvoicePhotoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedInvoicePhoto();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedInvoicePhoto(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedInvoicePhoto(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedInvoicePhoto(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedInvoicePhoto` Mutation requires an argument of type `AdminSeedInvoicePhotoVariables`:
  const adminSeedInvoicePhotoVars: AdminSeedInvoicePhotoVariables = {
    id: ..., 
    invoiceId: ..., 
    storagePath: ..., 
    contentType: ..., 
    sequence: ..., 
  };
  mutation.mutate(adminSeedInvoicePhotoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., invoiceId: ..., storagePath: ..., contentType: ..., sequence: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedInvoicePhotoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoicePhoto_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteInvoicePhoto
You can execute the `AdminDeleteInvoicePhoto` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteInvoicePhoto(options?: useDataConnectMutationOptions<AdminDeleteInvoicePhotoData, FirebaseError, AdminDeleteInvoicePhotoVariables>): UseDataConnectMutationResult<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteInvoicePhoto(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteInvoicePhotoData, FirebaseError, AdminDeleteInvoicePhotoVariables>): UseDataConnectMutationResult<AdminDeleteInvoicePhotoData, AdminDeleteInvoicePhotoVariables>;
```

### Variables
The `AdminDeleteInvoicePhoto` Mutation requires an argument of type `AdminDeleteInvoicePhotoVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteInvoicePhotoVariables {
  id: string;
}
```
### Return Type
Recall that calling the `AdminDeleteInvoicePhoto` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteInvoicePhoto` Mutation is of type `AdminDeleteInvoicePhotoData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteInvoicePhotoData {
  invoicePhoto_delete?: InvoicePhoto_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteInvoicePhoto`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteInvoicePhotoVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteInvoicePhoto } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteInvoicePhotoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteInvoicePhoto();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteInvoicePhoto(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteInvoicePhoto(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteInvoicePhoto(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteInvoicePhoto` Mutation requires an argument of type `AdminDeleteInvoicePhotoVariables`:
  const adminDeleteInvoicePhotoVars: AdminDeleteInvoicePhotoVariables = {
    id: ..., 
  };
  mutation.mutate(adminDeleteInvoicePhotoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteInvoicePhotoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoicePhoto_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteInvoice
You can execute the `AdminDeleteInvoice` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteInvoice(options?: useDataConnectMutationOptions<AdminDeleteInvoiceData, FirebaseError, AdminDeleteInvoiceVariables>): UseDataConnectMutationResult<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteInvoice(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteInvoiceData, FirebaseError, AdminDeleteInvoiceVariables>): UseDataConnectMutationResult<AdminDeleteInvoiceData, AdminDeleteInvoiceVariables>;
```

### Variables
The `AdminDeleteInvoice` Mutation requires an argument of type `AdminDeleteInvoiceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteInvoiceVariables {
  id: string;
}
```
### Return Type
Recall that calling the `AdminDeleteInvoice` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteInvoice` Mutation is of type `AdminDeleteInvoiceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteInvoiceData {
  invoice_delete?: Invoice_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteInvoice`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteInvoiceVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteInvoice } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteInvoiceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteInvoice();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteInvoice(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteInvoice(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteInvoice(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteInvoice` Mutation requires an argument of type `AdminDeleteInvoiceVariables`:
  const adminDeleteInvoiceVars: AdminDeleteInvoiceVariables = {
    id: ..., 
  };
  mutation.mutate(adminDeleteInvoiceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteInvoiceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoice_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteExpenseTransaction
You can execute the `AdminDeleteExpenseTransaction` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteExpenseTransaction(options?: useDataConnectMutationOptions<AdminDeleteExpenseTransactionData, FirebaseError, AdminDeleteExpenseTransactionVariables>): UseDataConnectMutationResult<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteExpenseTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteExpenseTransactionData, FirebaseError, AdminDeleteExpenseTransactionVariables>): UseDataConnectMutationResult<AdminDeleteExpenseTransactionData, AdminDeleteExpenseTransactionVariables>;
```

### Variables
The `AdminDeleteExpenseTransaction` Mutation requires an argument of type `AdminDeleteExpenseTransactionVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteExpenseTransactionVariables {
  id: string;
}
```
### Return Type
Recall that calling the `AdminDeleteExpenseTransaction` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteExpenseTransaction` Mutation is of type `AdminDeleteExpenseTransactionData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteExpenseTransactionData {
  expenseTransaction_delete?: ExpenseTransaction_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteExpenseTransaction`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteExpenseTransactionVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteExpenseTransaction } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteExpenseTransactionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteExpenseTransaction();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteExpenseTransaction(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteExpenseTransaction(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteExpenseTransaction(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteExpenseTransaction` Mutation requires an argument of type `AdminDeleteExpenseTransactionVariables`:
  const adminDeleteExpenseTransactionVars: AdminDeleteExpenseTransactionVariables = {
    id: ..., 
  };
  mutation.mutate(adminDeleteExpenseTransactionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteExpenseTransactionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expenseTransaction_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteInvoiceIntake
You can execute the `AdminDeleteInvoiceIntake` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteInvoiceIntake(options?: useDataConnectMutationOptions<AdminDeleteInvoiceIntakeData, FirebaseError, AdminDeleteInvoiceIntakeVariables>): UseDataConnectMutationResult<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteInvoiceIntake(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteInvoiceIntakeData, FirebaseError, AdminDeleteInvoiceIntakeVariables>): UseDataConnectMutationResult<AdminDeleteInvoiceIntakeData, AdminDeleteInvoiceIntakeVariables>;
```

### Variables
The `AdminDeleteInvoiceIntake` Mutation requires an argument of type `AdminDeleteInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteInvoiceIntakeVariables {
  receiptId: string;
}
```
### Return Type
Recall that calling the `AdminDeleteInvoiceIntake` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteInvoiceIntake` Mutation is of type `AdminDeleteInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteInvoiceIntakeData {
  invoiceIntake_delete?: InvoiceIntake_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteInvoiceIntake`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteInvoiceIntake } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteInvoiceIntakeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteInvoiceIntake();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteInvoiceIntake(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteInvoiceIntake(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteInvoiceIntake(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteInvoiceIntake` Mutation requires an argument of type `AdminDeleteInvoiceIntakeVariables`:
  const adminDeleteInvoiceIntakeVars: AdminDeleteInvoiceIntakeVariables = {
    receiptId: ..., 
  };
  mutation.mutate(adminDeleteInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteInvoiceIntakeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteCreditCard
You can execute the `AdminDeleteCreditCard` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteCreditCard(options?: useDataConnectMutationOptions<AdminDeleteCreditCardData, FirebaseError, AdminDeleteCreditCardVariables>): UseDataConnectMutationResult<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteCreditCard(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteCreditCardData, FirebaseError, AdminDeleteCreditCardVariables>): UseDataConnectMutationResult<AdminDeleteCreditCardData, AdminDeleteCreditCardVariables>;
```

### Variables
The `AdminDeleteCreditCard` Mutation requires an argument of type `AdminDeleteCreditCardVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteCreditCardVariables {
  id: string;
}
```
### Return Type
Recall that calling the `AdminDeleteCreditCard` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteCreditCard` Mutation is of type `AdminDeleteCreditCardData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteCreditCardData {
  creditCard_delete?: CreditCard_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteCreditCard`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteCreditCardVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteCreditCard } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteCreditCardComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteCreditCard();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteCreditCard(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteCreditCard(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteCreditCard(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteCreditCard` Mutation requires an argument of type `AdminDeleteCreditCardVariables`:
  const adminDeleteCreditCardVars: AdminDeleteCreditCardVariables = {
    id: ..., 
  };
  mutation.mutate(adminDeleteCreditCardVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteCreditCardVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCard_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteSkuReference
You can execute the `AdminDeleteSkuReference` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteSkuReference(options?: useDataConnectMutationOptions<AdminDeleteSkuReferenceData, FirebaseError, AdminDeleteSkuReferenceVariables>): UseDataConnectMutationResult<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteSkuReference(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteSkuReferenceData, FirebaseError, AdminDeleteSkuReferenceVariables>): UseDataConnectMutationResult<AdminDeleteSkuReferenceData, AdminDeleteSkuReferenceVariables>;
```

### Variables
The `AdminDeleteSkuReference` Mutation requires an argument of type `AdminDeleteSkuReferenceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteSkuReferenceVariables {
  merchant: string;
  sku: string;
}
```
### Return Type
Recall that calling the `AdminDeleteSkuReference` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteSkuReference` Mutation is of type `AdminDeleteSkuReferenceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteSkuReferenceData {
  skuReference_delete?: SkuReference_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteSkuReference`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteSkuReference } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteSkuReferenceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteSkuReference();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteSkuReference(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteSkuReference(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteSkuReference(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteSkuReference` Mutation requires an argument of type `AdminDeleteSkuReferenceVariables`:
  const adminDeleteSkuReferenceVars: AdminDeleteSkuReferenceVariables = {
    merchant: ..., 
    sku: ..., 
  };
  mutation.mutate(adminDeleteSkuReferenceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ merchant: ..., sku: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteSkuReferenceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.skuReference_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteProject
You can execute the `AdminDeleteProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteProject(options?: useDataConnectMutationOptions<AdminDeleteProjectData, FirebaseError, AdminDeleteProjectVariables>): UseDataConnectMutationResult<AdminDeleteProjectData, AdminDeleteProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteProjectData, FirebaseError, AdminDeleteProjectVariables>): UseDataConnectMutationResult<AdminDeleteProjectData, AdminDeleteProjectVariables>;
```

### Variables
The `AdminDeleteProject` Mutation requires an argument of type `AdminDeleteProjectVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteProjectVariables {
  id: string;
}
```
### Return Type
Recall that calling the `AdminDeleteProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteProject` Mutation is of type `AdminDeleteProjectData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteProjectData {
  project_delete?: Project_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteProjectVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteProject } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteProject` Mutation requires an argument of type `AdminDeleteProjectVariables`:
  const adminDeleteProjectVars: AdminDeleteProjectVariables = {
    id: ..., 
  };
  mutation.mutate(adminDeleteProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteExpenseAccount
You can execute the `AdminDeleteExpenseAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteExpenseAccount(options?: useDataConnectMutationOptions<AdminDeleteExpenseAccountData, FirebaseError, AdminDeleteExpenseAccountVariables>): UseDataConnectMutationResult<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteExpenseAccount(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteExpenseAccountData, FirebaseError, AdminDeleteExpenseAccountVariables>): UseDataConnectMutationResult<AdminDeleteExpenseAccountData, AdminDeleteExpenseAccountVariables>;
```

### Variables
The `AdminDeleteExpenseAccount` Mutation requires an argument of type `AdminDeleteExpenseAccountVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteExpenseAccountVariables {
  id: string;
}
```
### Return Type
Recall that calling the `AdminDeleteExpenseAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteExpenseAccount` Mutation is of type `AdminDeleteExpenseAccountData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteExpenseAccountData {
  expenseAccount_delete?: ExpenseAccount_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteExpenseAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteExpenseAccount } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteExpenseAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteExpenseAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteExpenseAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteExpenseAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteExpenseAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteExpenseAccount` Mutation requires an argument of type `AdminDeleteExpenseAccountVariables`:
  const adminDeleteExpenseAccountVars: AdminDeleteExpenseAccountVariables = {
    id: ..., 
  };
  mutation.mutate(adminDeleteExpenseAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteExpenseAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expenseAccount_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedCreditCardHolderHistory
You can execute the `AdminSeedCreditCardHolderHistory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedCreditCardHolderHistory(options?: useDataConnectMutationOptions<AdminSeedCreditCardHolderHistoryData, FirebaseError, AdminSeedCreditCardHolderHistoryVariables>): UseDataConnectMutationResult<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedCreditCardHolderHistory(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedCreditCardHolderHistoryData, FirebaseError, AdminSeedCreditCardHolderHistoryVariables>): UseDataConnectMutationResult<AdminSeedCreditCardHolderHistoryData, AdminSeedCreditCardHolderHistoryVariables>;
```

### Variables
The `AdminSeedCreditCardHolderHistory` Mutation requires an argument of type `AdminSeedCreditCardHolderHistoryVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedCreditCardHolderHistory` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedCreditCardHolderHistory` Mutation is of type `AdminSeedCreditCardHolderHistoryData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedCreditCardHolderHistoryData {
  creditCardHolderHistory_upsert: CreditCardHolderHistory_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedCreditCardHolderHistory`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedCreditCardHolderHistoryVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedCreditCardHolderHistory } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedCreditCardHolderHistoryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedCreditCardHolderHistory();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedCreditCardHolderHistory(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCreditCardHolderHistory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedCreditCardHolderHistory(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedCreditCardHolderHistory` Mutation requires an argument of type `AdminSeedCreditCardHolderHistoryVariables`:
  const adminSeedCreditCardHolderHistoryVars: AdminSeedCreditCardHolderHistoryVariables = {
    id: ..., 
    cardId: ..., 
    holderId: ..., 
    validFrom: ..., 
    validTo: ..., // optional
    isCurrent: ..., 
    status: ..., 
  };
  mutation.mutate(adminSeedCreditCardHolderHistoryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., cardId: ..., holderId: ..., validFrom: ..., validTo: ..., isCurrent: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedCreditCardHolderHistoryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCardHolderHistory_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSeedMerchantAlias
You can execute the `AdminSeedMerchantAlias` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSeedMerchantAlias(options?: useDataConnectMutationOptions<AdminSeedMerchantAliasData, FirebaseError, AdminSeedMerchantAliasVariables>): UseDataConnectMutationResult<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSeedMerchantAlias(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSeedMerchantAliasData, FirebaseError, AdminSeedMerchantAliasVariables>): UseDataConnectMutationResult<AdminSeedMerchantAliasData, AdminSeedMerchantAliasVariables>;
```

### Variables
The `AdminSeedMerchantAlias` Mutation requires an argument of type `AdminSeedMerchantAliasVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminSeedMerchantAlias` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSeedMerchantAlias` Mutation is of type `AdminSeedMerchantAliasData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSeedMerchantAliasData {
  merchantAlias_upsert: MerchantAlias_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSeedMerchantAlias`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSeedMerchantAliasVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminSeedMerchantAlias } from '@factures-thibeault/data-connect-generated/react'

export default function AdminSeedMerchantAliasComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSeedMerchantAlias();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSeedMerchantAlias(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedMerchantAlias(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSeedMerchantAlias(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSeedMerchantAlias` Mutation requires an argument of type `AdminSeedMerchantAliasVariables`:
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
  mutation.mutate(adminSeedMerchantAliasVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., merchantRawKey: ..., merchantNormalized: ..., merchantCanonical: ..., active: ..., status: ..., source: ..., confidence: ..., method: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSeedMerchantAliasVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.merchantAlias_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteCardStatementPeriod
You can execute the `AdminDeleteCardStatementPeriod` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteCardStatementPeriod(options?: useDataConnectMutationOptions<AdminDeleteCardStatementPeriodData, FirebaseError, AdminDeleteCardStatementPeriodVariables>): UseDataConnectMutationResult<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteCardStatementPeriod(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteCardStatementPeriodData, FirebaseError, AdminDeleteCardStatementPeriodVariables>): UseDataConnectMutationResult<AdminDeleteCardStatementPeriodData, AdminDeleteCardStatementPeriodVariables>;
```

### Variables
The `AdminDeleteCardStatementPeriod` Mutation requires an argument of type `AdminDeleteCardStatementPeriodVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteCardStatementPeriodVariables {
  id: string;
}
```
### Return Type
Recall that calling the `AdminDeleteCardStatementPeriod` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteCardStatementPeriod` Mutation is of type `AdminDeleteCardStatementPeriodData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteCardStatementPeriodData {
  cardStatementPeriod_delete?: CardStatementPeriod_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteCardStatementPeriod`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteCardStatementPeriod } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteCardStatementPeriodComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteCardStatementPeriod();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteCardStatementPeriod(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteCardStatementPeriod(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteCardStatementPeriod(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteCardStatementPeriod` Mutation requires an argument of type `AdminDeleteCardStatementPeriodVariables`:
  const adminDeleteCardStatementPeriodVars: AdminDeleteCardStatementPeriodVariables = {
    id: ..., 
  };
  mutation.mutate(adminDeleteCardStatementPeriodVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteCardStatementPeriodVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.cardStatementPeriod_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteUserProfile
You can execute the `AdminDeleteUserProfile` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteUserProfile(options?: useDataConnectMutationOptions<AdminDeleteUserProfileData, FirebaseError, AdminDeleteUserProfileVariables>): UseDataConnectMutationResult<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteUserProfile(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteUserProfileData, FirebaseError, AdminDeleteUserProfileVariables>): UseDataConnectMutationResult<AdminDeleteUserProfileData, AdminDeleteUserProfileVariables>;
```

### Variables
The `AdminDeleteUserProfile` Mutation requires an argument of type `AdminDeleteUserProfileVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteUserProfileVariables {
  id: string;
}
```
### Return Type
Recall that calling the `AdminDeleteUserProfile` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteUserProfile` Mutation is of type `AdminDeleteUserProfileData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteUserProfileData {
  userProfile_delete?: UserProfile_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteUserProfile`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteUserProfileVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteUserProfile } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteUserProfileComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteUserProfile();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteUserProfile(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteUserProfile(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteUserProfile(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteUserProfile` Mutation requires an argument of type `AdminDeleteUserProfileVariables`:
  const adminDeleteUserProfileVars: AdminDeleteUserProfileVariables = {
    id: ..., 
  };
  mutation.mutate(adminDeleteUserProfileVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteUserProfileVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userProfile_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminRecordArchivePurge
You can execute the `AdminRecordArchivePurge` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminRecordArchivePurge(options?: useDataConnectMutationOptions<AdminRecordArchivePurgeData, FirebaseError, AdminRecordArchivePurgeVariables>): UseDataConnectMutationResult<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminRecordArchivePurge(dc: DataConnect, options?: useDataConnectMutationOptions<AdminRecordArchivePurgeData, FirebaseError, AdminRecordArchivePurgeVariables>): UseDataConnectMutationResult<AdminRecordArchivePurgeData, AdminRecordArchivePurgeVariables>;
```

### Variables
The `AdminRecordArchivePurge` Mutation requires an argument of type `AdminRecordArchivePurgeVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminRecordArchivePurgeVariables {
  auditEventId: string;
  actorUid: string;
  actorRole: string;
  archiveId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `AdminRecordArchivePurge` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminRecordArchivePurge` Mutation is of type `AdminRecordArchivePurgeData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminRecordArchivePurgeData {
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminRecordArchivePurge`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminRecordArchivePurgeVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminRecordArchivePurge } from '@factures-thibeault/data-connect-generated/react'

export default function AdminRecordArchivePurgeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminRecordArchivePurge();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminRecordArchivePurge(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminRecordArchivePurge(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminRecordArchivePurge(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminRecordArchivePurge` Mutation requires an argument of type `AdminRecordArchivePurgeVariables`:
  const adminRecordArchivePurgeVars: AdminRecordArchivePurgeVariables = {
    auditEventId: ..., 
    actorUid: ..., 
    actorRole: ..., 
    archiveId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(adminRecordArchivePurgeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ auditEventId: ..., actorUid: ..., actorRole: ..., archiveId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminRecordArchivePurgeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertUserProfile
You can execute the `UpsertUserProfile` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertUserProfile(options?: useDataConnectMutationOptions<UpsertUserProfileData, FirebaseError, UpsertUserProfileVariables>): UseDataConnectMutationResult<UpsertUserProfileData, UpsertUserProfileVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertUserProfile(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserProfileData, FirebaseError, UpsertUserProfileVariables>): UseDataConnectMutationResult<UpsertUserProfileData, UpsertUserProfileVariables>;
```

### Variables
The `UpsertUserProfile` Mutation requires an argument of type `UpsertUserProfileVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertUserProfile` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertUserProfile` Mutation is of type `UpsertUserProfileData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertUserProfileData {
  userProfile_upsert: UserProfile_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertUserProfile`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertUserProfileVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertUserProfile } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertUserProfileComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertUserProfile();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertUserProfile(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertUserProfile(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertUserProfile(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertUserProfile` Mutation requires an argument of type `UpsertUserProfileVariables`:
  const upsertUserProfileVars: UpsertUserProfileVariables = {
    id: ..., 
    firebaseUid: ..., // optional
    displayName: ..., 
    email: ..., // optional
    jobTitle: ..., // optional
    role: ..., 
    status: ..., 
  };
  mutation.mutate(upsertUserProfileVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertUserProfileVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userProfile_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertCreditCard
You can execute the `UpsertCreditCard` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertCreditCard(options?: useDataConnectMutationOptions<UpsertCreditCardData, FirebaseError, UpsertCreditCardVariables>): UseDataConnectMutationResult<UpsertCreditCardData, UpsertCreditCardVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertCreditCard(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCreditCardData, FirebaseError, UpsertCreditCardVariables>): UseDataConnectMutationResult<UpsertCreditCardData, UpsertCreditCardVariables>;
```

### Variables
The `UpsertCreditCard` Mutation requires an argument of type `UpsertCreditCardVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertCreditCard` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertCreditCard` Mutation is of type `UpsertCreditCardData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertCreditCardData {
  creditCard_upsert: CreditCard_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertCreditCard`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertCreditCardVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertCreditCard } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertCreditCardComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertCreditCard();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertCreditCard(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCreditCard(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCreditCard(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertCreditCard` Mutation requires an argument of type `UpsertCreditCardVariables`:
  const upsertCreditCardVars: UpsertCreditCardVariables = {
    id: ..., 
    lastFour: ..., 
    holderId: ..., 
    cardFunction: ..., // optional
    status: ..., 
    activeFrom: ..., // optional
    inactiveFrom: ..., // optional
  };
  mutation.mutate(upsertCreditCardVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., lastFour: ..., holderId: ..., cardFunction: ..., status: ..., activeFrom: ..., inactiveFrom: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertCreditCardVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCard_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpsertUserProfileWithAudit
You can execute the `AdminUpsertUserProfileWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpsertUserProfileWithAudit(options?: useDataConnectMutationOptions<AdminUpsertUserProfileWithAuditData, FirebaseError, AdminUpsertUserProfileWithAuditVariables>): UseDataConnectMutationResult<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpsertUserProfileWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpsertUserProfileWithAuditData, FirebaseError, AdminUpsertUserProfileWithAuditVariables>): UseDataConnectMutationResult<AdminUpsertUserProfileWithAuditData, AdminUpsertUserProfileWithAuditVariables>;
```

### Variables
The `AdminUpsertUserProfileWithAudit` Mutation requires an argument of type `AdminUpsertUserProfileWithAuditVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminUpsertUserProfileWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpsertUserProfileWithAudit` Mutation is of type `AdminUpsertUserProfileWithAuditData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpsertUserProfileWithAuditData {
  userProfile_upsert: UserProfile_Key;
  creditCard_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpsertUserProfileWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpsertUserProfileWithAuditVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminUpsertUserProfileWithAudit } from '@factures-thibeault/data-connect-generated/react'

export default function AdminUpsertUserProfileWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpsertUserProfileWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpsertUserProfileWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpsertUserProfileWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpsertUserProfileWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpsertUserProfileWithAudit` Mutation requires an argument of type `AdminUpsertUserProfileWithAuditVariables`:
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
  mutation.mutate(adminUpsertUserProfileWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., firebaseUid: ..., displayName: ..., email: ..., jobTitle: ..., role: ..., status: ..., invitationStatus: ..., invitationSentAt: ..., invitationSentBy: ..., lastInvitationError: ..., activatedAt: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., deactivateCards: ..., inactiveFrom: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpsertUserProfileWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userProfile_upsert);
    console.log(mutation.data.creditCard_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminRecordUserAudit
You can execute the `AdminRecordUserAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminRecordUserAudit(options?: useDataConnectMutationOptions<AdminRecordUserAuditData, FirebaseError, AdminRecordUserAuditVariables>): UseDataConnectMutationResult<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminRecordUserAudit(dc: DataConnect, options?: useDataConnectMutationOptions<AdminRecordUserAuditData, FirebaseError, AdminRecordUserAuditVariables>): UseDataConnectMutationResult<AdminRecordUserAuditData, AdminRecordUserAuditVariables>;
```

### Variables
The `AdminRecordUserAudit` Mutation requires an argument of type `AdminRecordUserAuditVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminRecordUserAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminRecordUserAudit` Mutation is of type `AdminRecordUserAuditData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminRecordUserAuditData {
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminRecordUserAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminRecordUserAuditVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminRecordUserAudit } from '@factures-thibeault/data-connect-generated/react'

export default function AdminRecordUserAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminRecordUserAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminRecordUserAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminRecordUserAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminRecordUserAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminRecordUserAudit` Mutation requires an argument of type `AdminRecordUserAuditVariables`:
  const adminRecordUserAuditVars: AdminRecordUserAuditVariables = {
    auditEventId: ..., 
    actorUid: ..., 
    actorRole: ..., 
    auditAction: ..., 
    entityId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(adminRecordUserAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., entityId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminRecordUserAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteUserProfile
You can execute the `DeleteUserProfile` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteUserProfile(options?: useDataConnectMutationOptions<DeleteUserProfileData, FirebaseError, DeleteUserProfileVariables>): UseDataConnectMutationResult<DeleteUserProfileData, DeleteUserProfileVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteUserProfile(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserProfileData, FirebaseError, DeleteUserProfileVariables>): UseDataConnectMutationResult<DeleteUserProfileData, DeleteUserProfileVariables>;
```

### Variables
The `DeleteUserProfile` Mutation requires an argument of type `DeleteUserProfileVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteUserProfileVariables {
  id: string;
  firebaseUid: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `DeleteUserProfile` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteUserProfile` Mutation is of type `DeleteUserProfileData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteUserProfileData {
  userProfile_delete?: UserProfile_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteUserProfile`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteUserProfileVariables } from '@factures-thibeault/data-connect-generated';
import { useDeleteUserProfile } from '@factures-thibeault/data-connect-generated/react'

export default function DeleteUserProfileComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteUserProfile();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteUserProfile(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteUserProfile(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteUserProfile(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteUserProfile` Mutation requires an argument of type `DeleteUserProfileVariables`:
  const deleteUserProfileVars: DeleteUserProfileVariables = {
    id: ..., 
    firebaseUid: ..., 
    auditEventId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(deleteUserProfileVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., firebaseUid: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteUserProfileVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userProfile_delete);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertExpenseAccount
You can execute the `UpsertExpenseAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertExpenseAccount(options?: useDataConnectMutationOptions<UpsertExpenseAccountData, FirebaseError, UpsertExpenseAccountVariables>): UseDataConnectMutationResult<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertExpenseAccount(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertExpenseAccountData, FirebaseError, UpsertExpenseAccountVariables>): UseDataConnectMutationResult<UpsertExpenseAccountData, UpsertExpenseAccountVariables>;
```

### Variables
The `UpsertExpenseAccount` Mutation requires an argument of type `UpsertExpenseAccountVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertExpenseAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertExpenseAccount` Mutation is of type `UpsertExpenseAccountData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertExpenseAccountData {
  expenseAccount_upsert: ExpenseAccount_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertExpenseAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertExpenseAccount } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertExpenseAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertExpenseAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertExpenseAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertExpenseAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertExpenseAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertExpenseAccount` Mutation requires an argument of type `UpsertExpenseAccountVariables`:
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
  mutation.mutate(upsertExpenseAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., number: ..., type: ..., label: ..., status: ..., auditAction: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertExpenseAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expenseAccount_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteExpenseAccount
You can execute the `DeleteExpenseAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteExpenseAccount(options?: useDataConnectMutationOptions<DeleteExpenseAccountData, FirebaseError, DeleteExpenseAccountVariables>): UseDataConnectMutationResult<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteExpenseAccount(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteExpenseAccountData, FirebaseError, DeleteExpenseAccountVariables>): UseDataConnectMutationResult<DeleteExpenseAccountData, DeleteExpenseAccountVariables>;
```

### Variables
The `DeleteExpenseAccount` Mutation requires an argument of type `DeleteExpenseAccountVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteExpenseAccountVariables {
  id: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `DeleteExpenseAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteExpenseAccount` Mutation is of type `DeleteExpenseAccountData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteExpenseAccountData {
  expenseAccount_delete?: ExpenseAccount_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteExpenseAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteExpenseAccountVariables } from '@factures-thibeault/data-connect-generated';
import { useDeleteExpenseAccount } from '@factures-thibeault/data-connect-generated/react'

export default function DeleteExpenseAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteExpenseAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteExpenseAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteExpenseAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteExpenseAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteExpenseAccount` Mutation requires an argument of type `DeleteExpenseAccountVariables`:
  const deleteExpenseAccountVars: DeleteExpenseAccountVariables = {
    id: ..., 
    auditEventId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(deleteExpenseAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteExpenseAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expenseAccount_delete);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertSkuReference
You can execute the `UpsertSkuReference` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertSkuReference(options?: useDataConnectMutationOptions<UpsertSkuReferenceData, FirebaseError, UpsertSkuReferenceVariables>): UseDataConnectMutationResult<UpsertSkuReferenceData, UpsertSkuReferenceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertSkuReference(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertSkuReferenceData, FirebaseError, UpsertSkuReferenceVariables>): UseDataConnectMutationResult<UpsertSkuReferenceData, UpsertSkuReferenceVariables>;
```

### Variables
The `UpsertSkuReference` Mutation requires an argument of type `UpsertSkuReferenceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertSkuReferenceVariables {
  merchant: string;
  sku: string;
  productLabel: string;
  categoryLabel: string;
  expenseAccountId: string;
  sourceUrl?: string | null;
  auditAction: string;
  auditEventId: string;
  entityId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `UpsertSkuReference` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertSkuReference` Mutation is of type `UpsertSkuReferenceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertSkuReferenceData {
  skuReference_upsert: SkuReference_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertSkuReference`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertSkuReference } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertSkuReferenceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertSkuReference();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertSkuReference(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertSkuReference(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertSkuReference(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertSkuReference` Mutation requires an argument of type `UpsertSkuReferenceVariables`:
  const upsertSkuReferenceVars: UpsertSkuReferenceVariables = {
    merchant: ..., 
    sku: ..., 
    productLabel: ..., 
    categoryLabel: ..., 
    expenseAccountId: ..., 
    sourceUrl: ..., // optional
    auditAction: ..., 
    auditEventId: ..., 
    entityId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(upsertSkuReferenceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ merchant: ..., sku: ..., productLabel: ..., categoryLabel: ..., expenseAccountId: ..., sourceUrl: ..., auditAction: ..., auditEventId: ..., entityId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertSkuReferenceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.skuReference_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteSkuReference
You can execute the `DeleteSkuReference` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteSkuReference(options?: useDataConnectMutationOptions<DeleteSkuReferenceData, FirebaseError, DeleteSkuReferenceVariables>): UseDataConnectMutationResult<DeleteSkuReferenceData, DeleteSkuReferenceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteSkuReference(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSkuReferenceData, FirebaseError, DeleteSkuReferenceVariables>): UseDataConnectMutationResult<DeleteSkuReferenceData, DeleteSkuReferenceVariables>;
```

### Variables
The `DeleteSkuReference` Mutation requires an argument of type `DeleteSkuReferenceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteSkuReferenceVariables {
  merchant: string;
  sku: string;
  auditEventId: string;
  entityId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `DeleteSkuReference` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteSkuReference` Mutation is of type `DeleteSkuReferenceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteSkuReferenceData {
  skuReference_delete?: SkuReference_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteSkuReference`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';
import { useDeleteSkuReference } from '@factures-thibeault/data-connect-generated/react'

export default function DeleteSkuReferenceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteSkuReference();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteSkuReference(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteSkuReference(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteSkuReference(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteSkuReference` Mutation requires an argument of type `DeleteSkuReferenceVariables`:
  const deleteSkuReferenceVars: DeleteSkuReferenceVariables = {
    merchant: ..., 
    sku: ..., 
    auditEventId: ..., 
    entityId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(deleteSkuReferenceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ merchant: ..., sku: ..., auditEventId: ..., entityId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteSkuReferenceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.skuReference_delete);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteCreditCard
You can execute the `DeleteCreditCard` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteCreditCard(options?: useDataConnectMutationOptions<DeleteCreditCardData, FirebaseError, DeleteCreditCardVariables>): UseDataConnectMutationResult<DeleteCreditCardData, DeleteCreditCardVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteCreditCard(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCreditCardData, FirebaseError, DeleteCreditCardVariables>): UseDataConnectMutationResult<DeleteCreditCardData, DeleteCreditCardVariables>;
```

### Variables
The `DeleteCreditCard` Mutation requires an argument of type `DeleteCreditCardVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteCreditCardVariables {
  id: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `DeleteCreditCard` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteCreditCard` Mutation is of type `DeleteCreditCardData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteCreditCardData {
  creditCard_delete?: CreditCard_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteCreditCard`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteCreditCardVariables } from '@factures-thibeault/data-connect-generated';
import { useDeleteCreditCard } from '@factures-thibeault/data-connect-generated/react'

export default function DeleteCreditCardComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteCreditCard();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteCreditCard(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteCreditCard(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteCreditCard(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteCreditCard` Mutation requires an argument of type `DeleteCreditCardVariables`:
  const deleteCreditCardVars: DeleteCreditCardVariables = {
    id: ..., 
    auditEventId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(deleteCreditCardVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteCreditCardVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCard_delete);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteCreditCardAndHolder
You can execute the `DeleteCreditCardAndHolder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteCreditCardAndHolder(options?: useDataConnectMutationOptions<DeleteCreditCardAndHolderData, FirebaseError, DeleteCreditCardAndHolderVariables>): UseDataConnectMutationResult<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteCreditCardAndHolder(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCreditCardAndHolderData, FirebaseError, DeleteCreditCardAndHolderVariables>): UseDataConnectMutationResult<DeleteCreditCardAndHolderData, DeleteCreditCardAndHolderVariables>;
```

### Variables
The `DeleteCreditCardAndHolder` Mutation requires an argument of type `DeleteCreditCardAndHolderVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteCreditCardAndHolderVariables {
  cardId: string;
  holderId: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `DeleteCreditCardAndHolder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteCreditCardAndHolder` Mutation is of type `DeleteCreditCardAndHolderData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteCreditCardAndHolderData {
  creditCard_delete?: CreditCard_Key | null;
  userProfile_delete?: UserProfile_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteCreditCardAndHolder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteCreditCardAndHolderVariables } from '@factures-thibeault/data-connect-generated';
import { useDeleteCreditCardAndHolder } from '@factures-thibeault/data-connect-generated/react'

export default function DeleteCreditCardAndHolderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteCreditCardAndHolder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteCreditCardAndHolder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteCreditCardAndHolder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteCreditCardAndHolder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteCreditCardAndHolder` Mutation requires an argument of type `DeleteCreditCardAndHolderVariables`:
  const deleteCreditCardAndHolderVars: DeleteCreditCardAndHolderVariables = {
    cardId: ..., 
    holderId: ..., 
    auditEventId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(deleteCreditCardAndHolderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ cardId: ..., holderId: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteCreditCardAndHolderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCard_delete);
    console.log(mutation.data.userProfile_delete);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertCardStatementPeriod
You can execute the `UpsertCardStatementPeriod` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertCardStatementPeriod(options?: useDataConnectMutationOptions<UpsertCardStatementPeriodData, FirebaseError, UpsertCardStatementPeriodVariables>): UseDataConnectMutationResult<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertCardStatementPeriod(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCardStatementPeriodData, FirebaseError, UpsertCardStatementPeriodVariables>): UseDataConnectMutationResult<UpsertCardStatementPeriodData, UpsertCardStatementPeriodVariables>;
```

### Variables
The `UpsertCardStatementPeriod` Mutation requires an argument of type `UpsertCardStatementPeriodVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertCardStatementPeriod` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertCardStatementPeriod` Mutation is of type `UpsertCardStatementPeriodData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertCardStatementPeriodData {
  cardStatementPeriod_upsert: CardStatementPeriod_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertCardStatementPeriod`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertCardStatementPeriodVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertCardStatementPeriod } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertCardStatementPeriodComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertCardStatementPeriod();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertCardStatementPeriod(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCardStatementPeriod(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCardStatementPeriod(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertCardStatementPeriod` Mutation requires an argument of type `UpsertCardStatementPeriodVariables`:
  const upsertCardStatementPeriodVars: UpsertCardStatementPeriodVariables = {
    id: ..., 
    label: ..., 
    startDate: ..., 
    endDate: ..., 
    statementLabel: ..., // optional
    status: ..., 
  };
  mutation.mutate(upsertCardStatementPeriodVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., label: ..., startDate: ..., endDate: ..., statementLabel: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertCardStatementPeriodVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.cardStatementPeriod_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SaveStatementManualAdjustments
You can execute the `SaveStatementManualAdjustments` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useSaveStatementManualAdjustments(options?: useDataConnectMutationOptions<SaveStatementManualAdjustmentsData, FirebaseError, SaveStatementManualAdjustmentsVariables>): UseDataConnectMutationResult<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSaveStatementManualAdjustments(dc: DataConnect, options?: useDataConnectMutationOptions<SaveStatementManualAdjustmentsData, FirebaseError, SaveStatementManualAdjustmentsVariables>): UseDataConnectMutationResult<SaveStatementManualAdjustmentsData, SaveStatementManualAdjustmentsVariables>;
```

### Variables
The `SaveStatementManualAdjustments` Mutation requires an argument of type `SaveStatementManualAdjustmentsVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SaveStatementManualAdjustmentsVariables {
  id: string;
  manualAdjustmentsJson: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `SaveStatementManualAdjustments` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SaveStatementManualAdjustments` Mutation is of type `SaveStatementManualAdjustmentsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SaveStatementManualAdjustmentsData {
  cardStatementPeriod_update?: CardStatementPeriod_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SaveStatementManualAdjustments`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SaveStatementManualAdjustmentsVariables } from '@factures-thibeault/data-connect-generated';
import { useSaveStatementManualAdjustments } from '@factures-thibeault/data-connect-generated/react'

export default function SaveStatementManualAdjustmentsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSaveStatementManualAdjustments();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSaveStatementManualAdjustments(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSaveStatementManualAdjustments(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSaveStatementManualAdjustments(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSaveStatementManualAdjustments` Mutation requires an argument of type `SaveStatementManualAdjustmentsVariables`:
  const saveStatementManualAdjustmentsVars: SaveStatementManualAdjustmentsVariables = {
    id: ..., 
    manualAdjustmentsJson: ..., 
    auditEventId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(saveStatementManualAdjustmentsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., manualAdjustmentsJson: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(saveStatementManualAdjustmentsVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.cardStatementPeriod_update);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertReportAdjustmentSet
You can execute the `UpsertReportAdjustmentSet` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertReportAdjustmentSet(options?: useDataConnectMutationOptions<UpsertReportAdjustmentSetData, FirebaseError, UpsertReportAdjustmentSetVariables>): UseDataConnectMutationResult<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertReportAdjustmentSet(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertReportAdjustmentSetData, FirebaseError, UpsertReportAdjustmentSetVariables>): UseDataConnectMutationResult<UpsertReportAdjustmentSetData, UpsertReportAdjustmentSetVariables>;
```

### Variables
The `UpsertReportAdjustmentSet` Mutation requires an argument of type `UpsertReportAdjustmentSetVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertReportAdjustmentSet` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertReportAdjustmentSet` Mutation is of type `UpsertReportAdjustmentSetData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertReportAdjustmentSetData {
  reportAdjustmentSet_upsert: ReportAdjustmentSet_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertReportAdjustmentSet`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertReportAdjustmentSetVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertReportAdjustmentSet } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertReportAdjustmentSetComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertReportAdjustmentSet();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertReportAdjustmentSet(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertReportAdjustmentSet(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertReportAdjustmentSet(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertReportAdjustmentSet` Mutation requires an argument of type `UpsertReportAdjustmentSetVariables`:
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
  mutation.mutate(upsertReportAdjustmentSetVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., periodKey: ..., periodStart: ..., periodEnd: ..., projectId: ..., holderId: ..., rowsJson: ..., actorUid: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertReportAdjustmentSetVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reportAdjustmentSet_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertCreditCardStatement
You can execute the `UpsertCreditCardStatement` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertCreditCardStatement(options?: useDataConnectMutationOptions<UpsertCreditCardStatementData, FirebaseError, UpsertCreditCardStatementVariables>): UseDataConnectMutationResult<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertCreditCardStatement(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCreditCardStatementData, FirebaseError, UpsertCreditCardStatementVariables>): UseDataConnectMutationResult<UpsertCreditCardStatementData, UpsertCreditCardStatementVariables>;
```

### Variables
The `UpsertCreditCardStatement` Mutation requires an argument of type `UpsertCreditCardStatementVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertCreditCardStatement` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertCreditCardStatement` Mutation is of type `UpsertCreditCardStatementData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertCreditCardStatementData {
  creditCardStatement_insert: CreditCardStatement_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertCreditCardStatement`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertCreditCardStatementVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertCreditCardStatement } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertCreditCardStatementComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertCreditCardStatement();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertCreditCardStatement(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCreditCardStatement(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCreditCardStatement(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertCreditCardStatement` Mutation requires an argument of type `UpsertCreditCardStatementVariables`:
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
  mutation.mutate(upsertCreditCardStatementVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., cardId: ..., holderIdSnapshot: ..., holderNameSnapshot: ..., periodStart: ..., periodEnd: ..., originalStoragePath: ..., originalFilename: ..., importedById: ..., statementHash: ..., status: ..., lineCount: ..., totalAmountCents: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertCreditCardStatementVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCardStatement_insert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertCreditCardStatementLine
You can execute the `UpsertCreditCardStatementLine` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertCreditCardStatementLine(options?: useDataConnectMutationOptions<UpsertCreditCardStatementLineData, FirebaseError, UpsertCreditCardStatementLineVariables>): UseDataConnectMutationResult<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertCreditCardStatementLine(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCreditCardStatementLineData, FirebaseError, UpsertCreditCardStatementLineVariables>): UseDataConnectMutationResult<UpsertCreditCardStatementLineData, UpsertCreditCardStatementLineVariables>;
```

### Variables
The `UpsertCreditCardStatementLine` Mutation requires an argument of type `UpsertCreditCardStatementLineVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertCreditCardStatementLine` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertCreditCardStatementLine` Mutation is of type `UpsertCreditCardStatementLineData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertCreditCardStatementLineData {
  creditCardStatementLine_upsert: CreditCardStatementLine_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertCreditCardStatementLine`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertCreditCardStatementLineVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertCreditCardStatementLine } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertCreditCardStatementLineComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertCreditCardStatementLine();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertCreditCardStatementLine(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCreditCardStatementLine(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCreditCardStatementLine(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertCreditCardStatementLine` Mutation requires an argument of type `UpsertCreditCardStatementLineVariables`:
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
  mutation.mutate(upsertCreditCardStatementLineVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., statementId: ..., sequence: ..., transactionDate: ..., postedDate: ..., merchantRaw: ..., merchantNormalized: ..., amountCents: ..., externalReference: ..., status: ..., rawData: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertCreditCardStatementLineVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCardStatementLine_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertCreditCardHolderHistory
You can execute the `UpsertCreditCardHolderHistory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertCreditCardHolderHistory(options?: useDataConnectMutationOptions<UpsertCreditCardHolderHistoryData, FirebaseError, UpsertCreditCardHolderHistoryVariables>): UseDataConnectMutationResult<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertCreditCardHolderHistory(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCreditCardHolderHistoryData, FirebaseError, UpsertCreditCardHolderHistoryVariables>): UseDataConnectMutationResult<UpsertCreditCardHolderHistoryData, UpsertCreditCardHolderHistoryVariables>;
```

### Variables
The `UpsertCreditCardHolderHistory` Mutation requires an argument of type `UpsertCreditCardHolderHistoryVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertCreditCardHolderHistory` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertCreditCardHolderHistory` Mutation is of type `UpsertCreditCardHolderHistoryData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertCreditCardHolderHistoryData {
  creditCardHolderHistory_upsert: CreditCardHolderHistory_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertCreditCardHolderHistory`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertCreditCardHolderHistoryVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertCreditCardHolderHistory } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertCreditCardHolderHistoryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertCreditCardHolderHistory();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertCreditCardHolderHistory(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCreditCardHolderHistory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCreditCardHolderHistory(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertCreditCardHolderHistory` Mutation requires an argument of type `UpsertCreditCardHolderHistoryVariables`:
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
  mutation.mutate(upsertCreditCardHolderHistoryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., cardId: ..., holderId: ..., validFrom: ..., validTo: ..., isCurrent: ..., status: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertCreditCardHolderHistoryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.creditCardHolderHistory_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertMerchantAlias
You can execute the `UpsertMerchantAlias` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertMerchantAlias(options?: useDataConnectMutationOptions<UpsertMerchantAliasData, FirebaseError, UpsertMerchantAliasVariables>): UseDataConnectMutationResult<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertMerchantAlias(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertMerchantAliasData, FirebaseError, UpsertMerchantAliasVariables>): UseDataConnectMutationResult<UpsertMerchantAliasData, UpsertMerchantAliasVariables>;
```

### Variables
The `UpsertMerchantAlias` Mutation requires an argument of type `UpsertMerchantAliasVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertMerchantAlias` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertMerchantAlias` Mutation is of type `UpsertMerchantAliasData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertMerchantAliasData {
  merchantAlias_upsert: MerchantAlias_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertMerchantAlias`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertMerchantAliasVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertMerchantAlias } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertMerchantAliasComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertMerchantAlias();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertMerchantAlias(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertMerchantAlias(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertMerchantAlias(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertMerchantAlias` Mutation requires an argument of type `UpsertMerchantAliasVariables`:
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
  mutation.mutate(upsertMerchantAliasVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., merchantRawKey: ..., merchantNormalized: ..., merchantCanonical: ..., active: ..., status: ..., source: ..., confidence: ..., method: ..., createdById: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertMerchantAliasVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.merchantAlias_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## PersistReconciliationMatch
You can execute the `PersistReconciliationMatch` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
usePersistReconciliationMatch(options?: useDataConnectMutationOptions<PersistReconciliationMatchData, FirebaseError, PersistReconciliationMatchVariables>): UseDataConnectMutationResult<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
usePersistReconciliationMatch(dc: DataConnect, options?: useDataConnectMutationOptions<PersistReconciliationMatchData, FirebaseError, PersistReconciliationMatchVariables>): UseDataConnectMutationResult<PersistReconciliationMatchData, PersistReconciliationMatchVariables>;
```

### Variables
The `PersistReconciliationMatch` Mutation requires an argument of type `PersistReconciliationMatchVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `PersistReconciliationMatch` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `PersistReconciliationMatch` Mutation is of type `PersistReconciliationMatchData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface PersistReconciliationMatchData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `PersistReconciliationMatch`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, PersistReconciliationMatchVariables } from '@factures-thibeault/data-connect-generated';
import { usePersistReconciliationMatch } from '@factures-thibeault/data-connect-generated/react'

export default function PersistReconciliationMatchComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = usePersistReconciliationMatch();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = usePersistReconciliationMatch(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePersistReconciliationMatch(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePersistReconciliationMatch(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `usePersistReconciliationMatch` Mutation requires an argument of type `PersistReconciliationMatchVariables`:
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
  mutation.mutate(persistReconciliationMatchVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., statementLineId: ..., expenseTransactionId: ..., invoiceId: ..., matchScore: ..., matchMethod: ..., status: ..., confirmedById: ..., confirmedAt: ..., reason: ..., details: ..., lineStatus: ..., transactionReconciliationStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(persistReconciliationMatchVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reconciliationMatch_upsert);
    console.log(mutation.data.creditCardStatementLine_update);
    console.log(mutation.data.expenseTransaction_update);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ClearReconciliationMatch
You can execute the `ClearReconciliationMatch` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useClearReconciliationMatch(options?: useDataConnectMutationOptions<ClearReconciliationMatchData, FirebaseError, ClearReconciliationMatchVariables>): UseDataConnectMutationResult<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useClearReconciliationMatch(dc: DataConnect, options?: useDataConnectMutationOptions<ClearReconciliationMatchData, FirebaseError, ClearReconciliationMatchVariables>): UseDataConnectMutationResult<ClearReconciliationMatchData, ClearReconciliationMatchVariables>;
```

### Variables
The `ClearReconciliationMatch` Mutation requires an argument of type `ClearReconciliationMatchVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ClearReconciliationMatch` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ClearReconciliationMatch` Mutation is of type `ClearReconciliationMatchData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ClearReconciliationMatchData {
  reconciliationMatch_update?: ReconciliationMatch_Key | null;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ClearReconciliationMatch`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ClearReconciliationMatchVariables } from '@factures-thibeault/data-connect-generated';
import { useClearReconciliationMatch } from '@factures-thibeault/data-connect-generated/react'

export default function ClearReconciliationMatchComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useClearReconciliationMatch();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useClearReconciliationMatch(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClearReconciliationMatch(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClearReconciliationMatch(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useClearReconciliationMatch` Mutation requires an argument of type `ClearReconciliationMatchVariables`:
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
  mutation.mutate(clearReconciliationMatchVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., statementLineId: ..., previousExpenseTransactionId: ..., lineStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(clearReconciliationMatchVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reconciliationMatch_update);
    console.log(mutation.data.creditCardStatementLine_update);
    console.log(mutation.data.expenseTransaction_update);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## PersistReconciliationMatchWithoutInvoice
You can execute the `PersistReconciliationMatchWithoutInvoice` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
usePersistReconciliationMatchWithoutInvoice(options?: useDataConnectMutationOptions<PersistReconciliationMatchWithoutInvoiceData, FirebaseError, PersistReconciliationMatchWithoutInvoiceVariables>): UseDataConnectMutationResult<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
usePersistReconciliationMatchWithoutInvoice(dc: DataConnect, options?: useDataConnectMutationOptions<PersistReconciliationMatchWithoutInvoiceData, FirebaseError, PersistReconciliationMatchWithoutInvoiceVariables>): UseDataConnectMutationResult<PersistReconciliationMatchWithoutInvoiceData, PersistReconciliationMatchWithoutInvoiceVariables>;
```

### Variables
The `PersistReconciliationMatchWithoutInvoice` Mutation requires an argument of type `PersistReconciliationMatchWithoutInvoiceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `PersistReconciliationMatchWithoutInvoice` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `PersistReconciliationMatchWithoutInvoice` Mutation is of type `PersistReconciliationMatchWithoutInvoiceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface PersistReconciliationMatchWithoutInvoiceData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `PersistReconciliationMatchWithoutInvoice`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, PersistReconciliationMatchWithoutInvoiceVariables } from '@factures-thibeault/data-connect-generated';
import { usePersistReconciliationMatchWithoutInvoice } from '@factures-thibeault/data-connect-generated/react'

export default function PersistReconciliationMatchWithoutInvoiceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = usePersistReconciliationMatchWithoutInvoice();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = usePersistReconciliationMatchWithoutInvoice(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePersistReconciliationMatchWithoutInvoice(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePersistReconciliationMatchWithoutInvoice(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `usePersistReconciliationMatchWithoutInvoice` Mutation requires an argument of type `PersistReconciliationMatchWithoutInvoiceVariables`:
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
  mutation.mutate(persistReconciliationMatchWithoutInvoiceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., statementLineId: ..., expenseTransactionId: ..., matchScore: ..., matchMethod: ..., status: ..., confirmedById: ..., confirmedAt: ..., reason: ..., details: ..., lineStatus: ..., transactionReconciliationStatus: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(persistReconciliationMatchWithoutInvoiceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reconciliationMatch_upsert);
    console.log(mutation.data.creditCardStatementLine_update);
    console.log(mutation.data.expenseTransaction_update);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## PersistReconciliationLineStatus
You can execute the `PersistReconciliationLineStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
usePersistReconciliationLineStatus(options?: useDataConnectMutationOptions<PersistReconciliationLineStatusData, FirebaseError, PersistReconciliationLineStatusVariables>): UseDataConnectMutationResult<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
usePersistReconciliationLineStatus(dc: DataConnect, options?: useDataConnectMutationOptions<PersistReconciliationLineStatusData, FirebaseError, PersistReconciliationLineStatusVariables>): UseDataConnectMutationResult<PersistReconciliationLineStatusData, PersistReconciliationLineStatusVariables>;
```

### Variables
The `PersistReconciliationLineStatus` Mutation requires an argument of type `PersistReconciliationLineStatusVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `PersistReconciliationLineStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `PersistReconciliationLineStatus` Mutation is of type `PersistReconciliationLineStatusData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface PersistReconciliationLineStatusData {
  reconciliationMatch_upsert: ReconciliationMatch_Key;
  creditCardStatementLine_update?: CreditCardStatementLine_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `PersistReconciliationLineStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, PersistReconciliationLineStatusVariables } from '@factures-thibeault/data-connect-generated';
import { usePersistReconciliationLineStatus } from '@factures-thibeault/data-connect-generated/react'

export default function PersistReconciliationLineStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = usePersistReconciliationLineStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = usePersistReconciliationLineStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePersistReconciliationLineStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePersistReconciliationLineStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `usePersistReconciliationLineStatus` Mutation requires an argument of type `PersistReconciliationLineStatusVariables`:
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
  mutation.mutate(persistReconciliationLineStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., statementLineId: ..., status: ..., reason: ..., details: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditAction: ..., auditDetails: ..., expectedMatchId: ..., expectedExpenseTransactionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(persistReconciliationLineStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reconciliationMatch_upsert);
    console.log(mutation.data.creditCardStatementLine_update);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpsertReconciliationOutsideControl
You can execute the `UpsertReconciliationOutsideControl` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertReconciliationOutsideControl(options?: useDataConnectMutationOptions<UpsertReconciliationOutsideControlData, FirebaseError, UpsertReconciliationOutsideControlVariables>): UseDataConnectMutationResult<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertReconciliationOutsideControl(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertReconciliationOutsideControlData, FirebaseError, UpsertReconciliationOutsideControlVariables>): UseDataConnectMutationResult<UpsertReconciliationOutsideControlData, UpsertReconciliationOutsideControlVariables>;
```

### Variables
The `UpsertReconciliationOutsideControl` Mutation requires an argument of type `UpsertReconciliationOutsideControlVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertReconciliationOutsideControl` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertReconciliationOutsideControl` Mutation is of type `UpsertReconciliationOutsideControlData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertReconciliationOutsideControlData {
  reconciliationOutsideControl_upsert: ReconciliationOutsideControl_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertReconciliationOutsideControl`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertReconciliationOutsideControlVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertReconciliationOutsideControl } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertReconciliationOutsideControlComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertReconciliationOutsideControl();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertReconciliationOutsideControl(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertReconciliationOutsideControl(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertReconciliationOutsideControl(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertReconciliationOutsideControl` Mutation requires an argument of type `UpsertReconciliationOutsideControlVariables`:
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
  mutation.mutate(upsertReconciliationOutsideControlVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., statementId: ..., expenseTransactionId: ..., status: ..., reason: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertReconciliationOutsideControlVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reconciliationOutsideControl_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ResolveReconciliationOutsideControl
You can execute the `ResolveReconciliationOutsideControl` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useResolveReconciliationOutsideControl(options?: useDataConnectMutationOptions<ResolveReconciliationOutsideControlData, FirebaseError, ResolveReconciliationOutsideControlVariables>): UseDataConnectMutationResult<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useResolveReconciliationOutsideControl(dc: DataConnect, options?: useDataConnectMutationOptions<ResolveReconciliationOutsideControlData, FirebaseError, ResolveReconciliationOutsideControlVariables>): UseDataConnectMutationResult<ResolveReconciliationOutsideControlData, ResolveReconciliationOutsideControlVariables>;
```

### Variables
The `ResolveReconciliationOutsideControl` Mutation requires an argument of type `ResolveReconciliationOutsideControlVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ResolveReconciliationOutsideControl` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ResolveReconciliationOutsideControl` Mutation is of type `ResolveReconciliationOutsideControlData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ResolveReconciliationOutsideControlData {
  reconciliationOutsideControl_update?: ReconciliationOutsideControl_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ResolveReconciliationOutsideControl`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ResolveReconciliationOutsideControlVariables } from '@factures-thibeault/data-connect-generated';
import { useResolveReconciliationOutsideControl } from '@factures-thibeault/data-connect-generated/react'

export default function ResolveReconciliationOutsideControlComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useResolveReconciliationOutsideControl();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useResolveReconciliationOutsideControl(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useResolveReconciliationOutsideControl(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useResolveReconciliationOutsideControl(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useResolveReconciliationOutsideControl` Mutation requires an argument of type `ResolveReconciliationOutsideControlVariables`:
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
  mutation.mutate(resolveReconciliationOutsideControlVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., resolvedById: ..., resolutionNote: ..., auditEventId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(resolveReconciliationOutsideControlVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.reconciliationOutsideControl_update);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateInvoiceIntake
You can execute the `CreateInvoiceIntake` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateInvoiceIntake(options?: useDataConnectMutationOptions<CreateInvoiceIntakeData, FirebaseError, CreateInvoiceIntakeVariables>): UseDataConnectMutationResult<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateInvoiceIntake(dc: DataConnect, options?: useDataConnectMutationOptions<CreateInvoiceIntakeData, FirebaseError, CreateInvoiceIntakeVariables>): UseDataConnectMutationResult<CreateInvoiceIntakeData, CreateInvoiceIntakeVariables>;
```

### Variables
The `CreateInvoiceIntake` Mutation requires an argument of type `CreateInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateInvoiceIntakeVariables {
  receiptId: string;
  storageFolder: string;
  photoCount: number;
}
```
### Return Type
Recall that calling the `CreateInvoiceIntake` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateInvoiceIntake` Mutation is of type `CreateInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateInvoiceIntakeData {
  invoiceIntake_upsert: InvoiceIntake_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateInvoiceIntake`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';
import { useCreateInvoiceIntake } from '@factures-thibeault/data-connect-generated/react'

export default function CreateInvoiceIntakeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateInvoiceIntake();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateInvoiceIntake(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateInvoiceIntake(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateInvoiceIntake(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateInvoiceIntake` Mutation requires an argument of type `CreateInvoiceIntakeVariables`:
  const createInvoiceIntakeVars: CreateInvoiceIntakeVariables = {
    receiptId: ..., 
    storageFolder: ..., 
    photoCount: ..., 
  };
  mutation.mutate(createInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., storageFolder: ..., photoCount: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createInvoiceIntakeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateInvoiceIntakeV2
You can execute the `CreateInvoiceIntakeV2` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateInvoiceIntakeV2(options?: useDataConnectMutationOptions<CreateInvoiceIntakeV2Data, FirebaseError, CreateInvoiceIntakeV2Variables>): UseDataConnectMutationResult<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateInvoiceIntakeV2(dc: DataConnect, options?: useDataConnectMutationOptions<CreateInvoiceIntakeV2Data, FirebaseError, CreateInvoiceIntakeV2Variables>): UseDataConnectMutationResult<CreateInvoiceIntakeV2Data, CreateInvoiceIntakeV2Variables>;
```

### Variables
The `CreateInvoiceIntakeV2` Mutation requires an argument of type `CreateInvoiceIntakeV2Variables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateInvoiceIntakeV2` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateInvoiceIntakeV2` Mutation is of type `CreateInvoiceIntakeV2Data`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateInvoiceIntakeV2Data {
  invoiceIntake_upsert: InvoiceIntake_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateInvoiceIntakeV2`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateInvoiceIntakeV2Variables } from '@factures-thibeault/data-connect-generated';
import { useCreateInvoiceIntakeV2 } from '@factures-thibeault/data-connect-generated/react'

export default function CreateInvoiceIntakeV2Component() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateInvoiceIntakeV2();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateInvoiceIntakeV2(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateInvoiceIntakeV2(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateInvoiceIntakeV2(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateInvoiceIntakeV2` Mutation requires an argument of type `CreateInvoiceIntakeV2Variables`:
  const createInvoiceIntakeV2Vars: CreateInvoiceIntakeV2Variables = {
    receiptId: ..., 
    storageFolder: ..., 
    photoCount: ..., 
    clientVersion: ..., 
    writeAudit: ..., // optional
    auditEventId: ..., // optional
    auditDetails: ..., // optional
  };
  mutation.mutate(createInvoiceIntakeV2Vars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., storageFolder: ..., photoCount: ..., clientVersion: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createInvoiceIntakeV2Vars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ClaimInvoiceIntakeProcessing
You can execute the `ClaimInvoiceIntakeProcessing` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useClaimInvoiceIntakeProcessing(options?: useDataConnectMutationOptions<ClaimInvoiceIntakeProcessingData, FirebaseError, ClaimInvoiceIntakeProcessingVariables>): UseDataConnectMutationResult<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useClaimInvoiceIntakeProcessing(dc: DataConnect, options?: useDataConnectMutationOptions<ClaimInvoiceIntakeProcessingData, FirebaseError, ClaimInvoiceIntakeProcessingVariables>): UseDataConnectMutationResult<ClaimInvoiceIntakeProcessingData, ClaimInvoiceIntakeProcessingVariables>;
```

### Variables
The `ClaimInvoiceIntakeProcessing` Mutation requires an argument of type `ClaimInvoiceIntakeProcessingVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ClaimInvoiceIntakeProcessing` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ClaimInvoiceIntakeProcessing` Mutation is of type `ClaimInvoiceIntakeProcessingData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ClaimInvoiceIntakeProcessingData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ClaimInvoiceIntakeProcessing`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ClaimInvoiceIntakeProcessingVariables } from '@factures-thibeault/data-connect-generated';
import { useClaimInvoiceIntakeProcessing } from '@factures-thibeault/data-connect-generated/react'

export default function ClaimInvoiceIntakeProcessingComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useClaimInvoiceIntakeProcessing();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useClaimInvoiceIntakeProcessing(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClaimInvoiceIntakeProcessing(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClaimInvoiceIntakeProcessing(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useClaimInvoiceIntakeProcessing` Mutation requires an argument of type `ClaimInvoiceIntakeProcessingVariables`:
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
  mutation.mutate(claimInvoiceIntakeProcessingVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., processingAttempts: ..., maxAttempts: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(claimInvoiceIntakeProcessingVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RequeueStaleInvoiceIntake
You can execute the `RequeueStaleInvoiceIntake` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRequeueStaleInvoiceIntake(options?: useDataConnectMutationOptions<RequeueStaleInvoiceIntakeData, FirebaseError, RequeueStaleInvoiceIntakeVariables>): UseDataConnectMutationResult<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRequeueStaleInvoiceIntake(dc: DataConnect, options?: useDataConnectMutationOptions<RequeueStaleInvoiceIntakeData, FirebaseError, RequeueStaleInvoiceIntakeVariables>): UseDataConnectMutationResult<RequeueStaleInvoiceIntakeData, RequeueStaleInvoiceIntakeVariables>;
```

### Variables
The `RequeueStaleInvoiceIntake` Mutation requires an argument of type `RequeueStaleInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `RequeueStaleInvoiceIntake` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RequeueStaleInvoiceIntake` Mutation is of type `RequeueStaleInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RequeueStaleInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RequeueStaleInvoiceIntake`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RequeueStaleInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';
import { useRequeueStaleInvoiceIntake } from '@factures-thibeault/data-connect-generated/react'

export default function RequeueStaleInvoiceIntakeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRequeueStaleInvoiceIntake();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRequeueStaleInvoiceIntake(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRequeueStaleInvoiceIntake(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRequeueStaleInvoiceIntake(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRequeueStaleInvoiceIntake` Mutation requires an argument of type `RequeueStaleInvoiceIntakeVariables`:
  const requeueStaleInvoiceIntakeVars: RequeueStaleInvoiceIntakeVariables = {
    receiptId: ..., 
    staleBefore: ..., 
    maxAttempts: ..., 
    actorUid: ..., 
    actorRole: ..., 
    auditEventId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(requeueStaleInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., staleBefore: ..., maxAttempts: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(requeueStaleInvoiceIntakeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CacheCanadianTireSkuReference
You can execute the `CacheCanadianTireSkuReference` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCacheCanadianTireSkuReference(options?: useDataConnectMutationOptions<CacheCanadianTireSkuReferenceData, FirebaseError, CacheCanadianTireSkuReferenceVariables>): UseDataConnectMutationResult<CacheCanadianTireSkuReferenceData, CacheCanadianTireSkuReferenceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCacheCanadianTireSkuReference(dc: DataConnect, options?: useDataConnectMutationOptions<CacheCanadianTireSkuReferenceData, FirebaseError, CacheCanadianTireSkuReferenceVariables>): UseDataConnectMutationResult<CacheCanadianTireSkuReferenceData, CacheCanadianTireSkuReferenceVariables>;
```

### Variables
The `CacheCanadianTireSkuReference` Mutation requires an argument of type `CacheCanadianTireSkuReferenceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CacheCanadianTireSkuReferenceVariables {
  sku: string;
  productLabel: string;
  categoryLabel: string;
  expenseAccountId: string;
  sourceUrl: string;
  auditEventId: string;
  entityId: string;
  actorUid: string;
  actorRole: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `CacheCanadianTireSkuReference` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CacheCanadianTireSkuReference` Mutation is of type `CacheCanadianTireSkuReferenceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CacheCanadianTireSkuReferenceData {
  skuReference_upsert: SkuReference_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CacheCanadianTireSkuReference`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CacheCanadianTireSkuReferenceVariables } from '@factures-thibeault/data-connect-generated';
import { useCacheCanadianTireSkuReference } from '@factures-thibeault/data-connect-generated/react'

export default function CacheCanadianTireSkuReferenceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCacheCanadianTireSkuReference();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCacheCanadianTireSkuReference(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCacheCanadianTireSkuReference(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCacheCanadianTireSkuReference(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCacheCanadianTireSkuReference` Mutation requires an argument of type `CacheCanadianTireSkuReferenceVariables`:
  const cacheCanadianTireSkuReferenceVars: CacheCanadianTireSkuReferenceVariables = {
    sku: ..., 
    productLabel: ..., 
    categoryLabel: ..., 
    expenseAccountId: ..., 
    sourceUrl: ..., 
    auditEventId: ..., 
    entityId: ..., 
    actorUid: ..., 
    actorRole: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(cacheCanadianTireSkuReferenceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sku: ..., productLabel: ..., categoryLabel: ..., expenseAccountId: ..., sourceUrl: ..., auditEventId: ..., entityId: ..., actorUid: ..., actorRole: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(cacheCanadianTireSkuReferenceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.skuReference_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateInvoiceIntakeAiResult
You can execute the `UpdateInvoiceIntakeAiResult` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateInvoiceIntakeAiResult(options?: useDataConnectMutationOptions<UpdateInvoiceIntakeAiResultData, FirebaseError, UpdateInvoiceIntakeAiResultVariables>): UseDataConnectMutationResult<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateInvoiceIntakeAiResult(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateInvoiceIntakeAiResultData, FirebaseError, UpdateInvoiceIntakeAiResultVariables>): UseDataConnectMutationResult<UpdateInvoiceIntakeAiResultData, UpdateInvoiceIntakeAiResultVariables>;
```

### Variables
The `UpdateInvoiceIntakeAiResult` Mutation requires an argument of type `UpdateInvoiceIntakeAiResultVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
  extractedProjectNumber?: string | null;
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
Recall that calling the `UpdateInvoiceIntakeAiResult` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateInvoiceIntakeAiResult` Mutation is of type `UpdateInvoiceIntakeAiResultData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateInvoiceIntakeAiResultData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateInvoiceIntakeAiResult`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateInvoiceIntakeAiResultVariables } from '@factures-thibeault/data-connect-generated';
import { useUpdateInvoiceIntakeAiResult } from '@factures-thibeault/data-connect-generated/react'

export default function UpdateInvoiceIntakeAiResultComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateInvoiceIntakeAiResult();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateInvoiceIntakeAiResult(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateInvoiceIntakeAiResult(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateInvoiceIntakeAiResult(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateInvoiceIntakeAiResult` Mutation requires an argument of type `UpdateInvoiceIntakeAiResultVariables`:
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
    extractedProjectNumber: ..., // optional
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
  mutation.mutate(updateInvoiceIntakeAiResultVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedLineItems: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectNumber: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., processingStatus: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateInvoiceIntakeAiResultVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MarkInvoiceIntakeAiError
You can execute the `MarkInvoiceIntakeAiError` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useMarkInvoiceIntakeAiError(options?: useDataConnectMutationOptions<MarkInvoiceIntakeAiErrorData, FirebaseError, MarkInvoiceIntakeAiErrorVariables>): UseDataConnectMutationResult<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useMarkInvoiceIntakeAiError(dc: DataConnect, options?: useDataConnectMutationOptions<MarkInvoiceIntakeAiErrorData, FirebaseError, MarkInvoiceIntakeAiErrorVariables>): UseDataConnectMutationResult<MarkInvoiceIntakeAiErrorData, MarkInvoiceIntakeAiErrorVariables>;
```

### Variables
The `MarkInvoiceIntakeAiError` Mutation requires an argument of type `MarkInvoiceIntakeAiErrorVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `MarkInvoiceIntakeAiError` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `MarkInvoiceIntakeAiError` Mutation is of type `MarkInvoiceIntakeAiErrorData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface MarkInvoiceIntakeAiErrorData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `MarkInvoiceIntakeAiError`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, MarkInvoiceIntakeAiErrorVariables } from '@factures-thibeault/data-connect-generated';
import { useMarkInvoiceIntakeAiError } from '@factures-thibeault/data-connect-generated/react'

export default function MarkInvoiceIntakeAiErrorComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useMarkInvoiceIntakeAiError();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useMarkInvoiceIntakeAiError(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkInvoiceIntakeAiError(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkInvoiceIntakeAiError(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useMarkInvoiceIntakeAiError` Mutation requires an argument of type `MarkInvoiceIntakeAiErrorVariables`:
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
  mutation.mutate(markInvoiceIntakeAiErrorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., error: ..., aiErrorCode: ..., accountingStatus: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(markInvoiceIntakeAiErrorVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MarkInvoiceIntakeAiMaxAttempts
You can execute the `MarkInvoiceIntakeAiMaxAttempts` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useMarkInvoiceIntakeAiMaxAttempts(options?: useDataConnectMutationOptions<MarkInvoiceIntakeAiMaxAttemptsData, FirebaseError, MarkInvoiceIntakeAiMaxAttemptsVariables>): UseDataConnectMutationResult<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useMarkInvoiceIntakeAiMaxAttempts(dc: DataConnect, options?: useDataConnectMutationOptions<MarkInvoiceIntakeAiMaxAttemptsData, FirebaseError, MarkInvoiceIntakeAiMaxAttemptsVariables>): UseDataConnectMutationResult<MarkInvoiceIntakeAiMaxAttemptsData, MarkInvoiceIntakeAiMaxAttemptsVariables>;
```

### Variables
The `MarkInvoiceIntakeAiMaxAttempts` Mutation requires an argument of type `MarkInvoiceIntakeAiMaxAttemptsVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `MarkInvoiceIntakeAiMaxAttempts` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `MarkInvoiceIntakeAiMaxAttempts` Mutation is of type `MarkInvoiceIntakeAiMaxAttemptsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface MarkInvoiceIntakeAiMaxAttemptsData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `MarkInvoiceIntakeAiMaxAttempts`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, MarkInvoiceIntakeAiMaxAttemptsVariables } from '@factures-thibeault/data-connect-generated';
import { useMarkInvoiceIntakeAiMaxAttempts } from '@factures-thibeault/data-connect-generated/react'

export default function MarkInvoiceIntakeAiMaxAttemptsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useMarkInvoiceIntakeAiMaxAttempts();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useMarkInvoiceIntakeAiMaxAttempts(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkInvoiceIntakeAiMaxAttempts(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkInvoiceIntakeAiMaxAttempts(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useMarkInvoiceIntakeAiMaxAttempts` Mutation requires an argument of type `MarkInvoiceIntakeAiMaxAttemptsVariables`:
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
  mutation.mutate(markInvoiceIntakeAiMaxAttemptsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., currentAttempts: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(markInvoiceIntakeAiMaxAttemptsVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MarkInvoiceIntakeAutoPostingError
You can execute the `MarkInvoiceIntakeAutoPostingError` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useMarkInvoiceIntakeAutoPostingError(options?: useDataConnectMutationOptions<MarkInvoiceIntakeAutoPostingErrorData, FirebaseError, MarkInvoiceIntakeAutoPostingErrorVariables>): UseDataConnectMutationResult<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useMarkInvoiceIntakeAutoPostingError(dc: DataConnect, options?: useDataConnectMutationOptions<MarkInvoiceIntakeAutoPostingErrorData, FirebaseError, MarkInvoiceIntakeAutoPostingErrorVariables>): UseDataConnectMutationResult<MarkInvoiceIntakeAutoPostingErrorData, MarkInvoiceIntakeAutoPostingErrorVariables>;
```

### Variables
The `MarkInvoiceIntakeAutoPostingError` Mutation requires an argument of type `MarkInvoiceIntakeAutoPostingErrorVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `MarkInvoiceIntakeAutoPostingError` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `MarkInvoiceIntakeAutoPostingError` Mutation is of type `MarkInvoiceIntakeAutoPostingErrorData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface MarkInvoiceIntakeAutoPostingErrorData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `MarkInvoiceIntakeAutoPostingError`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, MarkInvoiceIntakeAutoPostingErrorVariables } from '@factures-thibeault/data-connect-generated';
import { useMarkInvoiceIntakeAutoPostingError } from '@factures-thibeault/data-connect-generated/react'

export default function MarkInvoiceIntakeAutoPostingErrorComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useMarkInvoiceIntakeAutoPostingError();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useMarkInvoiceIntakeAutoPostingError(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkInvoiceIntakeAutoPostingError(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkInvoiceIntakeAutoPostingError(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useMarkInvoiceIntakeAutoPostingError` Mutation requires an argument of type `MarkInvoiceIntakeAutoPostingErrorVariables`:
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
  mutation.mutate(markInvoiceIntakeAutoPostingErrorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., error: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(markInvoiceIntakeAutoPostingErrorVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateInvoiceIntakeReview
You can execute the `UpdateInvoiceIntakeReview` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateInvoiceIntakeReview(options?: useDataConnectMutationOptions<UpdateInvoiceIntakeReviewData, FirebaseError, UpdateInvoiceIntakeReviewVariables>): UseDataConnectMutationResult<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateInvoiceIntakeReview(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateInvoiceIntakeReviewData, FirebaseError, UpdateInvoiceIntakeReviewVariables>): UseDataConnectMutationResult<UpdateInvoiceIntakeReviewData, UpdateInvoiceIntakeReviewVariables>;
```

### Variables
The `UpdateInvoiceIntakeReview` Mutation requires an argument of type `UpdateInvoiceIntakeReviewVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
  extractedProjectNumber?: string | null;
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
Recall that calling the `UpdateInvoiceIntakeReview` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateInvoiceIntakeReview` Mutation is of type `UpdateInvoiceIntakeReviewData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateInvoiceIntakeReviewData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateInvoiceIntakeReview`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateInvoiceIntakeReviewVariables } from '@factures-thibeault/data-connect-generated';
import { useUpdateInvoiceIntakeReview } from '@factures-thibeault/data-connect-generated/react'

export default function UpdateInvoiceIntakeReviewComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateInvoiceIntakeReview();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateInvoiceIntakeReview(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateInvoiceIntakeReview(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateInvoiceIntakeReview(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateInvoiceIntakeReview` Mutation requires an argument of type `UpdateInvoiceIntakeReviewVariables`:
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
    extractedProjectNumber: ..., // optional
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
  mutation.mutate(updateInvoiceIntakeReviewVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., status: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedLineItems: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectNumber: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., decisionExceptions: ..., decisionChecks: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., expectedReviewRevision: ..., nextReviewRevision: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateInvoiceIntakeReviewVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DiscardInvoiceIntake
You can execute the `DiscardInvoiceIntake` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDiscardInvoiceIntake(options?: useDataConnectMutationOptions<DiscardInvoiceIntakeData, FirebaseError, DiscardInvoiceIntakeVariables>): UseDataConnectMutationResult<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDiscardInvoiceIntake(dc: DataConnect, options?: useDataConnectMutationOptions<DiscardInvoiceIntakeData, FirebaseError, DiscardInvoiceIntakeVariables>): UseDataConnectMutationResult<DiscardInvoiceIntakeData, DiscardInvoiceIntakeVariables>;
```

### Variables
The `DiscardInvoiceIntake` Mutation requires an argument of type `DiscardInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DiscardInvoiceIntakeVariables {
  receiptId: string;
  actorUid: string;
  actorRole: string;
  auditEventId: string;
  auditDetails: string;
}
```
### Return Type
Recall that calling the `DiscardInvoiceIntake` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DiscardInvoiceIntake` Mutation is of type `DiscardInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DiscardInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DiscardInvoiceIntake`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DiscardInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';
import { useDiscardInvoiceIntake } from '@factures-thibeault/data-connect-generated/react'

export default function DiscardInvoiceIntakeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDiscardInvoiceIntake();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDiscardInvoiceIntake(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDiscardInvoiceIntake(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDiscardInvoiceIntake(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDiscardInvoiceIntake` Mutation requires an argument of type `DiscardInvoiceIntakeVariables`:
  const discardInvoiceIntakeVars: DiscardInvoiceIntakeVariables = {
    receiptId: ..., 
    actorUid: ..., 
    actorRole: ..., 
    auditEventId: ..., 
    auditDetails: ..., 
  };
  mutation.mutate(discardInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(discardInvoiceIntakeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeletePostedInvoice
You can execute the `DeletePostedInvoice` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeletePostedInvoice(options?: useDataConnectMutationOptions<DeletePostedInvoiceData, FirebaseError, DeletePostedInvoiceVariables>): UseDataConnectMutationResult<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeletePostedInvoice(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePostedInvoiceData, FirebaseError, DeletePostedInvoiceVariables>): UseDataConnectMutationResult<DeletePostedInvoiceData, DeletePostedInvoiceVariables>;
```

### Variables
The `DeletePostedInvoice` Mutation requires an argument of type `DeletePostedInvoiceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `DeletePostedInvoice` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeletePostedInvoice` Mutation is of type `DeletePostedInvoiceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeletePostedInvoiceData {
  invoice_updateMany: number;
  expenseTransaction_updateMany: number;
  invoiceIntake_updateMany: number;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeletePostedInvoice`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeletePostedInvoiceVariables } from '@factures-thibeault/data-connect-generated';
import { useDeletePostedInvoice } from '@factures-thibeault/data-connect-generated/react'

export default function DeletePostedInvoiceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeletePostedInvoice();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeletePostedInvoice(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeletePostedInvoice(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeletePostedInvoice(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeletePostedInvoice` Mutation requires an argument of type `DeletePostedInvoiceVariables`:
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
  mutation.mutate(deletePostedInvoiceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ invoiceId: ..., transactionId: ..., receiptId: ..., writeIntake: ..., reason: ..., actorUid: ..., actorRole: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deletePostedInvoiceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoice_updateMany);
    console.log(mutation.data.expenseTransaction_updateMany);
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MarkInvoiceIntakePostingError
You can execute the `MarkInvoiceIntakePostingError` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useMarkInvoiceIntakePostingError(options?: useDataConnectMutationOptions<MarkInvoiceIntakePostingErrorData, FirebaseError, MarkInvoiceIntakePostingErrorVariables>): UseDataConnectMutationResult<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useMarkInvoiceIntakePostingError(dc: DataConnect, options?: useDataConnectMutationOptions<MarkInvoiceIntakePostingErrorData, FirebaseError, MarkInvoiceIntakePostingErrorVariables>): UseDataConnectMutationResult<MarkInvoiceIntakePostingErrorData, MarkInvoiceIntakePostingErrorVariables>;
```

### Variables
The `MarkInvoiceIntakePostingError` Mutation requires an argument of type `MarkInvoiceIntakePostingErrorVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface MarkInvoiceIntakePostingErrorVariables {
  receiptId: string;
}
```
### Return Type
Recall that calling the `MarkInvoiceIntakePostingError` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `MarkInvoiceIntakePostingError` Mutation is of type `MarkInvoiceIntakePostingErrorData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface MarkInvoiceIntakePostingErrorData {
  invoiceIntake_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `MarkInvoiceIntakePostingError`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, MarkInvoiceIntakePostingErrorVariables } from '@factures-thibeault/data-connect-generated';
import { useMarkInvoiceIntakePostingError } from '@factures-thibeault/data-connect-generated/react'

export default function MarkInvoiceIntakePostingErrorComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useMarkInvoiceIntakePostingError();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useMarkInvoiceIntakePostingError(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkInvoiceIntakePostingError(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkInvoiceIntakePostingError(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useMarkInvoiceIntakePostingError` Mutation requires an argument of type `MarkInvoiceIntakePostingErrorVariables`:
  const markInvoiceIntakePostingErrorVars: MarkInvoiceIntakePostingErrorVariables = {
    receiptId: ..., 
  };
  mutation.mutate(markInvoiceIntakePostingErrorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(markInvoiceIntakePostingErrorVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RetryInvoiceIntakeAi
You can execute the `RetryInvoiceIntakeAi` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRetryInvoiceIntakeAi(options?: useDataConnectMutationOptions<RetryInvoiceIntakeAiData, FirebaseError, RetryInvoiceIntakeAiVariables>): UseDataConnectMutationResult<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRetryInvoiceIntakeAi(dc: DataConnect, options?: useDataConnectMutationOptions<RetryInvoiceIntakeAiData, FirebaseError, RetryInvoiceIntakeAiVariables>): UseDataConnectMutationResult<RetryInvoiceIntakeAiData, RetryInvoiceIntakeAiVariables>;
```

### Variables
The `RetryInvoiceIntakeAi` Mutation requires an argument of type `RetryInvoiceIntakeAiVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RetryInvoiceIntakeAiVariables {
  receiptId: string;
}
```
### Return Type
Recall that calling the `RetryInvoiceIntakeAi` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RetryInvoiceIntakeAi` Mutation is of type `RetryInvoiceIntakeAiData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RetryInvoiceIntakeAiData {
  invoiceIntake_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RetryInvoiceIntakeAi`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RetryInvoiceIntakeAiVariables } from '@factures-thibeault/data-connect-generated';
import { useRetryInvoiceIntakeAi } from '@factures-thibeault/data-connect-generated/react'

export default function RetryInvoiceIntakeAiComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRetryInvoiceIntakeAi();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRetryInvoiceIntakeAi(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRetryInvoiceIntakeAi(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRetryInvoiceIntakeAi(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRetryInvoiceIntakeAi` Mutation requires an argument of type `RetryInvoiceIntakeAiVariables`:
  const retryInvoiceIntakeAiVars: RetryInvoiceIntakeAiVariables = {
    receiptId: ..., 
  };
  mutation.mutate(retryInvoiceIntakeAiVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(retryInvoiceIntakeAiVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RetryInvoiceIntakeAiTransient
You can execute the `RetryInvoiceIntakeAiTransient` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRetryInvoiceIntakeAiTransient(options?: useDataConnectMutationOptions<RetryInvoiceIntakeAiTransientData, FirebaseError, RetryInvoiceIntakeAiTransientVariables>): UseDataConnectMutationResult<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRetryInvoiceIntakeAiTransient(dc: DataConnect, options?: useDataConnectMutationOptions<RetryInvoiceIntakeAiTransientData, FirebaseError, RetryInvoiceIntakeAiTransientVariables>): UseDataConnectMutationResult<RetryInvoiceIntakeAiTransientData, RetryInvoiceIntakeAiTransientVariables>;
```

### Variables
The `RetryInvoiceIntakeAiTransient` Mutation requires an argument of type `RetryInvoiceIntakeAiTransientVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RetryInvoiceIntakeAiTransientVariables {
  receiptId: string;
}
```
### Return Type
Recall that calling the `RetryInvoiceIntakeAiTransient` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RetryInvoiceIntakeAiTransient` Mutation is of type `RetryInvoiceIntakeAiTransientData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RetryInvoiceIntakeAiTransientData {
  invoiceIntake_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RetryInvoiceIntakeAiTransient`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RetryInvoiceIntakeAiTransientVariables } from '@factures-thibeault/data-connect-generated';
import { useRetryInvoiceIntakeAiTransient } from '@factures-thibeault/data-connect-generated/react'

export default function RetryInvoiceIntakeAiTransientComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRetryInvoiceIntakeAiTransient();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRetryInvoiceIntakeAiTransient(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRetryInvoiceIntakeAiTransient(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRetryInvoiceIntakeAiTransient(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRetryInvoiceIntakeAiTransient` Mutation requires an argument of type `RetryInvoiceIntakeAiTransientVariables`:
  const retryInvoiceIntakeAiTransientVars: RetryInvoiceIntakeAiTransientVariables = {
    receiptId: ..., 
  };
  mutation.mutate(retryInvoiceIntakeAiTransientVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(retryInvoiceIntakeAiTransientVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RetryInvoiceIntakeAiTransientV2
You can execute the `RetryInvoiceIntakeAiTransientV2` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRetryInvoiceIntakeAiTransientV2(options?: useDataConnectMutationOptions<RetryInvoiceIntakeAiTransientV2Data, FirebaseError, RetryInvoiceIntakeAiTransientV2Variables>): UseDataConnectMutationResult<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRetryInvoiceIntakeAiTransientV2(dc: DataConnect, options?: useDataConnectMutationOptions<RetryInvoiceIntakeAiTransientV2Data, FirebaseError, RetryInvoiceIntakeAiTransientV2Variables>): UseDataConnectMutationResult<RetryInvoiceIntakeAiTransientV2Data, RetryInvoiceIntakeAiTransientV2Variables>;
```

### Variables
The `RetryInvoiceIntakeAiTransientV2` Mutation requires an argument of type `RetryInvoiceIntakeAiTransientV2Variables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RetryInvoiceIntakeAiTransientV2Variables {
  receiptId: string;
  invoiceId: string;
  storageFolder: string;
}
```
### Return Type
Recall that calling the `RetryInvoiceIntakeAiTransientV2` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RetryInvoiceIntakeAiTransientV2` Mutation is of type `RetryInvoiceIntakeAiTransientV2Data`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RetryInvoiceIntakeAiTransientV2Data {
  invoiceIntake_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RetryInvoiceIntakeAiTransientV2`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RetryInvoiceIntakeAiTransientV2Variables } from '@factures-thibeault/data-connect-generated';
import { useRetryInvoiceIntakeAiTransientV2 } from '@factures-thibeault/data-connect-generated/react'

export default function RetryInvoiceIntakeAiTransientV2Component() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRetryInvoiceIntakeAiTransientV2();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRetryInvoiceIntakeAiTransientV2(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRetryInvoiceIntakeAiTransientV2(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRetryInvoiceIntakeAiTransientV2(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRetryInvoiceIntakeAiTransientV2` Mutation requires an argument of type `RetryInvoiceIntakeAiTransientV2Variables`:
  const retryInvoiceIntakeAiTransientV2Vars: RetryInvoiceIntakeAiTransientV2Variables = {
    receiptId: ..., 
    invoiceId: ..., 
    storageFolder: ..., 
  };
  mutation.mutate(retryInvoiceIntakeAiTransientV2Vars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., invoiceId: ..., storageFolder: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(retryInvoiceIntakeAiTransientV2Vars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RetryInvoiceIntakeAiReviewV2
You can execute the `RetryInvoiceIntakeAiReviewV2` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRetryInvoiceIntakeAiReviewV2(options?: useDataConnectMutationOptions<RetryInvoiceIntakeAiReviewV2Data, FirebaseError, RetryInvoiceIntakeAiReviewV2Variables>): UseDataConnectMutationResult<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRetryInvoiceIntakeAiReviewV2(dc: DataConnect, options?: useDataConnectMutationOptions<RetryInvoiceIntakeAiReviewV2Data, FirebaseError, RetryInvoiceIntakeAiReviewV2Variables>): UseDataConnectMutationResult<RetryInvoiceIntakeAiReviewV2Data, RetryInvoiceIntakeAiReviewV2Variables>;
```

### Variables
The `RetryInvoiceIntakeAiReviewV2` Mutation requires an argument of type `RetryInvoiceIntakeAiReviewV2Variables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RetryInvoiceIntakeAiReviewV2Variables {
  receiptId: string;
  currentAttempts: number;
  maxAttempts: number;
}
```
### Return Type
Recall that calling the `RetryInvoiceIntakeAiReviewV2` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RetryInvoiceIntakeAiReviewV2` Mutation is of type `RetryInvoiceIntakeAiReviewV2Data`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RetryInvoiceIntakeAiReviewV2Data {
  invoiceIntake_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RetryInvoiceIntakeAiReviewV2`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RetryInvoiceIntakeAiReviewV2Variables } from '@factures-thibeault/data-connect-generated';
import { useRetryInvoiceIntakeAiReviewV2 } from '@factures-thibeault/data-connect-generated/react'

export default function RetryInvoiceIntakeAiReviewV2Component() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRetryInvoiceIntakeAiReviewV2();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRetryInvoiceIntakeAiReviewV2(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRetryInvoiceIntakeAiReviewV2(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRetryInvoiceIntakeAiReviewV2(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRetryInvoiceIntakeAiReviewV2` Mutation requires an argument of type `RetryInvoiceIntakeAiReviewV2Variables`:
  const retryInvoiceIntakeAiReviewV2Vars: RetryInvoiceIntakeAiReviewV2Variables = {
    receiptId: ..., 
    currentAttempts: ..., 
    maxAttempts: ..., 
  };
  mutation.mutate(retryInvoiceIntakeAiReviewV2Vars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., currentAttempts: ..., maxAttempts: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(retryInvoiceIntakeAiReviewV2Vars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MaterializeInvoiceIntakeV2
You can execute the `MaterializeInvoiceIntakeV2` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useMaterializeInvoiceIntakeV2(options?: useDataConnectMutationOptions<MaterializeInvoiceIntakeV2Data, FirebaseError, MaterializeInvoiceIntakeV2Variables>): UseDataConnectMutationResult<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useMaterializeInvoiceIntakeV2(dc: DataConnect, options?: useDataConnectMutationOptions<MaterializeInvoiceIntakeV2Data, FirebaseError, MaterializeInvoiceIntakeV2Variables>): UseDataConnectMutationResult<MaterializeInvoiceIntakeV2Data, MaterializeInvoiceIntakeV2Variables>;
```

### Variables
The `MaterializeInvoiceIntakeV2` Mutation requires an argument of type `MaterializeInvoiceIntakeV2Variables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
  projectNumber?: string | null;
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
Recall that calling the `MaterializeInvoiceIntakeV2` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `MaterializeInvoiceIntakeV2` Mutation is of type `MaterializeInvoiceIntakeV2Data`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `MaterializeInvoiceIntakeV2`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, MaterializeInvoiceIntakeV2Variables } from '@factures-thibeault/data-connect-generated';
import { useMaterializeInvoiceIntakeV2 } from '@factures-thibeault/data-connect-generated/react'

export default function MaterializeInvoiceIntakeV2Component() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useMaterializeInvoiceIntakeV2();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useMaterializeInvoiceIntakeV2(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMaterializeInvoiceIntakeV2(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMaterializeInvoiceIntakeV2(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useMaterializeInvoiceIntakeV2` Mutation requires an argument of type `MaterializeInvoiceIntakeV2Variables`:
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
    projectNumber: ..., // optional
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
  mutation.mutate(materializeInvoiceIntakeV2Vars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., lineItems: ..., currency: ..., sku: ..., category: ..., account: ..., cardId: ..., statementPeriod: ..., project: ..., projectNumber: ..., storageFolder: ..., classificationNote: ..., expectedProcessingStatus: ..., classificationSource: ..., classificationStatus: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., photoCount: ..., photo1Id: ..., photo1StoragePath: ..., photo1ContentType: ..., hasPhoto2: ..., photo2Id: ..., photo2StoragePath: ..., photo2ContentType: ..., hasPhoto3: ..., photo3Id: ..., photo3StoragePath: ..., photo3ContentType: ..., hasPhoto4: ..., photo4Id: ..., photo4StoragePath: ..., photo4ContentType: ..., hasPhoto5: ..., photo5Id: ..., photo5StoragePath: ..., photo5ContentType: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(materializeInvoiceIntakeV2Vars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.expenseTransaction_upsert);
    console.log(mutation.data.invoice_upsert);
    console.log(mutation.data.invoicePhoto1);
    console.log(mutation.data.invoicePhoto2);
    console.log(mutation.data.invoicePhoto3);
    console.log(mutation.data.invoicePhoto4);
    console.log(mutation.data.invoicePhoto5);
    console.log(mutation.data.invoiceIntake_update);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CorrectPostedInvoice
You can execute the `CorrectPostedInvoice` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCorrectPostedInvoice(options?: useDataConnectMutationOptions<CorrectPostedInvoiceData, FirebaseError, CorrectPostedInvoiceVariables>): UseDataConnectMutationResult<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCorrectPostedInvoice(dc: DataConnect, options?: useDataConnectMutationOptions<CorrectPostedInvoiceData, FirebaseError, CorrectPostedInvoiceVariables>): UseDataConnectMutationResult<CorrectPostedInvoiceData, CorrectPostedInvoiceVariables>;
```

### Variables
The `CorrectPostedInvoice` Mutation requires an argument of type `CorrectPostedInvoiceVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CorrectPostedInvoice` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CorrectPostedInvoice` Mutation is of type `CorrectPostedInvoiceData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CorrectPostedInvoiceData {
  transactionCorrection_upsert: TransactionCorrection_Key;
  expenseTransaction_update?: ExpenseTransaction_Key | null;
  invoice_update?: Invoice_Key | null;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CorrectPostedInvoice`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CorrectPostedInvoiceVariables } from '@factures-thibeault/data-connect-generated';
import { useCorrectPostedInvoice } from '@factures-thibeault/data-connect-generated/react'

export default function CorrectPostedInvoiceComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCorrectPostedInvoice();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCorrectPostedInvoice(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCorrectPostedInvoice(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCorrectPostedInvoice(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCorrectPostedInvoice` Mutation requires an argument of type `CorrectPostedInvoiceVariables`:
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
  mutation.mutate(correctPostedInvoiceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ correctionId: ..., invoiceId: ..., transactionId: ..., actorUserId: ..., fieldName: ..., previousValue: ..., correctedValue: ..., note: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., lineItems: ..., category: ..., account: ..., auditEventId: ..., auditDetails: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(correctPostedInvoiceVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.transactionCorrection_upsert);
    console.log(mutation.data.expenseTransaction_update);
    console.log(mutation.data.invoice_update);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CommitInvoiceIntake
You can execute the `CommitInvoiceIntake` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCommitInvoiceIntake(options?: useDataConnectMutationOptions<CommitInvoiceIntakeData, FirebaseError, CommitInvoiceIntakeVariables>): UseDataConnectMutationResult<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCommitInvoiceIntake(dc: DataConnect, options?: useDataConnectMutationOptions<CommitInvoiceIntakeData, FirebaseError, CommitInvoiceIntakeVariables>): UseDataConnectMutationResult<CommitInvoiceIntakeData, CommitInvoiceIntakeVariables>;
```

### Variables
The `CommitInvoiceIntake` Mutation requires an argument of type `CommitInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CommitInvoiceIntake` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CommitInvoiceIntake` Mutation is of type `CommitInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CommitInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CommitInvoiceIntake`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CommitInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';
import { useCommitInvoiceIntake } from '@factures-thibeault/data-connect-generated/react'

export default function CommitInvoiceIntakeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCommitInvoiceIntake();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCommitInvoiceIntake(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCommitInvoiceIntake(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCommitInvoiceIntake(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCommitInvoiceIntake` Mutation requires an argument of type `CommitInvoiceIntakeVariables`:
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
  mutation.mutate(commitInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(commitInvoiceIntakeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.expenseTransaction_upsert);
    console.log(mutation.data.invoice_upsert);
    console.log(mutation.data.invoiceIntake_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CommitInvoiceIntakeWithoutProject
You can execute the `CommitInvoiceIntakeWithoutProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCommitInvoiceIntakeWithoutProject(options?: useDataConnectMutationOptions<CommitInvoiceIntakeWithoutProjectData, FirebaseError, CommitInvoiceIntakeWithoutProjectVariables>): UseDataConnectMutationResult<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCommitInvoiceIntakeWithoutProject(dc: DataConnect, options?: useDataConnectMutationOptions<CommitInvoiceIntakeWithoutProjectData, FirebaseError, CommitInvoiceIntakeWithoutProjectVariables>): UseDataConnectMutationResult<CommitInvoiceIntakeWithoutProjectData, CommitInvoiceIntakeWithoutProjectVariables>;
```

### Variables
The `CommitInvoiceIntakeWithoutProject` Mutation requires an argument of type `CommitInvoiceIntakeWithoutProjectVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CommitInvoiceIntakeWithoutProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CommitInvoiceIntakeWithoutProject` Mutation is of type `CommitInvoiceIntakeWithoutProjectData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CommitInvoiceIntakeWithoutProjectData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CommitInvoiceIntakeWithoutProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CommitInvoiceIntakeWithoutProjectVariables } from '@factures-thibeault/data-connect-generated';
import { useCommitInvoiceIntakeWithoutProject } from '@factures-thibeault/data-connect-generated/react'

export default function CommitInvoiceIntakeWithoutProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCommitInvoiceIntakeWithoutProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCommitInvoiceIntakeWithoutProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCommitInvoiceIntakeWithoutProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCommitInvoiceIntakeWithoutProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCommitInvoiceIntakeWithoutProject` Mutation requires an argument of type `CommitInvoiceIntakeWithoutProjectVariables`:
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
  mutation.mutate(commitInvoiceIntakeWithoutProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., storageFolder: ..., classificationNote: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(commitInvoiceIntakeWithoutProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.expenseTransaction_upsert);
    console.log(mutation.data.invoice_upsert);
    console.log(mutation.data.invoiceIntake_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AutoCommitInvoiceIntake
You can execute the `AutoCommitInvoiceIntake` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAutoCommitInvoiceIntake(options?: useDataConnectMutationOptions<AutoCommitInvoiceIntakeData, FirebaseError, AutoCommitInvoiceIntakeVariables>): UseDataConnectMutationResult<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAutoCommitInvoiceIntake(dc: DataConnect, options?: useDataConnectMutationOptions<AutoCommitInvoiceIntakeData, FirebaseError, AutoCommitInvoiceIntakeVariables>): UseDataConnectMutationResult<AutoCommitInvoiceIntakeData, AutoCommitInvoiceIntakeVariables>;
```

### Variables
The `AutoCommitInvoiceIntake` Mutation requires an argument of type `AutoCommitInvoiceIntakeVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AutoCommitInvoiceIntake` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AutoCommitInvoiceIntake` Mutation is of type `AutoCommitInvoiceIntakeData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AutoCommitInvoiceIntakeData {
  invoiceIntake_updateMany: number;
  expenseTransaction_upsert: ExpenseTransaction_Key;
  invoice_upsert: Invoice_Key;
  invoiceIntake_update?: InvoiceIntake_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AutoCommitInvoiceIntake`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AutoCommitInvoiceIntakeVariables } from '@factures-thibeault/data-connect-generated';
import { useAutoCommitInvoiceIntake } from '@factures-thibeault/data-connect-generated/react'

export default function AutoCommitInvoiceIntakeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAutoCommitInvoiceIntake();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAutoCommitInvoiceIntake(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAutoCommitInvoiceIntake(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAutoCommitInvoiceIntake(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAutoCommitInvoiceIntake` Mutation requires an argument of type `AutoCommitInvoiceIntakeVariables`:
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
  mutation.mutate(autoCommitInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountId: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(autoCommitInvoiceIntakeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invoiceIntake_updateMany);
    console.log(mutation.data.expenseTransaction_upsert);
    console.log(mutation.data.invoice_upsert);
    console.log(mutation.data.invoiceIntake_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

