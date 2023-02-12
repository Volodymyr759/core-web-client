import { Box, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import EmployeeCard from "./EmployeeCard";

export default function EmployeesList(): JSX.Element {
    const { error, employeeSearchResult, loading } = useTypedSelector(state => state.employee);
    const { getEmployees, loadMoreEmployees, setEmployeePage } = useActions();

    useEffect(() => {
        if (employeeSearchResult.itemList.length === 0) getEmployees(1);
    }, [])

    const loadMoreHandler = () => {
        loadMoreEmployees(employeeSearchResult.currentPageNumber + 1);
        setEmployeePage(employeeSearchResult.currentPageNumber + 1);
    }

    if (error) return <ErrorMessage message={error} />;

    return (
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
            <Box mt={5} sx={{ textAlign: 'center' }}>
                <Button
                    onClick={loadMoreHandler}
                    variant="outlined"
                    disabled={employeeSearchResult.currentPageNumber * employeeSearchResult.pageSize >= employeeSearchResult.totalItemCount}>
                    {loading ? 'Loading...' : 'Load more'}
                </Button>
            </Box>
        </>
    )
}
