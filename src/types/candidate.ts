import { ISearchResult } from "./common/searchResult";
import { IVacancy } from "./vacancy";

export interface ICandidate {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    notes: string;
    isDismissed: boolean;
    joinedAt: Date;
    vacancyId: number;
    vacancyDto?: IVacancy;
}

export enum CandidateStatus {
    Active,
    Dismissed,
    All
}

export interface CandidateFilters {
    active: CandidateStatus;
    vacancyId: number;
    searchInFullName: string;
}

export interface CandidateState {
    candidateSearchResult: ISearchResult<ICandidate>;
    filters: CandidateFilters;
    loading: boolean;
    error: null | string;
}

export enum CandidateActionTypes {
    GET_CANDIDATES = "GET_CANDIDATES",
    GET_CANDIDATE_BY_ID = "GET_CANDIDATE_BY_ID",
    SET_CANDIDATE_ERROR = "SET_CANDIDATE_ERROR",
    SET_CANDIDATE_LOADING = "SET_CANDIDATE_LOADING",
    SET_CANDIDATE_PAGE = "SET_CANDIDATE_PAGE",
    SET_CANDIDATE_ACTIVE_FILTER = "SET_CANDIDATE_ACTIVE_FILTER",
    SET_CANDIDATE_VACANCY_FILTER = "SET_CANDIDATE_VACANCY_FILTER",
    SET_CANDIDATE_SEARCH_CRITERIA = "SET_CANDIDATE_SEARCH_CRITERIA",
    UPDATE_CANDIDATE_ISDISMISSED_STATUS = "UPDATE_CANDIDATE_ISDISMISSED_STATUS",
    CREATE_CANDIDATE = "CREATE_CANDIDATE",
    UPDATE_CANDIDATE = "UPDATE_CANDIDATE",
    REMOVE_CANDIDATE = "REMOVE_CANDIDATE"
}

interface GetCandidatesAction {
    type: CandidateActionTypes.GET_CANDIDATES;
    payload: ISearchResult<ICandidate>;
}

interface GetCandidateByIdAction {
    type: CandidateActionTypes.GET_CANDIDATE_BY_ID;
    payload: ICandidate;
}

interface SetCandidateErrorAction {
    type: CandidateActionTypes.SET_CANDIDATE_ERROR;
    payload: null | string;
}

interface SetCandidateLoadingAction {
    type: CandidateActionTypes.SET_CANDIDATE_LOADING;
    payload: boolean;
}

interface SetCandidatePagesAction {
    type: CandidateActionTypes.SET_CANDIDATE_PAGE;
    payload: number;
}

interface SetCandidateActiveFilterAction {
    type: CandidateActionTypes.SET_CANDIDATE_ACTIVE_FILTER;
    payload: CandidateStatus;
}

interface SetCandidateVacancyFilterAction {
    type: CandidateActionTypes.SET_CANDIDATE_VACANCY_FILTER;
    payload: number;
}

interface SetCandidatesSearchCriteriaAction {
    type: CandidateActionTypes.SET_CANDIDATE_SEARCH_CRITERIA;
    payload: string;
}

interface UpdateCandidateIsDismissedAction {
    type: CandidateActionTypes.UPDATE_CANDIDATE_ISDISMISSED_STATUS;
    payload: ICandidate;
}

interface CreateCandidateAction {
    type: CandidateActionTypes.CREATE_CANDIDATE;
    payload: ICandidate;
}

interface UpdateCandidateAction {
    type: CandidateActionTypes.UPDATE_CANDIDATE;
    payload: ICandidate;
}

interface RemoveCandidateAction {
    type: CandidateActionTypes.REMOVE_CANDIDATE;
    payload: number;
}

export type CandidateAction = GetCandidatesAction |
    GetCandidateByIdAction |
    SetCandidateErrorAction |
    SetCandidateLoadingAction |
    SetCandidatePagesAction |
    SetCandidateActiveFilterAction |
    SetCandidateVacancyFilterAction |
    SetCandidatesSearchCriteriaAction |
    UpdateCandidateIsDismissedAction |
    CreateCandidateAction |
    UpdateCandidateAction |
    RemoveCandidateAction