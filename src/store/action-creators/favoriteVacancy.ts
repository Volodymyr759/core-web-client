import { Dispatch } from "redux";
import { removeCandidateAxios } from "../../api/candidate";
import { getFavoriteVacanciesAxios } from "../../api/vacancy";
import { OrderType } from "../../types/common/orderType";
import { FavoriteVacancyAction, FavoriteVacancyActionTypes } from "../../types/favoriteVacancy";

export const getFavoriteVacancies = (limit: number, page: number, email: string, order: OrderType) => {
    return async (dispatch: Dispatch<FavoriteVacancyAction>) => {
        try {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING, payload: true });
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_ERROR, payload: null });
            dispatch({
                type: FavoriteVacancyActionTypes.GET_FAVORITE_VACANCIES, payload:
                    await getFavoriteVacanciesAxios(limit, page, email, order)
            });
        } catch (error) {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_ERROR, payload: error.message || "Error of loading favorite vacancies." })
        } finally {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING, payload: false });
        }
    }
}

export const loadMoreFavoriteVacancies = (limit: number, page: number, email: string, order: OrderType) => {
    return async (dispatch: Dispatch<FavoriteVacancyAction>) => {
        try {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING, payload: true });
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_ERROR, payload: null });
            dispatch({
                type: FavoriteVacancyActionTypes.LOAD_MORE_FAVORITE_VACANCIES, payload:
                    await getFavoriteVacanciesAxios(limit, page, email, order)
            });
        } catch (error) {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_ERROR, payload: error.message || "Error of loading favorite vacancies." })
        } finally {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING, payload: false });
        }
    }
}

/**
 * Sets current page for favorite vacancies store
 * @param page<number> current page
 */
export const setFavoriteVacancyPage = (page: number) => {
    return async (dispatch: Dispatch<FavoriteVacancyAction>) => {
        dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_PAGE, payload: page });
    }
}

export const setFavoriteVacancyLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<FavoriteVacancyAction>) => {
        dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING, payload: isLoading });
    }
}

/**
 * Removes candidate for current vacancy
 * @param candidateId 
 * @returns void
 */
export const updateFavoriteVacancyStatus = (candidateId: number) => {
    return async (dispatch: Dispatch<FavoriteVacancyAction>) => {
        try {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING, payload: true });
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_ERROR, payload: null });
            await removeCandidateAxios(candidateId);
            dispatch({ type: FavoriteVacancyActionTypes.UPDATE_FAVORITE_VACANCY_STATUS, payload: candidateId });
        } catch (error) {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_ERROR, payload: error.message || "Error of updating favorite vacancy status." })
        } finally {
            dispatch({ type: FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING, payload: false });
        }
    }
}
