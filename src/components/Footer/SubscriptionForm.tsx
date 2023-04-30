import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { subscribeAxios } from "../../api/mailSubscriber";
import { IMailSubscriber } from "../../types/mailSubscriber";
import { EMAIL_REG_EXP } from "../../types/common/RegularExpressions";
import { Button, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ErrorMessage from "../Messages/ErrorMessage";
import { MessageAppearance } from "../Messages/types";

export default function SubscriptionForm(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

    const validationSchema = Yup.object({
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid."),
    })

    const defaultValues: { email: string } = {
        email: ''
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const createdSubscriber = async (subscriber: IMailSubscriber) => {
        try {
            setLoading(true);
            setError(null);
            await subscribeAxios(subscriber);
            setOpenSnackBar(true);
        } catch (e) {
            setError(e.message || "Oops! Something went wrong while subscribing.");
        } finally {
            setLoading(false);
            reset();
        }
    }

    const onSubmit = async (emailAddress: { email: string }): Promise<void> => {
        createdSubscriber({ email: emailAddress.email, isSubscribed: true, mailSubscriptionId: 1 });
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpenSnackBar(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) =>
                        <TextField  {...field} sx={{ color: '#1976d2' }} label="Email" fullWidth type="email" margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" aria-label="Email" >
                                            <MailOutlineIcon />
                                        </IconButton>
                                    </InputAdornment>),
                            }}
                            error={Boolean(errors.email)} helperText={errors.email?.message} />}
                />
            </div>
            <div>
                <Button variant="outlined" disabled={loading} type="submit" sx={{ backgroundColor: 'white', color: '#1976d2', marginTop: '20px' }}>
                    {loading ? 'Uploadind...' : 'Subscribe'}
                </Button>
                <Snackbar open={openSnackBar} message='Subscribed.' autoHideDuration={4000} onClose={handleClose} />
            </div>
            {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
        </form>
    )
}