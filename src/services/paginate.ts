import { List } from "@/components/UserList";
import _ from "lodash";

export const paginate = (
  items: List[],
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};
