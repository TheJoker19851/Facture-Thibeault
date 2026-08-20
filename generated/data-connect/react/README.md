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
  - [*ListTaxAccounts*](#listtaxaccounts)
  - [*ListProjects*](#listprojects)
  - [*ListSkuReferences*](#listskureferences)
  - [*ListExpenseTransactions*](#listexpensetransactions)
  - [*ListInvoicesToReview*](#listinvoicestoreview)
  - [*ListInvoiceIntakes*](#listinvoiceintakes)
  - [*ListAuditEvents*](#listauditevents)
- [**Mutations**](#mutations)
  - [*AdminSeedCreditCard*](#adminseedcreditcard)
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
  - [*AdminDeleteTaxAccount*](#admindeletetaxaccount)
  - [*AdminDeleteCardStatementPeriod*](#admindeletecardstatementperiod)
  - [*AdminDeleteUserProfile*](#admindeleteuserprofile)
  - [*UpsertUserProfile*](#upsertuserprofile)
  - [*UpsertCreditCard*](#upsertcreditcard)
  - [*UpsertProject*](#upsertproject)
  - [*UpsertExpenseAccount*](#upsertexpenseaccount)
  - [*UpsertCardStatementPeriod*](#upsertcardstatementperiod)
  - [*CreateInvoiceIntake*](#createinvoiceintake)
  - [*CreateInvoiceIntakeV2*](#createinvoiceintakev2)
  - [*UpdateInvoiceIntakeAiResult*](#updateinvoiceintakeairesult)
  - [*MarkInvoiceIntakeAiError*](#markinvoiceintakeaierror)
  - [*MarkInvoiceIntakeAutoPostingError*](#markinvoiceintakeautopostingerror)
  - [*UpdateInvoiceIntakeReview*](#updateinvoiceintakereview)
  - [*MarkInvoiceIntakePostingError*](#markinvoiceintakepostingerror)
  - [*RetryInvoiceIntakeAi*](#retryinvoiceintakeai)
  - [*RetryInvoiceIntakeAiTransient*](#retryinvoiceintakeaitransient)
  - [*RetryInvoiceIntakeAiTransientV2*](#retryinvoiceintakeaitransientv2)
  - [*MaterializeInvoiceIntakeV2*](#materializeinvoiceintakev2)
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
useAdminListInvoices(dc: DataConnect, options?: useDataConnectQueryOptions<AdminListInvoicesData>): UseDataConnectQueryResult<AdminListInvoicesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminListInvoices(options?: useDataConnectQueryOptions<AdminListInvoicesData>): UseDataConnectQueryResult<AdminListInvoicesData, undefined>;
```

### Variables
The `AdminListInvoices` Query has no variables.
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
      firebaseUid: string;
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
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useAdminListInvoices } from '@factures-thibeault/data-connect-generated/react'

export default function AdminListInvoicesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminListInvoices();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminListInvoices(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListInvoices(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListInvoices(dataConnect, options);

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
useAdminListInvoicePhotos(dc: DataConnect, options?: useDataConnectQueryOptions<AdminListInvoicePhotosData>): UseDataConnectQueryResult<AdminListInvoicePhotosData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminListInvoicePhotos(options?: useDataConnectQueryOptions<AdminListInvoicePhotosData>): UseDataConnectQueryResult<AdminListInvoicePhotosData, undefined>;
```

### Variables
The `AdminListInvoicePhotos` Query has no variables.
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
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useAdminListInvoicePhotos } from '@factures-thibeault/data-connect-generated/react'

export default function AdminListInvoicePhotosComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminListInvoicePhotos();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminListInvoicePhotos(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListInvoicePhotos(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListInvoicePhotos(dataConnect, options);

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
useListUserProfiles(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserProfilesData>): UseDataConnectQueryResult<ListUserProfilesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListUserProfiles(options?: useDataConnectQueryOptions<ListUserProfilesData>): UseDataConnectQueryResult<ListUserProfilesData, undefined>;
```

### Variables
The `ListUserProfiles` Query has no variables.
### Return Type
Recall that calling the `ListUserProfiles` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListUserProfiles` Query is of type `ListUserProfilesData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListUserProfilesData {
  userProfiles: ({
    id: string;
    firebaseUid: string;
    displayName: string;
    email?: string | null;
    jobTitle?: string | null;
    role: string;
    status: string;
  } & UserProfile_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListUserProfiles`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListUserProfiles } from '@factures-thibeault/data-connect-generated/react'

export default function ListUserProfilesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListUserProfiles();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListUserProfiles(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListUserProfiles(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListUserProfiles(dataConnect, options);

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
    code: string;
    label: string;
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

## ListTaxAccounts
You can execute the `ListTaxAccounts` Query using the following Query hook function, which is defined in [data-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTaxAccounts(dc: DataConnect, options?: useDataConnectQueryOptions<ListTaxAccountsData>): UseDataConnectQueryResult<ListTaxAccountsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTaxAccounts(options?: useDataConnectQueryOptions<ListTaxAccountsData>): UseDataConnectQueryResult<ListTaxAccountsData, undefined>;
```

### Variables
The `ListTaxAccounts` Query has no variables.
### Return Type
Recall that calling the `ListTaxAccounts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTaxAccounts` Query is of type `ListTaxAccountsData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListTaxAccountsData {
  taxAccounts: ({
    code: string;
    label: string;
    status: string;
  } & TaxAccount_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTaxAccounts`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListTaxAccounts } from '@factures-thibeault/data-connect-generated/react'

export default function ListTaxAccountsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTaxAccounts();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTaxAccounts(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTaxAccounts(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTaxAccounts(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.taxAccounts);
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
      code: string;
      label: string;
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
useListExpenseTransactions(dc: DataConnect, options?: useDataConnectQueryOptions<ListExpenseTransactionsData>): UseDataConnectQueryResult<ListExpenseTransactionsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListExpenseTransactions(options?: useDataConnectQueryOptions<ListExpenseTransactionsData>): UseDataConnectQueryResult<ListExpenseTransactionsData, undefined>;
```

### Variables
The `ListExpenseTransactions` Query has no variables.
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
      name: string;
    } & Project_Key;
    expenseAccount?: {
      code: string;
      label: string;
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
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListExpenseTransactions } from '@factures-thibeault/data-connect-generated/react'

export default function ListExpenseTransactionsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListExpenseTransactions();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListExpenseTransactions(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseTransactions(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListExpenseTransactions(dataConnect, options);

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
useListInvoicesToReview(dc: DataConnect, options?: useDataConnectQueryOptions<ListInvoicesToReviewData>): UseDataConnectQueryResult<ListInvoicesToReviewData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListInvoicesToReview(options?: useDataConnectQueryOptions<ListInvoicesToReviewData>): UseDataConnectQueryResult<ListInvoicesToReviewData, undefined>;
```

### Variables
The `ListInvoicesToReview` Query has no variables.
### Return Type
Recall that calling the `ListInvoicesToReview` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListInvoicesToReview` Query is of type `ListInvoicesToReviewData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListInvoicesToReviewData {
  invoices: ({
    id: string;
    vendor: string;
    invoiceNumber?: string | null;
    invoiceDate?: DateString | null;
    subtotalCents?: Int64String | null;
    tpsCents?: Int64String | null;
    tvqCents?: Int64String | null;
    totalCents?: Int64String | null;
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
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListInvoicesToReview } from '@factures-thibeault/data-connect-generated/react'

export default function ListInvoicesToReviewComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListInvoicesToReview();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListInvoicesToReview(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesToReview(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoicesToReview(dataConnect, options);

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
useListInvoiceIntakes(dc: DataConnect, options?: useDataConnectQueryOptions<ListInvoiceIntakesData>): UseDataConnectQueryResult<ListInvoiceIntakesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListInvoiceIntakes(options?: useDataConnectQueryOptions<ListInvoiceIntakesData>): UseDataConnectQueryResult<ListInvoiceIntakesData, undefined>;
```

### Variables
The `ListInvoiceIntakes` Query has no variables.
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListInvoiceIntakes`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@factures-thibeault/data-connect-generated';
import { useListInvoiceIntakes } from '@factures-thibeault/data-connect-generated/react'

export default function ListInvoiceIntakesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListInvoiceIntakes();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListInvoiceIntakes(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoiceIntakes(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListInvoiceIntakes(dataConnect, options);

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
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListAuditEvents(listAuditEventsVars);
  // Variables can be defined inline as well.
  const query = useListAuditEvents({ entityType: ..., entityId: ..., });

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
  accountCode: string;
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
    accountCode: ..., 
    verificationStatus: ..., 
  };
  mutation.mutate(adminSeedSkuReferenceVars);
  // Variables can be defined inline as well.
  mutation.mutate({ merchant: ..., sku: ..., productLabel: ..., categoryLabel: ..., accountCode: ..., verificationStatus: ..., });

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
  accountCode: string;
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
    accountCode: ..., 
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
  mutation.mutate({ id: ..., transactionDate: ..., vendor: ..., cardId: ..., statementPeriodId: ..., projectId: ..., accountCode: ..., categoryLabel: ..., sku: ..., amountBeforeTaxCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., status: ..., processingStatus: ..., accountingStatus: ..., reconciliationStatus: ..., classificationSource: ..., classificationConfidence: ..., classificationNote: ..., invoiceNumber: ..., issue: ..., });

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
  code: string;
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
    code: ..., 
  };
  mutation.mutate(adminDeleteExpenseAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ code: ..., });

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

## AdminDeleteTaxAccount
You can execute the `AdminDeleteTaxAccount` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteTaxAccount(options?: useDataConnectMutationOptions<AdminDeleteTaxAccountData, FirebaseError, AdminDeleteTaxAccountVariables>): UseDataConnectMutationResult<AdminDeleteTaxAccountData, AdminDeleteTaxAccountVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteTaxAccount(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteTaxAccountData, FirebaseError, AdminDeleteTaxAccountVariables>): UseDataConnectMutationResult<AdminDeleteTaxAccountData, AdminDeleteTaxAccountVariables>;
```

### Variables
The `AdminDeleteTaxAccount` Mutation requires an argument of type `AdminDeleteTaxAccountVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteTaxAccountVariables {
  code: string;
}
```
### Return Type
Recall that calling the `AdminDeleteTaxAccount` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteTaxAccount` Mutation is of type `AdminDeleteTaxAccountData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteTaxAccountData {
  taxAccount_delete?: TaxAccount_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteTaxAccount`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteTaxAccountVariables } from '@factures-thibeault/data-connect-generated';
import { useAdminDeleteTaxAccount } from '@factures-thibeault/data-connect-generated/react'

export default function AdminDeleteTaxAccountComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteTaxAccount();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteTaxAccount(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteTaxAccount(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteTaxAccount(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteTaxAccount` Mutation requires an argument of type `AdminDeleteTaxAccountVariables`:
  const adminDeleteTaxAccountVars: AdminDeleteTaxAccountVariables = {
    code: ..., 
  };
  mutation.mutate(adminDeleteTaxAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ code: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteTaxAccountVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.taxAccount_delete);
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
  firebaseUid: string;
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
    firebaseUid: ..., 
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

## UpsertProject
You can execute the `UpsertProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertProject(options?: useDataConnectMutationOptions<UpsertProjectData, FirebaseError, UpsertProjectVariables>): UseDataConnectMutationResult<UpsertProjectData, UpsertProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertProject(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertProjectData, FirebaseError, UpsertProjectVariables>): UseDataConnectMutationResult<UpsertProjectData, UpsertProjectVariables>;
```

### Variables
The `UpsertProject` Mutation requires an argument of type `UpsertProjectVariables`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertProjectVariables {
  id: string;
  name: string;
  status: string;
}
```
### Return Type
Recall that calling the `UpsertProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertProject` Mutation is of type `UpsertProjectData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertProjectData {
  project_upsert: Project_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertProjectVariables } from '@factures-thibeault/data-connect-generated';
import { useUpsertProject } from '@factures-thibeault/data-connect-generated/react'

export default function UpsertProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertProject` Mutation requires an argument of type `UpsertProjectVariables`:
  const upsertProjectVars: UpsertProjectVariables = {
    id: ..., 
    name: ..., 
    status: ..., 
  };
  mutation.mutate(upsertProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertProjectVars, options);

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
  code: string;
  label: string;
  status: string;
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
    code: ..., 
    label: ..., 
    status: ..., 
  };
  mutation.mutate(upsertExpenseAccountVars);
  // Variables can be defined inline as well.
  mutation.mutate({ code: ..., label: ..., status: ..., });

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
  mutation.mutate(updateInvoiceIntakeAiResultVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., processingStatus: ..., decisionExceptions: ..., decisionChecks: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

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
  };
  mutation.mutate(updateInvoiceIntakeReviewVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., status: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., decisionExceptions: ..., decisionChecks: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., });

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
  currency: string;
  sku?: string | null;
  category: string;
  accountCode: string;
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
    currency: ..., 
    sku: ..., // optional
    category: ..., 
    accountCode: ..., 
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
  mutation.mutate(materializeInvoiceIntakeV2Vars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountCode: ..., cardId: ..., statementPeriod: ..., project: ..., storageFolder: ..., classificationNote: ..., expectedProcessingStatus: ..., classificationSource: ..., classificationStatus: ..., actorUid: ..., actorRole: ..., writeAudit: ..., auditEventId: ..., auditDetails: ..., photoCount: ..., photo1Id: ..., photo1StoragePath: ..., photo1ContentType: ..., hasPhoto2: ..., photo2Id: ..., photo2StoragePath: ..., photo2ContentType: ..., hasPhoto3: ..., photo3Id: ..., photo3StoragePath: ..., photo3ContentType: ..., hasPhoto4: ..., photo4Id: ..., photo4StoragePath: ..., photo4ContentType: ..., hasPhoto5: ..., photo5Id: ..., photo5StoragePath: ..., photo5ContentType: ..., });

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
  accountCode: string;
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
    accountCode: ..., 
    cardId: ..., 
    statementPeriodId: ..., 
    projectId: ..., 
    storageFolder: ..., 
    classificationNote: ..., 
  };
  mutation.mutate(commitInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountCode: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

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
  accountCode: string;
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
    accountCode: ..., 
    cardId: ..., 
    statementPeriodId: ..., 
    storageFolder: ..., 
    classificationNote: ..., 
  };
  mutation.mutate(commitInvoiceIntakeWithoutProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountCode: ..., cardId: ..., statementPeriodId: ..., storageFolder: ..., classificationNote: ..., });

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
  accountCode: string;
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
    accountCode: ..., 
    cardId: ..., 
    statementPeriodId: ..., 
    projectId: ..., 
    storageFolder: ..., 
    classificationNote: ..., 
  };
  mutation.mutate(autoCommitInvoiceIntakeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountCode: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

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

