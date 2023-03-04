import { ISearchResult } from "./common/searchResult";

export interface IVacancy {
    id: number;
    title: string;
    description: string;
    previews: number;
    isActive: boolean;
    officeDto: {
        name: string;
    }
}

export interface VacancyFilters {
    active: boolean;
    officeId: string;
    searchInTitle: string;
}

export interface OfficeNameIdDto {
    id: number;
    name: string;
}

export interface VacancyTitleDto {
    value: string;
}

export interface VacancyState {
    vacancySearchResult: ISearchResult<IVacancy>;
    filters: VacancyFilters;
    currentVacancy: null | IVacancy;
    offices: OfficeNameIdDto[];
    titles: VacancyTitleDto[];
    loadingFilters: boolean;
    errorFilters: null | string;
    loadingVacancies: boolean;
    errorVacancies: null | string;
}

export enum VacancyActionTypes {
    GET_VACANCIES = "GET_VACANCIES",
    GET_VACANCY_BY_ID = "GET_VACANCY_BY_ID",
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
    SET_CURRENT_VACANCY = "SET_CURRENT_VACANCY",
    INCREMENT_PREVIEWS = "INCREMENT_PREVIEWS"
}

interface GetVacanciesAction {
    type: VacancyActionTypes.GET_VACANCIES;
    payload: ISearchResult<IVacancy>;
}

interface GetVacancyByIdAction {
    type: VacancyActionTypes.GET_VACANCY_BY_ID;
    payload: IVacancy;
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
    payload: boolean;
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

interface SetCurrentVacancyAction {
    type: VacancyActionTypes.SET_CURRENT_VACANCY;
    payload: IVacancy;
}

interface IncrementPreviewsAction {
    type: VacancyActionTypes.INCREMENT_PREVIEWS;
    payload: number;
}

export type VacancyAction = GetVacanciesAction |
    GetVacancyByIdAction |
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
    SetCurrentVacancyAction |
    IncrementPreviewsAction 
