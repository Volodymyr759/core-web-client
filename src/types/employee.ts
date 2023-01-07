export interface IEmployee {
    id: number;
    fullname: string;
    email: string;
    position: string;
    description: string;
    avatarurl: string;
}

export interface EmployeeState {
    employees: IEmployee[];
    loading: boolean;
    error: null | string;
}

export enum EmployeeActionTypes {
    GET_All_EMPLOYEES = "GET_All_EMPLOYEES",
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING"
}

interface GetAllEmployeesAction {
    type: EmployeeActionTypes.GET_All_EMPLOYEES;
    payload: IEmployee[];
}

interface SetErrorAction {
    type: EmployeeActionTypes.SET_ERROR;
    payload: string;
}

interface SetLoadingAction {
    type: EmployeeActionTypes.SET_IS_LOADING;
    payload: boolean;
}

export type EmployeeAction = GetAllEmployeesAction | SetErrorAction | SetLoadingAction
