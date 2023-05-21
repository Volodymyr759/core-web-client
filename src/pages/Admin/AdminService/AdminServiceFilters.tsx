import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { CompanyServiceStatus } from "../../../types/companyService"
import { AdminServiceFiltersProps } from "./types";
import { Grid } from "@mui/material"
import CheckBoxFilter from "../../../components/FiltersArea/CheckBoxFilter/CheckBoxFilter";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";

export default function AdminServiceFilters({ onAddNew }: AdminServiceFiltersProps): JSX.Element {
    const { filters } = useTypedSelector(state => state.service);
    const { setServiceActiveFilter } = useActions();

    const activeServicesFilterHandler = (checked: boolean): void => {
        checked ? setServiceActiveFilter(CompanyServiceStatus.Active) : setServiceActiveFilter(CompanyServiceStatus.All);
    }

    return (
        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <CheckBoxFilter label="Active" onCheck={activeServicesFilterHandler} isChecked={filters.active === CompanyServiceStatus.Active ? true : false} />
            <CreateNewButton onAction={onAddNew}>+ Create New</CreateNewButton>
        </Grid>
    )
}