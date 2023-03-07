import { OrderType } from "../../types/common/orderType";
import { CountryAction, CountryActionTypes, CountryState, ICountry } from "../../types/country";

const initialState: CountryState = {
    countrySearchResult: {
        itemList: [] as ICountry[],
        currentPageNumber: 1,
        order: OrderType.Descending,
        pageCount: 0,
        pageSize: 3,
        searchCriteria: "",
        totalItemCount: 0
    },
    loading: true,
    error: null
}

export const countryReducer = (state: CountryState = initialState, action: CountryAction): CountryState => {
    switch (action.type) {
        case CountryActionTypes.GET_COUNTRIES:
            return { ...state, countrySearchResult: action.payload };
        case CountryActionTypes.SET_COUNTRY_ERROR:
            return { ...state, error: action.payload };
        case CountryActionTypes.SET_COUNTRY_LOADING:
            return { ...state, loading: action.payload };
        case CountryActionTypes.CREATE_COUNTRY:
            return { ...state, countrySearchResult: { ...state.countrySearchResult, itemList: [action.payload, ...state.countrySearchResult.itemList] } };
        case CountryActionTypes.UPDATE_COUNTRY:
            return { ...state, countrySearchResult: { ...state.countrySearchResult, itemList: updateCountry(state, action.payload) } };
        case CountryActionTypes.REMOVE_COUNTRY:
            return { ...state, countrySearchResult: { ...state.countrySearchResult, itemList: deleteCountry(state, action) } };
        default: return state;
    }
}

function updateCountry(state: CountryState, countryToUpdate: ICountry): Array<ICountry> {
    return state.countrySearchResult.itemList.map((country: ICountry) => {
        if (country.id === countryToUpdate.id) return countryToUpdate;
        return country;
    })
}

function deleteCountry(state: CountryState, action: CountryAction): Array<ICountry> {
    return state.countrySearchResult.itemList.filter(country => country.id !== action.payload)
}
