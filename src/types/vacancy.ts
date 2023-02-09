import { ISearchResult } from "./searchResult";

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
}

export interface VacancyState {
    vacancySearchResult: ISearchResult<IVacancy>;
    filters: VacancyFilters;
    loading: boolean;
    error: null | string;
}

export enum VacancyActionTypes {
    GET_VACANCIES = "GET_VACANCIES",
    LOAD_MORE_VACANCIES = "LOAD_MORE_VACANCIES",
    SET_VACANCY_ERROR = "SET_VACANCY_ERROR",
    SET_VACANCY_LOADING = "SET_VACANCY_LOADING",
    SET_VACANCY_PAGE = "SET_VACANCY_PAGE",
    SET_VACANCY_ACTIVE_FILTER = "SET_VACANCY_ACTIVE_FILTER",
    SET_VACANCY_OFFICE_FILTER = "SET_VACANCY_OFFICE_FILTER",
    CLEAR_VACANCIES = "CLEAR_VACANCIES"
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

interface ClearVacanciesAction {
    type: VacancyActionTypes.CLEAR_VACANCIES;
    payload: [];
}

export type VacancyAction = GetVacanciesAction | 
LoadMoreVacanciesAction | 
SetErrorVacancyAction | 
SetLoadingVacancyAction | 
SetPageVacancyAction |
SetVacancyActiveFilterAction |
SetVacancyOfficeFilterAction |
ClearVacanciesAction
