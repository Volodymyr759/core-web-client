import axios from 'axios';
import { ISearchResult } from '../types/common/searchResult';
import { OrderType } from '../types/common/orderType';
import { ICountry } from '../types/country';

/**
 * Gets list of countries
 * @param limit<number> Page size
 * @param page<number> Current page
 * @param sortField<string> Field for sorting, for now only by Name
 * @param order<OrderType> Sort direction (0 - Ascending / 1 - Descending / 2 - None)
 */
export async function getCountriesAxios(limit: number, page: number, sortField: string, order: OrderType): Promise<ISearchResult<ICountry>> {
    return (await axios.get(`/country/get?limit=${limit}&page=${page}&sortField=${sortField}&order=${order}`)).data;
}

/**
 * Gets the object of country specified by identifier
 * @param id<string> Identifier
 * @returns<ICountry> Object of service
 */
export async function getCountryByIdAxios(id: number): Promise<ICountry> {
    return (await axios.get(`/country/get/${id.toString()}`)).data;
}

/**
 * Creates a new Country
 * @param service<ICountry> Object of type ICountry
 * @returns<ICountry> Created Country object
 */
export async function createCountryAxios(country: ICountry): Promise<ICountry> {
    return (await axios.post("/country/create", country)).data;
}

/**
 * Updates the country
 * @param service<ICountry> Object of type ICountry
 * @returns<ICountry> Updated service object
 */
export async function updateCountryAxios(country: ICountry): Promise<ICountry> {
    return (await axios.put("/country/update", country)).data;
}

/**
 * Delete's the object of Country specified by identifier
 * @param id<string> Identifier
 */
export async function removeCountryAxios(id: number): Promise<void> {
    return await axios.delete(`/country/delete/${id}`);
}