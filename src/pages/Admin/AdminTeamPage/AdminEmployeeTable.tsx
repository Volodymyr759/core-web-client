import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { OrderType } from "../../../types/common/orderType";

export default function AdminEmployeeTable(): JSX.Element {
    const { employeeSearchResult, loading, error } = useTypedSelector(state => state.employee);
    const { getEmployees, removeEmployee } = useActions();

    useEffect(() => {
        getEmployees(10, 1, '', 'FullName', OrderType.Ascending);
    }, [])
    
    return(
        <>
            Here should be the table of Employees
        </>
    )
}