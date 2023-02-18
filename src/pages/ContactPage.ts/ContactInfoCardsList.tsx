import { Grid } from "@mui/material";
import ContactInfoCard from "./ContactInfoCard";
import { contactInfoItems } from "./types";

export default function ContactInfoCardsList(): JSX.Element {
    return (
        <Grid container>
            {
                contactInfoItems.map((item) => {
                    return (
                        <ContactInfoCard key={item.title} contactInfoItem={item} />
                    )
                })
            }
        </Grid>
    )
}