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
  - [*CreateInvoiceIntake*](#createinvoiceintake)
  - [*UpdateInvoiceIntakeAiResult*](#updateinvoiceintakeairesult)
  - [*MarkInvoiceIntakeAiError*](#markinvoiceintakeaierror)
  - [*UpdateInvoiceIntakeReview*](#updateinvoiceintakereview)
  - [*CommitInvoiceIntake*](#commitinvoiceintake)
  - [*CommitInvoiceIntakeWithoutProject*](#commitinvoiceintakewithoutproject)

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
adminListInvoices(options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicesData, undefined>;

interface AdminListInvoicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListInvoicesData, undefined>;
}
export const adminListInvoicesRef: AdminListInvoicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListInvoices(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AdminListInvoicesData, undefined>;

interface AdminListInvoicesRef {
  ...
  (dc: DataConnect): QueryRef<AdminListInvoicesData, undefined>;
}
export const adminListInvoicesRef: AdminListInvoicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListInvoicesRef:
```typescript
const name = adminListInvoicesRef.operationName;
console.log(name);
```

### Variables
The `AdminListInvoices` query has no variables.
### Return Type
Recall that executing the `AdminListInvoices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListInvoicesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminListInvoicesData {
  invoices: ({
    id: string;
    invoiceNumber?: string | null;
    reviewStatus: string;
    storageFolder?: string | null;
  } & Invoice_Key)[];
}
```
### Using `AdminListInvoices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListInvoices } from '@factures-thibeault/data-connect-generated';


// Call the `adminListInvoices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListInvoices();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListInvoices(dataConnect);

console.log(data.invoices);

// Or, you can use the `Promise` API.
adminListInvoices().then((response) => {
  const data = response.data;
  console.log(data.invoices);
});
```

### Using `AdminListInvoices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListInvoicesRef } from '@factures-thibeault/data-connect-generated';


// Call the `adminListInvoicesRef()` function to get a reference to the query.
const ref = adminListInvoicesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListInvoicesRef(dataConnect);

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

## ListUserProfiles
You can execute the `ListUserProfiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listUserProfiles(options?: ExecuteQueryOptions): QueryPromise<ListUserProfilesData, undefined>;

interface ListUserProfilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserProfilesData, undefined>;
}
export const listUserProfilesRef: ListUserProfilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserProfiles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserProfilesData, undefined>;

interface ListUserProfilesRef {
  ...
  (dc: DataConnect): QueryRef<ListUserProfilesData, undefined>;
}
export const listUserProfilesRef: ListUserProfilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserProfilesRef:
```typescript
const name = listUserProfilesRef.operationName;
console.log(name);
```

### Variables
The `ListUserProfiles` query has no variables.
### Return Type
Recall that executing the `ListUserProfiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserProfilesData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListUserProfiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserProfiles } from '@factures-thibeault/data-connect-generated';


// Call the `listUserProfiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserProfiles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserProfiles(dataConnect);

console.log(data.userProfiles);

// Or, you can use the `Promise` API.
listUserProfiles().then((response) => {
  const data = response.data;
  console.log(data.userProfiles);
});
```

### Using `ListUserProfiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserProfilesRef } from '@factures-thibeault/data-connect-generated';


// Call the `listUserProfilesRef()` function to get a reference to the query.
const ref = listUserProfilesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserProfilesRef(dataConnect);

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

## ListInvoiceIntakes
You can execute the `ListInvoiceIntakes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
listInvoiceIntakes(options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesData, undefined>;

interface ListInvoiceIntakesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInvoiceIntakesData, undefined>;
}
export const listInvoiceIntakesRef: ListInvoiceIntakesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInvoiceIntakes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInvoiceIntakesData, undefined>;

interface ListInvoiceIntakesRef {
  ...
  (dc: DataConnect): QueryRef<ListInvoiceIntakesData, undefined>;
}
export const listInvoiceIntakesRef: ListInvoiceIntakesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInvoiceIntakesRef:
```typescript
const name = listInvoiceIntakesRef.operationName;
console.log(name);
```

### Variables
The `ListInvoiceIntakes` query has no variables.
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
### Using `ListInvoiceIntakes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInvoiceIntakes } from '@factures-thibeault/data-connect-generated';


// Call the `listInvoiceIntakes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInvoiceIntakes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInvoiceIntakes(dataConnect);

console.log(data.invoiceIntakes);

// Or, you can use the `Promise` API.
listInvoiceIntakes().then((response) => {
  const data = response.data;
  console.log(data.invoiceIntakes);
});
```

### Using `ListInvoiceIntakes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInvoiceIntakesRef } from '@factures-thibeault/data-connect-generated';


// Call the `listInvoiceIntakesRef()` function to get a reference to the query.
const ref = listInvoiceIntakesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInvoiceIntakesRef(dataConnect);

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
  accountCode: string;
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
  accountCode: ...,
  verificationStatus: ...,
};

// Call the `adminSeedSkuReference()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedSkuReference(adminSeedSkuReferenceVars);
// Variables can be defined inline as well.
const { data } = await adminSeedSkuReference({ merchant: ..., sku: ..., productLabel: ..., categoryLabel: ..., accountCode: ..., verificationStatus: ..., });

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
  accountCode: ...,
  verificationStatus: ...,
};

