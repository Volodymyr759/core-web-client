import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IVacancy, VacancyStatus } from "../../../types/vacancy";
import VacanciesFilters from "../../Vacancies/VacanciesFilters";
import AdminVacancyForm from "./AdminVacancyForm";
import AdminVacancyTable from "./AdminVacancyTable";


export default function AdminVacancyPage(): JSX.Element {
    const { errorFilters, errorVacancies, offices, vacancySearchResult, filters } = useTypedSelector(state => state.vacancy);
    const { getOfficeNameIdDtos, getVacanciesTitles, getVacancies } = useActions();
    const [vacancy, setVacancy] = useState<IVacancy | null>(null);

    useEffect(() => {
        getOfficeNameIdDtos();
        getVacanciesTitles(vacancySearchResult.searchCriteria, filters.officeId);
        getVacancies(10, vacancySearchResult.currentPageNumber, vacancySearchResult.searchCriteria,
            VacancyStatus.All, filters.officeId, "Title", vacancySearchResult.order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancySearchResult.searchCriteria, filters.officeId, vacancySearchResult.currentPageNumber])

    const onCreateEdit = (vacancy: null | IVacancy) => {
        setVacancy(vacancy);
    }

    if (errorFilters) return <ErrorMessage message={errorFilters} />;
    if (errorVacancies) return <ErrorMessage message={errorVacancies} />;

    return (
        <>
            <PageHeader
                title="Vacancies Management"
                text="Voluptatum deleniti atque."
            />
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <VacanciesFilters offices={offices} />
                </Grid>
                <Grid item display={"flex"} alignItems={"center"} justifyContent="center" xs={4}>
                    <Button
                        variant="contained"
                        style={{ marginTop: '15px' }}
                        onClick={() => onCreateEdit({ id: 0, title: '', description: '', previews: 0, isActive: true, officeId: offices[1].id })}>
                        + Create New
                    </Button>
                </Grid>
            </Grid>

            <AdminVacancyTable onEdit={onCreateEdit} />
            {vacancy && <AdminVacancyForm vacancy={vacancy} openForm={true} closeForm={onCreateEdit} />}
        </>
    )
}