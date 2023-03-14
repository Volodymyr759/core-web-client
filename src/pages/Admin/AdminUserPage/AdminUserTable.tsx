import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IUser } from "../../../types/user";
import { AdminUserTableProps } from "./types";
import { Divider, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableHeader from "../../../components/TableHeader/TableHeader";
import TablePagination from "../../../components/TablePagination/TablePagination";

export default function AdminUserTable({ onEdit }: AdminUserTableProps): JSX.Element {
    const { userSearchResult, loading, error } = useTypedSelector(state => state.user);
    const { getUsers, setUserPage } = useActions();

    const onChangeEmailConfirmed = (id: string): void => {
        const choosedUser = userSearchResult.itemList.find(c => c.id === id);
        const userToUpdate: IUser = { ...choosedUser };
        userToUpdate.emailConfirmed = !choosedUser.emailConfirmed;
        // updateCandidateIsDismissedStatus(id, userToUpdate);
        console.log('userToUpdate: ', userToUpdate);
    }

    const onEditHandler = (id: string) => {
        const choosedUser = userSearchResult.itemList.find(c => c.id === id);
        const userToUpdate: IUser = {
            id: choosedUser.id,
            userName: choosedUser.userName,
            email: choosedUser.email,
            emailConfirmed: choosedUser.emailConfirmed,
            phoneNumber: choosedUser.phoneNumber,
            avatarUrl: choosedUser.avatarUrl
        };
        onEdit(userToUpdate);
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['User Name', 'Email', 'Email Confirmed?', 'Phone', 'Avatar Url', 'Actions']} />
                    <TableBody>
                        {userSearchResult.itemList.map((user) => (
                            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{user.userName}</TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                <TableCell align="center">
                                    <Switch checked={user.emailConfirmed} onClick={() => onChangeEmailConfirmed(user.id)} />
                                </TableCell>
                                <TableCell align="left">{user.phoneNumber}</TableCell>
                                <TableCell align="left">{user.avatarUrl}</TableCell>
                                <TableCell align="center">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="Edit User" placement="top">
                                            <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#0072ea' }} onClick={() => onEditHandler(user.id)} />
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem />
                                        <Tooltip title="Remove User" placement="top">
                                            <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => alert("Delete is not implemented yet." + user.id)} />
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={Math.ceil(userSearchResult.totalItemCount / userSearchResult.pageSize)}
                onChangePage={(value: number) => setUserPage(value)}
            />
        </>
    )
};
