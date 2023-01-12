import { Dispatch } from "redux";
import { loginAxios, logoutAxios } from "../../api/auth";
import { AuthAction, AuthActionTypes, ILoginDto } from "../../types/auth";

export const login = (loginDto: ILoginDto) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.SET_AUTH_LOADING, payload: true });
            dispatch({ type: AuthActionTypes.SET_AUTH_ERROR, payload: null });
            const authModel = await loginAxios(loginDto);
            localStorage.setItem("auth", JSON.stringify(authModel));
            dispatch({ type: AuthActionTypes.LOGIN, payload: authModel });
        } catch (error) {
            dispatch({ type: AuthActionTypes.SET_AUTH_ERROR, payload: error.message || 'Unknown error.' }); // error.message comes from axios middleware
        } finally {
            dispatch({ type: AuthActionTypes.SET_AUTH_LOADING, payload: false });
        }
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
