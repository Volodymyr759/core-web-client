import { EmployeeAction, EmployeeActionTypes, EmployeeState } from "../../types/employee";

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null
}

export const employeeReducer = (state: EmployeeState = initialState, action: EmployeeAction): EmployeeState => {
    switch(action.type){
        case EmployeeActionTypes.GET_All_EMPLOYEES:
            return { ...state, employees: action.payload};
        case EmployeeActionTypes.SET_ERROR:
            return { ...state, error: action.payload};
        case EmployeeActionTypes.SET_IS_LOADING:
            return { ...state, loading: action.payload};

        default: return state;
    }
}