import axios from 'axios';
import { IVacancy } from '../types/vacancy';
import { ISearchResult } from '../types/searchResult';
import { SortOrder } from '../types/sortOrder';
import { VacancyTitleDto } from '../pages/Vacancies/types';

/**
 * Get list of vacancies for current office
 * @param limit<number> page size
 * @param page<number> current page
 * @param search<string> autocompleted search
 * @param vacancyStatus<boolean> Means Active or Disabled vacancy
 * @param officeId<string> Choosed office
 * @param sortField<number> Field for sorting
 * @param order<SortOrder> Sort direction (ascending / descending)
 */
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

/**
 * Get sorted list of all vacancies titles
 * @param searchValue<string> search paremeter
 */
export async function searchVacanciesTitlesAxios(searchValue: string): Promise<VacancyTitleDto[]> {
    return (await axios.get(`/vacancy/searchvacanciestitles?searchValue=${searchValue}`)).data;
}
