import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { OrderType } from "../../types/common/orderType";
import { CompanyServiceStatus } from "../../types/companyService";
import ButtonCentered from "../../components/Button/ButtonCentered";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/PageHeader/PageHeader";
import ServicesList from "../../components/ServiceList/ServicesList";
import Spinner from "../../components/Spinner/Spinner";

export default function ServicesPage(): JSX.Element {
    const { error, serviceSearchResult, loading } = useTypedSelector(state => state.service);
    const { getServices, loadMoreServices, setServicePage } = useActions();

    useEffect(() => {
        getServices(serviceSearchResult.pageSize, 1, CompanyServiceStatus.Active, OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadMoreHandler = () => {
        loadMoreServices(serviceSearchResult.pageSize, serviceSearchResult.currentPageNumber + 1, CompanyServiceStatus.Active, OrderType.Ascending);
        setServicePage(serviceSearchResult.currentPageNumber + 1);
    }

    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <PageHeader
                title="OUR SERVICES"
                text="Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi."
            />
            <ServicesList services={serviceSearchResult.itemList} />
            {
                loading && <Spinner />
            }
            <ButtonCentered
                onClickHandler={loadMoreHandler}
                isDisabled={serviceSearchResult.currentPageNumber * serviceSearchResult.pageSize >= serviceSearchResult.totalItemCount}
            >
                {loading ? 'Loading...' : 'Load more'}
            </ButtonCentered>
        </>
    )
}
