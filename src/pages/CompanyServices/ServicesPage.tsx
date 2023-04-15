import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { OrderType } from "../../types/common/orderType";
import { CompanyServiceStatus } from "../../types/companyService";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import PageHeader from "../../components/PageHeader/PageHeader";
import ServicesList from "../../components/ServiceList/ServicesList";
import Spinner from "../../components/Spinner/Spinner";
import { Container } from "@mui/material";
import { MessageAppearance } from "../../components/Messages/types";

export default function ServicesPage(): JSX.Element {
    const { error, serviceSearchResult, loading } = useTypedSelector(state => state.service);
    const { getServices, loadMoreServices, setServicePage } = useActions();

    useEffect(() => {
        if (serviceSearchResult.itemList.length === 0) 
            getServices(serviceSearchResult.pageSize, 1, CompanyServiceStatus.Active, OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadMoreHandler = () => {
        loadMoreServices(serviceSearchResult.pageSize, serviceSearchResult.currentPageNumber + 1, CompanyServiceStatus.Active, OrderType.Ascending);
        setServicePage(serviceSearchResult.currentPageNumber + 1);
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Services"
                text="Shuffle works with a variety of different technologies, offering our clients a wide range of flexibility."
            />
            <ServicesList services={serviceSearchResult.itemList} />
            {loading ?
                <Spinner /> :
                error && <ErrorMessage appearance={MessageAppearance.LARGE}>{error}</ErrorMessage>
            }
            <LoadMoreButton
                onClickHandler={loadMoreHandler}
                isDisabled={serviceSearchResult.currentPageNumber * serviceSearchResult.pageSize >= serviceSearchResult.totalItemCount}
            >
                {loading ? 'Loading...' : 'Load more'}
            </LoadMoreButton>
        </Container>
    )
}
