import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../routing";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { VacancyCardProps } from "./types";
import { Badge, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function VacancyCard({ vacancy }: VacancyCardProps): JSX.Element {
    const navigate = useNavigate();
    const { setCurrentVacancy, incrementPreviews } = useActions();
    const { auth } = useTypedSelector(state => state.auth);

    const showDetailesHandler = () => {
        incrementPreviews(vacancy.id, vacancy.previews + 1);
        setCurrentVacancy(vacancy);
        navigate(RouteNames.VACANCY + `/${vacancy.id}`);
    }

    return (
        <Grid item xs={12} md={4} textAlign='left'>
            <Card>
                <CardContent>
                    <Grid container direction="column" justifyContent="center" alignItems="stretch">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {vacancy.officeDto.name}
                            </Typography>
                            {
                                auth && vacancy.candidates?.filter(c => c.email === auth.user.email).length > 0 && <FavoriteIcon color="primary" />
                            }
                        </Grid>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {vacancy.officeDto.address}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" sx={{ cursor: 'pointer' }} onClick={showDetailesHandler}>
                            <Badge badgeContent={vacancy.previews} color="primary">
                                {vacancy.title.substring(0, 15) + ' ...'}
                            </Badge>
                        </Typography>

                        <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                            <div>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {'Previews: ' + vacancy.previews}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {'Candidates: ' + vacancy.candidates?.length}
                                </Typography>
                            </div>
                            <div>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Button variant="outlined" size="small" onClick={showDetailesHandler}>More...</Button>
                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
};