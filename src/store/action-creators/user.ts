import axios from "axios";
import { Dispatch } from "redux";
import { UserAction, UserActionTypes } from "../../types/user"


export const getAllUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.SET_IS_LOADING, payload: true });
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch({ type: UserActionTypes.GET_All_USERS, payload: await response.data });
        } catch (error) {
            dispatch({ type: UserActionTypes.SET_ERROR, payload: "Error of loading users." })
        } finally {
            dispatch({ type: UserActionTypes.SET_IS_LOADING, payload: false });
        }
    }
}