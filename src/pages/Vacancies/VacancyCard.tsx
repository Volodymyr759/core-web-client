import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { RouteNames } from "../../routing";
import { Props } from "./types";

export default function VacancyCard({ vacancy, ...props }: Props): JSX.Element {
    const navigate = useNavigate();
    const { setCurrentVacancy } = useActions();

    const showDetailesHandler = () => {
        setCurrentVacancy(vacancy);
        navigate(RouteNames.VACANCY_DETAILES);
    }

    return (
        <Grid item xs={12} md={4} textAlign='left'>
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {vacancy.officeDto.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <Link to={`${RouteNames.VACANCY}/${vacancy.id}`}>
                            {vacancy.title.substring(0, 15) + ' ...'}
                        </Link>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {'Previews: ' + vacancy.previews}
                    </Typography>
                    <Typography variant="body2">
                        {vacancy.description.substring(0, 20) + ' ...'}
                    </Typography>
                    <Box sx={{ textAlign: 'right' }}>
                        <Button variant="outlined" size="small" onClick={showDetailesHandler}>More...</Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
};