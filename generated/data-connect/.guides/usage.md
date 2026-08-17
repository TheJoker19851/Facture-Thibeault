# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAdminSeedCreditCard, useAdminSeedSkuReference, useAdminSeedExpenseTransaction, useAdminSeedInvoice, useAdminSeedInvoicePhoto, useAdminDeleteInvoicePhoto, useAdminDeleteInvoice, useAdminDeleteExpenseTransaction, useAdminDeleteInvoiceIntake, useAdminDeleteCreditCard } from '@factures-thibeault/data-connect-generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAdminSeedCreditCard(adminSeedCreditCardVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedSkuReference(adminSeedSkuReferenceVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedExpenseTransaction(adminSeedExpenseTransactionVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedInvoice(adminSeedInvoiceVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedInvoicePhoto(adminSeedInvoicePhotoVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeleteInvoicePhoto(adminDeleteInvoicePhotoVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeleteInvoice(adminDeleteInvoiceVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeleteExpenseTransaction(adminDeleteExpenseTransactionVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeleteInvoiceIntake(adminDeleteInvoiceIntakeVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeleteCreditCard(adminDeleteCreditCardVars);

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
import { adminSeedCreditCard, adminSeedSkuReference, adminSeedExpenseTransaction, adminSeedInvoice, adminSeedInvoicePhoto, adminDeleteInvoicePhoto, adminDeleteInvoice, adminDeleteExpenseTransaction, adminDeleteInvoiceIntake, adminDeleteCreditCard } from '@factures-thibeault/data-connect-generated';


// Operation AdminSeedCreditCard:  For variables, look at type AdminSeedCreditCardVars in ../index.d.ts
const { data } = await AdminSeedCreditCard(dataConnect, adminSeedCreditCardVars);

// Operation AdminSeedSkuReference:  For variables, look at type AdminSeedSkuReferenceVars in ../index.d.ts
const { data } = await AdminSeedSkuReference(dataConnect, adminSeedSkuReferenceVars);

// Operation AdminSeedExpenseTransaction:  For variables, look at type AdminSeedExpenseTransactionVars in ../index.d.ts
const { data } = await AdminSeedExpenseTransaction(dataConnect, adminSeedExpenseTransactionVars);

// Operation AdminSeedInvoice:  For variables, look at type AdminSeedInvoiceVars in ../index.d.ts
const { data } = await AdminSeedInvoice(dataConnect, adminSeedInvoiceVars);

// Operation AdminSeedInvoicePhoto:  For variables, look at type AdminSeedInvoicePhotoVars in ../index.d.ts
const { data } = await AdminSeedInvoicePhoto(dataConnect, adminSeedInvoicePhotoVars);

// Operation AdminDeleteInvoicePhoto:  For variables, look at type AdminDeleteInvoicePhotoVars in ../index.d.ts
const { data } = await AdminDeleteInvoicePhoto(dataConnect, adminDeleteInvoicePhotoVars);

// Operation AdminDeleteInvoice:  For variables, look at type AdminDeleteInvoiceVars in ../index.d.ts
const { data } = await AdminDeleteInvoice(dataConnect, adminDeleteInvoiceVars);

// Operation AdminDeleteExpenseTransaction:  For variables, look at type AdminDeleteExpenseTransactionVars in ../index.d.ts
const { data } = await AdminDeleteExpenseTransaction(dataConnect, adminDeleteExpenseTransactionVars);

// Operation AdminDeleteInvoiceIntake:  For variables, look at type AdminDeleteInvoiceIntakeVars in ../index.d.ts
const { data } = await AdminDeleteInvoiceIntake(dataConnect, adminDeleteInvoiceIntakeVars);

// Operation AdminDeleteCreditCard:  For variables, look at type AdminDeleteCreditCardVars in ../index.d.ts
const { data } = await AdminDeleteCreditCard(dataConnect, adminDeleteCreditCardVars);


```