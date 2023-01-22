import { EmployeeAction, EmployeeActionTypes, EmployeeState } from "../../types/employee";

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null
}

export const employeeReducer = (state: EmployeeState = initialState, action: EmployeeAction): EmployeeState => {
    switch (action.type) {
        case EmployeeActionTypes.GET_All_EMPLOYEES:
            return { ...state, employees: action.payload };
        case EmployeeActionTypes.GET_PUBLIC_EMPLOYEES:
            return { ...state, employees: state.employees.concat(action.payload)  };
        case EmployeeActionTypes.SET_EMPLOYEE_ERROR:
            return { ...state, error: action.payload };
        case EmployeeActionTypes.SET_EMPLOYEE_LOADING:
            return { ...state, loading: action.payload };

        default: return state;
    }
}