import { useState } from "react";
import moment from "moment";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { ICandidate } from "../../../types/candidate";
import { AdminCandidateTableProps } from "./types";
import { Box, Divider, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";
import StyledEditIcon from "../../../components/StyledIcons/StyledEditIcon";
import StyledDeleteIcon from "../../../components/StyledIcons/StyledDeleteIcon";
import TablePagination from "../../../components/TablePagination/TablePagination";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";
import { OrderType } from "../../../types/common/orderType";

export default function AdminCandidateTable({ onEdit }: AdminCandidateTableProps): JSX.Element {
    const { candidateSearchResult, sortField, error, loading } = useTypedSelector(state => state.candidate);
    const { updateCandidateIsDismissedStatus, removeCandidate, setCandidatePage, setCandidateSort, setCandidateSortfield } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [candidateIdToDelete, setCandidateIdToDelete] = useState<null | number>(null);

    const sortableFields = ["FullName", "Email", "Phone", "Notes", "IsDismissed", "JoinedAt"];

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
            vacancyId: choosedCandidate.vacancyId,
            vacancyDto: choosedCandidate.vacancyDto
        };
        onEdit(candidateToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setCandidateIdToDelete(id);
        setTimeout(() => {
            setConfirmDialogOpen(true);
        }, 100);
    }

    const onSortFieldHandler = (field: string) => {
        field === sortField ?
            setCandidateSort(candidateSearchResult.order === OrderType.Ascending ? OrderType.Descending : OrderType.Ascending) :
            setCandidateSortfield(field);
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }} className={loading ? "loading-opacity" : ""}>
                <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["FullName", "Email", "Phone", "Notes", "IsDismissed", "JoinedAt", "Vacancy", "Actions"].map((field) => {
                                return (
                                    <TableCell key={field} align="center">
                                        <Box className="table-header">
                                            <Typography variant="overline" gutterBottom>
                                                {field}
                                            </Typography>
                                            {sortableFields.filter(f => f === field).length > 0 &&
                                                <TableSortLabel
                                                    active={sortField === field}
                                                    direction={candidateSearchResult.order === OrderType.Ascending ? "asc" : "desc"}
                                                    onClick={() => onSortFieldHandler(field)}
                                                />}
                                        </Box>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidateSearchResult.itemList.map((candidate) => (
                            <TableRow key={candidate.id} className='table-row' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left" className="table-cell">{candidate.fullName}</TableCell>
                                <TableCell align="left" className="table-cell">{candidate.email}</TableCell>
                                <TableCell align="left" className="table-cell">{candidate.phone}</TableCell>
                                <TableCell align="left" className="table-cell">
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
                                <TableCell align="left" className="table-cell">{moment(candidate.joinedAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell align="left" className="table-cell">{candidate.vacancyDto?.title.length > 18 ? candidate.vacancyDto?.title.slice(0, 15).concat('...') : candidate.vacancyDto?.title}</TableCell>
                                <TableCell align="center">
                                    <Box className="table-actions">
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