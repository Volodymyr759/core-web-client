export interface ISearchResult<T> {
    itemList: T[];
    currentPageNumber: number;
    order: OrderType;
    pageCount: number;
    pageSize: number;
    searchCriteria: string;
    toalItemCount: number;
}

export enum OrderType {
    Ascending,
    Descending
}