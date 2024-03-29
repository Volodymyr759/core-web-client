import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { IMailMessage } from "../../types/common/mailMessage";
import { EMAIL_REG_EXP } from "../../types/common/RegularExpressions";
import { sendEmailAxios } from "../../api/email";
import { Button, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ErrorMessage from "../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../components/Messages/types";

export default function ContactForm(): JSX.Element {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [serverConfirmation, setServerConfirmation] = useState<string>('');

    const validationSchema = Yup.object({
        senderName: Yup.string()
            .required('Name is a required field.')
            .min(2, 'Name must be at least 2 characters.')
            .max(50, 'The field Name may not be greater than 50 characters.'),
        senderEmail: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid."),
        subject: Yup.string()
            .required('Subject is a required field')
            .min(2, 'Subject must be at least 2 characters.')
            .max(255, 'The field Subject may not be greater than 255 characters.'),
        message: Yup.string()
            .required('Message is a required field')
            .min(2, 'Message must be at least 2 characters.')
            .max(1024, 'The field Message may not be greater than 1024 characters.')
    })

    const defaultValues: IMailMessage = {
        senderName: '', senderEmail: '', subject: '', message: ''
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

    const sendEmail = async (message: IMailMessage) => {
        try {
            setLoading(true);
            const responceFromServer: string = await sendEmailAxios(message);
            setServerConfirmation(responceFromServer);
            setOpenSnackBar(true);
        } catch (e) {
            setError("Oops! Something while sending sending the message. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = (message: IMailMessage): void => {
        sendEmail(message);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpenSnackBar(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justifyContent="space-between" spacing={2} >
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="senderName"
                            control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Name" type="text" margin="normal" fullWidth
                                    error={Boolean(errors.senderName)} helperText={errors.senderName?.message} />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="senderEmail"
                            control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Email" type="email" margin="normal" fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" aria-label="Email" >
                                                    <MailOutlineIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.senderEmail)} helperText={errors.senderEmail?.message} />}
                        />
                    </Grid>

                </Grid>
                <Grid>
                    <Controller
                        name="subject"
                        control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Subject" type="text" margin="normal" size="medium" fullWidth
                                error={Boolean(errors.subject)} helperText={errors.subject?.message} />}
                    />
                </Grid>
                <Grid>
                    <Controller
                        name="message"
                        control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Message" type="text" margin="normal" size="medium" fullWidth
                                error={Boolean(errors.message)} helperText={errors.message?.message} />}
                    />
                </Grid>
                <Grid container justifyContent="center" spacing={2} sx={{ padding: '20px 0' }} >
                    <Grid item xs={6} sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" onClick={() => reset()}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" type="submit">
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar open={openSnackBar} message={serverConfirmation} autoHideDuration={4000} onClose={handleClose} />
            </form>
            {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
        </>
    )
}