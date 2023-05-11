import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { OrderType } from "../../../types/common/orderType";
import { ICountry } from "../../../types/country";
import AdminCountryForm from "./AdminCountryForm";
import AdminCountryTable from "./AdminCountryTable";
import AdminCountryFilters from "./AdminCountryFilters";

export default function AdminCountryPage(): JSX.Element {
    const { countrySearchResult } = useTypedSelector(state => state.country);
    const { getCountries } = useActions();
    const [country, setCountry] = useState<ICountry | null>(null);

    useEffect(() => {
        getCountries(5, countrySearchResult.currentPageNumber, 'Name', OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countrySearchResult.currentPageNumber])

    const onCreateEdit = (country: ICountry | null) => setCountry(country);

    return (
        <>
            <AdminCountryFilters onAddNew={() => setCountry({ id: 0, name: '', code: '' })} />
            <AdminCountryTable onEdit={onCreateEdit} />
            {country && <AdminCountryForm country={country} closeForm={() => setCountry(null)} />}
        </>
    )
}