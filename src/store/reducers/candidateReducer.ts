import { OrderType } from "../../types/common/orderType";
import { CandidateAction, CandidateActionTypes, CandidateState, ICandidate, CandidateStatus } from "../../types/candidate";

const initialState: CandidateState = {
    candidateSearchResult: {
        itemList: [],
        currentPageNumber: 1,
        order: OrderType.Descending,
        pageCount: 0,
        pageSize: 10,
        searchCriteria: "",
        totalItemCount: 0
    },
    filters: {
        active: CandidateStatus.All,
        vacancyId: null,
        searchInFullName: ""
    },
    sortField: "JoinedAt",
    loading: true,
    error: null
}

export const candidateReducer = (state: CandidateState = initialState, action: CandidateAction): CandidateState => {
    switch (action.type) {
        case CandidateActionTypes.GET_CANDIDATES:
            return { ...state, candidateSearchResult: action.payload };
        case CandidateActionTypes.SET_CANDIDATE_ERROR:
            return { ...state, error: action.payload };
        case CandidateActionTypes.SET_CANDIDATE_LOADING:
            return { ...state, loading: action.payload };
        case CandidateActionTypes.SET_CANDIDATE_PAGE:
            return { ...state, candidateSearchResult: { ...state.candidateSearchResult, currentPageNumber: action.payload } };
        case CandidateActionTypes.SET_CANDIDATE_ACTIVE_FILTER:
            return { ...state, filters: { ...state.filters, active: action.payload } };
        case CandidateActionTypes.SET_CANDIDATE_VACANCY_FILTER:
            return { ...state, filters: { ...state.filters, vacancyId: action.payload } };
        case CandidateActionTypes.SET_CANDIDATE_SEARCH_CRITERIA:
            return { ...state, filters: { ...state.filters, searchInFullName: action.payload } };
        case CandidateActionTypes.SET_CANDIDATE_SORTFIELD:
            return { ...state, sortField: action.payload };
        case CandidateActionTypes.SET_CANDIDATE_SORT:
            return { ...state, candidateSearchResult: { ...state.candidateSearchResult, order: action.payload } };
        case CandidateActionTypes.UPDATE_CANDIDATE_ISDISMISSED_STATUS:
            return { ...state, candidateSearchResult: { ...state.candidateSearchResult, itemList: updateCandidate(state, action.payload) } }
        case CandidateActionTypes.CREATE_CANDIDATE:
            return { ...state, candidateSearchResult: { ...state.candidateSearchResult, itemList: [action.payload, ...state.candidateSearchResult.itemList] } }
        case CandidateActionTypes.UPDATE_CANDIDATE:
            return { ...state, candidateSearchResult: { ...state.candidateSearchResult, itemList: updateCandidate(state, action.payload) } }
        case CandidateActionTypes.REMOVE_CANDIDATE:
            return { ...state, candidateSearchResult: { ...state.candidateSearchResult, itemList: deleteCandidate(state, action) } };
        default: return state;
    }
}

function updateCandidate(state: CandidateState, candidateToUpdate: ICandidate): Array<ICandidate> {
    return state.candidateSearchResult.itemList.map((candidate: ICandidate) => {
        if (candidate.id === candidateToUpdate.id) return candidateToUpdate;
        return candidate;
    })
}

function deleteCandidate(state: CandidateState, action: CandidateAction): Array<ICandidate> {
    return state.candidateSearchResult.itemList.filter(candidate => candidate.id !== action.payload)
}