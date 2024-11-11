import { useEffect, useState } from "react";

// add pages of data from the provided source when the user scrolls to the bottom of the page
export const useScrollingPagination = <T>(
  source: any,
  firstPage: readonly any[],
) => {
  const [list, setList] = useState<readonly any[]>(firstPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [shouldPaginate, setShouldPaginate] = useState(false);

  // Monitor scroll events indicating we should paginate
  // when scrolled to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight } = window;
      const { scrollTop, offsetHeight } = document.documentElement;
      const position = innerHeight + scrollTop;
      setShouldPaginate(position >= offsetHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // load the next page when we should paginate
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
