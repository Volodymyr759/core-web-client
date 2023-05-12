import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IUser } from "../../../types/user";
import { Box, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import TableHeader from "../../../components/TableHeader/TableHeader";
import TablePagination from "../../../components/TablePagination/TablePagination";
import AppTableAvatar from "../../../components/AppAvatar/AppTableAvatar";

export default function AdminUserTable(): JSX.Element {
    const { userSearchResult } = useTypedSelector(state => state.user);
    const { setUserPage, updateUserEmailConfirmedStatus } = useActions();

    const onChangeEmailConfirmed = (id: string): void => {
        const choosedUser = userSearchResult.itemList.find(c => c.id === id);
        const userToUpdate: IUser = { ...choosedUser };
        userToUpdate.emailConfirmed = !choosedUser.emailConfirmed;
        updateUserEmailConfirmedStatus(id, userToUpdate);
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['Username', 'Email Confirmed?', 'Phone', 'Actions']} />
                    <TableBody>
                        {userSearchResult.itemList.map((user) => (
                            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    <AppTableAvatar name={user.userName} email={user.email} avatarUrl={user.avatarUrl} />
                                </TableCell>
                                <TableCell align="center">
                                    <Switch checked={user.emailConfirmed} onClick={() => onChangeEmailConfirmed(user.id)} />
                                </TableCell>
                                <TableCell align="left">{user.phoneNumber}</TableCell>
                                <TableCell align="center">
                                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="Remove User" placement="top">
                                            <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => alert("Delete is not implemented yet." + user.id)} />
                                        </Tooltip>
                                    </Box>
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
