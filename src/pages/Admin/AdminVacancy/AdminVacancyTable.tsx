import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminVacancyTableProps } from "./types";
import { IVacancy } from "../../../types/vacancy";
import { Badge, Divider, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from "../../../components/TablePagination/TablePagination";
import TableHeader from "../../../components/TableHeader/TableHeader";
import { useState } from "react";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";

export default function AdminVacancyTable({ onEdit }: AdminVacancyTableProps): JSX.Element {
    const { vacancySearchResult } = useTypedSelector(state => state.vacancy);
    const { removeVacancy, setVacancyPage, updateVacancyIsActiveStatus } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [vacancyIdToDelete, setVacancyIdToDelete] = useState<null | number>(null);

    const onEditHandler = (id: number) => {
        const vacancy = vacancySearchResult.itemList.find(v => v.id === id);
        const vacancyToUpdate: IVacancy = {
            id: vacancy.id,
            title: vacancy.title,
            description: vacancy.description,
            previews: vacancy.previews,
            isActive: vacancy.isActive,
            officeId: vacancy.officeId
        }
        onEdit(vacancyToUpdate);
    }

    const onChangeIsActive = (id: number) => {
        const choosedVacancy = vacancySearchResult.itemList.find(v => v.id === id);
        const vacancyToUpdate: IVacancy = { ...choosedVacancy };
        vacancyToUpdate.isActive = !choosedVacancy.isActive;
        updateVacancyIsActiveStatus(id, vacancyToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setVacancyIdToDelete(id);
        setTimeout(() => {
            setConfirmDialogOpen(true);
        }, 100);
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['Title', 'Previews', 'Is Active?', 'Office', 'Actions']} />
                    <TableBody>
                        {vacancySearchResult.itemList.map((vacancy) => {
                            return (
                                <TableRow
                                    key={vacancy.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {
                                            vacancy.candidates?.length > 0 ?
                                                <Typography gutterBottom variant="body2" component="div" sx={{ cursor: 'pointer' }} onClick={() => alert('Should redirect to list of candidates belong to the vacancy. Is not implemented yet.')}>
                                                    <Tooltip title="Show candidates (not dismissed)" placement="top">
                                                        <Badge badgeContent={vacancy.candidates?.filter((c) => c.isDismissed === false).length} color="primary">
                                                            {vacancy.title.length > 60 ? vacancy.title.substring(0, 60) + ' ...' : vacancy.title}
                                                        </Badge>
                                                    </Tooltip>
                                                </Typography>
                                                :
                                                <Typography gutterBottom variant="body2" component="div" >
                                                    {vacancy.title.length > 60 ? vacancy.title.substring(0, 60) + ' ...' : vacancy.title}
                                                </Typography>
                                        }
                                    </TableCell>
                                    <TableCell align="center">{vacancy.previews}</TableCell>
                                    <TableCell align="center" >
                                        <Switch checked={vacancy.isActive} onClick={() => onChangeIsActive(vacancy.id)} />
                                    </TableCell>
                                    <TableCell align="left">{vacancy.officeDto ? vacancy.officeDto.name : '...Please refresh the page...'}</TableCell>
                                    <TableCell align="center">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Tooltip title="Edit Vacancy" placement="top">
                                                <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#0072ea' }} onClick={() => onEditHandler(vacancy.id)} />
                                            </Tooltip>
                                            <Divider orientation="vertical" flexItem />
                                            <Tooltip title="Remove Vacancy" placement="top">
                                                <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => onDeleteHandler(vacancy.id)} />
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={Math.ceil(vacancySearchResult.totalItemCount / vacancySearchResult.pageSize)}
                onChangePage={(value: number) => setVacancyPage(value)}
            />
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={() => removeVacancy(vacancyIdToDelete)} />}
        </>
    )
}