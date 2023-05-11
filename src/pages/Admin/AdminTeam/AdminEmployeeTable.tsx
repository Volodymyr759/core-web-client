import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IEmployee } from "../../../types/employee";
import { AdminEmployeeTableProps } from "./types";
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import TablePagination from "../../../components/TablePagination/TablePagination";
import TableHeader from "../../../components/TableHeader/TableHeader";
import { MessageAppearance } from "../../../components/Messages/types";
import { useState } from "react";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";

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
                    <TableHeader titles={['Full Name', 'Email', 'Position', 'Description', 'Avatar Url', 'Office', 'Actions']} />
                    <TableBody>
                        {employeeSearchResult.itemList.map((employee) => (
                            <TableRow
                                key={employee.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{employee.fullName}</TableCell>
                                <TableCell align="left">{employee.email}</TableCell>
                                <TableCell align="left">{employee.position}</TableCell>
                                <TableCell align="left">{employee.description.slice(0, 15).concat('...')}</TableCell>
                                <TableCell align="left">{employee.avatarUrl.slice(0, 15).concat('...')}</TableCell>
                                <TableCell align="left">{employee.officeDto ? employee.officeDto.name : '...Please refresh the page...'}</TableCell>
                                <TableCell align="center">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="Edit Employee" placement="top">
                                            <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#0072ea' }} onClick={() => onEditHandler(employee.id)} />
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem />
                                        <Tooltip title="Remove Employee" placement="top">
                                            <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => onDeleteHandler(employee.id)} />
                                        </Tooltip>
                                    </div>
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