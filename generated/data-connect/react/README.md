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
  - [*ListUserProfiles*](#listuserprofiles)
  - [*ListCreditCards*](#listcreditcards)
  - [*ListCardStatementPeriods*](#listcardstatementperiods)
  - [*ListExpenseAccounts*](#listexpenseaccounts)
  - [*ListProjects*](#listprojects)
  - [*ListSkuReferences*](#listskureferences)
  - [*ListExpenseTransactions*](#listexpensetransactions)
  - [*ListInvoicesToReview*](#listinvoicestoreview)
  - [*ListInvoiceIntakes*](#listinvoiceintakes)
- [**Mutations**](#mutations)
  - [*UpsertUserProfile*](#upsertuserprofile)
  - [*UpsertCreditCard*](#upsertcreditcard)
  - [*CreateInvoiceIntake*](#createinvoiceintake)
  - [*UpdateInvoiceIntakeAiResult*](#updateinvoiceintakeairesult)
  - [*MarkInvoiceIntakeAiError*](#markinvoiceintakeaierror)
  - [*UpdateInvoiceIntakeReview*](#updateinvoiceintakereview)
  - [*CommitInvoiceIntake*](#commitinvoiceintake)
  - [*CommitInvoiceIntakeWithoutProject*](#commitinvoiceintakewithoutproject)

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
      statementPeriod: {
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
    lastError?: string | null;
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
  status: string;
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
}
```
### Return Type
Recall that calling the `UpdateInvoiceIntakeAiResult` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateInvoiceIntakeAiResult` Mutation is of type `UpdateInvoiceIntakeAiResultData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateInvoiceIntakeAiResultData {
  invoiceIntake_update?: InvoiceIntake_Key | null;
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
    status: ..., 
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
  };
  mutation.mutate(updateInvoiceIntakeAiResultVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., status: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., });

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
    console.log(mutation.data.invoiceIntake_update);
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
}
```
### Return Type
Recall that calling the `MarkInvoiceIntakeAiError` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `MarkInvoiceIntakeAiError` Mutation is of type `MarkInvoiceIntakeAiErrorData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface MarkInvoiceIntakeAiErrorData {
  invoiceIntake_update?: InvoiceIntake_Key | null;
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
  };
  mutation.mutate(markInvoiceIntakeAiErrorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., error: ..., });

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
    console.log(mutation.data.invoiceIntake_update);
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
}
```
### Return Type
Recall that calling the `UpdateInvoiceIntakeReview` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateInvoiceIntakeReview` Mutation is of type `UpdateInvoiceIntakeReviewData`, which is defined in [data-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateInvoiceIntakeReviewData {
  invoiceIntake_update?: InvoiceIntake_Key | null;
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
  };
  mutation.mutate(updateInvoiceIntakeReviewVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., status: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., });

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
    console.log(mutation.data.invoiceIntake_update);
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
    console.log(mutation.data.expenseTransaction_upsert);
    console.log(mutation.data.invoice_upsert);
    console.log(mutation.data.invoiceIntake_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

