import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IVacancy } from "../../types/vacancy";
import { ICandidate } from "../../types/candidate";
import { RouteNames } from "../../routing";
import { getVacancyByIdAxios } from "../../api/vacancy";
import { Box, Button, Container, Typography } from "@mui/material";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import VacancyApplyForm from "./VacancyApplyForm";
import { MessageAppearance } from "../../components/Messages/types";
import SuccessMessage from "../../components/Messages/SuccessMessage";

export default function VacancyDetailes(): JSX.Element {
    const { vacancyId } = useParams();
    const { errorVacancies } = useTypedSelector(state => state.vacancy)
    const { auth } = useTypedSelector(state => state.auth)
    const { updateFavoriteVacancyStatus } = useActions();
    const [candidate, setCandidate] = useState<ICandidate | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showRemoveOrApplyButton, setShowRemoveOrApplyButton] = useState<boolean>(false); // true - Remove, false - Apply
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [currentVacancy, setCurrentVacancy] = useState<IVacancy>(null);

    const getVacancy = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const vacancy = await getVacancyByIdAxios(id);
            setCurrentVacancy(vacancy);
        } catch (error) {
            setError(error.message || 'Unknown server error.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getVacancy(Number(vacancyId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        currentVacancy &&
            currentVacancy.candidates?.filter(c => c.email === auth.user.email).length > 0 ?
            setShowRemoveOrApplyButton(true) :
            setShowRemoveOrApplyButton(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentVacancy])

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
            {loading ? <Spinner />
                :
                error ? <ErrorMessage appearance={MessageAppearance.LARGE}>{error}</ErrorMessage>
                    :
                    currentVacancy ?
                        <div>
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
                                        <Button variant="outlined" size="small" color="error" onClick={onRemove}>Remove</Button>
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
                        </div>
                        :
                        <ErrorMessage appearance={MessageAppearance.LARGE}>'Oops! Something went wrong.'</ErrorMessage>
            }
        </Container>
    )
}
