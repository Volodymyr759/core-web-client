import { useEffect, useState } from "react";
import { ICountry } from "../../../types/country";
import { Button, Grid } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminCountryForm from "./AdminCountryForm";
import AdminCountryTable from "./AdminCountryTable";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { OrderType } from "../../../types/common/orderType";

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
            <Grid container justifyContent={'flex-end'} spacing={2} sx={{ margin: '20px 0' }}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                    <Button variant="contained" onClick={() => setCountry({ id: 0, name: '', code: '' })}>
                        + Create New
                    </Button>
                </Grid>
            </Grid>
            <AdminCountryTable onEdit={onCreateEdit} />
            {country && <AdminCountryForm country={country} closeForm={() => setCountry(null)} />}
        </>
    )
}