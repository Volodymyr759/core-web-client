import { OrderType } from "../../types/common/orderType";
import { IUser, UserAction, UserActionTypes, UserState } from "../../types/user";

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
    sortField: "UserName",
    loading: false,
    error: null
}

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.GET_USERS:
            return { ...state, userSearchResult: action.payload };
        case UserActionTypes.UPDATE_USER_EMAILCONFIRMED_STATUS:
            return { ...state, userSearchResult: { ...state.userSearchResult, itemList: updateUser(state, action.payload) } }
        case UserActionTypes.SET_USER_SEARCH_CRITERIA:
            return { ...state, filters: { ...state.filters, searchInUserName: action.payload } };
        case UserActionTypes.SET_USER_PAGE:
            return { ...state, userSearchResult: { ...state.userSearchResult, currentPageNumber: action.payload } };
        case UserActionTypes.SET_USER_ERROR:
            return { ...state, error: action.payload };
        case UserActionTypes.SET_USER_LOADING:
            return { ...state, loading: action.payload };
        case UserActionTypes.SET_USER_SORTFIELD:
            return { ...state, sortField: action.payload };
        case UserActionTypes.SET_USER_SORT:
            return { ...state, userSearchResult: { ...state.userSearchResult, order: action.payload } };
        default: return state;
    }
}

function updateUser(state: UserState, userToUpdate: IUser): Array<IUser> {
    return state.userSearchResult.itemList.map((user: IUser) => {
        if (user.id === userToUpdate.id) return userToUpdate;
        return user;
    })
}