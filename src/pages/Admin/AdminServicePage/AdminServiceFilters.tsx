import { ChangeEvent } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { CompanyServiceStatus } from "../../../types/companyService"
import { AdminServiceFiltersProps } from "./types";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material"

export default function AdminServiceFilters({ onAddNew }: AdminServiceFiltersProps): JSX.Element {
    const { filters } = useTypedSelector(state => state.service);
    const { setServiceActiveFilter } = useActions();

    const activeServicesFilterHandler = (checked: boolean): void => {
        checked ? setServiceActiveFilter(CompanyServiceStatus.Active) : setServiceActiveFilter(CompanyServiceStatus.All);
    }

    return (
        <Grid container spacing={2} sx={{ margin: '20px 0' }}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'left' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => activeServicesFilterHandler(checked)}
                            checked={filters.active === CompanyServiceStatus.Active ? true : false}
                        />}
                    label="Show only active" />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="contained" onClick={onAddNew}>
                    + Create New
                </Button>
            </Grid>
        </Grid>
    )
}