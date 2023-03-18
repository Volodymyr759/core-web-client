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
    const { error, employeeSearchResult, loading } = useTypedSelector(state => state.employee);
    const { getEmployees, loadMoreEmployees, setEmployeePage } = useActions();

    useEffect(() => {
        getEmployees(employeeSearchResult.pageSize, 1, '', 'FullName', OrderType.Ascending)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadMoreHandler = () => {
        loadMoreEmployees(3, employeeSearchResult.currentPageNumber + 1, '', 'FullName', OrderType.Ascending);
        setEmployeePage(employeeSearchResult.currentPageNumber + 1);
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="OUR TEAM"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            {loading ?
                <Spinner /> :
                error ?
                    <ErrorMessage appearance={MessageAppearance.LARGE}>{error}</ErrorMessage> :
                    <EmployeesList employees={employeeSearchResult.itemList} />
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
