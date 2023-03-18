import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ICandidate } from "../../types/candidate";
import { Box, Button, Container, Snackbar, Typography } from "@mui/material";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import VacancyApplyForm from "./VacancyApplyForm";

export default function VacancyDetailes(): JSX.Element {
    const { vacancyId } = useParams();
    const { errorVacancies, currentVacancy, loadingVacancies } = useTypedSelector(state => state.vacancy)
    const { auth } = useTypedSelector(state => state.auth)
    const { getVacancyById } = useActions();
    const [candidate, setCandidate] = useState<ICandidate | null>(null);
    const[snackbarOpened, setSnackbarOpened] = useState<boolean>(false);

    useEffect(() => {
        getVacancyById(Number(vacancyId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onApply = (candidate: ICandidate | null) => {
        setCandidate(candidate);
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbarOpened(false);
      };

    if (errorVacancies) return <ErrorMessage message={errorVacancies} />;

    return (
        <Container maxWidth="lg" className='layout-container'>
            {loadingVacancies && <Spinner />}
            <Typography variant="h4" component={'p'} sx={{ padding: '20px', fontWeight: 600, textAlign: 'center' }}>
                {currentVacancy.title}
            </Typography>
            <Box sx={{ textAlign: 'left', marginTop: '20px', marginBottom: '20px' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {'Office: ' + currentVacancy.officeDto.name}
                </Typography>
            </Box>
            <Typography variant="body2" component={'div'}>
                {ReactHtmlParser(currentVacancy.description)}
            </Typography>
            <Box sx={{ textAlign: 'left', marginTop: '20px' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {'Previews: ' + currentVacancy.previews}
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Button variant="outlined" size="small" onClick={() => onApply({
                    id: 0, 
                    fullName: auth.user.userName, 
                    email: auth.user.email, 
                    phone: auth.user.phoneNumber || '', 
                    notes: '', 
                    isDismissed: false, 
                    joinedAt: new Date(), 
                    vacancyId: Number(vacancyId)
                })}>Apply</Button>
            </Box>
            {candidate && <VacancyApplyForm candidate={candidate} closeForm={onApply} openForm={true} onSuccess={() => setSnackbarOpened(true)} />}
            <Snackbar
                open={snackbarOpened}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Successfully applied!"
            />
        </Container>
    )
}
