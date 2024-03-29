import { Dispatch } from "redux";
import { getServicesAxios, getServiceByIdAxios, removeServiceAxios, createServiceAxios, updateServiceAxios, updateServiceIsActiveStatusAxios } from "../../api/service";
import { OrderType } from "../../types/common/orderType";
import { ICompanyService, CompanyServiceAction, CompanyServiceActionTypes, CompanyServiceStatus } from "../../types/companyService";

export const getServices = (limit: number, page: number, companyServiceStatus: CompanyServiceStatus, sortField: string, order: OrderType) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            dispatch({
                type: CompanyServiceActionTypes.GET_COMPANY_SERVICES, payload:
                    await getServicesAxios(limit, page, companyServiceStatus, sortField, order)
            });
        } catch (error) {
            console.log('error ', error)
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

export const loadMoreServices = (limit: number, page: number, companyServiceStatus: CompanyServiceStatus, sortField: string, order: OrderType) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            dispatch({
                type: CompanyServiceActionTypes.LOAD_MORE_COMPANY_SERVICES, payload:
                    await getServicesAxios(limit, page, companyServiceStatus, sortField, order)
            });
        } catch (error) {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: "Error of loading services." })
        } finally {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: false });
        }
    }
}

export const setServicePage = (page: number) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_PAGE, payload: page });
    }
}

export const setServiceActiveFilter = (status: CompanyServiceStatus) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ACTIVE_FILTER, payload: status });
    }
}

export const setServiceError = (message: string) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: message });
    }
}

export const setServiceLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: isLoading });
    }
}

export const setServiceSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_SERVICE_SORTFIELD, payload: sortField });
    }
}

export const setServiceSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        dispatch({ type: CompanyServiceActionTypes.SET_SERVICE_SORT, payload: sort });
    }
}

export const updateServiceIsActiveStatus = (id: number, serviceToUpdate: ICompanyService) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            await updateServiceIsActiveStatusAxios(id, serviceToUpdate.isActive);
            dispatch({ type: CompanyServiceActionTypes.UPDATE_COMPANY_SERVICE_ISACTIVE_STATUS, payload: serviceToUpdate });
        } catch (error) {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: error.message || "Error of updating service isActive status." })
        } finally {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: false });
        }
    }
}

export const createService = (service: ICompanyService) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            dispatch({ type: CompanyServiceActionTypes.CREATE_COMPANY_SERVICE, payload: await createServiceAxios(service) });
        } catch (error) {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: error.message || "Error while creating the service." })
        } finally {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: false });
        }
    }
}

export const updateService = (service: ICompanyService) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            dispatch({ type: CompanyServiceActionTypes.UPDATE_COMPANY_SERVICE, payload: await updateServiceAxios(service) });
        } catch (error) {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: error.message || "Error while updating the service." })
        } finally {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: false });
        }
    }
}

export const removeService = (id: number) => {
    return async (dispatch: Dispatch<CompanyServiceAction>) => {
        try {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: true });
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: null });
            await removeServiceAxios(id);
            dispatch({ type: CompanyServiceActionTypes.REMOVE_COMPANY_SERVICE, payload: id });
        } catch (error) {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_ERROR, payload: error.message || "Error while removing the service." })
        } finally {
            dispatch({ type: CompanyServiceActionTypes.SET_COMPANY_SERVICE_LOADING, payload: false });
        }
    }
}

