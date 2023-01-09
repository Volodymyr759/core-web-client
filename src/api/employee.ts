import axios from 'axios';
import { IEmployee } from '../types/employee';

export async function GetEmployeesAxios(): Promise<IEmployee[]> {
    const search = '';
    return (await axios.get(`/employee/getall?limit=10&page=1&search=${search}&sort_field=Id&sort=desc`)).data;
}