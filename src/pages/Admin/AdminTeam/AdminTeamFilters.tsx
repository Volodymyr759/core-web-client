import { AdminTeamFiltersProps } from "./types";
import { Grid } from "@mui/material";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";

export default function AdminTeamFilters({ onAddNew }: AdminTeamFiltersProps): JSX.Element {

    return (
        <Grid container spacing={2} direction='row' justifyContent={'flex-end'} alignItems={'center'}>
            <CreateNewButton onAction={onAddNew}>+ New Employee</CreateNewButton>
        </Grid>
    )
}