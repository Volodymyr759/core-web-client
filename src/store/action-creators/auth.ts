import { Dispatch } from "redux";
import { loginAxios, logoutAxios } from "../../api/auth";
import { AuthAction, AuthActionTypes, ILoginDto } from "../../types/auth";

export const login = (loginDto: ILoginDto) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.SET_IS_LOADING, payload: true });
            const authModel = await loginAxios(loginDto);
            localStorage.setItem("auth", JSON.stringify(authModel));
            dispatch({ type: AuthActionTypes.LOGIN, payload: authModel });
        } catch (error) {
            dispatch({ type: AuthActionTypes.SET_ERROR, payload: "Login failed." })
        } finally {
            dispatch({ type: AuthActionTypes.SET_IS_LOADING, payload: false });
        }
    }
}

export const logout = (email: string, token: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.SET_IS_LOADING, payload: true });
            await logoutAxios(email, token);
        } catch (error) {
            dispatch({ type: AuthActionTypes.SET_ERROR, payload: "Logout failed." })
        } finally {
            // remove auth from localStorage and store anyway
            localStorage.removeItem("auth");
            dispatch({ type: AuthActionTypes.LOGOUT, payload: null });
            dispatch({ type: AuthActionTypes.SET_IS_LOADING, payload: false });
        }
    }
}