import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/PageHeader/PageHeader";
import Spinner from "../../components/Spinner/Spinner";
import VacanciesFilters from "./VacanciesFilters";
import VacanciesList from "./VacanciesList";

export default function VacanciesPage(): JSX.Element {
    const { errorFilters, errorVacancies, loadingFilters, loadingVacancies, vacancySearchResult, filters } = useTypedSelector(state => state.vacancy);
    const { getOfficeNameIdDtos, getVacanciesTitles, getVacancies, setVacancyPage, loadMoreVacancies } = useActions();

    useEffect(() => {
        getOfficeNameIdDtos();
        getVacanciesTitles(vacancySearchResult.searchCriteria, filters.officeId);
        getVacancies(vacancySearchResult.pageSize, vacancySearchResult.currentPageNumber, vacancySearchResult.searchCriteria,
            filters.active, filters.officeId, "Title", vacancySearchResult.order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancySearchResult.searchCriteria, filters.officeId])

    const loadMoreHandler = () => {
        loadMoreVacancies(vacancySearchResult.pageSize, vacancySearchResult.currentPageNumber + 1, vacancySearchResult.searchCriteria,
            filters.active, filters.officeId, "Title", vacancySearchResult.order)
        setVacancyPage(vacancySearchResult.currentPageNumber + 1);
    }

    if (errorFilters) return <ErrorMessage message={errorFilters} />;
    if (errorVacancies) return <ErrorMessage message={errorVacancies} />;

    return (
        <>
            <PageHeader title="OUR VACANCIES" />
            <VacanciesFilters />
            {loadingFilters && <Spinner />}
            <VacanciesList />
            {loadingVacancies && <Spinner />}
            <LoadMoreButton
                onClickHandler={loadMoreHandler}
                isDisabled={vacancySearchResult.currentPageNumber * vacancySearchResult.pageSize >= vacancySearchResult.totalItemCount}
            >
                {loadingVacancies ? 'Loading...' : 'Load more'}
            </LoadMoreButton>
        </>
    )
}
