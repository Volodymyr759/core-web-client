import { ISearchResult } from "./searchResult";

export interface IEmployee {
    id: number;
    fullName: string;
    email: string;
    position: string;
    description: string;
    avatarUrl: string;
}

export interface EmployeeState {
    employeeSearchResult: ISearchResult<IEmployee>;
    loading: boolean;
    error: null | string;
}

export enum EmployeeActionTypes {
    GET_EMPLOYEES = "GET_EMPLOYEES",
    GET_PUBLIC_EMPLOYEES = "GET_PUBLIC_EMPLOYEES",
    SET_EMPLOYEE_ERROR = "SET_EMPLOYEE_ERROR",
    SET_EMPLOYEE_LOADING = "SET_EMPLOYEE_LOADING"
}

interface GetEmployeesAction {
    type: EmployeeActionTypes.GET_EMPLOYEES;
    payload: ISearchResult<IEmployee>;
}

interface GetPublicEmployeesAction {
    type: EmployeeActionTypes.GET_PUBLIC_EMPLOYEES;
    payload: ISearchResult<IEmployee>;
}

interface SetErrorAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_ERROR;
    payload: null | string;
}

interface SetLoadingAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_LOADING;
    payload: boolean;
}

export type EmployeeAction = GetEmployeesAction | GetPublicEmployeesAction | SetErrorAction | SetLoadingAction
