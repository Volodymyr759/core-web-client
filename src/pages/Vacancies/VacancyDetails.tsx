import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ICandidate } from "../../types/candidate";
import { Box, Button, Container, Typography } from "@mui/material";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import VacancyApplyForm from "./VacancyApplyForm";
import { MessageAppearance } from "../../components/Messages/types";
import SuccessMessage from "../../components/Messages/SuccessMessage";
import { RouteNames } from "../../routing";

export default function VacancyDetailes(): JSX.Element {
    const { vacancyId } = useParams();
    const { errorVacancies, currentVacancy, loadingVacancies } = useTypedSelector(state => state.vacancy)
    const { auth } = useTypedSelector(state => state.auth)
    const { getVacancyById, updateFavoriteVacancyStatus } = useActions();
    const [candidate, setCandidate] = useState<ICandidate | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showRemoveOrApplyButton, setShowRemoveOrApplyButton] = useState<boolean>(false); // true - Remove, false - Apply

    useEffect(() => {
        getVacancyById(Number(vacancyId));
        currentVacancy.candidates?.filter(c => c.email === auth.user.email).length > 0 ?
            setShowRemoveOrApplyButton(true) :
            setShowRemoveOrApplyButton(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentVacancy, auth.user.email])

    const onApply = (candidate: ICandidate | null) => {
        setShowSuccessMessage(false);
        try {
            setCandidate(candidate);
            setShowSuccessMessage(true);
            setShowRemoveOrApplyButton(true);
        } catch { }
    }

    const onRemove = () => {
        setShowSuccessMessage(false);
        try {
            updateFavoriteVacancyStatus(currentVacancy.candidates?.filter(c => c.email === auth.user.email)[0].id);
            setShowSuccessMessage(true);
            setShowRemoveOrApplyButton(false);
        } catch { }
    }

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
            {
                showRemoveOrApplyButton ?
                    <Box sx={{ textAlign: 'right' }} my={2}>
                        <Button
                            variant="outlined" size="small" color="error"
                            onClick={onRemove}
                        >
                            Remove
                        </Button>
                    </Box>
                    :
                    <Box sx={{ textAlign: 'right' }} my={2}>
                        <Button variant="outlined" size="small" onClick={() => onApply({
                            id: 0, fullName: auth.user.userName, email: auth.user.email,
                            phone: auth.user.phoneNumber || '', notes: '', isDismissed: false, joinedAt: new Date(), vacancyId: Number(vacancyId)
                        })}>Apply</Button>
                    </Box>
            }
            {candidate && <VacancyApplyForm candidate={candidate} closeForm={onApply} openForm={true} onSuccess={() => setShowSuccessMessage(true)} />}
            {errorVacancies && <ErrorMessage appearance={MessageAppearance.REGULAR}>{errorVacancies}</ErrorMessage>}
            {showSuccessMessage && <SuccessMessage appearance={MessageAppearance.REGULAR}>
                Successfully, go back to <Link to={RouteNames.VACANCY}>All Vacancies</Link> to continue.
            </SuccessMessage>}
        </Container>
    )
}
