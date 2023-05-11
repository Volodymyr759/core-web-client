import { Dispatch } from "redux";
import { createCandidateAxios, getCandidatesAxios, getCandidateByIdAxios, updateCandidateIsDismissedStatusAxios, updateCandidateAxios, removeCandidateAxios } from "../../api/candidate";
import { OrderType } from "../../types/common/orderType";
import { ICandidate, CandidateAction, CandidateActionTypes, CandidateStatus, CandidateFilters } from "../../types/candidate";

export const getCandidates = (limit: number, page: number, filters: CandidateFilters, sortField: string, order: OrderType) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        try {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: true });
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: null });
            dispatch({
                type: CandidateActionTypes.GET_CANDIDATES, payload:
                    await getCandidatesAxios(limit, page, filters.searchInFullName, filters.active, filters.vacancyId, sortField, order)
            });
        } catch (error) {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: error.message || "Error of loading candidates." })
        } finally {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: false });
        }
    }
}

export const getCandidateById = (id: number) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        try {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: true });
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: null });
            dispatch({ type: CandidateActionTypes.GET_CANDIDATE_BY_ID, payload: await getCandidateByIdAxios(id) });
        } catch (error) {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: error.message || "Error of loading choosed candidate." })
        } finally {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: false });
        }
    }
}

export const setCandidateLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: isLoading });
    }
}

export const setCandidatePage = (page: number) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        dispatch({ type: CandidateActionTypes.SET_CANDIDATE_PAGE, payload: page });
    }
}

export const setCandidateActiveFilter = (status: CandidateStatus) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ACTIVE_FILTER, payload: status });
    }
}

export const setCandidateVacancyFilter = (vacancyId: number) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        dispatch({ type: CandidateActionTypes.SET_CANDIDATE_VACANCY_FILTER, payload: vacancyId });
    }
}

export const setCandidateSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        dispatch({ type: CandidateActionTypes.SET_CANDIDATE_SEARCH_CRITERIA, payload: search });
    }
}

export const updateCandidateIsDismissedStatus = (id: number, candidateToUpdate: ICandidate) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        try {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: true });
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: null });
            await updateCandidateIsDismissedStatusAxios(id, candidateToUpdate.isDismissed);
            dispatch({ type: CandidateActionTypes.UPDATE_CANDIDATE_ISDISMISSED_STATUS, payload: candidateToUpdate });
        } catch (error) {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: error.message || "Error of updating candidate isDismissed status." })
        } finally {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: false });
        }
    }
}

export const createCandidate = (candidate: ICandidate) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        try {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: true });
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: null });
            dispatch({ type: CandidateActionTypes.CREATE_CANDIDATE, payload: await createCandidateAxios(candidate) });
        } catch (error) {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: error.message || "Error while creating the candidate." })
        } finally {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: false });
        }
    }
}

export const updateCandidate = (candidate: ICandidate) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        try {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: true });
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: null });
            dispatch({ type: CandidateActionTypes.UPDATE_CANDIDATE, payload: await updateCandidateAxios(candidate) });
        } catch (error) {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: error.message || "Error while updating the candidate." })
        } finally {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: false });
        }
    }
}

export const removeCandidate = (id: number) => {
    return async (dispatch: Dispatch<CandidateAction>) => {
        try {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: true });
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: null });
            await removeCandidateAxios(id);
            dispatch({ type: CandidateActionTypes.REMOVE_CANDIDATE, payload: id });
        } catch (error) {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_ERROR, payload: error.message || "Error while removing the candidate." })
        } finally {
            dispatch({ type: CandidateActionTypes.SET_CANDIDATE_LOADING, payload: false });
        }
    }
}