// Call the `adminSeedSkuReferenceRef()` function to get a reference to the mutation.
const ref = adminSeedSkuReferenceRef(adminSeedSkuReferenceVars);
// Variables can be defined inline as well.
const ref = adminSeedSkuReferenceRef({ merchant: ..., sku: ..., productLabel: ..., categoryLabel: ..., accountCode: ..., verificationStatus: ..., });

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
  accountCode: string;
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
  accountCode: ...,
  categoryLabel: ..., // optional
  sku: ..., // optional
  amountBeforeTaxCents: ...,
  tpsCents: ...,
  tvqCents: ...,
  totalCents: ...,
  currency: ...,
  status: ...,
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
const { data } = await adminSeedExpenseTransaction({ id: ..., transactionDate: ..., vendor: ..., cardId: ..., statementPeriodId: ..., projectId: ..., accountCode: ..., categoryLabel: ..., sku: ..., amountBeforeTaxCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., status: ..., reconciliationStatus: ..., classificationSource: ..., classificationConfidence: ..., classificationNote: ..., invoiceNumber: ..., issue: ..., });

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
  accountCode: ...,
  categoryLabel: ..., // optional
  sku: ..., // optional
  amountBeforeTaxCents: ...,
  tpsCents: ...,
  tvqCents: ...,
  totalCents: ...,
  currency: ...,
  status: ...,
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
const ref = adminSeedExpenseTransactionRef({ id: ..., transactionDate: ..., vendor: ..., cardId: ..., statementPeriodId: ..., projectId: ..., accountCode: ..., categoryLabel: ..., sku: ..., amountBeforeTaxCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., status: ..., reconciliationStatus: ..., classificationSource: ..., classificationConfidence: ..., classificationNote: ..., invoiceNumber: ..., issue: ..., });

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
  reviewStatus: ...,
  storageFolder: ..., // optional
  createdById: ...,
};

// Call the `adminSeedInvoice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSeedInvoice(adminSeedInvoiceVars);
// Variables can be defined inline as well.
const { data } = await adminSeedInvoice({ id: ..., transactionId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., reviewStatus: ..., storageFolder: ..., createdById: ..., });

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
  reviewStatus: ...,
  storageFolder: ..., // optional
  createdById: ...,
};

// Call the `adminSeedInvoiceRef()` function to get a reference to the mutation.
const ref = adminSeedInvoiceRef(adminSeedInvoiceVars);
// Variables can be defined inline as well.
const ref = adminSeedInvoiceRef({ id: ..., transactionId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., reviewStatus: ..., storageFolder: ..., createdById: ..., });

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
  code: string;
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
  code: ...,
};

// Call the `adminDeleteExpenseAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteExpenseAccount(adminDeleteExpenseAccountVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteExpenseAccount({ code: ..., });

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
  code: ...,
};

// Call the `adminDeleteExpenseAccountRef()` function to get a reference to the mutation.
const ref = adminDeleteExpenseAccountRef(adminDeleteExpenseAccountVars);
// Variables can be defined inline as well.
const ref = adminDeleteExpenseAccountRef({ code: ..., });

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

## AdminDeleteTaxAccount
You can execute the `AdminDeleteTaxAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [data-connect/index.d.ts](./index.d.ts):
```typescript
adminDeleteTaxAccount(vars: AdminDeleteTaxAccountVariables): MutationPromise<AdminDeleteTaxAccountData, AdminDeleteTaxAccountVariables>;

interface AdminDeleteTaxAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteTaxAccountVariables): MutationRef<AdminDeleteTaxAccountData, AdminDeleteTaxAccountVariables>;
}
export const adminDeleteTaxAccountRef: AdminDeleteTaxAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteTaxAccount(dc: DataConnect, vars: AdminDeleteTaxAccountVariables): MutationPromise<AdminDeleteTaxAccountData, AdminDeleteTaxAccountVariables>;

