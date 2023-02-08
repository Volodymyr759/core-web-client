import { Dispatch } from "redux";
import { getPublicVacanciesAxios } from "../../api/vacancy";
import { VacancyAction, VacancyActionTypes } from "../../types/vacancy";

export const getPublicVacancies = (page: number) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            dispatch({ type: VacancyActionTypes.GET_PUBLIC_VACANCIES, payload: await getPublicVacanciesAxios(page) });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: "Error of loading vacancies." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const setVacancyPage = (page: number) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.SET_VACANCY_PAGE, payload: page });
    }
}