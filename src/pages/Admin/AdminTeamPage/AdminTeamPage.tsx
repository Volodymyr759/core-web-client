import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IEmployee } from "../../../types/employee";
import { OrderType } from "../../../types/common/orderType";
import PageHeader from "../../../components/PageHeader/PageHeader";
import AdminEmployeeForm from "./AdminEmployeeForm";
import AdminEmployeeTable from "./AdminEmployeeTable";
import CreateNewButton from "../../../components/Button/CreateNewButton";

export default function AdminTeamPage(): JSX.Element {
    const { employeeSearchResult } = useTypedSelector(state => state.employee);
    const { offices } = useTypedSelector(state => state.vacancy);
    const { getEmployees, getOfficeNameIdDtos } = useActions();
    const [employee, setEmployee] = useState<IEmployee | null>(null);

    useEffect(() => {
        getEmployees(5, employeeSearchResult.currentPageNumber, employeeSearchResult.searchCriteria, 'FullName', OrderType.Ascending);
        getOfficeNameIdDtos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeSearchResult.currentPageNumber])

    const onCreateEdit = (employee: IEmployee | null) => setEmployee(employee);

    return (
        <>
            <PageHeader title="Team Management" text="Voluptatum deleniti atque." />
            <CreateNewButton onAction={() => setEmployee({ id: 0, fullName: '', email: '', position: '', description: '', avatarUrl: '', officeId: offices[1].id })}
            >
                + Create New
            </CreateNewButton>
            <AdminEmployeeTable onEdit={onCreateEdit} />
            {employee && <AdminEmployeeForm employee={employee} closeForm={() => setEmployee(null)} />}
        </>
    )
}