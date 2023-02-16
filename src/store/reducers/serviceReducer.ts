import { SortOrder } from "../../types/sortOrder";
import { CompanyServiceAction, CompanyServiceActionTypes, CompanyServiceState, ICompanyService } from "../../types/companyService";

const initialState: CompanyServiceState = {
    serviceSearchResult: {
        itemList: [] as ICompanyService[],
        currentPageNumber: 1,
        order: SortOrder.Descending,
        pageCount: 0,
        pageSize: 3,
        searchCriteria: "",
        totalItemCount: 0
    },
    currentCompanyService: null,
    loading: true,
    error: null
}

export const serviceReducer = (state: CompanyServiceState = initialState, action: CompanyServiceAction): CompanyServiceState => {
    switch (action.type) {
        case CompanyServiceActionTypes.GET_COMPANY_SERVICES:
            return { ...state, serviceSearchResult: action.payload };
        case CompanyServiceActionTypes.LOAD_MORE_COMPANY_SERVICES:
            return {
                ...state,
                serviceSearchResult: {
                    ...action.payload,
                    itemList: state.serviceSearchResult.itemList.concat(action.payload.itemList)
                },
            };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR:
            return { ...state, error: action.payload };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING:
            return { ...state, loading: action.payload };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_PAGE:
            return {
                ...state,
                serviceSearchResult: { ...state.serviceSearchResult, currentPageNumber: action.payload }
            };
        case CompanyServiceActionTypes.SET_CURRENT_COMPANY_SERVICE:
            return { ...state, currentCompanyService: action.payload };
        default: return state;
    }
}