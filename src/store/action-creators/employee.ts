import { Dispatch } from "redux";
import { GetPublicEmployeesAxios } from "../../api/employee";
import { EmployeeAction, EmployeeActionTypes } from "../../types/employee";

export const getPublicEmployees = (page: number) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: null });
            dispatch({ type: EmployeeActionTypes.GET_PUBLIC_EMPLOYEES, payload: await GetPublicEmployeesAxios(page) });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: "Error of loading employees." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: false });
        }
    }
}