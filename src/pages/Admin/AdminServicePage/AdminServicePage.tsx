import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminServiceTable from "./AdminServiceTable";
import { useState } from "react";
import AdminServiceForm from "./AdminServiceForm";
import { CompanyServiceStatus } from "../../../types/companyService";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { OrderType } from "../../../types/orderType";

export default function AdminServicePage(): JSX.Element {
    const { getServices, setCurrentService } = useActions();
    const [showOnLyActiveServices, setShowOnlyActiveServices] = useState<boolean>(false);
    const [serviceFormVisible, setServiceFormVisible] = useState<boolean>(false);

    const activeServicesFiilterHandler = () => {
        const changedShowOmlyActiveServices = !showOnLyActiveServices;
        getServices(100, 1, changedShowOmlyActiveServices ? CompanyServiceStatus.Active : CompanyServiceStatus.All, OrderType.Ascending);
        setShowOnlyActiveServices(changedShowOmlyActiveServices);
    }

    const onCreateNewHandler = () => {
        setCurrentService(null);
        setServiceFormVisible(true);
    }

    const onCloseFormHandler = () => {
        setCurrentService(null);
        setServiceFormVisible(false);
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
                                checked={showOnLyActiveServices} />
                        }
                        label="Show only active" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                    <Button variant="contained" onClick={onCreateNewHandler}>
                        + Create New
                    </Button>
                </Grid>
            </Grid>
            <AdminServiceTable openEditForm={() => setServiceFormVisible(true)} />
            {
                serviceFormVisible &&
                <AdminServiceForm
                    closeDrawer={onCloseFormHandler}
                    openServiceForm={true}
                />
            }
        </>
    )
}