import { Grid } from "@mui/material";
import { AdminCountryFiltersProps } from "./types";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";

export default function AdminCountryFilters({ onAddNew }: AdminCountryFiltersProps): JSX.Element {
    return (
        <Grid container spacing={2} direction='row' justifyContent={'flex-end'} alignItems={'center'}>
            <CreateNewButton onAction={onAddNew}>+ New Country</CreateNewButton>
        </Grid>
    )
}