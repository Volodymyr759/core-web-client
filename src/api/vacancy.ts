import axios from 'axios';
import { IVacancy, VacancyTitleDto } from '../types/vacancy';
import { ISearchResult } from '../types/searchResult';
import { SortOrder } from '../types/sortOrder';

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
 * Get vacancy specified by identifier
 * @param id<string> identifier
 */
export async function getVacancyByIdAxios(id: number): Promise<IVacancy> {
    return (await axios.get(`/vacancy/getbyid/${id.toString()}`)).data;
}

/**
 * Get sorted list of all vacancies titles
 * @param searchValue<string> search paremeter
 */
export async function searchVacanciesTitlesAxios(searchValue: string): Promise<VacancyTitleDto[]> {
    return (await axios.get(`/vacancy/searchvacanciestitles?searchValue=${searchValue}`)).data;
}

/**
 */
export async function incrementPreviewsAxios(id: number, number: number): Promise<void> {
    // const pachDoc = JSON.stringify({ op: "replace", path: "/previews", value: number.toString() })
    await axios.patch(`/vacancy/partialvacancyupdate/${id}`, [{ op: "replace", path: "/previews", value: number }]);
}
