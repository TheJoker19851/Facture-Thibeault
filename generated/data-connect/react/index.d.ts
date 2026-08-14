import { ListCreditCardsData, ListCardStatementPeriodsData, ListExpenseAccountsData, ListProjectsData, ListSkuReferencesData, ListExpenseTransactionsData, ListInvoicesToReviewData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListCreditCards(options?: useDataConnectQueryOptions<ListCreditCardsData>): UseDataConnectQueryResult<ListCreditCardsData, undefined>;
export function useListCreditCards(dc: DataConnect, options?: useDataConnectQueryOptions<ListCreditCardsData>): UseDataConnectQueryResult<ListCreditCardsData, undefined>;

export function useListCardStatementPeriods(options?: useDataConnectQueryOptions<ListCardStatementPeriodsData>): UseDataConnectQueryResult<ListCardStatementPeriodsData, undefined>;
export function useListCardStatementPeriods(dc: DataConnect, options?: useDataConnectQueryOptions<ListCardStatementPeriodsData>): UseDataConnectQueryResult<ListCardStatementPeriodsData, undefined>;

export function useListExpenseAccounts(options?: useDataConnectQueryOptions<ListExpenseAccountsData>): UseDataConnectQueryResult<ListExpenseAccountsData, undefined>;
export function useListExpenseAccounts(dc: DataConnect, options?: useDataConnectQueryOptions<ListExpenseAccountsData>): UseDataConnectQueryResult<ListExpenseAccountsData, undefined>;

export function useListProjects(options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;
export function useListProjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;

export function useListSkuReferences(options?: useDataConnectQueryOptions<ListSkuReferencesData>): UseDataConnectQueryResult<ListSkuReferencesData, undefined>;
export function useListSkuReferences(dc: DataConnect, options?: useDataConnectQueryOptions<ListSkuReferencesData>): UseDataConnectQueryResult<ListSkuReferencesData, undefined>;

export function useListExpenseTransactions(options?: useDataConnectQueryOptions<ListExpenseTransactionsData>): UseDataConnectQueryResult<ListExpenseTransactionsData, undefined>;
export function useListExpenseTransactions(dc: DataConnect, options?: useDataConnectQueryOptions<ListExpenseTransactionsData>): UseDataConnectQueryResult<ListExpenseTransactionsData, undefined>;

export function useListInvoicesToReview(options?: useDataConnectQueryOptions<ListInvoicesToReviewData>): UseDataConnectQueryResult<ListInvoicesToReviewData, undefined>;
export function useListInvoicesToReview(dc: DataConnect, options?: useDataConnectQueryOptions<ListInvoicesToReviewData>): UseDataConnectQueryResult<ListInvoicesToReviewData, undefined>;
