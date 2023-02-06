import { Box, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { VacancyCard } from "./VacancyCard";

const VacanciesList = () => {
    const { error, vacancySearchResult, loading } = useTypedSelector(state => state.vacancy)
    const { getPublicVacancies, setVacancyPage } = useActions();

    useEffect(() => {
        getPublicVacancies(vacancySearchResult.currentPageNumber);
    }, [])

    const changePage = () => {
        getPublicVacancies(vacancySearchResult.currentPageNumber + 1);
        setVacancyPage(vacancySearchResult.currentPageNumber + 1);
    }

    return (
        <>
            {
                error ?
                    <ErrorMessage message={error} />
                    :
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
                            loading && <Spinner />
                        }
                        <Box mt={5} sx={{ textAlign: 'center' }}>
                            <Button
                                onClick={changePage}
                                variant="outlined"
                                disabled={vacancySearchResult.currentPageNumber * vacancySearchResult.pageSize >= vacancySearchResult.totalItemCount}>
                                {loading ? 'Loading...' : 'Load more'}
                            </Button>
                        </Box>
                    </>
            }
        </>
    )
}

export default VacanciesList;