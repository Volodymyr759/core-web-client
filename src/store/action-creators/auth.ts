import { Dispatch } from "redux";
import { logoutAxios } from "../../api/auth";
import { AuthAction, AuthActionTypes, IAuth, ILoginDto } from "../../types/auth";

export const login = (authModel: IAuth) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({ type: AuthActionTypes.LOGIN, payload: authModel });
    }
}

export const logout = (email: string, token: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.SET_AUTH_LOADING, payload: true });
            dispatch({ type: AuthActionTypes.SET_AUTH_ERROR, payload: null });
            await logoutAxios(email, token);
        } catch (error) {
            dispatch({ type: AuthActionTypes.SET_AUTH_ERROR, payload: error.message || 'Unknown error.' });
        } finally {
            // remove auth from localStorage and store anyway
            localStorage.removeItem("auth");
            dispatch({ type: AuthActionTypes.LOGOUT, payload: null });
            dispatch({ type: AuthActionTypes.SET_AUTH_LOADING, payload: false });
        }
    }
}
