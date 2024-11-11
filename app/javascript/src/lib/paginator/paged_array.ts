import { Config } from "../../config";
const { pageSize } = Config.pagination;

// This is async for parity with sources that fetch from the
// backend. I guess we could test the source in InfiniteScrollingList
// and switch between sync and async but that logic fork feels worse
// that this "fake" promise
export class PagedArray<T> extends Array<T> implements Paginating<T> {
  source?: Paginating<T>;

  async page(pageNumber: number): Promise<readonly T[]> {
    const { source } = this;
    const page = await this.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize,
    );
    if (page.length === pageSize || !source) {
      return page;
    }
    const remotePage = await source.page(pageNumber);
    page.push(...remotePage.slice(page.length));
    return page;
  }
}
