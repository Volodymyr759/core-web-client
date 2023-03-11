import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IEmployee } from "../../../types/employee";
import { AdminEmployeeTableProps } from "./types";
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import TablePagination from "../../../components/TablePagination/TablePagination";
import TableHeader from "../../../components/TableHeader/TableHeader";

export default function AdminEmployeeTable({ onEdit }: AdminEmployeeTableProps): JSX.Element {
    const { employeeSearchResult, error } = useTypedSelector(state => state.employee);
    const { removeEmployee, setEmployeePage } = useActions();

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
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader>
                        {['Full Name', 'Email', 'Position', 'Description', 'Avatar Url', 'Office', 'Actions'].map((header, index) =>
                            <TableCell key={index} align="center">{header}</TableCell>)}
                    </TableHeader>
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
                                            <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => removeEmployee(employee.id)} />
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
        </>
    )
}