import { OrderType } from "./orderType";

export interface ISearchResult<T> {
    itemList: T[];
    currentPageNumber: number;
    order: OrderType;
    pageCount: number;
    pageSize: number;
    searchCriteria: string;
    totalItemCount: number;
}
