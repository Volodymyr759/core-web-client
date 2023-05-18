import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IUser } from "../../../types/user";
import { OrderType } from "../../../types/common/orderType";
import { Box, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from "../../../components/TablePagination/TablePagination";
import AppAccountAvatar from "../../../components/AppAvatar/AppAccountAvatar";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";

export default function AdminUserTable(): JSX.Element {
    const { userSearchResult, sortField, error, loading } = useTypedSelector(state => state.user);
    const { setUserPage, updateUserEmailConfirmedStatus, setUserSort, setUserSortfield } = useActions();

    const sortableFields = ["UserName", "PhoneNumber", "EmailConfirmed"];

    const onChangeEmailConfirmed = (id: string): void => {
        const choosedUser = userSearchResult.itemList.find(c => c.id === id);
        const userToUpdate: IUser = { ...choosedUser };
        userToUpdate.emailConfirmed = !choosedUser.emailConfirmed;
        updateUserEmailConfirmedStatus(id, userToUpdate);
    }
    const onSortFieldHandler = (field: string) => {
        field === sortField ?
            setUserSort(userSearchResult.order === OrderType.Ascending ? OrderType.Descending : OrderType.Ascending) :
            setUserSortfield(field);
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }} className={loading ? "loading-opacity" : ""}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["UserName", "EmailConfirmed", "PhoneNumber", "Actions"].map((field) => {
                                return (
                                    <TableCell key={field} align="center">
                                        <Box className="table-header">
                                            <Typography variant="overline" gutterBottom>
                                                {field}
                                            </Typography>
                                            {sortableFields.filter(f => f === field).length > 0 &&
                                                <TableSortLabel
                                                    active={sortField === field}
                                                    direction={userSearchResult.order === OrderType.Ascending ? "asc" : "desc"}
                                                    onClick={() => onSortFieldHandler(field)}
                                                />}
                                        </Box>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userSearchResult.itemList.map((user) => (
                            <TableRow key={user.id} className='table-row' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    <AppAccountAvatar name={user.userName} email={user.email} avatarUrl={user.avatarUrl} />
                                </TableCell>
                                <TableCell align="center">
                                    <Switch checked={user.emailConfirmed} onClick={() => onChangeEmailConfirmed(user.id)} />
                                </TableCell>
                                <TableCell align="left" className="table-cell">{user.phoneNumber}</TableCell>
                                <TableCell align="center">
                                    <Box className="table-actions">
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
