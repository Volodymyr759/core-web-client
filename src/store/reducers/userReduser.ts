import { OrderType } from "../../types/common/orderType";
import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
    userSearchResult: {
        itemList: [],
        currentPageNumber: 1,
        order: OrderType.Ascending,
        pageCount: 0,
        pageSize: 5,
        searchCriteria: "",
        totalItemCount: 0
    },
    filters: {
        searchInUserName: ""
    },
    loading: false,
    error: null
}

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.GET_USERS:
            return { ...state, userSearchResult: action.payload };
        case UserActionTypes.SET_USER_SEARCH_CRITERIA:
            return { ...state, filters: { ...state.filters, searchInUserName: action.payload } };
        case UserActionTypes.SET_USER_PAGE:
            return { ...state, userSearchResult: { ...state.userSearchResult, currentPageNumber: action.payload } };
        case UserActionTypes.SET_USER_ERROR:
            return { ...state, error: action.payload };
        case UserActionTypes.SET_USER_LOADING:
            return { ...state, loading: action.payload };

        default: return state;
    }
}