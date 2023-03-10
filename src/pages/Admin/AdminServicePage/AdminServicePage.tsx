import { ChangeEvent, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { OrderType } from "../../../types/common/orderType";
import { CompanyServiceStatus, ICompanyService } from "../../../types/companyService";
import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminServiceTable from "./AdminServiceTable";
import AdminServiceForm from "./AdminServiceForm";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";

export default function AdminServicePage(): JSX.Element {
    const { serviceSearchResult, filters } = useTypedSelector(state => state.service);
    const { getServices, setServiceActiveFilter } = useActions();
    const [service, setService] = useState<null | ICompanyService>(null);

    useEffect(() => {
        getServices(5, serviceSearchResult.currentPageNumber, filters.active, OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceSearchResult.currentPageNumber, filters])
    
    const activeServicesFilterHandler = (checked: boolean): void => {
        checked ? setServiceActiveFilter(CompanyServiceStatus.Active) : setServiceActiveFilter(CompanyServiceStatus.All)
    }

    const onCreateEdit = (service: null | ICompanyService) => setService(service);

    return (
        <>
            <PageHeader
                title="Services Management"
                text="Voluptatum deleniti atque."
            />
            <Grid container spacing={2} sx={{ margin: '20px 0' }}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'left' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => activeServicesFilterHandler(checked)}
                                checked={filters.active === CompanyServiceStatus.Active ? true : false}
                            />}
                        label="Show only active" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                    <Button variant="contained" onClick={() => setService({ id: 0, title: '', description: '', imageUrl: '', isActive: true })}>
                        + Create New
                    </Button>
                </Grid>
            </Grid>
            <AdminServiceTable onEdit={onCreateEdit} />
            {service && <AdminServiceForm service={service} closeForm={() => setService(null)} />}
        </>
    )
}

