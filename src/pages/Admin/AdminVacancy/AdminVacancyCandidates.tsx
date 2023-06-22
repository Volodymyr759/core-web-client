import { useState } from 'react';
import moment from 'moment';
import { AdmoinVacancyCandidatesProps } from './types';
import { Box, Modal, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { updateCandidateIsDismissedStatusAxios } from '../../../api/candidate';
import { ICandidateDto } from '../../../types/candidate';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'scroll',
    maxHeight: '90%',
    display: 'block',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AdminVacancyCandidates({ vacancyCandidates, closeForm }: AdmoinVacancyCandidatesProps): JSX.Element {
    const [candidates, setCandidates] = useState<ICandidateDto[]>(vacancyCandidates);

    const onChangeIsDismissed = async (id: number): Promise<void> => {
        const choosedCandidate = vacancyCandidates.find(c => c.id === id);
        const candidateToUpdate: ICandidateDto = { ...choosedCandidate };
        candidateToUpdate.isDismissed = !choosedCandidate.isDismissed;
        await updateCandidateIsDismissedStatusAxios(id, !choosedCandidate.isDismissed);
        setCandidates(updateCandidates(candidates, candidateToUpdate));
    }

    function updateCandidates(candidates: ICandidateDto[], candidateToUpdate: ICandidateDto): Array<ICandidateDto> {
        return candidates.map((candidate: ICandidateDto) => {
            if (candidate.id === candidateToUpdate.id) return candidateToUpdate;
            return candidate;
        })
    }

    return (
        <Modal
            open={true}
            onClose={closeForm}
        >
            <Box sx={style}>
                <Typography variant="h5" component={'p'} sx={{ padding: '20px', fontWeight: 400, textAlign: 'center' }}>
                    Candidates of Vacancy
                </Typography>
                <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                    <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {["FullName", "Email", "Phone", "Notes", "IsDismissed", "JoinedAt"].map((field) => {
                                    return (
                                        <TableCell key={field} align="center">
                                            <Box className="table-header">
                                                <Typography variant="overline" gutterBottom>
                                                    {field}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.map((candidate) => (
                                <TableRow key={candidate.id} className='table-row' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left" className="table-cell">{candidate.fullName}</TableCell>
                                    <TableCell align="left" className="table-cell">{candidate.email}</TableCell>
                                    <TableCell align="left" className="table-cell">{candidate.phone}</TableCell>
                                    <TableCell align="left" className="table-cell">{candidate.notes}</TableCell>
                                    <TableCell align="left">
                                        <Switch
                                            name="isDismissed"
                                            color="error"
                                            checked={candidate.isDismissed}
                                            onClick={() => onChangeIsDismissed(candidate.id)}
                                        />
                                    </TableCell>
                                    <TableCell align="left" className="table-cell">{moment(candidate.joinedAt).format('DD/MM/YYYY')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}
