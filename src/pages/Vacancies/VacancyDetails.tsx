import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import VacancyApplyForm from "./VacancyApplyForm";

export default function VacancyDetailes(): JSX.Element {
    const { vacancyId } = useParams();
    const { errorVacancies, currentVacancy } = useTypedSelector(state => state.vacancy)
    const { getVacancyById } = useActions();
    const [loading, setLoading] = useState<boolean>(false);

    const [candidateFormvisible, setCandidateFormVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!currentVacancy) {
            setLoading(true);
            try {
                getVacancyById(Number(vacancyId));
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }
    }, [])

    const toggleDrawer =
        (anchor: string, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setCandidateFormVisible(open);
            };

    return (
        <>
            {
                currentVacancy &&
                <>
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
                        <Button variant="outlined" size="small" onClick={toggleDrawer('left', true)}>Apply</Button>
                    </Box>
                    <SwipeableDrawer
                        open={candidateFormvisible}
                        anchor='left'
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                    >
                        <VacancyApplyForm vacancyId={currentVacancy.id} closeDrawer={() => setCandidateFormVisible(false)} />
                    </SwipeableDrawer>
                </>
            }
            {
                loading && <Spinner />
            }
            {
                errorVacancies && <ErrorMessage message={errorVacancies} />
            }
        </>
    )
}
