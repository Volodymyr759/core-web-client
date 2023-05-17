import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IEmployee } from "../../../types/employee";
import { AdminEmployeeTableProps } from "./types";
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";
import StyledEditIcon from "../../../components/StyledIcons/StyledEditIcon";
import StyledDeleteIcon from "../../../components/StyledIcons/StyledDeleteIcon";
import TablePagination from "../../../components/TablePagination/TablePagination";
import AppAccountAvatar from "../../../components/AppAvatar/AppAccountAvatar";
import { OrderType } from "../../../types/common/orderType";

export default function AdminEmployeeTable({ onEdit }: AdminEmployeeTableProps): JSX.Element {
    const { employeeSearchResult, sortField, error, loading } = useTypedSelector(state => state.employee);
    const { removeEmployee, setEmployeePage, setEmployeeSort, setEmployeeSortfield } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState<null | number>(null);

    const sortableFields = ["FullName", "Position", "Description"];

    const onEditHandler = (id: number) => {
        const choosedEmployee = employeeSearchResult.itemList.find(e => e.id === id);
        const employeeToUpdate: IEmployee = {
            id: choosedEmployee.id,
            fullName: choosedEmployee.fullName,
            email: choosedEmployee.email,
            position: choosedEmployee.position,
            description: choosedEmployee.description,
            avatarUrl: choosedEmployee.avatarUrl,
            officeId: choosedEmployee.officeId,
            officeDto: choosedEmployee.officeDto
        }
        onEdit(employeeToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setEmployeeIdToDelete(id);
        setTimeout(() => {
            setConfirmDialogOpen(true);
        }, 100);
    }

    const onSortFieldHandler = (field: string) => {
        field === sortField ?
            setEmployeeSort(employeeSearchResult.order === OrderType.Ascending ? OrderType.Descending : OrderType.Ascending) :
            setEmployeeSortfield(field);
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }} className={loading ? "loading-opacity" : ""}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["FullName", "Position", "Description", "Office", "Actions"].map((field) => {
                                return (
                                    <TableCell key={field}>
                                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ cursor: "pointer" }}>
                                            <Typography variant="overline" gutterBottom>
                                                {field}
                                            </Typography>
                                            {sortableFields.filter(f => f === field).length > 0 &&
                                                <TableSortLabel
                                                    active={sortField === field}
                                                    direction={employeeSearchResult.order === OrderType.Ascending ? "asc" : "desc"}
                                                    onClick={() => onSortFieldHandler(field)}
                                                />}
                                        </Box>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeSearchResult.itemList.map((employee) => (
                            <TableRow key={employee.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    <AppAccountAvatar name={employee.fullName} email={employee.email} avatarUrl={employee.avatarUrl} />
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