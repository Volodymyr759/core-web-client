import { Grid } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminVacancyFiltersProps } from "./types";
import AutocompleteFilter from "../../../components/FiltersArea/AutocompleteFilter/AutocompleteFilter";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";
import SelectItemsFilter from "../../../components/FiltersArea/SelectItemFilter/SelectItemFilter";

export default function AdminVacancyFilters({ onAddNew }: AdminVacancyFiltersProps): JSX.Element {
    const { filters, offices, titles } = useTypedSelector(state => state.vacancy);
    const { setVacancyPage, setVacancyOfficeFilter, setVacancySearchCriteria } = useActions();

    const onSelectChanged = (newValue: string) => {
        setVacancyPage(1);
        setVacancyOfficeFilter(newValue);
        setVacancySearchCriteria("");
    }

    const searchTitleChanged = (event, values) => {
        setVacancyPage(1);
        setVacancySearchCriteria(values);
    }

    return (
        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <SelectItemsFilter
                items={offices.map((o) => { return { id: o.id, name: o.name } })}
                label="Office"
                onSelectChanged={onSelectChanged}
                value={filters.officeId}
            />
            <AutocompleteFilter label="Search by title" options={titles} onSearch={searchTitleChanged} />
            <CreateNewButton onAction={onAddNew}>+ New Vacancy</CreateNewButton>
        </Grid>
    )
}