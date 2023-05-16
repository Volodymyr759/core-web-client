import { OfficeNameIdDto } from "./common/officeNameIdDto";
import { OrderType } from "./common/orderType";
import { ISearchResult } from "./common/searchResult";

export interface IEmployee {
    id: number;
    fullName: string;
    email: string;
    position: string;
    description: string;
    avatarUrl: string;
    officeId: number;
    officeDto?: {
        name: string;
    }
}

export interface EmployeeFilters {
    officeId: number;
}

export interface EmployeeState {
    employeeSearchResult: ISearchResult<IEmployee>;
    filters: EmployeeFilters;
    offices: OfficeNameIdDto[];
    sortField: string;
    loading: boolean;
    error: null | string;
}

export enum EmployeeActionTypes {
    GET_EMPLOYEES = "GET_EMPLOYEES",
    LOAD_MORE_EMPLOYEES = "LOAD_MORE_EMPLOYEES",
    SET_EMPLOYEE_ERROR = "SET_EMPLOYEE_ERROR",
    SET_EMPLOYEE_LOADING = "SET_EMPLOYEE_LOADING",
    SET_EMPLOYEE_PAGE = "SET_EMPLOYEE_PAGE",
    SET_EMPLOYEE_OFFICE_FILTER = "SET_EMPLOYEE_OFFICE_FILTER",
    SET_EMPLOYEE_OFFICES = "SET_EMPLOYEE_OFFICES",
    SET_EMPLOYEE_SORTFIELD = "SET_EMPLOYEE_SORTFIELD",
    SET_EMPLOYEE_SORT = "SET_EMPLOYEE_SORT",
    CREATE_EMPLOYEE = "CREATE_EMPLOYEE",
    UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE",
    REMOVE_EMPLOYEE = "REMOVE_EMPLOYEE"
}

interface GetEmployeesAction {
    type: EmployeeActionTypes.GET_EMPLOYEES;
    payload: ISearchResult<IEmployee>;
}

interface LoadMoreEmployeesAction {
    type: EmployeeActionTypes.LOAD_MORE_EMPLOYEES;
    payload: ISearchResult<IEmployee>;
}

interface SetErrorEmployeeAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_ERROR;
    payload: null | string;
}

interface SetLoadingEmployeeAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_LOADING;
    payload: boolean;
}

interface SetPageEmployeeAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_PAGE;
    payload: number;
}

interface SetEmployeeOfficeFilterAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_OFFICE_FILTER;
    payload: number;
}

interface SetEmployeeOfficesAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_OFFICES;
    payload: OfficeNameIdDto[];
}

interface SetSortFieldEmployeeAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_SORTFIELD;
    payload: string;
}

interface SetSortEmployeeAction {
    type: EmployeeActionTypes.SET_EMPLOYEE_SORT;
    payload: OrderType;
}

interface CreateCompanyService {
    type: EmployeeActionTypes.CREATE_EMPLOYEE;
    payload: IEmployee;
}

interface UpdateCompanyService {
    type: EmployeeActionTypes.UPDATE_EMPLOYEE;
    payload: IEmployee;
}

interface RemoveEmployee {
    type: EmployeeActionTypes.REMOVE_EMPLOYEE;
    payload: number;
}

export type EmployeeAction =
    GetEmployeesAction |
    LoadMoreEmployeesAction |
    SetErrorEmployeeAction |
    SetLoadingEmployeeAction |
    SetPageEmployeeAction |
    SetEmployeeOfficeFilterAction |
    SetEmployeeOfficesAction |
    SetSortFieldEmployeeAction |
    SetSortEmployeeAction |
    CreateCompanyService |
    UpdateCompanyService |
    RemoveEmployee
