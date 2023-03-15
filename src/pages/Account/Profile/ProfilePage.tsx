import { Container, Grid } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import ProfileForm from "./ProfileForm";

export default function ProfilePage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Profile"
                text="Magnam dolores commodi suscipit"
            />
            <Grid container direction="column" alignItems="center">
                <ProfileForm />
            </Grid>
        </Container>
    )
}