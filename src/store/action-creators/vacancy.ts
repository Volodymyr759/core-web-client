import { Dispatch } from "redux";
import { getOfficeNameIdsAxios } from "../../api/office";
import { createVacancyAxios, getVacanciesAxios, incrementPreviewsAxios, searchVacanciesTitlesAxios, updateVacancyAxios, updateVacancyIsActiveStatusAxios } from "../../api/vacancy";
import { OrderType } from "../../types/common/orderType";
import { IVacancy, VacancyAction, VacancyActionTypes, VacancyStatus } from "../../types/vacancy";

export const getVacancies = (limit: number, page: number, search: string, vacancyStatus: VacancyStatus, officeId: string, sortField: string, order: OrderType) => {
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

export const getOfficeNameIdDtos = () => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_FILTERS_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_FILTERS_ERROR, payload: null });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_OFFICES, payload: await getOfficeNameIdsAxios() });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_FILTERS_ERROR, payload: error.message || "Error of loading vacancies." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_FILTERS_LOADING, payload: false });
        }
    }
}

export const getVacanciesTitles = (search: string, officeId: string) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            dispatch({ type: VacancyActionTypes.SET_VACANCIES_TITLES, payload: await searchVacanciesTitlesAxios(search, officeId) });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error of loading vacancies titles." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const loadMoreVacancies = (limit: number, page: number, search: string, vacancyStatus: VacancyStatus, officeId: string, sortField: string, order: OrderType) => {
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

export const setVacancyActiveFilter = (active: VacancyStatus) => {
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

export const incrementPreviews = (id: number, number: number) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            await incrementPreviewsAxios(id, number);
            dispatch({ type: VacancyActionTypes.INCREMENT_PREVIEWS, payload: number });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error of incrementing previews for the vacancy." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const updateVacancyIsActiveStatus = (id: number, vacancyToUpdate: IVacancy) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            await updateVacancyIsActiveStatusAxios(id, vacancyToUpdate.isActive);
            dispatch({ type: VacancyActionTypes.UPDATE_VACANCY_ISACTIVE_STATUS, payload: vacancyToUpdate });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error of updating vacancy isActive status." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const createVacancy = (vacancy: IVacancy) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            dispatch({ type: VacancyActionTypes.CREATE_VACANCY, payload: await createVacancyAxios(vacancy) });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error while creating the vacancy." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}

export const updateVacancy = (vacancy: IVacancy) => {
    return async (dispatch: Dispatch<VacancyAction>) => {
        try {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: true });
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: null });
            dispatch({ type: VacancyActionTypes.UPDATE_VACANCY, payload: await updateVacancyAxios(vacancy) });
        } catch (error) {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_ERROR, payload: error.message || "Error while updating the vacancy." })
        } finally {
            dispatch({ type: VacancyActionTypes.SET_VACANCY_LOADING, payload: false });
        }
    }
}
