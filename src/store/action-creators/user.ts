import { Dispatch } from "redux";
import { getUsersAxios, updateUserEmailConfirmedStatusAxios } from "../../api/user";
import { IUser, UserAction, UserActionTypes, UserFilters } from "../../types/user"
import { OrderType } from "../../types/common/orderType";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getUsers = (limit: number, page: number, filters: UserFilters, sortField: string, order: OrderType) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: true });
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: null });
            await delay(1000);
            dispatch({ type: UserActionTypes.GET_USERS, payload: await getUsersAxios(limit, page, filters.searchInUserName, sortField, order) });
        } catch (error) {
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: error.message || "Error of loading users." })
        } finally {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: false });
        }
    }
}

export const updateUserEmailConfirmedStatus = (id: string, userToUpdate: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: true });
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: null });
            await updateUserEmailConfirmedStatusAxios(id, userToUpdate.emailConfirmed);
            dispatch({ type: UserActionTypes.UPDATE_USER_EMAILCONFIRMED_STATUS, payload: userToUpdate });
        } catch (error) {
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: error.message || "Error of updating user EmailConfirmed status." })
        } finally {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: false });
        }
    }
}

export const setUserSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.SET_USER_SEARCH_CRITERIA, payload: search });
    }
}

export const setUserPage = (page: number) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.SET_USER_PAGE, payload: page });
    }
}

export const setUserError = (message: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: message });
    }
}

export const setUserSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.SET_USER_SORTFIELD, payload: sortField });
    }
}

export const setUserSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.SET_USER_SORT, payload: sort });
    }
}
