export interface IEmployee {
    id: number;
    fullName: string;
    email: string;
    position: string;
    description: string;
    avatarUrl: string;
}

export interface EmployeeState {
    employees: IEmployee[];
    loading: boolean;
    error: null | string;
}

export enum EmployeeActionTypes {
    GET_All_EMPLOYEES = "GET_All_EMPLOYEES",
    GET_PUBLIC_EMPLOYEES = "GET_PUBLIC_EMPLOYEES",
    SET_EMPLOYEE_ERROR = "SET_EMPLOYEE_ERROR",
    SET_EMPLOYEE_LOADING = "SET_EMPLOYEE_LOADING"
}

interface GetAllEmployeesAction {
    type: EmployeeActionTypes.GET_All_EMPLOYEES;
    payload: IEmployee[];
}


interface GetPublicEmployeesAction {
    type: EmployeeActionTypes.GET_PUBLIC_EMPLOYEES;
    payload: IEmployee[];
}

interface SetErrorAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_ERROR;
    payload: null | string;
}

interface SetLoadingAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_LOADING;
    payload: boolean;
}

export type EmployeeAction = GetAllEmployeesAction | GetPublicEmployeesAction | SetErrorAction | SetLoadingAction
