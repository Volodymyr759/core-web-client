import axios from 'axios';
import { ISearchResult } from '../types/common/searchResult';
import { IUser } from '../types/user';

/**
 * Get list of candidates
 * @param limit<number> Page size
 * @param page<number> Current page
 * @param search<string> Search text for candadate full name
 */
export async function getUsersAxios(limit: number, page: number, search: string): Promise<ISearchResult<IUser>> {
    return (await axios.get(`/account/get?limit=${limit}&page=${page}&search=${search}`)).data;
}

/**
 * @param id<string> User identifier
 * @param confirmed<boolean> User's emailConfirmed status
 */
export async function updateUserEmailConfirmedStatusAxios(id: string, confirmed: boolean): Promise<void> {
    await axios.patch(`/account/partialuserupdate/${id}`, [{ op: "replace", path: "/emailConfirmed", value: confirmed }]);
}

/**
 * Updates the existing user
 * @param user<IUser> Object of type IUser
 * @returns<IUser> Updated user object
 */
export async function updateUserAxios(user: IUser): Promise<IUser> {
    return (await axios.post("/account/update", user)).data;
}
