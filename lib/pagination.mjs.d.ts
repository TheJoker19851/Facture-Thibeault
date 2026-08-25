export function collectPagedRows<T>(
  readPage: (variables: { limit: number; offset: number }) => Promise<T[]>,
  options?: { pageSize?: number },
): Promise<T[]>;
