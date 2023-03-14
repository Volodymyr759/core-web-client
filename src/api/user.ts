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
