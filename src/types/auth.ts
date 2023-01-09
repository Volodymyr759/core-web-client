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
    email: string;
    roles: string[];
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}

export interface AuthState {
    auth: null | IAuth;
    loading: boolean;
    error: null | string;
}

export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING"
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
    type: AuthActionTypes.SET_ERROR;
    payload: string;
}

interface SetLoadingAction {
    type: AuthActionTypes.SET_IS_LOADING;
    payload: boolean;
}

export type AuthAction = Login | Logout | SetErrorAction | SetLoadingAction