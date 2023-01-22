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
    const { error, employeeSearchResult, loading } = useTypedSelector(state => state.employee);
    const { getPublicEmployees } = useActions();
    const [employeeListState, setEmployeeListState] = useState<EmployeeListState>(initState);

    useEffect(() => {
        getPublicEmployees(employeeListState.currentPage);
        setEmployeeListState({ currentPage: employeeListState.currentPage + 1 });
    }, [])

    const changePage = () => {
        console.log('employeeListState: ', employeeListState);
        getPublicEmployees(employeeListState.currentPage);
        setEmployeeListState({ currentPage: employeeListState.currentPage + 1 });
    }

    return (
        <>
            {
                error ?
                    <ErrorMessage message={error} />
                    :
                    <>
                        <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
                            {
                                employeeSearchResult.itemList.length > 0 &&
                                employeeSearchResult.itemList.map(emp => (
                                    <EmployeeCard key={emp.id} employee={emp} />
                                ))
                            }
                        </Grid>
                        {
                            loading && <Spinner />
                        }

                        <p style={{ textAlign: 'center' }}>
                            <Button onClick={changePage}>
                                {loading ? 'Loading...' : 'Load more'}
                            </Button>
                        </p>

                    </>
            }
        </>
    )
}

export default EmployeesList;