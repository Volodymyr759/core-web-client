import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ServiceListProps } from "./types";
import { CompanyServiceStatus } from "../../types/companyService";
import { OrderType } from "../../types/common/orderType";
import { Grid } from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import ServiceCard from "./ServiceCard";
import LoadMoreButton from "../../components/Button/LoadMoreButton";

export default function ServicesList({ allowLoadMore }: ServiceListProps): JSX.Element {
    const { error, serviceSearchResult, loading } = useTypedSelector(state => state.service);
    const { getServices, loadMoreServices, setServicePage } = useActions();

    useEffect(() => {
        getServices(serviceSearchResult.pageSize, 1, CompanyServiceStatus.Active, OrderType.Ascending);
    }, [])

    const loadMoreHandler = () => {
        loadMoreServices(serviceSearchResult.pageSize, serviceSearchResult.currentPageNumber + 1, CompanyServiceStatus.Active, OrderType.Ascending);
        setServicePage(serviceSearchResult.currentPageNumber + 1);
    }

    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <Grid container spacing={2} className="page-chapter-container">
                {
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
                <LoadMoreButton
                    onClickHandler={loadMoreHandler}
                    isDisabled={serviceSearchResult.currentPageNumber * serviceSearchResult.pageSize >= serviceSearchResult.totalItemCount}
                >
                    {loading ? 'Loading...' : 'Load more'}
                </LoadMoreButton>
            }
        </>
    )

}