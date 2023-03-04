import { useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/PageHeader/PageHeader";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import VacanciesFilters from "./VacanciesFilters";
import VacanciesList from "./VacanciesList";

export default function VacanciesPage(): JSX.Element {
    const { errorFilters, errorVacancies, loadingFilters, loadingVacancies,
        offices, titles, vacancySearchResult, filters } = useTypedSelector(state => state.vacancy);
    const { getOfficeNameIdDtos, getVacanciesTitles, getVacancies } = useActions();

    useEffect(() => {
        if (offices.length === 0) getOfficeNameIdDtos();// load offices
        if (titles.length === 0) getVacanciesTitles("");// load titles
        if (vacancySearchResult.itemList.length === 0) getVacancies(vacancySearchResult.pageSize, 1, "",
            filters.active, filters.officeId, "id", vacancySearchResult.order);// load vacancies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <PageHeader
                title="OUR VACANCIES"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate."
            />
            {
                loadingFilters ?
                    <Spinner /> :
                    errorFilters ? <ErrorMessage message={errorFilters} /> :
                        <VacanciesFilters />
            }
            {
                loadingVacancies ?
                    <Spinner /> :
                    errorVacancies ? <ErrorMessage message={errorVacancies} /> :
                        <VacanciesList />
            }
        </>
    )
}
