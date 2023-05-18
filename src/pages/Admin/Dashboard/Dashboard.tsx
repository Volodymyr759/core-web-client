import { Grid } from '@mui/material'
import StatCard from '../../../components/StatCard/StatCard'
import { statCardItems } from "../../../components/StatCard/types";
import ImageCard from '../../../components/ImageCard/ImageCard';

const imageCardChartItems = [
    {
        id: 1,
        url: "https://lh5.googleusercontent.com/p/AF1QipP8bDoR-Rzo6bqJVx210DrHod6MCaHbdkD9mGmH=w548-h318-n-k-no",
        alt: "Country Image",
        title: "Ukraine",
        subtitle: "Main Office",
        content: "Main office description"
    },
    {
        id: 3,
        url: "https://lh5.googleusercontent.com/p/AF1QipNgwKznOsp4It9oyzyxIm5IpiDtjK5qLEbwtOSh=w548-h318-n-k-no",
        alt: "Country Image",
        title: "USA",
        subtitle: "Developer Office",
        content: "USA office description"
    }
]

const imageCardCountryItems = [
    {
        id: 1,
        url: "https://lh5.googleusercontent.com/p/AF1QipP8bDoR-Rzo6bqJVx210DrHod6MCaHbdkD9mGmH=w548-h318-n-k-no",
        alt: "Country Image",
        title: "Ukraine",
        subtitle: "Main Office",
        content: "Main office description"
    },
    {
        id: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXnG-FRe_L8wun7qQTHBDY0sLiZ_IT2r9YxjK-jjEedFpBvr5E",
        alt: "Country Image",
        title: "Australia",
        subtitle: "Developer Office",
        content: "Australian office description"
    },
    {
        id: 3,
        url: "https://lh5.googleusercontent.com/p/AF1QipNgwKznOsp4It9oyzyxIm5IpiDtjK5qLEbwtOSh=w548-h318-n-k-no",
        alt: "Country Image",
        title: "USA",
        subtitle: "Developer Office",
        content: "USA office description"
    }
]

export default function Dashboard() {
    return (
        <>
            <Grid container spacing={2} mt={0} ml={0}>
                {statCardItems.map((item) =>
                    <Grid item key={item.icon} xs={12} sm={6} lg={3} sx={{ padding: "0 !important" }}
                        display="flex" justifyContent="space-between" alignItems="center">
                        <StatCard key={item.content} item={item} />
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={2} mt={0} ml={0}>
                {imageCardChartItems.map(item =>
                    <Grid item key={item.id} xs={12} md={6} sx={{ padding: "0 !important" }}
                        display="flex" justifyContent="center" alignItems="space-between">
                        <ImageCard
                            imageUrl={item.url}
                            altAttribute={item.alt}
                            title={item.title}
                            subTitle={item.subtitle}
                            content={item.content}
                        />
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={2} mt={0} ml={0}>
                {imageCardCountryItems.map(item =>
                    <Grid item key={item.id} xs={12} md={4} sx={{ padding: "0 !important" }}
                        display="flex" justifyContent="center" alignItems="space-between">
                        <ImageCard
                            imageUrl={item.url}
                            altAttribute={item.alt}
                            title={item.title}
                            subTitle={item.subtitle}
                            content={item.content}
                        />
                    </Grid>
                )}
            </Grid>
        </>
    )
}
