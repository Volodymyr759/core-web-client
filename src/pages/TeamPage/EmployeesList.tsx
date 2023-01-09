import { Grid } from "@mui/material";
import { useEffect } from "react";
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
                    <Grid container spacing={2} sx={{margin: '30px 0', padding: '0', width: '100%'}}>
                        {employees.map(emp => (
                            <EmployeeCard key={emp.id} employee={emp} />
                        ))}
                    </Grid>
            }
        </>
    )
}

export default EmployeesList;