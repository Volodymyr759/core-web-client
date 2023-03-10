import axios from 'axios';
import { IVacancy, VacancyStatus, VacancyTitleDto } from '../types/vacancy';
import { ISearchResult } from '../types/common/searchResult';
import { OrderType } from '../types/common/orderType';

/**
 * Get list of vacancies for current office
 * @param limit<number> Page size
 * @param page<number> Current page
 * @param search<string> Autocompleted search
 * @param vacancyStatus<VacancyStatus> Means Active / Disabled / All vacancy 'isActive' status
 * @param officeId<string> Choosed office
 * @param sortField<string> Field for sorting
 * @param order<OrderType> Sort direction (Ascending / Descending / None)
 */
export async function getVacanciesAxios(
    limit: number,
    page: number,
    search: string,
    vacancyStatus: VacancyStatus,
    officeId: string,
    sortField: string,
    order: OrderType): Promise<ISearchResult<IVacancy>> {
    return (
        await axios.get(`/vacancy/get?limit=${limit}&page=${page}&search=${search}&vacancyStatus=${vacancyStatus.toString()}&officeId=${officeId}&sortField=${sortField}&order=${order}`)).data;
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

/**
 * @param id<string> Vacancy identifier
 * @param isActive<boolean> Vacancy status
 */
export async function updateVacancyIsActiveStatusAxios(id: number, isActive: boolean): Promise<void> {
    await axios.patch(`/vacancy/partialvacancyupdate/${id}`, [{ op: "replace", path: "/isactive", value: isActive }]);
}

/**
 * Creates a new vacancy
 * @param vacancy<IVacancy> object of type IVacancy
 * @returns<IVacancy> Created vacancy
 */
export async function createVacancyAxios(vacancy: IVacancy): Promise<IVacancy> {
    return (await axios.post("/vacancy/create", vacancy)).data;
}

/**
 * Updates the existing vacancy
 * @param vacancy<IVacancy> Object of type IVacancy
 * @returns<IVacancy> Updated vacancy object
 */
export async function updateVacancyAxios(vacancy: IVacancy): Promise<IVacancy> {
    return (await axios.put("/vacancy/update", vacancy)).data;
}
