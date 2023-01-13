import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EmployeeCard } from "./EmployeeCard";

const EmployeesList = () => {
    const { employees, loading } = useTypedSelector(state => state.employee);
    const { getAllEmployees } = useActions();

    useEffect(() => {
        getAllEmployees();
    }, [])

    return (
        <>
            {
                loading ?
                    <Spinner />
                    :
                    employees.length > 0 ?
                        <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
                            {
                                employees.map(emp => (
                                    <EmployeeCard key={emp.id} employee={emp} />
                                ))
                            }
                        </Grid>
                        :
                        <ErrorMessage message="No data." />
            }
        </>
    )
}

export default EmployeesList;