import { Grid } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminVacancyFiltersProps } from "./types";
import AutocompleteFilter from "../../../components/FiltersArea/AutocompleteFilter/AutocompleteFilter";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";
import SelectItemsFilter from "../../../components/FiltersArea/SelectItemFilter/SelectItemFilter";
import { useEffect } from "react";

export default function AdminVacancyFilters({ onAddNew }: AdminVacancyFiltersProps): JSX.Element {
    const { filters, offices, titles } = useTypedSelector(state => state.vacancy);
    const { getVacanciesOfficeNameIdDtos, setVacancyPage, setVacancyOfficeFilter, setVacancySearchCriteria } = useActions();

    useEffect(() => {
        getVacanciesOfficeNameIdDtos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const onSelectChanged = (newValue: string) => {
        setVacancyPage(1);
        setVacancyOfficeFilter(Number(newValue));
        setVacancySearchCriteria("");
    }

    const searchTitleChanged = (event, values) => {
        setVacancyPage(1);
        setVacancySearchCriteria(values);
    }

    return (
        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <SelectItemsFilter
                items={offices}
                label="Office"
                onSelectChanged={onSelectChanged}
                value={filters.officeId.toString()}
            />
            <AutocompleteFilter label="Search by title" options={titles} onSearch={searchTitleChanged} />
            <CreateNewButton onAction={onAddNew}>+ New Vacancy</CreateNewButton>
        </Grid>
    )
}