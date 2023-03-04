import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { VacanciesFiltersProps } from "./types";
import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export default function VacanciesFilters({ offices }: VacanciesFiltersProps): JSX.Element {
    const { getVacanciesTitles, setVacancyPage, setVacancyOfficeFilter, setVacancySearchCriteria } = useActions();
    const { filters, titles } = useTypedSelector(state => state.vacancy);

    useEffect(() => {
        getVacanciesTitles("", filters.officeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.officeId])

    const officeChanged = (event: SelectChangeEvent) => {
        setVacancyPage(1);
        setVacancyOfficeFilter(event.target.value);
        setVacancySearchCriteria("");
    }

    const searchTitleChanged = (event, values) => {
        setVacancyPage(1);
        setVacancySearchCriteria(values);
    }

    return (
        <Grid container spacing={2} sx={{ margin: '20px 0' }}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="demo-simple-select-label">Office</InputLabel>
                    <Select value={filters.officeId} label="Office" onChange={officeChanged} >
                        {offices.map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <Autocomplete
                    sx={{ textAlign: 'center!important' }}
                    freeSolo
                    disableClearable
                    options={titles.map((option) => option.value)}
                    onChange={searchTitleChanged}
                    renderInput={(params) => (
                        <TextField
                            sx={{ width: 300 }}
                            {...params}
                            label="Search by title"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </Grid>
        </Grid>
    )
}

