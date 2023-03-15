import { IUser } from "./user";

export interface ILoginDto {
    email: string;
    password: string;
    remember: boolean;
  }

export interface IRegisterDto{
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IAuth{
    user: IUser;
    roles: string[];
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}

export enum Roles {
    ADMIN = "Admin",
    REGISTERED = "Registered"
}

export interface AuthState {
    auth: null | IAuth;
    loading: boolean;
    error: null | string;
}

export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    SET_AUTH_ERROR = "SET_AUTH_ERROR",
    SET_AUTH_LOADING = "SET_AUTH_LOADING"
}

interface Login {
    type: AuthActionTypes.LOGIN;
    payload: IAuth;
}

interface Logout {
    type: AuthActionTypes.LOGOUT;
    payload: null;
}

interface SetErrorAction {
    type: AuthActionTypes.SET_AUTH_ERROR;
    payload: null | string;
}

interface SetLoadingAction {
    type: AuthActionTypes.SET_AUTH_LOADING;
    payload: boolean;
}

export type AuthAction = Login | Logout | SetErrorAction | SetLoadingAction