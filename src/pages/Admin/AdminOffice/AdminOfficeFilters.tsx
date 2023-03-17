import { Grid } from "@mui/material";
import { AdminOfficeFiltersProps } from "./types";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";

export default function AdminOfficeFilters({ onAddNew }: AdminOfficeFiltersProps): JSX.Element {

    return (
        <Grid container spacing={2} direction='row' justifyContent={'flex-end'} alignItems={'center'}>
            <CreateNewButton onAction={onAddNew}>+ New Office</CreateNewButton>
        </Grid>
    )
}