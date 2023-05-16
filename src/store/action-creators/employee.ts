import { Dispatch } from "redux";
import { createEmployeeAxios, getEmployeesAxios, removeEmployeeAxios, updateEmployeeAxios } from "../../api/employee";
import { EmployeeAction, EmployeeActionTypes, IEmployee } from "../../types/employee";
import { OrderType } from "../../types/common/orderType";
import { getOfficeNameIdsAxios } from "../../api/office";

export const getEmployees = (limit: number, page: number, search: string, officeId: number, sortField: string, order: OrderType) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: null });
            dispatch({ type: EmployeeActionTypes.GET_EMPLOYEES, payload: await getEmployeesAxios(limit, page, search, officeId, sortField, order) });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: error.message || "Error of loading employees." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: false });
        }
    }
}

export const getEmployeesOfficeNameIdDtos = () => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: null });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_OFFICES, payload: await getOfficeNameIdsAxios() });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: error.message || "Error of loading offices names." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: false });
        }
    }
}

export const loadMoreEmployees = (limit: number, page: number, search: string, officeId: number, sortField: string, order: OrderType) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: null });
            dispatch({ type: EmployeeActionTypes.LOAD_MORE_EMPLOYEES, payload: await getEmployeesAxios(limit, page, search, officeId, sortField, order) });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: error.message || "Error of loading employees." })
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

export const setEmployeeOfficeFilter = (officeId: number) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_OFFICE_FILTER, payload: officeId });
    }
}

export const setEmployeeSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_SORTFIELD, payload: sortField });
    }
}

export const setEmployeeSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_SORT, payload: sort });
    }
}

export const createEmployee = (employee: IEmployee) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: null });
            dispatch({ type: EmployeeActionTypes.CREATE_EMPLOYEE, payload: await createEmployeeAxios(employee) });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: error.message || "Error while creating the Employee." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: false });
        }
    }
}

export const updateEmployee = (employee: IEmployee) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: null });
            dispatch({ type: EmployeeActionTypes.UPDATE_EMPLOYEE, payload: await updateEmployeeAxios(employee) });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: error.message || "Error while updating the Employee." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: false });
        }
    }
}
export const removeEmployee = (id: number) => {
    return async (dispatch: Dispatch<EmployeeAction>) => {
        try {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: true });
            await removeEmployeeAxios(id);
            dispatch({ type: EmployeeActionTypes.REMOVE_EMPLOYEE, payload: id });
        } catch (error) {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_ERROR, payload: error.message || "Error while removing the service." })
        } finally {
            dispatch({ type: EmployeeActionTypes.SET_EMPLOYEE_LOADING, payload: false });
        }
    }
}