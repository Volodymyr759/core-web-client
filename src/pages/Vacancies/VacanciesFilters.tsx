import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Grid } from "@mui/material";
import SelectItemsFilter from "../../components/FiltersArea/SelectItemFilter/SelectItemFilter";
import AutocompleteFilter from "../../components/FiltersArea/AutocompleteFilter/AutocompleteFilter";

export default function VacanciesFilters(): JSX.Element {
    const { getOfficeNameIdDtos, getVacanciesTitles, setVacancyPage, setVacancyOfficeFilter, setVacancySearchCriteria } = useActions();
    const { filters, offices, titles } = useTypedSelector(state => state.vacancy);

    useEffect(() => {
        getOfficeNameIdDtos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getVacanciesTitles("", filters.officeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.officeId])

    const onSelectChanged = (newValue: string) => {
        setVacancyPage(1);
        setVacancyOfficeFilter(newValue);
    }

    function searchTitleChanged(event, values) {
        setVacancyPage(1);
        setVacancySearchCriteria(values === null ? "" : values);
    }

    return (
        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <SelectItemsFilter
                items={offices.map((o) => { return { id: o.id, name: o.name } })}
                label="Office"
                onSelectChanged={onSelectChanged}
                value={filters.officeId}
            />
            <AutocompleteFilter label="Search by title" options={titles} onSearch={(event, values) => searchTitleChanged(event, values)} />
        </Grid>
    )
}

