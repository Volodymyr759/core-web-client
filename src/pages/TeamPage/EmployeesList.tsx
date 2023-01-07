import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EmployeeCard } from "./EmployeeCard";

const EmployeesList = () => {
    const { employees, loading, error } = useTypedSelector(state => state.employee);
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
                    <Grid container spacing={2}>
                        {employees.map(emp => (
                            <EmployeeCard employee={emp} />
                        ))}
                    </Grid>
            }
        </>
    )
}

export default EmployeesList;