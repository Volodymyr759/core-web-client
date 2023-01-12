import { AuthAction, AuthActionTypes, AuthState } from "../../types/auth";

const initialState: AuthState = {
    auth: JSON.parse(localStorage.getItem("auth")),
    loading: false,
    error: null,
}

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return { ...state, auth: action.payload };
        case AuthActionTypes.LOGOUT:
            return { ...state, auth: null };
        case AuthActionTypes.SET_AUTH_ERROR:
            return { ...state, error: action.payload };
        case AuthActionTypes.SET_AUTH_LOADING:
            return { ...state, loading: action.payload };
        default: return state;
    }
}