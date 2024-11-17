import React from "react";

import { useScrollingPagination } from "../hooks";
import { List } from "@material-tailwind/react";
interface InfiniteScrollingListProps<T extends Identifiable> {
  source: Paginating<T>;
  firstPage: readonly T[];
  ComponentType: React.ComponentType<{ item: T }>;
  onItemClick?: (item: T) => void;
}

type InfiniteScrollingList = React.FC<InfiniteScrollingListProps<any>>;

export const InfiniteScrollingList: InfiniteScrollingList = (props) => {
  const { ComponentType, source, firstPage } = props;

  const { list, isLoading } = useScrollingPagination(source, firstPage);

  return (
    <List className="w-full">
      {list.map((item: any) => (
        <div
          key={item.id}
          onClick={() => props.onItemClick && props.onItemClick(item)}
        >
          <ComponentType item={item} key={item.id} />
        </div>
      ))}
      {isLoading && <div className="text-center">Loading...</div>}
    </List>
  );
};
