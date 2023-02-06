import axios from 'axios';
import { IVacancy } from '../types/vacancy';
import { ISearchResult } from '../types/searchResult';

export async function getPublicVacanciesAxios(page: number): Promise<ISearchResult<IVacancy>> {
    return (await axios.get(`/vacancy/getpublic?page=${page}`)).data;
}