import { ISearchResult } from "./common/searchResult";
import { IVacancy } from "./vacancy";

export interface FavoriteVacancyState {
    favoriteVacancySearchResult: ISearchResult<IVacancy>;
    loading: boolean;
    error: null | string;
}

export enum FavoriteVacancyActionTypes {
    GET_FAVORITE_VACANCIES = "GET_FAVORITE_VACANCIES",
    LOAD_MORE_FAVORITE_VACANCIES = "LOAD_MORE_FAVORITE_VACANCIES",
    SET_FAVORITE_VACANCY_ERROR = "SET_FAVORITE_VACANCY_ERROR",
    SET_FAVORITE_VACANCY_LOADING = "SET_FAVORITE_VACANCY_LOADING",
    SET_FAVORITE_VACANCY_PAGE = "SET_FAVORITE_VACANCY_PAGE",
    INCREMENT_PREVIEWS_FAVORITE_VACANCIES = "INCREMENT_PREVIEWS_FAVORITE_VACANCIES",
    UPDATE_FAVORITE_VACANCY_STATUS = "UPDATE_FAVORITE_VACANCY_STATUS"
}

interface GetFavoriteVacanciesAction {
    type: FavoriteVacancyActionTypes.GET_FAVORITE_VACANCIES;
    payload: ISearchResult<IVacancy>;
}

interface LoadMoreFavoriteVacanciesAction {
    type: FavoriteVacancyActionTypes.LOAD_MORE_FAVORITE_VACANCIES;
    payload: ISearchResult<IVacancy>;
}

interface SetErrorFavoriteVacancyAction {
    type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_ERROR;
    payload: null | string;
}

interface SetLoadingFavoriteVacancyAction {
    type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING;
    payload: boolean;
}

interface SetPageFavoriteVacancyAction {
    type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_PAGE;
    payload: number;
}

interface UpdateFavoriteVacancyStatus {
    type: FavoriteVacancyActionTypes.UPDATE_FAVORITE_VACANCY_STATUS;
    payload: number;
}

export type FavoriteVacancyAction = GetFavoriteVacanciesAction |
    LoadMoreFavoriteVacanciesAction |
    SetErrorFavoriteVacancyAction |
    SetLoadingFavoriteVacancyAction |
    SetPageFavoriteVacancyAction |
    UpdateFavoriteVacancyStatus