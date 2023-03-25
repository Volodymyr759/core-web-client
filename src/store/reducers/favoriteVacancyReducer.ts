import { OrderType } from "../../types/common/orderType";
import { FavoriteVacancyAction, FavoriteVacancyActionTypes, FavoriteVacancyState } from "../../types/favoriteVacancy";
import { IVacancy } from "../../types/vacancy";

const initialState: FavoriteVacancyState = {
    favoriteVacancySearchResult: {
        itemList: [] as IVacancy[],
        currentPageNumber: 1,
        order: OrderType.Ascending,
        pageCount: 0,
        pageSize: 6,
        searchCriteria: "",
        totalItemCount: 0
    },
    loading: true,
    error: null
}

export const favoriteVacancyReducer = (state: FavoriteVacancyState = initialState, action: FavoriteVacancyAction): FavoriteVacancyState => {
    switch (action.type) {
        case FavoriteVacancyActionTypes.GET_FAVORITE_VACANCIES:
            return { ...state, favoriteVacancySearchResult: action.payload };
        case FavoriteVacancyActionTypes.LOAD_MORE_FAVORITE_VACANCIES:
            return {
                ...state,
                favoriteVacancySearchResult: {
                    ...action.payload,
                    itemList: state.favoriteVacancySearchResult.itemList.concat(action.payload.itemList)
                },
            };
        case FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_ERROR:
            return { ...state, error: action.payload };
        case FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_LOADING:
            return { ...state, loading: action.payload };
        case FavoriteVacancyActionTypes.SET_FAVORITE_VACANCY_PAGE:
            return {
                ...state,
                favoriteVacancySearchResult: { ...state.favoriteVacancySearchResult, currentPageNumber: action.payload }
            };
        case FavoriteVacancyActionTypes.UPDATE_FAVORITE_VACANCY_STATUS:
            return {
                ...state, favoriteVacancySearchResult: {
                    ...state.favoriteVacancySearchResult, itemList: updateVacancy(state, action.payload)
                }
            }
        default: return state;
    }
}

function updateVacancy(state: FavoriteVacancyState, candidateId: number): Array<IVacancy> {
    return state.favoriteVacancySearchResult.itemList.map((vacancy: IVacancy) => {
        if (vacancy.candidates?.filter(c => c.id === candidateId).length > 0) vacancy.candidates?.filter(c => c.id !== candidateId);
        return vacancy;
    })
}