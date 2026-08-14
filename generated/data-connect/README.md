# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `accounting`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`data-connect/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListCreditCards*](#listcreditcards)
  - [*ListCardStatementPeriods*](#listcardstatementperiods)
  - [*ListExpenseAccounts*](#listexpenseaccounts)
  - [*ListProjects*](#listprojects)
  - [*ListSkuReferences*](#listskureferences)
  - [*ListExpenseTransactions*](#listexpensetransactions)
  - [*ListInvoicesToReview*](#listinvoicestoreview)
- [**Mutations**](#mutations)

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
    code: string;
    label: string;
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
      code: string;
      label: string;
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
listExpenseTransactions(options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsData, undefined>;

interface ListExpenseTransactionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListExpenseTransactionsData, undefined>;
}
export const listExpenseTransactionsRef: ListExpenseTransactionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExpenseTransactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListExpenseTransactionsData, undefined>;

interface ListExpenseTransactionsRef {
  ...
  (dc: DataConnect): QueryRef<ListExpenseTransactionsData, undefined>;
}
export const listExpenseTransactionsRef: ListExpenseTransactionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExpenseTransactionsRef:
```typescript
const name = listExpenseTransactionsRef.operationName;
console.log(name);
```

### Variables
The `ListExpenseTransactions` query has no variables.
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
### Using `ListExpenseTransactions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExpenseTransactions } from '@factures-thibeault/data-connect-generated';


// Call the `listExpenseTransactions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExpenseTransactions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExpenseTransactions(dataConnect);

console.log(data.expenseTransactions);

// Or, you can use the `Promise` API.
listExpenseTransactions().then((response) => {
  const data = response.data;
  console.log(data.expenseTransactions);
});
```

### Using `ListExpenseTransactions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExpenseTransactionsRef } from '@factures-thibeault/data-connect-generated';


// Call the `listExpenseTransactionsRef()` function to get a reference to the query.
const ref = listExpenseTransactionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExpenseTransactionsRef(dataConnect);

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
listInvoicesToReview(options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewData, undefined>;

interface ListInvoicesToReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInvoicesToReviewData, undefined>;
}
export const listInvoicesToReviewRef: ListInvoicesToReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInvoicesToReview(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInvoicesToReviewData, undefined>;

interface ListInvoicesToReviewRef {
  ...
  (dc: DataConnect): QueryRef<ListInvoicesToReviewData, undefined>;
}
export const listInvoicesToReviewRef: ListInvoicesToReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInvoicesToReviewRef:
```typescript
const name = listInvoicesToReviewRef.operationName;
console.log(name);
```

### Variables
The `ListInvoicesToReview` query has no variables.
### Return Type
Recall that executing the `ListInvoicesToReview` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInvoicesToReviewData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListInvoicesToReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInvoicesToReview } from '@factures-thibeault/data-connect-generated';


// Call the `listInvoicesToReview()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInvoicesToReview();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInvoicesToReview(dataConnect);

console.log(data.invoices);

// Or, you can use the `Promise` API.
listInvoicesToReview().then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

### Using `ListInvoicesToReview`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInvoicesToReviewRef } from '@factures-thibeault/data-connect-generated';


// Call the `listInvoicesToReviewRef()` function to get a reference to the query.
const ref = listInvoicesToReviewRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInvoicesToReviewRef(dataConnect);

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

# Mutations

No mutations were generated for the `accounting` connector.

If you want to learn more about how to use mutations in Data Connect, you can follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