interface AdminDeleteTaxAccountRef {
  ...
  (dc: DataConnect, vars: AdminDeleteTaxAccountVariables): MutationRef<AdminDeleteTaxAccountData, AdminDeleteTaxAccountVariables>;
}
export const adminDeleteTaxAccountRef: AdminDeleteTaxAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteTaxAccountRef:
```typescript
const name = adminDeleteTaxAccountRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteTaxAccount` mutation requires an argument of type `AdminDeleteTaxAccountVariables`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteTaxAccountVariables {
  code: string;
}
```
### Return Type
Recall that executing the `AdminDeleteTaxAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteTaxAccountData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteTaxAccountData {
  taxAccount_delete?: TaxAccount_Key | null;
}
```
### Using `AdminDeleteTaxAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteTaxAccount, AdminDeleteTaxAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteTaxAccount` mutation requires an argument of type `AdminDeleteTaxAccountVariables`:
const adminDeleteTaxAccountVars: AdminDeleteTaxAccountVariables = {
  code: ...,
};

// Call the `adminDeleteTaxAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteTaxAccount(adminDeleteTaxAccountVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteTaxAccount({ code: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteTaxAccount(dataConnect, adminDeleteTaxAccountVars);

console.log(data.taxAccount_delete);

// Or, you can use the `Promise` API.
adminDeleteTaxAccount(adminDeleteTaxAccountVars).then((response) => {
  const data = response.data;
  console.log(data.taxAccount_delete);
});
```

### Using `AdminDeleteTaxAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteTaxAccountRef, AdminDeleteTaxAccountVariables } from '@factures-thibeault/data-connect-generated';

// The `AdminDeleteTaxAccount` mutation requires an argument of type `AdminDeleteTaxAccountVariables`:
const adminDeleteTaxAccountVars: AdminDeleteTaxAccountVariables = {
  code: ...,
};

// Call the `adminDeleteTaxAccountRef()` function to get a reference to the mutation.
const ref = adminDeleteTaxAccountRef(adminDeleteTaxAccountVars);
// Variables can be defined inline as well.
const ref = adminDeleteTaxAccountRef({ code: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteTaxAccountRef(dataConnect, adminDeleteTaxAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.taxAccount_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.taxAccount_delete);
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
  firebaseUid: string;
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
  firebaseUid: ...,
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
  firebaseUid: ...,
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
Recall that executing the `UpdateInvoiceIntakeAiResult` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInvoiceIntakeAiResultData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInvoiceIntakeAiResultData {
  invoiceIntake_update?: InvoiceIntake_Key | null;
}
```
### Using `UpdateInvoiceIntakeAiResult`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInvoiceIntakeAiResult, UpdateInvoiceIntakeAiResultVariables } from '@factures-thibeault/data-connect-generated';

// The `UpdateInvoiceIntakeAiResult` mutation requires an argument of type `UpdateInvoiceIntakeAiResultVariables`:
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

// Call the `updateInvoiceIntakeAiResult()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInvoiceIntakeAiResult(updateInvoiceIntakeAiResultVars);
// Variables can be defined inline as well.
const { data } = await updateInvoiceIntakeAiResult({ receiptId: ..., status: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInvoiceIntakeAiResult(dataConnect, updateInvoiceIntakeAiResultVars);

console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
updateInvoiceIntakeAiResult(updateInvoiceIntakeAiResultVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_update);
});
```

### Using `UpdateInvoiceIntakeAiResult`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInvoiceIntakeAiResultRef, UpdateInvoiceIntakeAiResultVariables } from '@factures-thibeault/data-connect-generated';

// The `UpdateInvoiceIntakeAiResult` mutation requires an argument of type `UpdateInvoiceIntakeAiResultVariables`:
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

// Call the `updateInvoiceIntakeAiResultRef()` function to get a reference to the mutation.
const ref = updateInvoiceIntakeAiResultRef(updateInvoiceIntakeAiResultVars);
// Variables can be defined inline as well.
const ref = updateInvoiceIntakeAiResultRef({ receiptId: ..., status: ..., aiModel: ..., aiConfidence: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInvoiceIntakeAiResultRef(dataConnect, updateInvoiceIntakeAiResultVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_update);
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
}
```
### Return Type
Recall that executing the `MarkInvoiceIntakeAiError` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkInvoiceIntakeAiErrorData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkInvoiceIntakeAiErrorData {
  invoiceIntake_update?: InvoiceIntake_Key | null;
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
};

// Call the `markInvoiceIntakeAiError()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markInvoiceIntakeAiError(markInvoiceIntakeAiErrorVars);
// Variables can be defined inline as well.
const { data } = await markInvoiceIntakeAiError({ receiptId: ..., error: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markInvoiceIntakeAiError(dataConnect, markInvoiceIntakeAiErrorVars);

console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
markInvoiceIntakeAiError(markInvoiceIntakeAiErrorVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_update);
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
};

// Call the `markInvoiceIntakeAiErrorRef()` function to get a reference to the mutation.
const ref = markInvoiceIntakeAiErrorRef(markInvoiceIntakeAiErrorVars);
// Variables can be defined inline as well.
const ref = markInvoiceIntakeAiErrorRef({ receiptId: ..., error: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markInvoiceIntakeAiErrorRef(dataConnect, markInvoiceIntakeAiErrorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_update);
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
Recall that executing the `UpdateInvoiceIntakeReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInvoiceIntakeReviewData`, which is defined in [data-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInvoiceIntakeReviewData {
  invoiceIntake_update?: InvoiceIntake_Key | null;
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

// Call the `updateInvoiceIntakeReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInvoiceIntakeReview(updateInvoiceIntakeReviewVars);
// Variables can be defined inline as well.
const { data } = await updateInvoiceIntakeReview({ receiptId: ..., status: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInvoiceIntakeReview(dataConnect, updateInvoiceIntakeReviewVars);

console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
updateInvoiceIntakeReview(updateInvoiceIntakeReviewVars).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_update);
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

// Call the `updateInvoiceIntakeReviewRef()` function to get a reference to the mutation.
const ref = updateInvoiceIntakeReviewRef(updateInvoiceIntakeReviewVars);
// Variables can be defined inline as well.
const ref = updateInvoiceIntakeReviewRef({ receiptId: ..., status: ..., extractedVendor: ..., extractedInvoiceNumber: ..., extractedInvoiceDate: ..., extractedSubtotalCents: ..., extractedTpsCents: ..., extractedTvqCents: ..., extractedTotalCents: ..., extractedCurrency: ..., extractedSku: ..., extractedCategory: ..., extractedProjectId: ..., classificationAccountCode: ..., classificationCategory: ..., classificationSource: ..., classificationConfidence: ..., classificationStatus: ..., aiNotes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInvoiceIntakeReviewRef(dataConnect, updateInvoiceIntakeReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invoiceIntake_update);
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
  accountCode: string;
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
  accountCode: ...,
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
const { data } = await commitInvoiceIntake({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountCode: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await commitInvoiceIntake(dataConnect, commitInvoiceIntakeVars);

console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
commitInvoiceIntake(commitInvoiceIntakeVars).then((response) => {
  const data = response.data;
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
  accountCode: ...,
  cardId: ...,
  statementPeriodId: ...,
  projectId: ...,
  storageFolder: ...,
  classificationNote: ...,
};

// Call the `commitInvoiceIntakeRef()` function to get a reference to the mutation.
const ref = commitInvoiceIntakeRef(commitInvoiceIntakeVars);
// Variables can be defined inline as well.
const ref = commitInvoiceIntakeRef({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountCode: ..., cardId: ..., statementPeriodId: ..., projectId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = commitInvoiceIntakeRef(dataConnect, commitInvoiceIntakeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
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
  accountCode: string;
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
  accountCode: ...,
  cardId: ...,
  statementPeriodId: ...,
  storageFolder: ...,
  classificationNote: ...,
};

// Call the `commitInvoiceIntakeWithoutProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await commitInvoiceIntakeWithoutProject(commitInvoiceIntakeWithoutProjectVars);
// Variables can be defined inline as well.
const { data } = await commitInvoiceIntakeWithoutProject({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountCode: ..., cardId: ..., statementPeriodId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await commitInvoiceIntakeWithoutProject(dataConnect, commitInvoiceIntakeWithoutProjectVars);

console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
commitInvoiceIntakeWithoutProject(commitInvoiceIntakeWithoutProjectVars).then((response) => {
  const data = response.data;
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
  accountCode: ...,
  cardId: ...,
  statementPeriodId: ...,
  storageFolder: ...,
  classificationNote: ...,
};

// Call the `commitInvoiceIntakeWithoutProjectRef()` function to get a reference to the mutation.
const ref = commitInvoiceIntakeWithoutProjectRef(commitInvoiceIntakeWithoutProjectVars);
// Variables can be defined inline as well.
const ref = commitInvoiceIntakeWithoutProjectRef({ receiptId: ..., transactionId: ..., invoiceId: ..., vendor: ..., invoiceNumber: ..., invoiceDate: ..., subtotalCents: ..., tpsCents: ..., tvqCents: ..., totalCents: ..., currency: ..., sku: ..., category: ..., accountCode: ..., cardId: ..., statementPeriodId: ..., storageFolder: ..., classificationNote: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = commitInvoiceIntakeWithoutProjectRef(dataConnect, commitInvoiceIntakeWithoutProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expenseTransaction_upsert);
console.log(data.invoice_upsert);
console.log(data.invoiceIntake_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expenseTransaction_upsert);
  console.log(data.invoice_upsert);
  console.log(data.invoiceIntake_update);
});
```

