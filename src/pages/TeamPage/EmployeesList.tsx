import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EmployeeCard } from "./EmployeeCard";

interface EmployeeListState {
    currentPage: number;
}

const initState: EmployeeListState = {
    currentPage: 1
}

const EmployeesList = () => {
    const { error, employees, loading } = useTypedSelector(state => state.employee);
    const { getPublicEmployees } = useActions();
    const [employeeListState, setEmployeeListState] = useState<EmployeeListState>(initState);

    useEffect(() => {
        getPublicEmployees(employeeListState.currentPage);
        setEmployeeListState({ currentPage: employeeListState.currentPage + 1 });
    }, [])

    const loadMoreHandler = () => {
        // setEmployeeListState(prevEmployeeListState => {
        //     return { ...prevEmployeeListState, currentPage: prevEmployeeListState.currentPage + 1 }
        // });

        console.log('employeeListState: ', employeeListState);
        getPublicEmployees(employeeListState.currentPage);
        setEmployeeListState({ currentPage: employeeListState.currentPage + 1 });
    }

    return (
        <>
            {
                loading ?
                    <Spinner />
                    :
                    employees.length > 0 ?
                        <>
                            <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
                                {
                                    employees.map(emp => (
                                        <EmployeeCard key={emp.id} employee={emp} />
                                    ))
                                }
                            </Grid>
                            <Button onClick={loadMoreHandler}>
                                {loading ? 'Loading...' : 'Load more'}
                            </Button>
                        </>
                        :
                        error && <ErrorMessage message={error} />
            }
        </>
    )
}

export default EmployeesList;