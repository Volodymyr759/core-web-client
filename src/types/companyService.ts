import { OrderType } from "./common/orderType";
import { ISearchResult } from "./common/searchResult";

export interface ICompanyService {
    id: number,
    title: string;
    description: string;
    imageUrl: string;
    isActive: boolean;
}

export enum CompanyServiceStatus {
    Active,
    Disabled,
    All
}

export interface CompanyServiceState {
    serviceSearchResult: ISearchResult<ICompanyService>;
    filters: {
        active: CompanyServiceStatus
    },
    sortField,
    loading: boolean;
    error: null | string;
}

export enum CompanyServiceActionTypes {
    GET_COMPANY_SERVICES = "GET_COMPANY_SERVICES",
    GET_COMPANY_SERVICE_BY_ID = "GET_COMPANY_SERVICE_BY_ID",
    LOAD_MORE_COMPANY_SERVICES = "LOAD_MORE_COMPANY_SERVICES",
    SET_COMPANY_SERVICE_ERROR = "SET_COMPANY_SERVICE_ERROR",
    SET_COMPANY_SERVICE_LOADING = "SET_COMPANY_SERVICE_LOADING",
    SET_COMPANY_SERVICE_PAGE = "SET_COMPANY_SERVICE_PAGE",
    SET_COMPANY_SERVICE_ACTIVE_FILTER = "SET_COMPANY_SERVICE_ACTIVE_FILTER",
    SET_SERVICE_SORTFIELD = "SET_SERVICE_SORTFIELD",
    SET_SERVICE_SORT = "SET_SERVICE_SORT",
    UPDATE_COMPANY_SERVICE_ISACTIVE_STATUS = "UPDATE_COMPANY_SERVICE_ISACTIVE_STATUS",
    CREATE_COMPANY_SERVICE = "CREATE_COMPANY_SERVICE",
    UPDATE_COMPANY_SERVICE = "UPDATE_COMPANY_SERVICE",
    REMOVE_COMPANY_SERVICE = "REMOVE_COMPANY_SERVICE"
}

interface GetServicesAction {
    type: CompanyServiceActionTypes.GET_COMPANY_SERVICES;
    payload: ISearchResult<ICompanyService>;
}

interface GetServiceByIdAction {
    type: CompanyServiceActionTypes.GET_COMPANY_SERVICE_BY_ID;
    payload: ICompanyService;
}

interface LoadMoreServicesAction {
    type: CompanyServiceActionTypes.LOAD_MORE_COMPANY_SERVICES;
    payload: ISearchResult<ICompanyService>;
}

interface SetServiceErrorAction {
    type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR;
    payload: null | string;
}

interface SetServiceLoadingAction {
    type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING;
    payload: boolean;
}

interface SetServicePageAction {
    type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_PAGE;
    payload: number;
}

interface SetServiceActiveFilterAction {
    type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ACTIVE_FILTER;
    payload: CompanyServiceStatus;
}

interface SetServiceSortField {
    type: CompanyServiceActionTypes.SET_SERVICE_SORTFIELD;
    payload: string;
}

interface SetServiceSort {
    type: CompanyServiceActionTypes.SET_SERVICE_SORT;
    payload: OrderType;
}

interface UpdateServiceIsActiveStatusAction {
    type: CompanyServiceActionTypes.UPDATE_COMPANY_SERVICE_ISACTIVE_STATUS;
    payload: ICompanyService;
}

interface CreateCompanyServiceAction {
    type: CompanyServiceActionTypes.CREATE_COMPANY_SERVICE;
    payload: ICompanyService;
}

interface UpdateCompanyServiceAction {
    type: CompanyServiceActionTypes.UPDATE_COMPANY_SERVICE;
    payload: ICompanyService;
}

interface RemoveCompanyServiceAction {
    type: CompanyServiceActionTypes.REMOVE_COMPANY_SERVICE;
    payload: number;
}

export type CompanyServiceAction = GetServicesAction |
    GetServiceByIdAction |
    LoadMoreServicesAction |
    SetServiceErrorAction |
    SetServiceLoadingAction |
    SetServicePageAction |
    SetServiceActiveFilterAction |
    SetServiceSortField |
    SetServiceSort |
    UpdateServiceIsActiveStatusAction |
    CreateCompanyServiceAction |
    UpdateCompanyServiceAction |
    RemoveCompanyServiceAction