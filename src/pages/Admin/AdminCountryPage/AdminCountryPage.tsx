import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { OrderType } from "../../../types/common/orderType";
import { ICountry } from "../../../types/country";
import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminCountryForm from "./AdminCountryForm";
import AdminCountryTable from "./AdminCountryTable";
import CreateNewButton from "../../../components/Button/CreateNewButton";

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
            <PageHeader title="Countries Management" text="Voluptatum deleniti atque." />
            <CreateNewButton onAction={() => setCountry({ id: 0, name: '', code: '' })}>+ Create New</CreateNewButton>
            <AdminCountryTable onEdit={onCreateEdit} />
            {country && <AdminCountryForm country={country} closeForm={() => setCountry(null)} />}
        </>
    )
}