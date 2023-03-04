import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Grid } from "@mui/material";
import VacancyCard from "./VacancyCard";

export default function VacanciesList(): JSX.Element {
    const { vacancySearchResult } = useTypedSelector(state => state.vacancy)

    return (
        <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
            {vacancySearchResult.itemList.map(vacancy => (<VacancyCard key={vacancy.id} vacancy={vacancy} />))}
        </Grid>
    )
}
