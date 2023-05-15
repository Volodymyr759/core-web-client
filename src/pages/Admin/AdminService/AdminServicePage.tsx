import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ICompanyService } from "../../../types/companyService";
import AdminServiceTable from "./AdminServiceTable";
import AdminServiceForm from "./AdminServiceForm";
import AdminServiceFilters from "./AdminServiceFilters";

export default function AdminServicePage(): JSX.Element {
    const { serviceSearchResult, filters, sortField } = useTypedSelector(state => state.service);
    const { getServices } = useActions();
    const [service, setService] = useState<null | ICompanyService>(null);

    useEffect(() => {
        getServices(serviceSearchResult.pageSize, serviceSearchResult.currentPageNumber, filters.active, sortField, serviceSearchResult.order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceSearchResult.currentPageNumber, filters, serviceSearchResult.order, sortField])

    const onCreateEdit = (service: null | ICompanyService) => setService(service);

    return (
        <>
            <AdminServiceFilters onAddNew={() => setService({ id: 0, title: '', description: '', imageUrl: '', isActive: true })} />
            <AdminServiceTable onEdit={onCreateEdit} />
            {service && <AdminServiceForm service={service} closeForm={() => setService(null)} />}
        </>
    )
}

