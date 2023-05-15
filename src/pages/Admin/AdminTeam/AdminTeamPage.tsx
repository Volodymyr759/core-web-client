import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IEmployee } from "../../../types/employee";
import AdminEmployeeForm from "./AdminEmployeeForm";
import AdminEmployeeTable from "./AdminEmployeeTable";
import AdminTeamFilters from "./AdminTeamFilters";

export default function AdminTeamPage(): JSX.Element {
    const { employeeSearchResult, sortField } = useTypedSelector(state => state.employee);
    const { offices } = useTypedSelector(state => state.vacancy);
    const { getEmployees, getOfficeNameIdDtos } = useActions();
    const [employee, setEmployee] = useState<IEmployee | null>(null);

    useEffect(() => {
        getEmployees(employeeSearchResult.pageSize, employeeSearchResult.currentPageNumber, employeeSearchResult.searchCriteria, sortField, employeeSearchResult.order);
        getOfficeNameIdDtos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeSearchResult.currentPageNumber, employeeSearchResult.order, sortField])

    const onCreateEdit = (employee: IEmployee | null) => setEmployee(employee);

    return (
        <>
            <AdminTeamFilters onAddNew={() => setEmployee({ id: 0, fullName: '', email: '', position: '', description: '', avatarUrl: '', officeId: offices[1].id })} />
            <AdminEmployeeTable onEdit={onCreateEdit} />
            {employee && <AdminEmployeeForm employee={employee} closeForm={() => setEmployee(null)} />}
        </>
    )
}