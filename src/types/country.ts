import { OrderType } from "./common/orderType";
import { ISearchResult } from "./common/searchResult";

export interface ICountry {
    id: number;
    name: string;
    code: string;
    officeDtos?: { name: string, address: string }[];
}

export interface CountryState {
    countrySearchResult: ISearchResult<ICountry>;
    sortField: string;
    loading: boolean;
    error: null | string;
}

export enum CountryActionTypes {
    GET_COUNTRIES = "GET_COUNTRIES",
    GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID",
    SET_COUNTRY_ERROR = "SET_COUNTRY_ERROR",
    SET_COUNTRY_LOADING = "SET_COUNTRY_LOADING",
    SET_COUNTRY_PAGE = "SET_COUNTRY_PAGE",
    SET_COUNTRY_SORTFIELD = "SET_COUNTRY_SORTFIELD",
    SET_SORT = "SET_SORT",
    CREATE_COUNTRY = "CREATE_COUNTRY",
    UPDATE_COUNTRY = "UPDATE_COUNTRY",
    REMOVE_COUNTRY = "REMOVE_COUNTRY"
}

interface GetCoutriesAction {
    type: CountryActionTypes.GET_COUNTRIES;
    payload: ISearchResult<ICountry>;
}

interface GetCountryByIdAction {
    type: CountryActionTypes.GET_COUNTRY_BY_ID;
    payload: ICountry;
}

interface SetCountryErrorAction {
    type: CountryActionTypes.SET_COUNTRY_ERROR;
    payload: null | string;
}

interface SetCountryLoadingAction {
    type: CountryActionTypes.SET_COUNTRY_LOADING;
    payload: boolean;
}

interface SetCountryPageAction {
    type: CountryActionTypes.SET_COUNTRY_PAGE;
    payload: number;
}

interface SetCountrySortField {
    type: CountryActionTypes.SET_COUNTRY_SORTFIELD;
    payload: string;
}

interface SetCountrySort {
    type: CountryActionTypes.SET_SORT;
    payload: OrderType;
}

interface CreateCountryAction {
    type: CountryActionTypes.CREATE_COUNTRY;
    payload: ICountry;
}

interface UpdateCountryAction {
    type: CountryActionTypes.UPDATE_COUNTRY;
    payload: ICountry;
}

interface RemoveCountryAction {
    type: CountryActionTypes.REMOVE_COUNTRY;
    payload: number;
}

export type CountryAction = GetCoutriesAction |
    GetCountryByIdAction |
    SetCountryErrorAction |
    SetCountryLoadingAction |
    SetCountryPageAction |
    SetCountrySortField |
    SetCountrySort |
    CreateCountryAction |
    UpdateCountryAction |
    RemoveCountryAction