interface Paginating<T> {
  page(pageNumber: number): Promise<readonly T[]>;
}

interface PaginatingLoaderData<T> {
  source: Paginating<T>;
  firstPage: T[];
}
