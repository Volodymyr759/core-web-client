import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminServiceTable from "./AdminServiceTable";
import { useState } from "react";
import AdminServiceForm from "./AdminServiceForm";
import { CompanyServiceStatus, ICompanyService } from "../../../types/companyService";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { OrderType } from "../../../types/common/orderType";

export default function AdminServicePage(): JSX.Element {
    const { getServices } = useActions();
    const [showOnlyActiveServices, setShowOnlyActiveServices] = useState<boolean>(false);
    const [service, setService] = useState<null | ICompanyService>(null);

    const activeServicesFiilterHandler = () => {
        const changedShowOnlyActiveServices = !showOnlyActiveServices;
        getServices(100, 1, changedShowOnlyActiveServices ? CompanyServiceStatus.Active : CompanyServiceStatus.All, OrderType.Ascending);
        setShowOnlyActiveServices(changedShowOnlyActiveServices);
    }

    const onEdit = (service: null | ICompanyService) => {
        setService(service);
    }

    return (
        <>
            <PageHeader
                title="Company Services"
                text="Voluptatum deleniti atque."
            />
            <Grid container spacing={2} sx={{ margin: '20px 0' }}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'left' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={activeServicesFiilterHandler}
                                checked={showOnlyActiveServices} />
                        }
                        label="Show only active" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                    <Button variant="contained" onClick={() => onEdit({ id: 0, title: '', description: '', imageUrl: '', isActive: true })}>
                        + Create New
                    </Button>
                </Grid>
            </Grid>
            <AdminServiceTable onEdit={onEdit} />
            {
                service &&
                <AdminServiceForm
                    service={service}
                    closeForm={onEdit}
                    openServiceForm={true}
                />
            }
        </>
    )
}

