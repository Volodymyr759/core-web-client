import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IVacancy, VacancyStatus } from "../../../types/vacancy";
import AdminVacancyFilters from "./AdminVacancyFilters";
import AdminVacancyForm from "./AdminVacancyForm";
import AdminVacancyTable from "./AdminVacancyTable";

export default function AdminVacancyPage(): JSX.Element {
    const { offices, vacancySearchResult, filters, sortField } = useTypedSelector(state => state.vacancy);
    const { getVacanciesOfficeNameIdDtos, getVacanciesTitles, getVacancies } = useActions();
    const [vacancy, setVacancy] = useState<IVacancy | null>(null);

    useEffect(() => {
        getVacanciesOfficeNameIdDtos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getVacanciesTitles(vacancySearchResult.searchCriteria, filters.officeId);
        getVacancies(5, vacancySearchResult.currentPageNumber, vacancySearchResult.searchCriteria,
            VacancyStatus.All, filters.officeId, sortField, vacancySearchResult.order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancySearchResult.searchCriteria, filters.officeId, vacancySearchResult.currentPageNumber, sortField, vacancySearchResult.order])

    const onCreateEdit = (vacancy: null | IVacancy) => setVacancy(vacancy);

    return (
        <>
            <AdminVacancyFilters onAddNew={() => setVacancy({ id: 0, title: '', description: 'Vacancy Description', previews: 0, isActive: true, officeId: offices[1].id })} />
            <AdminVacancyTable onEdit={onCreateEdit} />
            {vacancy && <AdminVacancyForm vacancy={vacancy} closeForm={() => setVacancy(null)} />}
        </>
    )
}