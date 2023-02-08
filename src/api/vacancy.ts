import axios from 'axios';
import { IVacancy } from '../types/vacancy';
import { ISearchResult } from '../types/searchResult';
import { SortOrder } from '../types/sortOrder';

export async function getPublicVacanciesAxios(page: number): Promise<ISearchResult<IVacancy>> {
    return (await axios.get(`/vacancy/getpublic?page=${page}`)).data;
}
// limit: number, page: number, search: string, vacancyStatus: boolean, officeId: string, sortField: string, order: SortOrder.Ascending
export async function getVacanciesAxios(
    limit: number,
    page: number,
    search: string,
    vacancyStatus: boolean,
    officeId: string,
    sortField: string,
    order: SortOrder): Promise<ISearchResult<IVacancy>> {
    return (
        await axios.get(`/vacancy/get?limit=${limit}&page=${page}&search=${search}&
            vacancyStatus=${vacancyStatus ? 0 : 1}&officeId=${officeId}&sortField=${sortField}&order=${order}`)).data;
}