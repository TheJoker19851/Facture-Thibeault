# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListCreditCards, useListCardStatementPeriods, useListExpenseAccounts, useListProjects, useListSkuReferences, useListExpenseTransactions, useListInvoicesToReview } from '@factures-thibeault/data-connect-generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListCreditCards();

const { data, isPending, isSuccess, isError, error } = useListCardStatementPeriods();

const { data, isPending, isSuccess, isError, error } = useListExpenseAccounts();

const { data, isPending, isSuccess, isError, error } = useListProjects();

const { data, isPending, isSuccess, isError, error } = useListSkuReferences();

const { data, isPending, isSuccess, isError, error } = useListExpenseTransactions();

const { data, isPending, isSuccess, isError, error } = useListInvoicesToReview();

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
import { listCreditCards, listCardStatementPeriods, listExpenseAccounts, listProjects, listSkuReferences, listExpenseTransactions, listInvoicesToReview } from '@factures-thibeault/data-connect-generated';


// Operation ListCreditCards: 
const { data } = await ListCreditCards(dataConnect);

// Operation ListCardStatementPeriods: 
const { data } = await ListCardStatementPeriods(dataConnect);

// Operation ListExpenseAccounts: 
const { data } = await ListExpenseAccounts(dataConnect);

// Operation ListProjects: 
const { data } = await ListProjects(dataConnect);

// Operation ListSkuReferences: 
const { data } = await ListSkuReferences(dataConnect);

// Operation ListExpenseTransactions: 
const { data } = await ListExpenseTransactions(dataConnect);

// Operation ListInvoicesToReview: 
const { data } = await ListInvoicesToReview(dataConnect);


```