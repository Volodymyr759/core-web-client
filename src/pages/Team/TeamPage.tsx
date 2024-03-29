import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { OrderType } from "../../types/common/orderType";
import PageHeader from "../../components/PageHeader/PageHeader";
import EmployeesList from "../../components/EmployeeList/EmployeesList";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import { Container } from "@mui/material";
import { MessageAppearance } from "../../components/Messages/types";

export default function TeamPage(): JSX.Element {
    const { error, employeeSearchResult, filters, loading } = useTypedSelector(state => state.employee);
    const { getEmployees, loadMoreEmployees, setEmployeePage } = useActions();

    useEffect(() => {
        if (employeeSearchResult.itemList.length === 0) getEmployees(employeeSearchResult.pageSize, 1, '', filters.officeId, 'FullName', OrderType.Ascending)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadMoreHandler = () => {
        loadMoreEmployees(employeeSearchResult.pageSize, employeeSearchResult.currentPageNumber + 1, '', filters.officeId, 'FullName', OrderType.Ascending);
        setEmployeePage(employeeSearchResult.currentPageNumber + 1);
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Our Team"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            <EmployeesList employees={employeeSearchResult.itemList} />
            {loading ?
                <Spinner /> :
                error && <ErrorMessage appearance={MessageAppearance.LARGE}>{error}</ErrorMessage>
            }
            <LoadMoreButton
                onClickHandler={loadMoreHandler}
                isDisabled={employeeSearchResult.currentPageNumber * employeeSearchResult.pageSize >= employeeSearchResult.totalItemCount}
            >
                {loading ? 'Loading...' : 'Load more'}
            </LoadMoreButton>
        </Container>
    )
}
