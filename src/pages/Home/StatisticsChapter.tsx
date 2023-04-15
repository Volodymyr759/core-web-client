import { Grid } from '@mui/material'
import StatCard from "./StatCard"
import { statCardItems } from "./types"

export default function StatisticsChapter(): JSX.Element {
    return (
        <Grid container spacing={2} className='layout-container-grey' direction='row' justifyContent={'space-around'} alignItems={'center'}>
            {statCardItems.map((item) => <StatCard key={item.content} item={item} />)}
        </Grid>
    )
}
