import { Dispatch } from "redux";
import { getPublicEmployeesAxios } from "../../api/employee";
import { EmployeeAction, EmployeeActionTypes } from "../../types/employee";


export const getEmployees = (page: number) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: null });
            dispatch({ type: EmployeeActionTypes.GET_EMPLOYEES, payload: await getPublicEmployeesAxios(page) });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: "Error of loading employees." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: false });
        }
    }
}

export const loadMoreEmployees = (page: number) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: null });
            dispatch({ type: EmployeeActionTypes.LOAD_MORE_EMPLOYEES, payload: await getPublicEmployeesAxios(page) });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: "Error of loading employees." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: false });
        }
    }
}

export const setEmployeePage = (page: number) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_PAGE, payload: page });
    }
}