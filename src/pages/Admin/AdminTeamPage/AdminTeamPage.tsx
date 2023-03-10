import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IEmployee } from "../../../types/employee";
import { Button, Grid } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminEmployeeForm from "./AdminEmployeeForm";
import AdminEmployeeTable from "./AdminEmployeeTable";

export default function AdminTeamPage(): JSX.Element {
    const { offices } = useTypedSelector(state => state.vacancy);
    const { getOfficeNameIdDtos } = useActions();
    const [employee, setEmployee] = useState<IEmployee | null>(null);

    useEffect(() => {
        getOfficeNameIdDtos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCreateEdit = (employee: IEmployee | null) => setEmployee(employee);

    return (
        <>
            <PageHeader
                title="Team Management"
                text="Voluptatum deleniti atque."
            />
            <Grid container justifyContent={'flex-end'} spacing={2} sx={{ margin: '20px 0' }}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                    <Button variant="contained" onClick={() => setEmployee({ id: 0, fullName: '', email: '', position: '', description: '', avatarUrl: '', officeId: offices[1].id })}>
                        + Create New
                    </Button>
                </Grid>
            </Grid>
            <AdminEmployeeTable onEdit={onCreateEdit} />
            {employee && <AdminEmployeeForm employee={employee} closeForm={() => setEmployee(null)} />}
        </>
    )
}