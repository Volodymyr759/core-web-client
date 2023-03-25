import { Container } from "@mui/material";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect } from "react";
import { OrderType } from "../../types/common/orderType";
import VacanciesList from "./VacanciesList";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../components/Messages/types";
import LoadMoreButton from "../../components/Button/LoadMoreButton";

export default function FavoriteVacanciesPage(): JSX.Element {
    const { error, loading, favoriteVacancySearchResult } = useTypedSelector(state => state.favoriteVacancy);
    const { auth } = useTypedSelector(state => state.auth);
    const { getFavoriteVacancies, setFavoriteVacancyPage, loadMoreFavoriteVacancies } = useActions();

    useEffect(() => {
        getFavoriteVacancies(favoriteVacancySearchResult.pageSize, 1, auth.user.email, OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadMoreHandler = () => {
        loadMoreFavoriteVacancies(favoriteVacancySearchResult.pageSize, favoriteVacancySearchResult.currentPageNumber + 1,
            auth.user.email, OrderType.Ascending)
        setFavoriteVacancyPage(favoriteVacancySearchResult.currentPageNumber + 1);
    }

    return (
        <Container maxWidth="lg" className='layout-container'>
            <PageHeader title="Favorite Vacancies" />
            <VacanciesList vacancies={favoriteVacancySearchResult.itemList} />
            {loading ?
                <Spinner /> :
                error || <ErrorMessage appearance={MessageAppearance.LARGE}>{error}</ErrorMessage>
            }
            <LoadMoreButton
                onClickHandler={loadMoreHandler}
                isDisabled={favoriteVacancySearchResult.currentPageNumber * favoriteVacancySearchResult.pageSize >= favoriteVacancySearchResult.totalItemCount}
            >
                {loading ? 'Loading...' : 'Load more'}
            </LoadMoreButton>
        </Container>
    )
}