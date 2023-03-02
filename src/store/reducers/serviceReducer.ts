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
    loadingServices: true,
    errorServices: null
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
            return { ...state, errorServices: action.payload };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING:
            return { ...state, loadingServices: action.payload };
        case CompanyServiceActionTypes.SET_COMPANY_SERVICE_PAGE:
            return {
                ...state,
                serviceSearchResult: { ...state.serviceSearchResult, currentPageNumber: action.payload }
            };
        case CompanyServiceActionTypes.SET_CURRENT_COMPANY_SERVICE:
            return { ...state, currentCompanyService: action.payload };
        case CompanyServiceActionTypes.CREATE_COMPANY_SERVICE:
            return {
                ...state, serviceSearchResult: {
                    ...state.serviceSearchResult, itemList:
                        [action.payload, ...state.serviceSearchResult.itemList]
                }
            }
        case CompanyServiceActionTypes.UPDATE_COMPANY_SERVICE:
            return {
                ...state, serviceSearchResult: {
                    ...state.serviceSearchResult, itemList: updateService(state, action.payload)
                }
            }
        case CompanyServiceActionTypes.REMOVE_COMPANY_SERVICE:
            return { ...state, serviceSearchResult: { ...state.serviceSearchResult, itemList: deleteService(state, action) } }
        default: return state;
    }
}

function deleteService(state: CompanyServiceState, action: CompanyServiceAction): Array<ICompanyService> {
    return state.serviceSearchResult.itemList.filter(service => service.id !== action.payload)
}

function updateService(state: CompanyServiceState, serviceToUpdate: ICompanyService): Array<ICompanyService> {
    return state.serviceSearchResult.itemList.map((service: ICompanyService) => {
        if (service.id === serviceToUpdate.id) return serviceToUpdate
        return service
    })
}