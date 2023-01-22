import axios from 'axios';
import { IEmployee } from '../types/employee';
import { ISearchResult } from '../types/searchResult';

export async function GetPublicEmployeesAxios(page: number): Promise<ISearchResult<IEmployee>> {
    return (await axios.get(`/employee/getpublic?page=${page}`)).data;
}