import { SortOrder } from "../../types/sortOrder";
import { VacancyAction, VacancyActionTypes, VacancyState, IVacancy } from "../../types/vacancy";

const initialState: VacancyState = {
    vacancySearchResult: {
        itemList: [] as IVacancy[],
        currentPageNumber: 1,
        order: SortOrder.Descending,
        pageCount: 0,
        pageSize: 9,
        searchCriteria: "",
        totalItemCount: 0
    },
    filters: {
        active: true,
        officeId: "0"
    },
    loading: false,
    error: null
}

export const vacancyReducer = (state: VacancyState = initialState, action: VacancyAction): VacancyState => {
    switch (action.type) {
        case VacancyActionTypes.GET_VACANCIES:
            return { ...state, vacancySearchResult: action.payload };
        case VacancyActionTypes.LOAD_MORE_VACANCIES:
            return {
                ...state,
                vacancySearchResult: {
                    ...action.payload,
                    itemList: state.vacancySearchResult.itemList.concat(action.payload.itemList)
                },
            };
        case VacancyActionTypes.SET_VACANCY_ERROR:
            return { ...state, error: action.payload };
        case VacancyActionTypes.SET_VACANCY_LOADING:
            return { ...state, loading: action.payload };
        case VacancyActionTypes.SET_VACANCY_PAGE:
            return {
                ...state,
                vacancySearchResult: { ...state.vacancySearchResult, currentPageNumber: action.payload }
            };
        case VacancyActionTypes.SET_VACANCY_ACTIVE_FILTER:
            return {
                ...state,
                filters: { ...state.filters, active: action.payload }
            };
        case VacancyActionTypes.SET_VACANCY_OFFICE_FILTER:
            return {
                ...state,
                filters: { ...state.filters, officeId: action.payload }
            };
        case VacancyActionTypes.CLEAR_VACANCIES:
            return {
                ...state,
                vacancySearchResult: { ...state.vacancySearchResult, itemList: [] }
            };

        default: return state;
    }
}