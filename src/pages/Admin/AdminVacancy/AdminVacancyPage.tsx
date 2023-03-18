import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IVacancy, VacancyStatus } from "../../../types/vacancy";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminVacancyFilters from "./AdminVacancyFilters";
import AdminVacancyForm from "./AdminVacancyForm";
import AdminVacancyTable from "./AdminVacancyTable";
import { MessageAppearance } from "../../../components/Messages/types";

export default function AdminVacancyPage(): JSX.Element {
    const { errorFilters, errorVacancies, offices, vacancySearchResult, filters } = useTypedSelector(state => state.vacancy);
    const { getOfficeNameIdDtos, getVacanciesTitles, getVacancies } = useActions();
    const [vacancy, setVacancy] = useState<IVacancy | null>(null);

    useEffect(() => {
        getOfficeNameIdDtos();
        getVacanciesTitles(vacancySearchResult.searchCriteria, filters.officeId);
        getVacancies(5, vacancySearchResult.currentPageNumber, vacancySearchResult.searchCriteria,
            VacancyStatus.All, filters.officeId, "Title", vacancySearchResult.order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancySearchResult.searchCriteria, filters.officeId, vacancySearchResult.currentPageNumber])

    const onCreateEdit = (vacancy: null | IVacancy) => setVacancy(vacancy);

    if (errorFilters) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{errorFilters}</ErrorMessage>;
    if (errorVacancies) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{errorVacancies}</ErrorMessage>;

    return (
        <>
            <PageHeader title="Vacancies Management" />
            <AdminVacancyFilters onAddNew={() => setVacancy({ id: 0, title: '', description: '', previews: 0, isActive: true, officeId: offices[1].id })} />
            <AdminVacancyTable onEdit={onCreateEdit} />
            {vacancy && <AdminVacancyForm vacancy={vacancy} closeForm={() => setVacancy(null)} />}
        </>
    )
}