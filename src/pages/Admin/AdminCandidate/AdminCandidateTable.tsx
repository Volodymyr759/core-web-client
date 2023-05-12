import { useState } from "react";
import moment from "moment";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { ICandidate } from "../../../types/candidate";
import { AdminCandidateTableProps } from "./types";
import { Box, Divider, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";
import StyledEditIcon from "../../../components/StyledIcons/StyledEditIcon";
import StyledDeleteIcon from "../../../components/StyledIcons/StyledDeleteIcon";
import TableHeader from "../../../components/TableHeader/TableHeader";
import TablePagination from "../../../components/TablePagination/TablePagination";

export default function AdminCandidateTable({ onEdit }: AdminCandidateTableProps): JSX.Element {
    const { candidateSearchResult } = useTypedSelector(state => state.candidate);
    const { updateCandidateIsDismissedStatus, removeCandidate, setCandidatePage } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [candidateIdToDelete, setCandidateIdToDelete] = useState<null | number>(null);

    const onChangeIsDismissed = (id: number): void => {
        const choosedCandidate = candidateSearchResult.itemList.find(c => c.id === id);
        const candidateToUpdate: ICandidate = { ...choosedCandidate };
        candidateToUpdate.isDismissed = !choosedCandidate.isDismissed;
        updateCandidateIsDismissedStatus(id, candidateToUpdate);
    }

    const onEditHandler = (id: number) => {
        const choosedCandidate = candidateSearchResult.itemList.find(c => c.id === id);
        const candidateToUpdate: ICandidate = {
            id: choosedCandidate.id,
            fullName: choosedCandidate.fullName,
            email: choosedCandidate.email,
            phone: choosedCandidate.phone,
            notes: choosedCandidate.notes,
            isDismissed: choosedCandidate.isDismissed,
            joinedAt: choosedCandidate.joinedAt,
            vacancyId: choosedCandidate.vacancyId
        };
        onEdit(candidateToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setCandidateIdToDelete(id);
        setTimeout(() => {
            setConfirmDialogOpen(true);
        }, 100);
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['Full Name', 'Email', 'Phone', 'Notes', 'Dismissed?', 'Joined', 'Vacancy', 'Actions']} />
                    <TableBody>
                        {candidateSearchResult.itemList.map((candidate) => (
                            <TableRow key={candidate.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{candidate.fullName}</TableCell>
                                <TableCell align="left">{candidate.email}</TableCell>
                                <TableCell align="left">{candidate.phone}</TableCell>
                                <TableCell align="left">
                                    {candidate.notes.length > 53 ?
                                        candidate.notes.slice(0, 50).concat('...') : candidate.notes
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    <Switch
                                        color="error"
                                        checked={candidate.isDismissed}
                                        onClick={() => onChangeIsDismissed(candidate.id)}
                                    />
                                </TableCell>
                                <TableCell align="left">{moment(candidate.joinedAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell align="left">{candidate.vacancyDto?.title.length > 50 ? candidate.vacancyDto?.title.slice(0, 50).concat('...') : candidate.vacancyDto?.title}</TableCell>
                                <TableCell align="center">
                                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                        <StyledEditIcon tooltipTitle="Edit Candidate" onEdit={() => onEditHandler(candidate.id)} />
                                        <Divider orientation="vertical" flexItem />
                                        <StyledDeleteIcon tooltipTitle="Remove Candidate" onDelete={() => onDeleteHandler(candidate.id)} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={Math.ceil(candidateSearchResult.totalItemCount / candidateSearchResult.pageSize)}
                onChangePage={(value: number) => setCandidatePage(value)}
            />
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={() => removeCandidate(candidateIdToDelete)} />}
        </>
    )
}