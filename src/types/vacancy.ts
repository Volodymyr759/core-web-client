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

export interface VacancyState {
    vacancySearchResult: ISearchResult<IVacancy>;
    loading: boolean;
    error: null | string;
}

export enum VacancyActionTypes {
    GET_VACANCIES = "GET_VACANCIES",
    GET_PUBLIC_VACANCIES = "GET_PUBLIC_VACANCIES",
    SET_VACANCY_ERROR = "SET_VACANCY_ERROR",
    SET_VACANCY_LOADING = "SET_VACANCY_LOADING",
    SET_VACANCY_PAGE = "SET_VACANCY_PAGE"
}

interface GetVacanciesAction {
    type: VacancyActionTypes.GET_VACANCIES;
    payload: ISearchResult<IVacancy>;
}

interface GetPublicVacanciesAction {
    type: VacancyActionTypes.GET_PUBLIC_VACANCIES;
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

export type VacancyAction = GetVacanciesAction | GetPublicVacanciesAction | SetErrorVacancyAction | SetLoadingVacancyAction | SetPageVacancyAction
