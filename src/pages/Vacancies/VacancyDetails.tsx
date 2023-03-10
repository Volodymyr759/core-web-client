import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ICandidate } from "../../types/candidate";
import { Box, Button, Typography } from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import VacancyApplyForm from "./VacancyApplyForm";

export default function VacancyDetailes(): JSX.Element {
    const { vacancyId } = useParams();
    const { errorVacancies, currentVacancy, loadingVacancies } = useTypedSelector(state => state.vacancy)
    const { getVacancyById } = useActions();
    const [candidate, setCandidate] = useState<ICandidate | null>(null);

    useEffect(() => {
        getVacancyById(Number(vacancyId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onApply = (candidate: ICandidate | null) => {
        setCandidate(candidate);
    }

    if (errorVacancies) return <ErrorMessage message={errorVacancies} />;

    return (
        <>
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
                {currentVacancy.description}
            </Typography>
            <Box sx={{ textAlign: 'left', marginTop: '20px' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {'Previews: ' + currentVacancy.previews}
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Button variant="outlined" size="small" onClick={() => onApply({
                    id: 0, fullName: '', email: '', phone: '', notes: '', isDismissed: false, joinedAt: new Date(), vacancyId: Number(vacancyId)
                })}>Apply</Button>
            </Box>
            {candidate && <VacancyApplyForm candidate={candidate} closeForm={onApply} openServiceForm={true} />}
        </>
    )
}
