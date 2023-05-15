import { OrderType } from "../../types/common/orderType";
import { VacancyAction, VacancyActionTypes, VacancyState, IVacancy, VacancyStatus } from "../../types/vacancy";

const initialState: VacancyState = {
    vacancySearchResult: {
        itemList: [] as IVacancy[],
        currentPageNumber: 1,
        order: OrderType.Ascending,
        pageCount: 0,
        pageSize: 6,
        searchCriteria: "",
        totalItemCount: 0
    },
    offices: [],
    titles: [],
    filters: {
        active: VacancyStatus.Active,
        officeId: "",
        searchInTitle: ""
    },
    sortField: "Title",
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
        case VacancyActionTypes.SET_VACANCY_SORTFIELD:
            return { ...state, sortField: action.payload };
        case VacancyActionTypes.SET_VACANCY_SORT:
            return { ...state, vacancySearchResult: { ...state.vacancySearchResult, order: action.payload } };
        case VacancyActionTypes.INCREMENT_PREVIEWS:
            return { ...state };
        case VacancyActionTypes.UPDATE_VACANCY_ISACTIVE_STATUS:
            return {
                ...state, vacancySearchResult: {
                    ...state.vacancySearchResult, itemList: updateVacancy(state, action.payload)
                }
            }
        case VacancyActionTypes.CREATE_VACANCY:
            return {
                ...state, vacancySearchResult: {
                    ...state.vacancySearchResult, itemList:
                        [action.payload, ...state.vacancySearchResult.itemList]
                }
            }
        case VacancyActionTypes.UPDATE_VACANCY:
            return {
                ...state, vacancySearchResult: {
                    ...state.vacancySearchResult, itemList: updateVacancy(state, action.payload)
                }
            }
        case VacancyActionTypes.REMOVE_VACANCY:
            return { ...state, vacancySearchResult: { ...state.vacancySearchResult, itemList: deleteVacancy(state, action) } };
        default: return state;
    }
}

function updateVacancy(state: VacancyState, vacancyToUpdate: IVacancy): Array<IVacancy> {
    return state.vacancySearchResult.itemList.map((vacancy: IVacancy) => {
        if (vacancy.id === vacancyToUpdate.id) return vacancyToUpdate;
        return vacancy;
    })
}

function deleteVacancy(state: VacancyState, action: VacancyAction): Array<IVacancy> {
    return state.vacancySearchResult.itemList.filter(vacancy => vacancy.id !== action.payload)
}