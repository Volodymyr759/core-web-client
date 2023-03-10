import { OrderType } from "../../types/common/orderType";
import { OfficeAction, OfficeActionTypes, OfficeState, IOffice } from "../../types/office";

const initialState: OfficeState = {
    officeSearchResult: {
        itemList: [] as IOffice[],
        currentPageNumber: 1,
        order: OrderType.Descending,
        pageCount: 0,
        pageSize: 10,
        searchCriteria: "",
        totalItemCount: 0
    },
    loading: true,
    error: null
}

export const officeReducer = (state: OfficeState = initialState, action: OfficeAction): OfficeState => {
    switch (action.type) {
        case OfficeActionTypes.GET_OFFICES:
            return { ...state, officeSearchResult: action.payload };
        case OfficeActionTypes.SET_OFFICE_ERROR:
            return { ...state, error: action.payload };
        case OfficeActionTypes.SET_OFFICE_LOADING:
            return { ...state, loading: action.payload };
        case OfficeActionTypes.SET_OFFICE_PAGE:
            return { ...state, officeSearchResult: { ...state.officeSearchResult, currentPageNumber: action.payload } };
        case OfficeActionTypes.CREATE_OFFICE:
            return { ...state, officeSearchResult: { ...state.officeSearchResult, itemList: [action.payload, ...state.officeSearchResult.itemList] } };
        case OfficeActionTypes.UPDATE_OFFICE:
            return { ...state, officeSearchResult: { ...state.officeSearchResult, itemList: updateOffice(state, action.payload) } };
        case OfficeActionTypes.REMOVE_OFFICE:
            return { ...state, officeSearchResult: { ...state.officeSearchResult, itemList: deleteOffice(state, action) } };
        default: return state;
    }
}

function updateOffice(state: OfficeState, officeToUpdate: IOffice): Array<IOffice> {
    return state.officeSearchResult.itemList.map((office: IOffice) => {
        if (office.id === officeToUpdate.id) return officeToUpdate;
        return office;
    })
}

function deleteOffice(state: OfficeState, action: OfficeAction): Array<IOffice> {
    return state.officeSearchResult.itemList.filter(office => office.id !== action.payload)
}
