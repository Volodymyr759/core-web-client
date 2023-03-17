import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { IOffice } from "../../../types/office";
import { OrderType } from "../../../types/common/orderType";
import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminOfficeForm from "./AdminOfficeForm";
import AdminOfficeTable from "./AdminOfficeTable";
import AdminOfficeFilters from "./AdminOfficeFilters";

export default function AdminOfficePage(): JSX.Element {
    const { officeSearchResult } = useTypedSelector(state => state.office);
    const { countrySearchResult } = useTypedSelector(state => state.country);
    const { getCountries, getOffices } = useActions();
    const [office, setOffice] = useState<IOffice | null>(null);

    useEffect(() => {
        getCountries(100, countrySearchResult.currentPageNumber, 'Name', OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getOffices(5, officeSearchResult.currentPageNumber, 'Name', OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [officeSearchResult.currentPageNumber])

    const onCreateEdit = (office: IOffice | null) => setOffice(office);

    return (
        <>
            <PageHeader title="Offices Management" />
            {/* <CreateNewButton onAction={() => setOffice({ id: 0, name: '', description: '', address: '', latitude: 0, longitude: 0, countryId: countrySearchResult.itemList[0].id })}
            >
                + Create New
            </CreateNewButton> */}
            <AdminOfficeFilters onAddNew={() => setOffice({ id: 0, name: '', description: '', address: '', latitude: 0, longitude: 0, countryId: countrySearchResult.itemList[0].id })} />
            <AdminOfficeTable onEdit={onCreateEdit} />
            {office && <AdminOfficeForm office={office} closeForm={() => setOffice(null)} />}
        </>
    )
}