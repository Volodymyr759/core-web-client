import axios from 'axios';
import { OfficeNameIdDto } from '../types/common/officeNameIdDto';
import { OrderType } from '../types/common/orderType';
import { ISearchResult } from '../types/common/searchResult';
import { IOffice } from '../types/office';

/**
 * Gets list of offices with pagination properties
 * @param limit<number> Page size
 * @param page<number> Current page
 * @param sortField<string> Field for sorting, for now only by Name
 * @param order<OrderType> Sort direction (0 - Ascending / 1 - Descending / 2 - None)
 */
export async function getOfficesAxios(limit: number, page: number, sortField: string, order: OrderType): Promise<ISearchResult<IOffice>> {
    return (await axios.get(`/office/get?limit=${limit}&page=${page}&sortField=${sortField}&order=${order}`)).data;
}

/**
 * Gets list of OfficeNameIdDto's
 * @returns<OfficeNameIdDto[]> Array of OfficeNameIdDto object
 */
export async function getOfficeNameIdsAxios(): Promise<OfficeNameIdDto[]> {
    return (await axios.get("/office/getofficenameids")).data;
}

/**
 * Gets the object of Office specified by identifier
 * @param id<string> Identifier
 * @returns<IOffice> Object of office
 */
export async function getOfficeByIdAxios(id: number): Promise<IOffice> {
    return (await axios.get(`/office/getbyid/${id.toString()}`)).data;
}

/**
 * Creates a new office
 * @param office<IOffice> Object of type IOffice
 * @returns<IOffice> Created office object
 */
export async function createOfficeAxios(office: IOffice): Promise<IOffice> {
    return (await axios.post("/office/create", office)).data;
}

/**
 * Updates the office
 * @param office<IOffice> Object of type IOffice
 * @returns<IOffice> Updated service object
 */
export async function updateOfficeAxios(office: IOffice): Promise<IOffice> {
    return (await axios.put("/office/update", office)).data;
}

/**
 * Delete's the object of office specified by identifier
 * @param id<string> Identifier
 */
export async function removeOfficeAxios(id: number): Promise<void> {
    return await axios.delete(`/Office/delete/${id}`);
}