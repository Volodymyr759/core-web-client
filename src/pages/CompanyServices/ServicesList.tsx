import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ServiceListProps } from "./types";
import { CompanyServiceStatus } from "../../types/companyService";
import { OrderType } from "../../types/common/orderType";
import { Box, Button, Grid } from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import ServiceCard from "./ServiceCard";

export default function ServicesList({ allowLoadMore }: ServiceListProps): JSX.Element {
    const { error, serviceSearchResult, loading } = useTypedSelector(state => state.service);
    const { getServices, loadMoreServices, setServicePage } = useActions();

    useEffect(() => {
        if (serviceSearchResult.itemList.length === 0) getServices(serviceSearchResult.pageSize, 1, CompanyServiceStatus.Active, OrderType.Ascending);
    }, [])

    const loadMoreHandler = () => {
        loadMoreServices(serviceSearchResult.pageSize, serviceSearchResult.currentPageNumber + 1, CompanyServiceStatus.Active, OrderType.Ascending);
        setServicePage(serviceSearchResult.currentPageNumber + 1);
    }

    if (error) return <ErrorMessage message={error} />;

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
                loading && <Spinner />
            }
            {
                allowLoadMore &&
                <Box mt={5} sx={{ textAlign: 'center' }}>
                    <Button
                        onClick={loadMoreHandler}
                        variant="outlined"
                        disabled={serviceSearchResult.currentPageNumber * serviceSearchResult.pageSize >= serviceSearchResult.totalItemCount}>
                        {loading ? 'Loading...' : 'Load more'}
                    </Button>
                </Box>
            }
        </>
    )

}