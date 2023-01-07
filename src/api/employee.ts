import axios from 'axios';
import { IEmployee } from '../types/employee';

export async function GetEmployeesAxios(): Promise<IEmployee[]> {
    return (await axios.get("/employee/getall")).data;
}