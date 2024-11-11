import React from "react";

import { useScrollingPagination } from "../hooks";

interface InfiniteScrollingListProps<T extends Identifiable> {
  source: Paginating<T>;
  firstPage: readonly T[];
  ComponentType: React.ComponentType<{ item: T }>;
}

type InfiniteScrollingList = React.FC<InfiniteScrollingListProps<any>>;

export const InfiniteScrollingList: InfiniteScrollingList = (props) => {
  const { ComponentType, source, firstPage } = props;

  const { list, isLoading } = useScrollingPagination(source, firstPage);

  return (
    <div>
      {list.map((item: any) => (
        <ComponentType item={item} key={item.id} />
      ))}
      {isLoading && <div className="text-center">Loading...</div>}
    </div>
  );
};
