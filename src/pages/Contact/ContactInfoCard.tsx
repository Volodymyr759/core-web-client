import { Grid, Typography } from "@mui/material";
import { IContactInfoCardProps } from "./types";
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ContactInfoCard({ contactInfoItem }: IContactInfoCardProps): JSX.Element {

    const icons = [
        <HomeIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <LocalPhoneIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <MailOutlineIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <AccessTimeIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />
    ]

    return (
        <Grid item xs={12} md={6} className="contact-info-card" >
            {icons[contactInfoItem.icon]}
            <p className="contact-info-header">
                <strong>{contactInfoItem.title}</strong>
            </p>
            {contactInfoItem.lines.map((line) => <Typography key={line} variant="body2">{line}</Typography>)}
        </Grid>
    )
}