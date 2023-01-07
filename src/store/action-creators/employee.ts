import { Dispatch } from "redux";
import { GetEmployeesAxios } from "../../api/employee";
import { EmployeeAction, EmployeeActionTypes } from "../../types/employee";

export const getAllEmployees = () => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_IS_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.GET_All_EMPLOYEES, payload: await GetEmployeesAxios() });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_ERROR, payload: "Error of loading employees." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_IS_LOADING, payload: false });
        }
    }
}