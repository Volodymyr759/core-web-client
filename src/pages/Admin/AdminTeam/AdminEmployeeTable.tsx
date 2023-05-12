import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IEmployee } from "../../../types/employee";
import { AdminEmployeeTableProps } from "./types";
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";
import StyledEditIcon from "../../../components/StyledIcons/StyledEditIcon";
import StyledDeleteIcon from "../../../components/StyledIcons/StyledDeleteIcon";
import TableHeader from "../../../components/TableHeader/TableHeader";
import TablePagination from "../../../components/TablePagination/TablePagination";
import AppTableAvatar from "../../../components/AppAvatar/AppTableAvatar";

export default function AdminEmployeeTable({ onEdit }: AdminEmployeeTableProps): JSX.Element {
    const { employeeSearchResult, error } = useTypedSelector(state => state.employee);
    const { removeEmployee, setEmployeePage } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState<null | number>(null);

    const onEditHandler = (id: number) => {
        const choosedEmployee = employeeSearchResult.itemList.find(e => e.id === id);
        const employeeToUpdate: IEmployee = {
            id: choosedEmployee.id,
            fullName: choosedEmployee.fullName,
            email: choosedEmployee.email,
            position: choosedEmployee.position,
            description: choosedEmployee.description,
            avatarUrl: choosedEmployee.avatarUrl,
            officeId: choosedEmployee.officeId
        }
        onEdit(employeeToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setEmployeeIdToDelete(id);
        setTimeout(() => {
            setConfirmDialogOpen(true);
        }, 100);
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['Employee', 'Position', 'Description', 'Office', 'Actions']} />
                    <TableBody>
                        {employeeSearchResult.itemList.map((employee) => (
                            <TableRow key={employee.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    <AppTableAvatar name={employee.fullName} email={employee.email} avatarUrl={employee.avatarUrl} />
                                </TableCell>
                                <TableCell align="left">{employee.position}</TableCell>
                                <TableCell align="left">
                                    {employee.description.length > 18 ?
                                        employee.description.slice(0, 15).concat('...') : employee.description
                                    }
                                </TableCell>
                                <TableCell align="left">{employee.officeDto.name}</TableCell>
                                <TableCell align="center">
                                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                        <StyledEditIcon tooltipTitle="Edit Employee" onEdit={() => onEditHandler(employee.id)} />
                                        <Divider orientation="vertical" flexItem />
                                        <StyledDeleteIcon tooltipTitle="Remove Employee" onDelete={() => onDeleteHandler(employee.id)} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={Math.ceil(employeeSearchResult.totalItemCount / employeeSearchResult.pageSize)}
                onChangePage={(value: number) => setEmployeePage(value)}
            />
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={() => removeEmployee(employeeIdToDelete)} />}
        </>
    )
}