import { Dispatch } from "redux";
import { getCountriesAxios, getCountryByIdAxios, createCountryAxios, updateCountryAxios, removeCountryAxios } from "../../api/country";
import { OrderType } from "../../types/common/orderType";
import { ICountry, CountryAction, CountryActionTypes } from "../../types/country";

export const getCountries = (limit: number, page: number, sortField: string, order: OrderType) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        try {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: true });
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: null });
            dispatch({
                type: CountryActionTypes.GET_COUNTRIES, payload:
                    await getCountriesAxios(limit, page, sortField, order)
            });
        } catch (error) {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: error.message || "Error of loading countries." })
        } finally {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: false });
        }
    }
}

export const getCountryById = (id: number) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        try {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: true });
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: null });
            dispatch({ type: CountryActionTypes.GET_COUNTRY_BY_ID, payload: await getCountryByIdAxios(id) });
        } catch (error) {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: error.message || "Error of loading choosed country." })
        } finally {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: false });
        }
    }
}

export const setCountryError = (message: string) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: message });
    }
}

export const setCountryLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: isLoading });
    }
}

export const setCountryPage = (page: number) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        dispatch({ type: CountryActionTypes.SET_COUNTRY_PAGE, payload: page });
    }
}

export const createCountry = (country: ICountry) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        try {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: true });
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: null });
            dispatch({ type: CountryActionTypes.CREATE_COUNTRY, payload: await createCountryAxios(country) });
        } catch (error) {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: error.message || "Error while creating the country." })
        } finally {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: false });
        }
    }
}

export const updateCountry = (country: ICountry) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        try {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: true });
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: null });
            dispatch({ type: CountryActionTypes.UPDATE_COUNTRY, payload: await updateCountryAxios(country) });
        } catch (error) {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: error.message || "Error while updating the country." })
        } finally {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: false });
        }
    }
}

export const removeCountry = (id: number) => {
    return async (dispatch: Dispatch<CountryAction>) => {
        try {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: true });
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: null });
            await removeCountryAxios(id);
            dispatch({ type: CountryActionTypes.REMOVE_COUNTRY, payload: id });
        } catch (error) {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_ERROR, payload: error.message || "Error while removing the country." })
        } finally {
            dispatch({ type: CountryActionTypes.SET_COUNTRY_LOADING, payload: false });
        }
    }
}

