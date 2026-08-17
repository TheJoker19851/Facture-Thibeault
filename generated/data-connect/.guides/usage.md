# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAdminSeedCreditCard, useAdminSeedSkuReference, useAdminSeedExpenseTransaction, useAdminSeedInvoice, useAdminSeedInvoicePhoto, useUpsertUserProfile, useUpsertCreditCard, useCreateInvoiceIntake, useUpdateInvoiceIntakeAiResult, useMarkInvoiceIntakeAiError } from '@factures-thibeault/data-connect-generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAdminSeedCreditCard(adminSeedCreditCardVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedSkuReference(adminSeedSkuReferenceVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedExpenseTransaction(adminSeedExpenseTransactionVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedInvoice(adminSeedInvoiceVars);

const { data, isPending, isSuccess, isError, error } = useAdminSeedInvoicePhoto(adminSeedInvoicePhotoVars);

const { data, isPending, isSuccess, isError, error } = useUpsertUserProfile(upsertUserProfileVars);

const { data, isPending, isSuccess, isError, error } = useUpsertCreditCard(upsertCreditCardVars);

const { data, isPending, isSuccess, isError, error } = useCreateInvoiceIntake(createInvoiceIntakeVars);

const { data, isPending, isSuccess, isError, error } = useUpdateInvoiceIntakeAiResult(updateInvoiceIntakeAiResultVars);

const { data, isPending, isSuccess, isError, error } = useMarkInvoiceIntakeAiError(markInvoiceIntakeAiErrorVars);

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
import { adminSeedCreditCard, adminSeedSkuReference, adminSeedExpenseTransaction, adminSeedInvoice, adminSeedInvoicePhoto, upsertUserProfile, upsertCreditCard, createInvoiceIntake, updateInvoiceIntakeAiResult, markInvoiceIntakeAiError } from '@factures-thibeault/data-connect-generated';


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

// Operation UpsertUserProfile:  For variables, look at type UpsertUserProfileVars in ../index.d.ts
const { data } = await UpsertUserProfile(dataConnect, upsertUserProfileVars);

// Operation UpsertCreditCard:  For variables, look at type UpsertCreditCardVars in ../index.d.ts
const { data } = await UpsertCreditCard(dataConnect, upsertCreditCardVars);

// Operation CreateInvoiceIntake:  For variables, look at type CreateInvoiceIntakeVars in ../index.d.ts
const { data } = await CreateInvoiceIntake(dataConnect, createInvoiceIntakeVars);

// Operation UpdateInvoiceIntakeAiResult:  For variables, look at type UpdateInvoiceIntakeAiResultVars in ../index.d.ts
const { data } = await UpdateInvoiceIntakeAiResult(dataConnect, updateInvoiceIntakeAiResultVars);

// Operation MarkInvoiceIntakeAiError:  For variables, look at type MarkInvoiceIntakeAiErrorVars in ../index.d.ts
const { data } = await MarkInvoiceIntakeAiError(dataConnect, markInvoiceIntakeAiErrorVars);


```