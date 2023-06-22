import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IVacancy, VacancyStatus } from "../../../types/vacancy";
import AdminVacancyFilters from "./AdminVacancyFilters";
import AdminVacancyForm from "./AdminVacancyForm";
import AdminVacancyTable from "./AdminVacancyTable";
import { ICandidateDto } from "../../../types/candidate";
import AdminVacancyCandidates from "./AdminVacancyCandidates";

export default function AdminVacancyPage(): JSX.Element {
    const { offices, vacancySearchResult, filters, sortField } = useTypedSelector(state => state.vacancy);
    const { getVacanciesTitles, getVacancies } = useActions();
    const [vacancy, setVacancy] = useState<IVacancy | null>(null);
    const [vacancyCandidates, setVacancyCandidates] = useState<ICandidateDto[] | null>(null);

    useEffect(() => {
        getVacanciesTitles(vacancySearchResult.searchCriteria, filters.officeId);
        getVacancies(10, vacancySearchResult.currentPageNumber, vacancySearchResult.searchCriteria,
            VacancyStatus.All, filters.officeId, sortField, vacancySearchResult.order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancySearchResult.searchCriteria, filters.officeId, vacancySearchResult.currentPageNumber, sortField, vacancySearchResult.order])

    const onCreateEdit = (vacancy: null | IVacancy) => setVacancy(vacancy);

    const onShowVacancyCandidates = (vacancy: null | IVacancy): void => {
        if (!vacancy.candidates) return;
        setVacancyCandidates(vacancy.candidates && vacancy.candidates);
    }

    return (
        <>
            <AdminVacancyFilters onAddNew={() => setVacancy({ id: 0, title: '', description: 'Vacancy Description', previews: 0, isActive: true, officeId: offices[1].id })} />
            <AdminVacancyTable onEdit={onCreateEdit} onShowCandidates={onShowVacancyCandidates} />
            {vacancy && <AdminVacancyForm vacancy={vacancy} closeForm={() => setVacancy(null)} />}
            {vacancyCandidates && <AdminVacancyCandidates vacancyCandidates={vacancyCandidates} closeForm={() => setVacancyCandidates(null)} />}
        </>
    )
}