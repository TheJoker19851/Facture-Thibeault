export const DATA_CONNECT_PAGE_SIZE = 200;

export async function executeAllQueryPages(dataConnect, operation, field, variables = {}) {
  const rows = [];
  for (let offset = 0; ; offset += DATA_CONNECT_PAGE_SIZE) {
    const result = await dataConnect.executeQuery(operation, { ...variables, limit: DATA_CONNECT_PAGE_SIZE, offset });
    const page = result.data?.[field] ?? [];
    rows.push(...page);
    if (page.length < DATA_CONNECT_PAGE_SIZE) return rows;
  }
}
