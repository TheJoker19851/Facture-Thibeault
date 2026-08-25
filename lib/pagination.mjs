/**
 * Collects every page from an ordered Data Connect query.
 * The caller owns the query and may add authentication or other options in the callback.
 *
 * @template T
 * @param {(variables: { limit: number, offset: number }) => Promise<T[]>} readPage
 * @param {{ pageSize?: number }} [options]
 * @returns {Promise<T[]>}
 */
export async function collectPagedRows(readPage, options = {}) {
  const pageSize = Number.isInteger(options.pageSize) && options.pageSize > 0 ? options.pageSize : 200;
  const rows = [];
  for (let offset = 0; ; offset += pageSize) {
    const page = await readPage({ limit: pageSize, offset });
    rows.push(...page);
    if (page.length < pageSize) return rows;
  }
}
