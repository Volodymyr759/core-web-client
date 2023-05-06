import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import PageHeader from "../../components/PageHeader/PageHeader";
import Spinner from "../../components/Spinner/Spinner";
import VacanciesFilters from "./VacanciesFilters";
import VacanciesList from "./VacanciesList";
import { Container } from "@mui/material";
import { MessageAppearance } from "../../components/Messages/types";

export default function VacanciesPage(): JSX.Element {
    const { errorFilters, errorVacancies, loadingVacancies, vacancySearchResult, filters } = useTypedSelector(state => state.vacancy);
    const { getVacancies, setVacancyPage, loadMoreVacancies } = useActions();

    useEffect(() => {
        getVacancies(vacancySearchResult.pageSize, vacancySearchResult.currentPageNumber, vacancySearchResult.searchCriteria,
            filters.active, filters.officeId, "Title", vacancySearchResult.order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancySearchResult.searchCriteria, filters.officeId])

    const loadMoreHandler = () => {
        loadMoreVacancies(vacancySearchResult.pageSize, vacancySearchResult.currentPageNumber + 1, vacancySearchResult.searchCriteria,
            filters.active, filters.officeId, "Title", vacancySearchResult.order)
        setVacancyPage(vacancySearchResult.currentPageNumber + 1);
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader title="Vacancies" />
            {
                errorFilters ?
                <ErrorMessage appearance={MessageAppearance.LARGE}>{errorFilters}</ErrorMessage> :
                <VacanciesFilters />
            }
            <VacanciesList vacancies={vacancySearchResult.itemList} />
            {loadingVacancies ?
                <Spinner /> :
                errorVacancies || <ErrorMessage appearance={MessageAppearance.LARGE}>{errorVacancies}</ErrorMessage>
            }
            <LoadMoreButton
                onClickHandler={loadMoreHandler}
                isDisabled={vacancySearchResult.currentPageNumber * vacancySearchResult.pageSize >= vacancySearchResult.totalItemCount}
            >
                {loadingVacancies ? 'Loading...' : 'Load more'}
            </LoadMoreButton>
        </Container>
    )
}
