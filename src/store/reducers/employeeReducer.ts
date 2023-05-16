import { EmployeeAction, EmployeeActionTypes, EmployeeState, IEmployee } from "../../types/employee";
import { OrderType } from "../../types/common/orderType";

const initialState: EmployeeState = {
    employeeSearchResult: {
        itemList: [] as IEmployee[],
        currentPageNumber: 1,
        order: OrderType.Ascending,
        pageCount: 0,
        pageSize: 5,
        searchCriteria: "",
        totalItemCount: 0
    },
    offices: [],
    filters: {
        officeId: 0
    },
    sortField: "FullName",
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
        case EmployeeActionTypes.SET_EMPLOYEE_OFFICE_FILTER:
            return {
                ...state,
                filters: { ...state.filters, officeId: action.payload }
            };
        case EmployeeActionTypes.SET_EMPLOYEE_OFFICES:
            let employeeOffices = action.payload;
            employeeOffices.unshift({ id: 0, name: "All" });
            return { ...state, offices: employeeOffices };
        case EmployeeActionTypes.SET_EMPLOYEE_SORTFIELD:
            return { ...state, sortField: action.payload };
        case EmployeeActionTypes.SET_EMPLOYEE_SORT:
            return { ...state, employeeSearchResult: { ...state.employeeSearchResult, order: action.payload } };
        case EmployeeActionTypes.CREATE_EMPLOYEE:
            return {
                ...state, employeeSearchResult: {
                    ...state.employeeSearchResult, itemList: [action.payload, ...state.employeeSearchResult.itemList]
                }
            };
        case EmployeeActionTypes.UPDATE_EMPLOYEE:
            return { ...state, employeeSearchResult: { ...state.employeeSearchResult, itemList: updateEmployee(state, action.payload) } };
        case EmployeeActionTypes.REMOVE_EMPLOYEE:
            return { ...state, employeeSearchResult: { ...state.employeeSearchResult, itemList: deleteEmployee(state, action) } };

        default: return state;
    }
}

function updateEmployee(state: EmployeeState, employeeToUpdate: IEmployee): Array<IEmployee> {
    return state.employeeSearchResult.itemList.map((employee: IEmployee) => {
        if (employee.id === employeeToUpdate.id) return employeeToUpdate;
        return employee;
    })
}

function deleteEmployee(state: EmployeeState, action: EmployeeAction): Array<IEmployee> {
    return state.employeeSearchResult.itemList.filter(employee => employee.id !== action.payload)
}