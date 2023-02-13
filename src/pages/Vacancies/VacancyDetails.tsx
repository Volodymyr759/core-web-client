import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export default function VacancyDetailes(): JSX.Element {
    const { vacancyId } = useParams();
    const { errorVacancies, loadingVacancies, currentVacancy } = useTypedSelector(state => state.vacancy)
    const { getVacancyById } = useActions();

    useEffect(() => {
        if (!currentVacancy) getVacancyById(Number(vacancyId));
    }, [])

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
                            <Button variant="outlined" size="small">Apply</Button>
                        </Box>
                    </>
            }
            {
                loadingVacancies && <Spinner />
            }
            {
                errorVacancies && <ErrorMessage message={errorVacancies} />
            }
        </>
    )
}
