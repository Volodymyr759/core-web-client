import { Box, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { OrderType } from "../../types/common/orderType";
import EmployeeCard from "./EmployeeCard";
import { EmployeeListProps } from "./types";

export default function EmployeesList({ allowLoadMore, ...props }: EmployeeListProps): JSX.Element {
    const { error, employeeSearchResult, loading } = useTypedSelector(state => state.employee);
    const { getEmployees, loadMoreEmployees, setEmployeePage } = useActions();

    useEffect(() => {
        if (employeeSearchResult.itemList.length === 0) getEmployees(3, 1, '', 'FullName', OrderType.Ascending);
    }, [])

    const loadMoreHandler = () => {
        loadMoreEmployees(3, employeeSearchResult.currentPageNumber + 1, '', 'FullName', OrderType.Ascending);
        setEmployeePage(employeeSearchResult.currentPageNumber + 1);
    }

    if (error) return <ErrorMessage message={error} />;

    return (
        <div>
            <Grid container spacing={2} className="page-chapter-container">
                {
                    employeeSearchResult.itemList.map(emp => (
                        <EmployeeCard key={emp.id} employee={emp} />
                    ))
                }
            </Grid>
            {
                loading && <Spinner />
            }
            {
                allowLoadMore &&
                <LoadMoreButton
                    onClickHandler={loadMoreHandler}
                    isDisabled={employeeSearchResult.currentPageNumber * employeeSearchResult.pageSize >= employeeSearchResult.totalItemCount}
                >
                    {loading ? 'Loading...' : 'Load more'}
                </LoadMoreButton>
            }
        </div>
    )
}
