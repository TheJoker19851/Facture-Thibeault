# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAdminSeedUserProfile, useAdminSeedProject, useAdminSeedExpenseAccount, useAdminSeedCardStatementPeriod, useAdminSeedInvoiceIntake, useAdminSeedCreditCard, useAdminSeedCreditCardStatement, useAdminSeedCreditCardStatementLine, useAdminSeedSkuReference, useAdminSeedExpenseTransaction } from '@factures-thibeault/data-connect-generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAdminSeedUserProfile(adminSeedUserProfileVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedProject(adminSeedProjectVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedExpenseAccount(adminSeedExpenseAccountVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedCardStatementPeriod(adminSeedCardStatementPeriodVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedInvoiceIntake(adminSeedInvoiceIntakeVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedCreditCard(adminSeedCreditCardVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedCreditCardStatement(adminSeedCreditCardStatementVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedCreditCardStatementLine(adminSeedCreditCardStatementLineVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedSkuReference(adminSeedSkuReferenceVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedExpenseTransaction(adminSeedExpenseTransactionVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { adminSeedUserProfile, adminSeedProject, adminSeedExpenseAccount, adminSeedCardStatementPeriod, adminSeedInvoiceIntake, adminSeedCreditCard, adminSeedCreditCardStatement, adminSeedCreditCardStatementLine, adminSeedSkuReference, adminSeedExpenseTransaction } from '@factures-thibeault/data-connect-generated';


// Operation AdminSeedUserProfile:  For variables, look at type AdminSeedUserProfileVars in ../index.d.ts
const { data } = await AdminSeedUserProfile(dataConnect, adminSeedUserProfileVars);

// Operation AdminSeedProject:  For variables, look at type AdminSeedProjectVars in ../index.d.ts
const { data } = await AdminSeedProject(dataConnect, adminSeedProjectVars);

// Operation AdminSeedExpenseAccount:  For variables, look at type AdminSeedExpenseAccountVars in ../index.d.ts
const { data } = await AdminSeedExpenseAccount(dataConnect, adminSeedExpenseAccountVars);

// Operation AdminSeedCardStatementPeriod:  For variables, look at type AdminSeedCardStatementPeriodVars in ../index.d.ts
const { data } = await AdminSeedCardStatementPeriod(dataConnect, adminSeedCardStatementPeriodVars);

// Operation AdminSeedInvoiceIntake:  For variables, look at type AdminSeedInvoiceIntakeVars in ../index.d.ts
const { data } = await AdminSeedInvoiceIntake(dataConnect, adminSeedInvoiceIntakeVars);

// Operation AdminSeedCreditCard:  For variables, look at type AdminSeedCreditCardVars in ../index.d.ts
const { data } = await AdminSeedCreditCard(dataConnect, adminSeedCreditCardVars);

// Operation AdminSeedCreditCardStatement:  For variables, look at type AdminSeedCreditCardStatementVars in ../index.d.ts
const { data } = await AdminSeedCreditCardStatement(dataConnect, adminSeedCreditCardStatementVars);

// Operation AdminSeedCreditCardStatementLine:  For variables, look at type AdminSeedCreditCardStatementLineVars in ../index.d.ts
const { data } = await AdminSeedCreditCardStatementLine(dataConnect, adminSeedCreditCardStatementLineVars);

// Operation AdminSeedSkuReference:  For variables, look at type AdminSeedSkuReferenceVars in ../index.d.ts
const { data } = await AdminSeedSkuReference(dataConnect, adminSeedSkuReferenceVars);

// Operation AdminSeedExpenseTransaction:  For variables, look at type AdminSeedExpenseTransactionVars in ../index.d.ts
const { data } = await AdminSeedExpenseTransaction(dataConnect, adminSeedExpenseTransactionVars);


```