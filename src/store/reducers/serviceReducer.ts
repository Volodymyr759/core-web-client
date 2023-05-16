import { OrderType } from "../../types/common/orderType";
import { CompanyServiceAction, CompanyServiceActionTypes, CompanyServiceState, CompanyServiceStatus, ICompanyService } from "../../types/companyService";

const initialState: CompanyServiceState = {
    serviceSearchResult: {
        itemList: [] as ICompanyService[],
        currentPageNumber: 1,
        order: OrderType.Descending,
        pageCount: 0,
        pageSize: 5,
        searchCriteria: "",
        totalItemCount: 0
    },
    filters: {
        active: CompanyServiceStatus.All,
    },
    sortField: "Title",
    loading: true,
    error: null
}

export const serviceReducer = (state: CompanyServiceState = initialState, action: CompanyServiceAction): CompanyServiceState => {
    switch (action.type) {
        case CompanyServiceActionTypes.GET_COMPANY_SERVICES:
            return { ...state, serviceSearchResult: action.payload };
        case CompanyServiceActionTypes.LOAD_MORE_COMPANY_SERVICES:
            return { ...state, serviceSearchResult: { ...action.payload, itemList: state.serviceSearchResult.itemList.concat(action.payload.itemList) }, };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR:
            return { ...state, error: action.payload };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING:
            return { ...state, loading: action.payload };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_PAGE:
            return { ...state, serviceSearchResult: { ...state.serviceSearchResult, currentPageNumber: action.payload } };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_ACTIVE_FILTER:
            return { ...state, filters: { ...state.filters, active: action.payload } };
        case CompanyServiceActionTypes.SET_SERVICE_SORTFIELD:
            return { ...state, sortField: action.payload };
        case CompanyServiceActionTypes.SET_SERVICE_SORT:
            return { ...state, serviceSearchResult: { ...state.serviceSearchResult, order: action.payload } };
        case CompanyServiceActionTypes.UPDATE_COMPANY_SERVICE_ISACTIVE_STATUS:
            return { ...state, serviceSearchResult: { ...state.serviceSearchResult, itemList: updateService(state, action.payload) } }
        case CompanyServiceActionTypes.CREATE_COMPANY_SERVICE:
            return { ...state, serviceSearchResult: { ...state.serviceSearchResult, itemList: [action.payload, ...state.serviceSearchResult.itemList] } };
        case CompanyServiceActionTypes.UPDATE_COMPANY_SERVICE:
            return { ...state, serviceSearchResult: { ...state.serviceSearchResult, itemList: updateService(state, action.payload) } };
        case CompanyServiceActionTypes.REMOVE_COMPANY_SERVICE:
            return { ...state, serviceSearchResult: { ...state.serviceSearchResult, itemList: deleteService(state, action) } };
        default: return state;
    }
}

function updateService(state: CompanyServiceState, serviceToUpdate: ICompanyService): Array<ICompanyService> {
    return state.serviceSearchResult.itemList.map((service: ICompanyService) => {
        if (service.id === serviceToUpdate.id) return serviceToUpdate;
        return service;
    })
}

function deleteService(state: CompanyServiceState, action: CompanyServiceAction): Array<ICompanyService> {
    return state.serviceSearchResult.itemList.filter(service => service.id !== action.payload)
}
