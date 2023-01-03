interface GetAllUsersAction {
    type: UserActionTypes.GET_All_USERS;
    payload: IUser[];
}

interface SetErrorAction {
    type: UserActionTypes.SET_ERROR;
    payload: string;
}

interface SetLoadingAction {
    type: UserActionTypes.SET_IS_LOADING;
    payload: boolean;
}

export type UserAction = GetAllUsersAction | SetErrorAction | SetLoadingAction

export enum UserActionTypes {
    GET_All_USERS = "GET_All_USERS",
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING",
}

export interface UserState {
    users: IUser[];
    loading: boolean;
    error: null | string;
}

interface IUser{
    id: number;
    name: string;
    username: string;
    email: string;
}