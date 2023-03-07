import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { OrderType } from "../../../types/common/orderType";
import { IEmployee } from "../../../types/employee";
import { AdminEmployeeTableProps } from "./types";
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../../components/Spinner/Spinner";

export default function AdminEmployeeTable({ onEdit }: AdminEmployeeTableProps): JSX.Element {
    const { employeeSearchResult, loading, error } = useTypedSelector(state => state.employee);
    const { getEmployees, removeEmployee } = useActions();

    useEffect(() => {
        getEmployees(100, 1, '', 'FullName', OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            {
                loading ?
                    <Spinner />
                    :
                    <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {['Full Name', 'Email', 'Position', 'Description', 'Avatar Url', 'Office', 'Actions'].map((header, index) =>
                                        <TableCell key={index} align="center">{header}</TableCell>)}
                                </TableRow>
                            </TableHead>
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
                                        <TableCell align="left">
                                            <div style={{ display: 'flex' }}>
                                                <Tooltip title="Edit Employee" placement="top">
                                                    <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#0072ea' }} onClick={() => onEditHandler(employee.id)} />
                                                </Tooltip>
                                                <Divider orientation="vertical" flexItem />
                                                <Tooltip title="Remove Employee" placement="top">
                                                    <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => removeEmployee(employee.id)} />
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}