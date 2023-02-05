import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EmployeeCard } from "./EmployeeCard";

const EmployeesList = () => {
    const { error, employeeSearchResult, loading } = useTypedSelector(state => state.employee);
    const { getPublicEmployees, setEmployeePage } = useActions();

    useEffect(() => {
        getPublicEmployees(employeeSearchResult.currentPageNumber);
    }, [])

    const changePage = () => {
        getPublicEmployees(employeeSearchResult.currentPageNumber + 1);
        setEmployeePage(employeeSearchResult.currentPageNumber + 1);
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
                            <Button
                                onClick={changePage}
                                variant="outlined"
                                disabled={employeeSearchResult.currentPageNumber * employeeSearchResult.pageSize >= employeeSearchResult.totalItemCount}>
                                {loading ? 'Loading...' : 'Load more'}
                            </Button>
                        </p>

                    </>
            }
        </>
    )
}

export default EmployeesList;