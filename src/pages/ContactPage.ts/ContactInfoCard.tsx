import { Grid, Typography } from "@mui/material";
import { IContactInfoCardProps } from "./types";

import AutoFixHigh from "@mui/icons-material/AutoFixHigh";

export default function ContactInfoCard({ contactInfoItem }: IContactInfoCardProps): JSX.Element {
    return (
        <Grid item xs={12} md={6} textAlign='center' sx={{marginTop: '20px'}}>
            <AutoFixHigh />
            <br />
            <Typography variant="h6">
                <strong>{contactInfoItem.title}</strong>
            </Typography>
            <br />
            {
                contactInfoItem.lines.map((line) => {
                    return (
                        <Typography key={line} variant="body2">
                            {line}
                        </Typography>
                    )
                })
            }
        </Grid>
    )
}