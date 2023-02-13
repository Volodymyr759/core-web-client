import { Box, Button, Grid } from "@mui/material";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import VacancyCard from "./VacancyCard";

export default function VacanciesList(): JSX.Element {
    const { vacancySearchResult, loadingVacancies, filters } = useTypedSelector(state => state.vacancy)
    const { setVacancyPage, loadMoreVacancies } = useActions();

    const loadMoreHandler = () => {
        loadMoreVacancies(vacancySearchResult.pageSize, vacancySearchResult.currentPageNumber + 1, vacancySearchResult.searchCriteria,
            filters.active, filters.officeId, "id", vacancySearchResult.order)
        setVacancyPage(vacancySearchResult.currentPageNumber + 1);
    }

    return (
        <>
            <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
                {
                    vacancySearchResult.itemList.length > 0 &&
                    vacancySearchResult.itemList.map(vacancy => (
                        <VacancyCard key={vacancy.id} vacancy={vacancy} />
                    ))
                }
            </Grid>
            {
                loadingVacancies && <Spinner />
            }
            <Box mt={5} sx={{ textAlign: 'center' }}>
                <Button
                    onClick={loadMoreHandler}
                    variant="outlined"
                    disabled={vacancySearchResult.currentPageNumber * vacancySearchResult.pageSize >= vacancySearchResult.totalItemCount}>
                    {loadingVacancies ? 'Loading...' : 'Load more'}
                </Button>
            </Box>
        </>
    )
}
