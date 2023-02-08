import { SortOrder } from "./sortOrder";

export interface ISearchResult<T> {
    itemList: T[];
    currentPageNumber: number;
    order: SortOrder;
    pageCount: number;
    pageSize: number;
    searchCriteria: string;
    totalItemCount: number;
}
