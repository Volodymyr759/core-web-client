import { Dispatch } from "redux";
import { getOfficesAxios, getOfficeByIdAxios, createOfficeAxios, updateOfficeAxios, removeOfficeAxios } from "../../api/office";
import { OrderType } from "../../types/common/orderType";
import { IOffice, OfficeAction, OfficeActionTypes } from "../../types/office";

export const getOffices = (limit: number, page: number, sortField: string, order: OrderType) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        try {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: true });
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: null });
            dispatch({
                type: OfficeActionTypes.GET_OFFICES, payload:
                    await getOfficesAxios(limit, page, sortField, order)
            });
        } catch (error) {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: error.message || "Error of loading offices." })
        } finally {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: false });
        }
    }
}

export const getOfficeById = (id: number) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        try {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: true });
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: null });
            dispatch({ type: OfficeActionTypes.GET_OFFICE_BY_ID, payload: await getOfficeByIdAxios(id) });
        } catch (error) {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: error.message || "Error of loading choosed office." })
        } finally {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: false });
        }
    }
}

export const setOfficeError = (message: string) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: message });
    }
}

export const setOfficeLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: isLoading });
    }
}

export const setOfficePage = (page: number) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        dispatch({ type: OfficeActionTypes.SET_OFFICE_PAGE, payload: page });
    }
}

export const setOfficeSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        dispatch({ type: OfficeActionTypes.SET_OFFICE_SORTFIELD, payload: sortField });
    }
}

export const setOfficeSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        dispatch({ type: OfficeActionTypes.SET_OFFICE_SORT, payload: sort });
    }
}

export const createOffice = (office: IOffice) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        try {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: true });
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: null });
            dispatch({ type: OfficeActionTypes.CREATE_OFFICE, payload: await createOfficeAxios(office) });
        } catch (error) {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: error.message || "Error while creating the office." })
        } finally {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: false });
        }
    }
}

export const updateOffice = (office: IOffice) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        try {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: true });
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: null });
            dispatch({ type: OfficeActionTypes.UPDATE_OFFICE, payload: await updateOfficeAxios(office) });
        } catch (error) {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: error.message || "Error while updating the office." })
        } finally {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: false });
        }
    }
}

export const removeOffice = (id: number) => {
    return async (dispatch: Dispatch<OfficeAction>) => {
        try {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: true });
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: null });
            await removeOfficeAxios(id);
            dispatch({ type: OfficeActionTypes.REMOVE_OFFICE, payload: id });
        } catch (error) {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_ERROR, payload: error.message || "Error while removing the office." })
        } finally {
            dispatch({ type: OfficeActionTypes.SET_OFFICE_LOADING, payload: false });
        }
    }
}