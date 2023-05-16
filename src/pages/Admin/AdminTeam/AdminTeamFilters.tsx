import { AdminTeamFiltersProps } from "./types";
import { Grid } from "@mui/material";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import SelectItemsFilter from "../../../components/FiltersArea/SelectItemFilter/SelectItemFilter";
import { useEffect } from "react";

export default function AdminTeamFilters({ onAddNew }: AdminTeamFiltersProps): JSX.Element {
    const { filters, offices } = useTypedSelector(state => state.employee);
    const { getEmployeesOfficeNameIdDtos, setEmployeePage, setEmployeeOfficeFilter } = useActions();

    useEffect(() => {
        getEmployeesOfficeNameIdDtos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSelectChanged = (newValue: string) => {
        setEmployeePage(1);
        console.log('newValue: ', typeof newValue)
        setEmployeeOfficeFilter(Number(newValue));
    }

    return (
        <Grid container direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <SelectItemsFilter
                items={offices}
                label="Office"
                onSelectChanged={onSelectChanged}
                value={filters.officeId.toString()}
            />
            <CreateNewButton onAction={onAddNew}>+ New Employee</CreateNewButton>
        </Grid>
    )
}