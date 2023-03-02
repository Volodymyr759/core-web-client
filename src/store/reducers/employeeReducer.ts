import { EmployeeAction, EmployeeActionTypes, EmployeeState, IEmployee } from "../../types/employee";
import { OrderType } from "../../types/common/orderType";

const initialState: EmployeeState = {
    employeeSearchResult: {
        itemList: [] as IEmployee[],
        currentPageNumber: 1,
        order: OrderType.Ascending,
        pageCount: 0,
        pageSize: 3,
        searchCriteria: "",
        totalItemCount: 0
    },
    loading: false,
    error: null
}

export const employeeReducer = (state: EmployeeState = initialState, action: EmployeeAction): EmployeeState => {
    switch (action.type) {
        case EmployeeActionTypes.GET_EMPLOYEES:
            return { ...state, employeeSearchResult: action.payload };
        case EmployeeActionTypes.LOAD_MORE_EMPLOYEES:
            return {
                ...state,
                employeeSearchResult: {
                    ...action.payload,
                    itemList: state.employeeSearchResult.itemList.concat(action.payload.itemList)
                },
            };
        case EmployeeActionTypes.SET_EMPLOYEE_ERROR:
            return { ...state, error: action.payload };
        case EmployeeActionTypes.SET_EMPLOYEE_LOADING:
            return { ...state, loading: action.payload };
        case EmployeeActionTypes.SET_EMPLOYEE_PAGE:
            return {
                ...state,
                employeeSearchResult: { ...state.employeeSearchResult, currentPageNumber: action.payload }
            };

        default: return state;
    }
}