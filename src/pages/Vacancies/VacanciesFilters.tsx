import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getPublicOfficeNameIdsAxios } from "../../api/office";
import { searchVacanciesTitlesAxios } from "../../api/vacancy";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { OfficeNameIdDto, VacancyTitleDto } from "./types";

const VacanciesFilters = () => {
    const [offices, setOffices] = useState<OfficeNameIdDto[]>([]);
    const [titles, setTitles] = useState<VacancyTitleDto[]>([]);

    const { setVacancyPage, setVacancyOfficeFilter, setVacancySearchCriteria, clearVacancies, getVacancies } = useActions();
    const { vacancySearchResult, filters } = useTypedSelector(state => state.vacancy);

    useEffect(() => {
        const getOffices = async () => {
            const officesFromApi = await getPublicOfficeNameIdsAxios();
            officesFromApi.unshift({ id: 0, name: "All offices" });
            setOffices(officesFromApi);
        };
        const getVacancyTitles = async () => {
            const vacancyTitlesFromApi = await searchVacanciesTitlesAxios("");
            setTitles(vacancyTitlesFromApi);
        }
        getOffices();
        getVacancyTitles();
    }, [])

    const officeChanged = (event: SelectChangeEvent) => {
        clearVacancies();
        setVacancyPage(1);
        setVacancyOfficeFilter(event.target.value);
        setVacancySearchCriteria("");
        getVacancies(vacancySearchResult.pageSize, 1, "",
            filters.active, event.target.value, "id", vacancySearchResult.order)
    }

    const searchTitleChanged = (event, values) => {
        clearVacancies();
        setVacancyPage(1);
        setVacancyOfficeFilter("0");
        getVacancies(vacancySearchResult.pageSize, 1, values,
            filters.active, "0", "id", vacancySearchResult.order)
    }

    return (
        <Grid container spacing={2} sx={{ margin: '20px 0' }}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="demo-simple-select-label">Office</InputLabel>
                    <Select
                        value={filters.officeId}
                        label="Office"
                        onChange={officeChanged}
                    >
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

export default VacanciesFilters;
