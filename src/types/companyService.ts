import { ISearchResult } from "./searchResult";

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
    currentCompanyService: ICompanyService;
    loadingServices: boolean;
    errorServices: null | string;
}

export enum CompanyServiceActionTypes {
    GET_COMPANY_SERVICES = "GET_COMPANY_SERVICES",
    GET_COMPANY_SERVICE_BY_ID = "GET_COMPANY_SERVICE_BY_ID",
    LOAD_MORE_COMPANY_SERVICES = "LOAD_MORE_COMPANY_SERVICES",
    SET_COMPANY_SERVICE_ERROR = "SET_COMPANY_SERVICE_ERROR",
    SET_COMPANY_SERVICE_LOADING = "SET_COMPANY_SERVICE_LOADING",
    SET_COMPANY_SERVICE_PAGE = "SET_COMPANY_SERVICE_PAGE",
    SET_CURRENT_COMPANY_SERVICE = "SET_CURRENT_COMPANY_SERVICE",
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

interface SetCurrentServiceAction {
    type: CompanyServiceActionTypes.SET_CURRENT_COMPANY_SERVICE;
    payload: null | ICompanyService;
}

export type CompanyServiceAction = GetServicesAction |
GetServiceByIdAction |
LoadMoreServicesAction | 
SetServiceErrorAction |
SetServiceLoadingAction | 
SetServicePageAction | 
SetCurrentServiceAction