import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminServiceTable from "./AdminServiceTable";
import { useState } from "react";
import AdminServiceForm from "./AdminServiceForm";
import { ICompanyService } from "../../../types/companyService";
import { Button, Checkbox, FormControlLabel, Grid, SwipeableDrawer } from "@mui/material";

export default function AdminServicePage(): JSX.Element {
    const [showOnLyActiveServices, setShowOnlyActiveServices] = useState<boolean>(false);
    const [serviceFormVisible, setServiceFormVisible] = useState<boolean>(false);

    const toggleDrawer =
        (anchor: string, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setServiceFormVisible(open);
            };

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
                                onChange={() => setShowOnlyActiveServices(!showOnLyActiveServices)}
                                checked={showOnLyActiveServices} />
                        }
                        label="Show only active" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                    <Button variant="outlined" onClick={toggleDrawer('left', true)}>
                        + Create New
                    </Button>
                </Grid>
            </Grid>

            <AdminServiceTable />
            {
                serviceFormVisible &&
                <SwipeableDrawer
                    open={serviceFormVisible}
                    anchor='left'
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    <AdminServiceForm
                        currentService={{} as ICompanyService}
                        closeDrawer={() => setServiceFormVisible(false)}
                    />
                </SwipeableDrawer>
            }
        </>
    )
}