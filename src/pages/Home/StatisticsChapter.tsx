import { Grid } from '@mui/material'
import StatCard from "../../components/StatCard/StatCard"
import { statCardItems } from "../../components/StatCard/types"

export default function StatisticsChapter(): JSX.Element {
    return (
        <Grid container spacing={2} className='layout-container-grey' >
            {statCardItems.map((item) =>
                <Grid item key={item.icon} xs={12} sm={6} lg={3} sx={{ padding: "0 !important" }} display="flex" justifyContent="space-around" alignItems="center">
                    <StatCard key={item.content} item={item} />
                </Grid>
            )}
        </Grid>
    )
}
