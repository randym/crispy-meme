import React from "react";
import { List } from "@material-tailwind/react";
import { useScrollingPagination } from "../hooks";

/**
 * InfiniteScrollingList
 *
 * A React component that renders a list with infinite scrolling pagination.
 * It uses the `useScrollingPagination` hook to load more items when the user
 * scrolls to the bottom of the list.
 *
 * @template T - The type of items in the paginated list.
 * @param {InfiniteScrollingListProps<T>} props - The props for the component.
 * @param {Paginating<T>} props.source - The data source that provides paginated data.
 * @param {readonly T[]} props.firstPage - The initial page of data.
 * @param {(item: T) => React.ReactNode} props.renderItem - The render prop function used to render each item.
 *
 * @returns {JSX.Element} - The rendered component.
 *
 * @example
 * const source = { page: async (pageNumber) => fetchPageData(pageNumber) };
 * const firstPage = await source.page(1);
 *
 * <InfiniteScrollingList
 *   source={source}
 *   firstPage={firstPage}
 *   renderItem={(item) => (
 *     <div onClick={() => console.log(item)}>{item.name}</div>
 *   )}
 * />
 */
interface InfiniteScrollingListProps<T> {
  source: Paginating<T>;
  firstPage: readonly T[];
  renderItem: (item: T) => React.ReactNode;
}

type InfiniteScrollingList = React.FC<InfiniteScrollingListProps<any>>;

export const InfiniteScrollingList: InfiniteScrollingList = (props) => {
  const { source, firstPage, renderItem } = props;

  const { list, isLoading } = useScrollingPagination(source, firstPage);

  return (
    <List className="w-full">
      {list.map((item: any) => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}
      {isLoading && <div className="text-center">Loading...</div>}
    </List>
  );
};
