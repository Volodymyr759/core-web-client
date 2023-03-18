import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import PageHeader from "../../components/PageHeader/PageHeader";
import Spinner from "../../components/Spinner/Spinner";
import { OrderType } from "../../types/common/orderType";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../routing";
import EmployeesList from "../../components/EmployeeList/EmployeesList";
import { MessageAppearance } from "../../components/Messages/types";

export default function TeamChapter(): JSX.Element {
    const { error, employeeSearchResult, loading } = useTypedSelector(state => state.employee);
    const { getEmployees } = useActions();
    const navigate = useNavigate();

    useEffect(() => {
        getEmployees(employeeSearchResult.pageSize, 1, '', 'FullName', OrderType.Ascending)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
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
            <LoadMoreButton isDisabled={error && error.length > 0} onClickHandler={() => { navigate(RouteNames.TEAM); window.scroll(0, 0) }} >
                See All
            </LoadMoreButton>
        </>
    )
}