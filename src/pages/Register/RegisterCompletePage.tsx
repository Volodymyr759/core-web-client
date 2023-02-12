import { Paper, Typography } from "@mui/material"
import PageHeader from "../../components/PageHeader/PageHeader"

export default function RegisterCompletePage(): JSX.Element {
    return (
        <>
            <PageHeader
                title="Registration successful."
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '30px 0' }}>
                <Paper elevation={16} sx={{ padding: '20px' }}>
                    <Typography component={'p'} sx={{ padding: '30px 0' }}>
                        Please check your mail-box and confirm the email-address before login.
                    </Typography>
                </Paper>
            </div>
        </>
    )
}