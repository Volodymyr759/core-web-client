import { Grid } from '@mui/material'
import StatCard from '../../../components/StatCard/StatCard'
import { statCardItems } from "../../../components/StatCard/types";

export default function Dashboard() {
    return (
        <>
            {/* 4-columns layout */}
            <Grid container spacing={2} mt={0} ml={0}>
                {statCardItems.map((item) =>
                    <Grid item key={item.icon} xs={12} sm={6} lg={3} sx={{ padding: "0 !important" }}
                        display="flex" justifyContent="space-between" alignItems="center">
                        <StatCard key={item.content} item={item} />
                    </Grid>
                )}
            </Grid>
            {/* 2-columns layout */}
            <Grid container spacing={2} mt={0} ml={0}>
                {statCardItems.slice(-2).map(item =>
                    <Grid item key={item.icon} xs={12} md={6} sx={{ padding: "0 !important" }}
                        display="flex" justifyContent="center" alignItems="space-between">
                        <StatCard key={item.content} item={item} />
                    </Grid>
                )}
            </Grid>
            {/* 3-columns layout */}
            <Grid container spacing={2} mt={0} ml={0}>
                {statCardItems.slice(-3).map(item =>
                    <Grid item key={item.icon} xs={12} md={4} sx={{ padding: "0 !important" }}
                        display="flex" justifyContent="center" alignItems="space-between">
                        <StatCard key={item.content} item={item} />
                    </Grid>
                )}
            </Grid>
            {/* 1-column layout */}
            <Grid container spacing={2} mt={0} ml={0}>
                <StatCard item={statCardItems[0]} />
            </Grid>
        </>
    )
}
