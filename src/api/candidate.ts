import axios from 'axios';
import { CandidateStatus, ICandidate } from '../types/candidate';
import { OrderType } from '../types/common/orderType';
import { ISearchResult } from '../types/common/searchResult';

/**
 * Get list of candidates
 * @param limit<number> Page size
 * @param page<number> Current page
 * @param search<string> Search text for candadate full name
 * @param candidateStatus<CandidateStatus> Filter for isDismissed property: 0 - Active, 1 - Dismissed, 2 - All
 * @param vacancyId<number> Filter for candidates by vacancyId. null/'' means all candidates with all vacancies
 * @param sortField<string> Field for sorting
 * @param order<OrderType> Sort direction (Ascending / Descending / None)
 */
export async function getCandidatesAxios(
    limit: number,
    page: number,
    search: string,
    candidateStatus: CandidateStatus,
    vacancyId: number,
    sortField: string,
    order: OrderType): Promise<ISearchResult<ICandidate>> {
    return (
        await axios.get(`/candidate/get?limit=${limit}&page=${page}&search=${search}&candidateStatus=${candidateStatus}&vacancyId=${vacancyId == null ? '' : vacancyId}&sortField=${sortField}&order=${order}`)).data;
}

/**
 * Get candidate specified by identifier
 * @param id<string> Candidate identifier
 */
export async function getCandidateByIdAxios(id: number): Promise<ICandidate> {
    return (await axios.get(`/candidate/getbyid/${id.toString()}`)).data;
}

/**
 * @param id<string> Candidate identifier
 * @param isDismissed<boolean> Candidate status
 */
export async function updateCandidateIsDismissedStatusAxios(id: number, isDismissed: boolean): Promise<void> {
    await axios.patch(`/candidate/partialcandidateupdate/${id}`, [{ op: "replace", path: "/isdismissed", value: isDismissed }]);
}

/**
 * Creates a new candidate
 * @param candidate<ICandidate> object of type ICandidate
 * @returns<ICandidate> Created candidate
 */
export async function createCandidateAxios(candidate: ICandidate): Promise<ICandidate> {
    return (await axios.post("/candidate/create", candidate)).data;
}

/**
 * Updates the existing candidate
 * @param candidate<ICandidate> Object of type ICandidate
 * @returns<ICandidate> Updated candidate object
 */
export async function updateCandidateAxios(candidate: ICandidate): Promise<ICandidate> {
    return (await axios.put("/candidate/update", candidate)).data;
}

/**
 * Delete's the candidate specified by identifier
 * @param id<string> Identifier
 */
export async function removeCandidateAxios(id: number): Promise<void> {
    return await axios.delete(`/candidate/delete/${id}`);
}