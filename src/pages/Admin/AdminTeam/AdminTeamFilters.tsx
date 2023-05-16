import { AdminTeamFiltersProps } from "./types";
import { Grid } from "@mui/material";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import SelectItemsFilter from "../../../components/FiltersArea/SelectItemFilter/SelectItemFilter";

export default function AdminTeamFilters({ onAddNew }: AdminTeamFiltersProps): JSX.Element {
    const { filters, offices } = useTypedSelector(state => state.employee);
    const { setEmployeePage, setEmployeeOfficeFilter } = useActions();

    const onSelectChanged = (newValue: string) => {
        setEmployeePage(1);
        setEmployeeOfficeFilter(Number(newValue));
    }

    return (
        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <SelectItemsFilter
                items={offices.map((o) => { return { id: o.id.toString(), name: o.name } })}
                label="Office"
                onSelectChanged={onSelectChanged}
                value={filters.officeId.toString()}
            />
            <CreateNewButton onAction={onAddNew}>+ New Employee</CreateNewButton>
        </Grid>
    )
}