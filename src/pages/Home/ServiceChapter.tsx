import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../routing";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CompanyServiceStatus } from "../../types/companyService";
import { OrderType } from "../../types/common/orderType";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import PageHeader from "../../components/PageHeader/PageHeader";
import ServicesList from "../../components/ServiceList/ServicesList";
import Spinner from "../../components/Spinner/Spinner";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import { MessageAppearance } from "../../components/Messages/types";

export default function ServiceChapter(): JSX.Element {
    const { error, serviceSearchResult, loading } = useTypedSelector(state => state.service);
    const { getServices } = useActions();
    const navigate = useNavigate();

    useEffect(() => {
        getServices(serviceSearchResult.pageSize, 1, CompanyServiceStatus.Active, OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <PageHeader
                title="Services"
                text="Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi."
            />
            {loading ?
                <Spinner /> :
                error ?
                    <ErrorMessage appearance={MessageAppearance.LARGE}>{error}</ErrorMessage> :
                    <ServicesList services={serviceSearchResult.itemList.slice(0, 3)} />
            }
            <LoadMoreButton isDisabled={error && error.length > 0} onClickHandler={() => { navigate(RouteNames.SERVICES); window.scroll(0, 0) }} >
                See All
            </LoadMoreButton>
        </>
    )
}