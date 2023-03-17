import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { OrderType } from "../../../types/common/orderType";
import { ICompanyService } from "../../../types/companyService";
import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminServiceTable from "./AdminServiceTable";
import AdminServiceForm from "./AdminServiceForm";
import AdminServiceFilters from "./AdminServiceFilters";

export default function AdminServicePage(): JSX.Element {
    const { serviceSearchResult, filters } = useTypedSelector(state => state.service);
    const { getServices } = useActions();
    const [service, setService] = useState<null | ICompanyService>(null);

    useEffect(() => {
        getServices(5, serviceSearchResult.currentPageNumber, filters.active, OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceSearchResult.currentPageNumber, filters])

    const onCreateEdit = (service: null | ICompanyService) => setService(service);

    return (
        <>
            <PageHeader title="Services Management" />
            <AdminServiceFilters onAddNew={() => setService({ id: 0, title: '', description: '', imageUrl: '', isActive: true })} />
            <AdminServiceTable onEdit={onCreateEdit} />
            {service && <AdminServiceForm service={service} closeForm={() => setService(null)} />}
        </>
    )
}

