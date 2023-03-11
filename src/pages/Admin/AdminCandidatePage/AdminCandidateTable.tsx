import moment from "moment";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { ICandidate } from "../../../types/candidate";
import { AdminCandidateTableProps } from "./types";
import { Divider, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from "../../../components/TablePagination/TablePagination";
import TableHeader from "../../../components/TableHeader/TableHeader";

export default function AdminCandidateTable({ onEdit }: AdminCandidateTableProps): JSX.Element {
    const { candidateSearchResult } = useTypedSelector(state => state.candidate);
    const { updateCandidateIsDismissedStatus, setCandidatePage } = useActions();

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

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['Full Name', 'Email', 'Phone', 'Notes', 'Dismissed?', 'Joined', 'Vacancy', 'Actions']} />
                    <TableBody>
                        {candidateSearchResult.itemList.map((candidate) => (
                            <TableRow key={candidate.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{candidate.fullName}</TableCell>
                                <TableCell align="left">{candidate.email}</TableCell>
                                <TableCell align="left">{candidate.phone}</TableCell>
                                <TableCell align="left">{candidate.notes.slice(0, 50).concat('...')}</TableCell>
                                <TableCell align="left">
                                    <Switch checked={candidate.isDismissed} onClick={() => onChangeIsDismissed(candidate.id)} />
                                </TableCell>
                                <TableCell align="left">{moment(candidate.joinedAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell align="left">{candidate.vacancyDto?.title.slice(0, 50).concat('...')}</TableCell>
                                <TableCell align="center">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="Edit Company Service" placement="top">
                                            <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#0072ea' }} onClick={() => onEditHandler(candidate.id)} />
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem />
                                        <Tooltip title="Remove Company Service" placement="top">
                                            <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => alert("Delete is not implemented yet." + candidate.id)} />
                                        </Tooltip>
                                    </div>
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
        </>
    )
}