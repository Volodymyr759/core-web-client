import { Dispatch } from "redux";
import { getServicesAxios, getServiceByIdAxios } from "../../api/service";
import { SortOrder } from "../../types/sortOrder";
import { ICompanyService, CompanyServiceAction, CompanyServiceActionTypes, CompanyServiceStatus } from "../../types/companyService";

export const getServices = (limit: number, page: number, companyServiceStatus: CompanyServiceStatus, order: SortOrder) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            dispatch({
                type: CompanyServiceActionTypes.GET_COMPANY_SERVICES, payload:
                    await getServicesAxios(limit, page, companyServiceStatus, order)
            });
        } catch (error) {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: error.message || "Error of loading services." })
        } finally {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: false });
        }
    }
}

export const getServiceById = (id: number) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            dispatch({ type: CompanyServiceActionTypes.GET_COMPANY_SERVICE_BY_ID, payload: await getServiceByIdAxios(id) });
        } catch (error) {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: error.message || "Error of loading choosed service." })
        } finally {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: false });
        }
    }
}

export const loadMoreServices = (limit: number, page: number, companyServiceStatus: CompanyServiceStatus, order: SortOrder) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            dispatch({
                type: CompanyServiceActionTypes.LOAD_MORE_COMPANY_SERVICES, payload:
                    await getServicesAxios(limit, page, companyServiceStatus, order)
            });
        } catch (error) {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: "Error of loading services." })
        } finally {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: false });
        }
    }
}

/**
 * Sets current page for Services store
 * @param page<number> current page
 */
export const setServicePage = (page: number) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_PAGE, payload: page });
    }
}

export const setServiceLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: isLoading });
    }
}

export const setCurrentService = (service: ICompanyService) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_CURRENT_COMPANY_SERVICE, payload: service });
    }
}

