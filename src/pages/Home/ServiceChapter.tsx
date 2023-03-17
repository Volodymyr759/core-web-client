import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/PageHeader/PageHeader";
import ServicesList from "../../components/ServiceList/ServicesList";
import Spinner from "../../components/Spinner/Spinner";
import { OrderType } from "../../types/common/orderType";
import { CompanyServiceStatus } from "../../types/companyService";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../routing";

export default function ServiceChapter(): JSX.Element {
    const { error, serviceSearchResult, loading } = useTypedSelector(state => state.service);
    const { getServices } = useActions();
    const navigate = useNavigate();

    useEffect(() => {
        getServices(serviceSearchResult.pageSize, 1, CompanyServiceStatus.Active, OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <PageHeader
                title="Services"
                text="Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi."
            />
            <ServicesList services={serviceSearchResult.itemList} />
            {loading && <Spinner />}
            <LoadMoreButton isDisabled={false} onClickHandler={() => { navigate(RouteNames.SERVICES); window.scroll(0, 0) }} >
                See All
            </LoadMoreButton>
        </>
    )
}