import { OfficeNameIdDto } from "./common/officeNameIdDto";
import { OrderType } from "./common/orderType";
import { ISearchResult } from "./common/searchResult";

export interface IVacancy {
    id: number;
    title: string;
    description: string;
    previews: number;
    isActive: boolean;
    officeId: number;
    candidates?: { id: number, fullName: string, email: string, isDismissed: boolean }[];
    officeDto?: {
        name: string;
        address: string;
    }
}

export enum VacancyStatus {
    Active,
    Disabled,
    All
}

export interface VacancyFilters {
    active: VacancyStatus;
    officeId: string;
    searchInTitle: string;
}

export interface VacancyTitleDto {
    value: string;
}

export interface VacancyState {
    vacancySearchResult: ISearchResult<IVacancy>;
    filters: VacancyFilters;
    offices: OfficeNameIdDto[];
    titles: VacancyTitleDto[];
    sortField: string;
    loadingFilters: boolean;
    errorFilters: null | string;
    loadingVacancies: boolean;
    errorVacancies: null | string;
}

export enum VacancyActionTypes {
    GET_VACANCIES = "GET_VACANCIES",
    LOAD_MORE_VACANCIES = "LOAD_MORE_VACANCIES",
    SET_VACANCY_ERROR = "SET_VACANCY_ERROR",
    SET_VACANCY_LOADING = "SET_VACANCY_LOADING",
    SET_FILTERS_ERROR = "SET_FILTERS_ERROR",
    SET_FILTERS_LOADING = "SET_FILTERS_LOADING",
    SET_VACANCY_PAGE = "SET_VACANCY_PAGE",
    SET_VACANCY_ACTIVE_FILTER = "SET_VACANCY_ACTIVE_FILTER",
    SET_VACANCY_OFFICE_FILTER = "SET_VACANCY_OFFICE_FILTER",
    SET_VACANCY_SEARCH_CRITERIA = "SET_VACANCY_SEARCH_CRITERIA",
    SET_VACANCY_OFFICES = "SET_VACANCY_OFFICES",
    SET_VACANCIES_TITLES = "SET_VACANCIES_TITLES",
    SET_VACANCY_SORTFIELD = "SET_VACANCY_SORTFIELD",
    SET_VACANCY_SORT = "SET_VACANCY_SORT",
    INCREMENT_PREVIEWS = "INCREMENT_PREVIEWS",
    UPDATE_VACANCY_ISACTIVE_STATUS = "UPDATE_VACANCY_ISACTIVE_STATUS",
    CREATE_VACANCY = "CREATE_VACANCY",
    UPDATE_VACANCY = "UPDATE_VACANCY",
    REMOVE_VACANCY = "REMOVE_VACANCY"
}

interface GetVacanciesAction {
    type: VacancyActionTypes.GET_VACANCIES;
    payload: ISearchResult<IVacancy>;
}

interface LoadMoreVacanciesAction {
    type: VacancyActionTypes.LOAD_MORE_VACANCIES;
    payload: ISearchResult<IVacancy>;
}

interface SetErrorVacancyAction {
    type: VacancyActionTypes.SET_VACANCY_ERROR;
    payload: null | string;
}

interface SetLoadingVacancyAction {
    type: VacancyActionTypes.SET_VACANCY_LOADING;
    payload: boolean;
}

interface SetFiltersErrorAction {
    type: VacancyActionTypes.SET_FILTERS_ERROR;
    payload: null | string;
}

interface SetFiltersLoadingAction {
    type: VacancyActionTypes.SET_FILTERS_LOADING;
    payload: boolean;
}

interface SetPageVacancyAction {
    type: VacancyActionTypes.SET_VACANCY_PAGE;
    payload: number;
}

interface SetVacancyActiveFilterAction {
    type: VacancyActionTypes.SET_VACANCY_ACTIVE_FILTER;
    payload: VacancyStatus;
}

interface SetVacancyOfficeFilterAction {
    type: VacancyActionTypes.SET_VACANCY_OFFICE_FILTER;
    payload: string;
}

interface SetVacancySearchCriteriaAction {
    type: VacancyActionTypes.SET_VACANCY_SEARCH_CRITERIA;
    payload: string;
}

interface SetVacancyOfficesAction {
    type: VacancyActionTypes.SET_VACANCY_OFFICES;
    payload: OfficeNameIdDto[];
}

interface SetVacanciesTitlesAction {
    type: VacancyActionTypes.SET_VACANCIES_TITLES;
    payload: VacancyTitleDto[];
}

interface SetVacancySortFieldAction {
    type: VacancyActionTypes.SET_VACANCY_SORTFIELD;
    payload: string;
}

interface SetVacancySortAction {
    type: VacancyActionTypes.SET_VACANCY_SORT;
    payload: OrderType;
}


interface IncrementPreviewsAction {
    type: VacancyActionTypes.INCREMENT_PREVIEWS;
    payload: number;
}

interface UpdateVacancyIsActiveStatus {
    type: VacancyActionTypes.UPDATE_VACANCY_ISACTIVE_STATUS;
    payload: IVacancy;
}

interface CreateVacancy {
    type: VacancyActionTypes.CREATE_VACANCY;
    payload: IVacancy;
}

interface UpdateVacancy {
    type: VacancyActionTypes.UPDATE_VACANCY;
    payload: IVacancy;
}

interface RemoveVacancy {
    type: VacancyActionTypes.REMOVE_VACANCY;
    payload: number;
}

export type VacancyAction = GetVacanciesAction |
    LoadMoreVacanciesAction |
    SetErrorVacancyAction |
    SetLoadingVacancyAction |
    SetFiltersErrorAction |
    SetFiltersLoadingAction |
    SetPageVacancyAction |
    SetVacancyActiveFilterAction |
    SetVacancyOfficeFilterAction |
    SetVacancySearchCriteriaAction |
    SetVacancyOfficesAction |
    SetVacanciesTitlesAction |
    SetVacancySortFieldAction |
    SetVacancySortAction |
    IncrementPreviewsAction |
    UpdateVacancyIsActiveStatus |
    CreateVacancy |
    UpdateVacancy |
    RemoveVacancy
