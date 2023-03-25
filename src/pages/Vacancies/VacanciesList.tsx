import { VacancyListProps } from "./types";
import { Grid } from "@mui/material";
import VacancyCard from "./VacancyCard";

export default function VacanciesList({ vacancies }: VacancyListProps): JSX.Element {
    return (
        <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
            {vacancies.map(vacancy => (<VacancyCard key={vacancy.id} vacancy={vacancy} />))}
        </Grid>
    )
}
