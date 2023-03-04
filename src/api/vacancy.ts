import axios from 'axios';
import { IVacancy, VacancyTitleDto } from '../types/vacancy';
import { ISearchResult } from '../types/common/searchResult';
import { OrderType } from '../types/common/orderType';

/**
 * Get list of vacancies for current office
 * @param limit<number> Page size
 * @param page<number> Current page
 * @param search<string> Autocompleted search
 * @param vacancyStatus<boolean> Means Active or Disabled vacancy
 * @param officeId<string> Choosed office
 * @param sortField<number> Field for sorting
 * @param order<OrderType> Sort direction (Ascending / Descending / None)
 */
export async function getVacanciesAxios(
    limit: number,
    page: number,
    search: string,
    vacancyStatus: boolean,
    officeId: string,
    sortField: string,
    order: OrderType): Promise<ISearchResult<IVacancy>> {
    return (
        await axios.get(`/vacancy/get?limit=${limit}&page=${page}&search=${search}&
            vacancyStatus=${vacancyStatus ? 0 : 1}&officeId=${officeId}&sortField=${sortField}&order=${order}`)).data;
}

/**
 * Get vacancy specified by identifier
 * @param id<string> Vacancy identifier
 */
export async function getVacancyByIdAxios(id: number): Promise<IVacancy> {
    return (await axios.get(`/vacancy/getbyid/${id.toString()}`)).data;
}

/**
 * Get sorted list of all vacancies titles
 * @param searchValue<string> Search paremeter
 * @param officeId<string> Identifier of the office which vacancy belongs. If it's '' in request query - means all offices.
 */
export async function searchVacanciesTitlesAxios(searchValue: string, officeId: string): Promise<VacancyTitleDto[]> {
    return (await axios.get(`/vacancy/searchvacanciestitles?searchValue=${searchValue}&officeId=${officeId}`)).data;
}

/**
 * @param id<string> Vacancy identifier
 * @param number<string> Previews amount
 */
export async function incrementPreviewsAxios(id: number, number: number): Promise<void> {
    await axios.patch(`/vacancy/partialvacancyupdate/${id}`, [{ op: "replace", path: "/previews", value: number }]);
}
