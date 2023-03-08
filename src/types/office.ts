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
    loading: boolean;
    error: null | string;
}

export enum OfficeActionTypes {
    GET_OFFICES = "GET_OFFICES",
    GET_OFFICE_BY_ID = "GET_OFFICE_BY_ID",
    SET_OFFICE_ERROR = "SET_OFFICE_ERROR",
    SET_OFFICE_LOADING = "SET_OFFICE_LOADING",
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
    CreateOfficeAction |
    UpdateOfficeAction |
    RemoveOfficeAction