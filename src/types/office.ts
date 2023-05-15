import { OrderType } from "./common/orderType";
import { ISearchResult } from "./common/searchResult";
import { ICountry } from "./country";
import { IVacancy } from "./vacancy";

export interface IOffice {
    id: number;
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    countryId: number;
    countryDto?: ICountry;
    vacancyDtos?: IVacancy[];
}

export interface OfficeState {
    officeSearchResult: ISearchResult<IOffice>;
    sortField: string;
    loading: boolean;
    error: null | string;
}

export enum OfficeActionTypes {
    GET_OFFICES = "GET_OFFICES",
    GET_OFFICE_BY_ID = "GET_OFFICE_BY_ID",
    SET_OFFICE_ERROR = "SET_OFFICE_ERROR",
    SET_OFFICE_LOADING = "SET_OFFICE_LOADING",
    SET_OFFICE_PAGE = "SET_OFFICE_PAGE",
    SET_OFFICE_SORTFIELD = "SET_OFFICE_SORTFIELD",
    SET_OFFICE_SORT = "SET_OFFICE_SORT",
    CREATE_OFFICE = "CREATE_OFFICE",
    UPDATE_OFFICE = "UPDATE_OFFICE",
    REMOVE_OFFICE = "REMOVE_OFFICE"
}

interface GetOfficesAction {
    type: OfficeActionTypes.GET_OFFICES;
    payload: ISearchResult<IOffice>;
}

interface GetOfficeByIdAction {
    type: OfficeActionTypes.GET_OFFICE_BY_ID;
    payload: IOffice;
}

interface SetOfficeErrorAction {
    type: OfficeActionTypes.SET_OFFICE_ERROR;
    payload: null | string;
}

interface SetOfficeLoadingAction {
    type: OfficeActionTypes.SET_OFFICE_LOADING;
    payload: boolean;
}

interface SetOfficePageAction {
    type: OfficeActionTypes.SET_OFFICE_PAGE;
    payload: number;
}

interface SetOfficeSortField {
    type: OfficeActionTypes.SET_OFFICE_SORTFIELD;
    payload: string;
}

interface SetOfficeSort {
    type: OfficeActionTypes.SET_OFFICE_SORT;
    payload: OrderType;
}

interface CreateOfficeAction {
    type: OfficeActionTypes.CREATE_OFFICE;
    payload: IOffice;
}

interface UpdateOfficeAction {
    type: OfficeActionTypes.UPDATE_OFFICE;
    payload: IOffice;
}

interface RemoveOfficeAction {
    type: OfficeActionTypes.REMOVE_OFFICE;
    payload: number;
}

export type OfficeAction = GetOfficesAction |
    GetOfficeByIdAction |
    SetOfficeErrorAction |
    SetOfficeLoadingAction |
    SetOfficePageAction |
    SetOfficeSortField |
    SetOfficeSort |
    CreateOfficeAction |
    UpdateOfficeAction |
    RemoveOfficeAction