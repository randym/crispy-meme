import { pageSize } from "../../config";

/**
 * PagedArray
 *
 * A class that extends the native Array to provide pagination functionality.
 * This is particularly useful for limiting the number of items displayed on a page
 * and fetching additional items from a remote source as needed.
 *
 * Use Case:
 * - Limiting the number of households displayed on a page when viewing the energy generated for a city.
 *
 * Features:
 * - Paginate through the array items.
 * - Fetch additional items from a remote source if available.
 *
 * Usage:
 * - Create an instance of PagedArray with the initial items.
 * - Call the `page` method to get a specific page of items.
 * - If a remote source is configured, the `page` method will fetch additional items from the source when needed.
 *
 * Example:
 * ```typescript
 * const households = new PagedArray<Household>(initialHouseholds);
 * households.source = remoteHouseholdSource;
 * const firstPage = await households.page(1);
 * ```
 *
 * @template T - The type of items in the array.
 */
export class PagedArray<T> extends Array<T> implements Paginating<T> {
  source?: Paginating<T>;
  /**
   * Fetches a specific page of items from the array.
   * If the page is not fully populated, it fetches additional items from the remote source if available.
   *
   * @param {number} pageNumber - The page number to fetch.
   * @returns {Promise<readonly T[]>} - A promise that resolves to an array of items for the specified page.
   */
  async page(pageNumber: number): Promise<readonly T[]> {
    const page = this.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    if (page.length === pageSize) {
      return page;
    }

    const remotePage = (await this.source?.page(pageNumber)) ?? [];
    const next = remotePage.slice(page.length);
    page.push(...next);
    this.push(...next);

    return page;
  }
}
