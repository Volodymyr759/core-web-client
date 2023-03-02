import { OrderType } from "../../types/orderType";
import { VacancyAction, VacancyActionTypes, VacancyState, IVacancy } from "../../types/vacancy";

const initialState: VacancyState = {
    vacancySearchResult: {
        itemList: [] as IVacancy[],
        currentPageNumber: 1,
        order: OrderType.Descending,
        pageCount: 0,
        pageSize: 9,
        searchCriteria: "",
        totalItemCount: 0
    },
    currentVacancy: null,
    offices: [],
    titles: [],
    filters: {
        active: true,
        officeId: "0"
    },
    loadingFilters: true,
    errorFilters: null,
    loadingVacancies: true,
    errorVacancies: null
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
            return { ...state, errorVacancies: action.payload };
        case VacancyActionTypes.SET_VACANCY_LOADING:
            return { ...state, loadingVacancies: action.payload };
        case VacancyActionTypes.SET_FILTERS_ERROR:
            return { ...state, errorFilters: action.payload };
        case VacancyActionTypes.SET_FILTERS_LOADING:
            return { ...state, loadingFilters: action.payload };
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
        case VacancyActionTypes.SET_VACANCY_SEARCH_CRITERIA:
            return {
                ...state,
                vacancySearchResult: { ...state.vacancySearchResult, searchCriteria: action.payload }
            };
        case VacancyActionTypes.SET_VACANCY_OFFICES:
            let vacancyOffices = action.payload;
            vacancyOffices.unshift({ id: 0, name: "All" });
            return { ...state, offices: vacancyOffices };
        case VacancyActionTypes.SET_VACANCIES_TITLES:
            return { ...state, titles: action.payload };
        case VacancyActionTypes.SET_CURRENT_VACANCY:
            return { ...state, currentVacancy: action.payload };
        case VacancyActionTypes.INCREMENT_PREVIEWS:
            // if (state.currentVacancy) state.currentVacancy.previews = action.payload;
            return { ...state };
        case VacancyActionTypes.CLEAR_VACANCIES:
            return {
                ...state,
                vacancySearchResult: { ...state.vacancySearchResult, itemList: [] }
            };

        default: return state;
    }
}