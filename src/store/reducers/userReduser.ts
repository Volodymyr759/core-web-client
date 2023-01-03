import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch(action.type){
        case UserActionTypes.GET_All_USERS:
            return { ...state, users: action.payload};
        case UserActionTypes.SET_ERROR:
            return { ...state, error: action.payload};
        case UserActionTypes.SET_IS_LOADING:
            return { ...state, loading: action.payload};

        default: return state;
    }
}