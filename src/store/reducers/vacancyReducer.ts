import { VacancyAction, VacancyActionTypes, VacancyState, IVacancy } from "../../types/vacancy";
import { OrderType } from "../../types/searchResult";

const initialState: VacancyState = {
    vacancySearchResult: {
        itemList: [] as IVacancy[],
        currentPageNumber: 1,
        order: OrderType.Ascending,
        pageCount: 0,
        pageSize: 9,
        searchCriteria: "",
        totalItemCount: 0
    },
    loading: false,
    error: null
}

export const vacancyReducer = (state: VacancyState = initialState, action: VacancyAction): VacancyState => {
    switch (action.type) {
        case VacancyActionTypes.GET_VACANCIES:
            return { ...state, vacancySearchResult: action.payload };
        case VacancyActionTypes.GET_PUBLIC_VACANCIES:
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

        default: return state;
    }
}