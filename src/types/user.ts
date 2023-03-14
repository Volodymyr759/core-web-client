import { ISearchResult } from "./common/searchResult";

export interface IUser {
    id: string;
    userName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber?: string;
    avatarUrl?: string;
}

export interface UserFilters {
    searchInUserName: string;
}

export interface UserState {
    userSearchResult: ISearchResult<IUser>;
    filters: UserFilters;
    loading: boolean;
    error: null | string;
}

export enum UserActionTypes {
    GET_USERS = "GET_All_USERS",
    SET_USER_SEARCH_CRITERIA = "SET_USER_SEARCH_CRITERIA",
    SET_USER_PAGE = "SET_USER_PAGE",
    SET_USER_ERROR = "SET_USER_ERROR",
    SET_USER_LOADING = "SET_USER_LOADING"
}

interface GetUsersAction {
    type: UserActionTypes.GET_USERS;
    payload: ISearchResult<IUser>;
}

interface SetUserSearchCriteriaAction {
    type: UserActionTypes.SET_USER_SEARCH_CRITERIA;
    payload: string;
}

interface SetUserPagesAction {
    type: UserActionTypes.SET_USER_PAGE;
    payload: number;
}

interface SetUserErrorAction {
    type: UserActionTypes.SET_USER_ERROR;
    payload: null | string;
}

interface SetUserLoadingAction {
    type: UserActionTypes.SET_USER_LOADING;
    payload: boolean;
}

export type UserAction = GetUsersAction |
    SetUserSearchCriteriaAction |
    SetUserPagesAction |
    SetUserErrorAction |
    SetUserLoadingAction
