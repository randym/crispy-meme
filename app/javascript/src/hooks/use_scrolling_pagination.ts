import { useEffect, useState } from "react";

/**
 * useScrollingPagination
 *
 * A custom React hook that provides infinite scrolling pagination functionality.
 * It listens for scroll events and loads the next page of data when the user
 * scrolls to the bottom of the page.
 *
 * @template T - The type of items in the paginated list.
 * @param {Paginating<T>} source - The data source that provides paginated data.
 * @param {readonly T[]} firstPage - The initial page of data.
 * @returns {{
 *   list: readonly T[];
 *   isLoading: boolean;
 * }} - An object containing the current list of items and the loading state.
 *
 * @example
 * const { list, isLoading } = useScrollingPagination(source, initialData);
 */
export const useScrollingPagination = <T>(
  source: any,
  firstPage: readonly any[],
) => {
  const [list, setList] = useState<readonly any[]>(firstPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [shouldPaginate, setShouldPaginate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight } = window;
      const { scrollTop, scrollHeight } = document.documentElement;
      const position = innerHeight + scrollTop;

      setShouldPaginate(position >= scrollHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    shouldPaginate && loadNextPage();
  }, [shouldPaginate]);

  const loadNextPage = async () => {
    setIsLoading(true);
    try {
      const data = await source.page(pageNumber + 1);
      data.length && setPageNumber((prev) => prev + 1);
      setList((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { list, isLoading };
};
