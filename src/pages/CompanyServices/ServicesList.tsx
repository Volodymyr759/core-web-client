import { Box, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CompanyServiceStatus } from "../../types/companyService";
import { SortOrder } from "../../types/sortOrder";
import ServiceCard from "./ServiceCard";
import { ServiceListProps } from "./types";

export default function ServicesList({ allowLoadMore }: ServiceListProps): JSX.Element {
    const { errorServices, serviceSearchResult, loadingServices } = useTypedSelector(state => state.service);
    const { getServices, loadMoreServices, setServicePage } = useActions();

    useEffect(() => {
        if (serviceSearchResult.itemList.length === 0) getServices(serviceSearchResult.pageSize, 1, CompanyServiceStatus.All, SortOrder.Ascending);
    }, [])

    const loadMoreHandler = () => {
        loadMoreServices(serviceSearchResult.pageSize, serviceSearchResult.currentPageNumber + 1, CompanyServiceStatus.All, SortOrder.Ascending);
        setServicePage(serviceSearchResult.currentPageNumber + 1);
    }

    if (errorServices) return <ErrorMessage message={errorServices} />;

    return (
        <>
            <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
                {
                    serviceSearchResult.itemList.length > 0 &&
                    serviceSearchResult.itemList.map(service => (
                        <ServiceCard key={service.id} companyService={service} />
                    ))
                }
            </Grid>
            {
                loadingServices && <Spinner />
            }
            {
                allowLoadMore &&
                <Box mt={5} sx={{ textAlign: 'center' }}>
                    <Button
                        onClick={loadMoreHandler}
                        variant="outlined"
                        disabled={serviceSearchResult.currentPageNumber * serviceSearchResult.pageSize >= serviceSearchResult.totalItemCount}>
                        {loadingServices ? 'Loading...' : 'Load more'}
                    </Button>
                </Box>
            }
        </>
    )

}