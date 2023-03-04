import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { OrderType } from "../../types/common/orderType";
import PageHeader from "../../components/PageHeader/PageHeader";
import EmployeesList from "../../components/EmployeeList/EmployeesList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import ButtonCentered from "../../components/Button/ButtonCentered";

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

    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <PageHeader
                title="OUR TEAM"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            <EmployeesList employees={employeeSearchResult.itemList} />
            {loading && <Spinner />}
            <ButtonCentered
                onClickHandler={loadMoreHandler}
                isDisabled={employeeSearchResult.currentPageNumber * employeeSearchResult.pageSize >= employeeSearchResult.totalItemCount}
            >
                {loading ? 'Loading...' : 'Load more'}
            </ButtonCentered>
        </>
    )
}
