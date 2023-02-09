import { Dispatch } from "redux";
import { getVacanciesAxios } from "../../api/vacancy";
import { SortOrder } from "../../types/sortOrder";
import { VacancyAction, VacancyActionTypes } from "../../types/vacancy";

export const getVacancies = (limit: number, page: number, search: string, vacancyStatus: boolean, officeId: string, sortField: string, order: SortOrder) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            dispatch({
                type: VacancyActionTypes.GET_VACANCIES, payload:
                    await getVacanciesAxios(limit, page, search, vacancyStatus, officeId, sortField, order)
            });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: "Error of loading vacancies." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const loadMoreVacancies = (limit: number, page: number, search: string, vacancyStatus: boolean, officeId: string, sortField: string, order: SortOrder) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            dispatch({
                type: VacancyActionTypes.LOAD_MORE_VACANCIES, payload:
                    await getVacanciesAxios(limit, page, search, vacancyStatus, officeId, sortField, order)
            });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: "Error of loading vacancies." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

/**
 * Sets current page for vacancies store
 * @param page<number> current page
 */
export const setVacancyPage = (page: number) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.SET_VACANCY_PAGE, payload: page });
    }
}

export const setVacancyActiveFilter = (active: boolean) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.SET_VACANCY_ACTIVE_FILTER, payload: active });
    }
}

export const setVacancyOfficeFilter = (officeId: string) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.SET_VACANCY_OFFICE_FILTER, payload: officeId });
    }
}

export const clearVacancies = () => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.CLEAR_VACANCIES, payload: [] });
    }
}
