import { Dispatch } from "redux";
import { getPublicOfficeNameIdsAxios } from "../../api/office";
import { getVacanciesAxios, getVacancyByIdAxios, incrementPreviewsAxios, searchVacanciesTitlesAxios } from "../../api/vacancy";
import { SortOrder } from "../../types/sortOrder";
import { IVacancy, VacancyAction, VacancyActionTypes } from "../../types/vacancy";

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
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error of loading vacancies." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const getVacancyById = (id: number) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            dispatch({ type: VacancyActionTypes.GET_VACANCY_BY_ID, payload: await getVacancyByIdAxios(id) });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error of loading choosed vacancy." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const getOfficeNameIdDtos = () => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_FILTERS_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_FILTERS_ERROR, payload: null });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_OFFICES, payload: await getPublicOfficeNameIdsAxios()  });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_FILTERS_ERROR, payload: error.message || "Error of loading vacancies." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_FILTERS_LOADING, payload: false });
        }
    }
}

export const getVacanciesTitles = (search: string) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            dispatch({
                type: VacancyActionTypes.SET_VACANCIES_TITLES, payload:
                    await searchVacanciesTitlesAxios(search)
            });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error of loading vacancies titles." })
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
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error of loading vacancies." })
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

export const setVacancyLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: isLoading });
    }
}

export const setVacancyOfficeFilter = (officeId: string) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.SET_VACANCY_OFFICE_FILTER, payload: officeId });
    }
}

export const setVacancySearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.SET_VACANCY_SEARCH_CRITERIA, payload: search });
    }
}

export const setCurrentVacancy = (vacancy: IVacancy) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.SET_CURRENT_VACANCY, payload: vacancy });
    }
}

export const incrementPreviews = (id: number, number: number) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            await incrementPreviewsAxios(id, number);
            dispatch({ type: VacancyActionTypes.INCREMENT_PREVIEWS, payload: number });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error of loading vacancies titles." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const clearVacancies = () => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        dispatch({ type: VacancyActionTypes.CLEAR_VACANCIES, payload: [] });
    }
}
