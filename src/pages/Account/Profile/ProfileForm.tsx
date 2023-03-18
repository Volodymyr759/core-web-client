import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IUser } from "../../../types/user";
import { EMAIL_REG_EXP, PHONE_REG_EXP } from "../../../types/common/RegularExpressions";
import { updateUserAxios } from "../../../api/user";
import { Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkIcon from '@mui/icons-material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";

export default function ProfileForm(): JSX.Element {
    const { auth } = useTypedSelector(state => state.auth);
    const { error } = useTypedSelector(state => state.user);
    const { setUserError } = useActions();
    const [snackbarOpened, setSnackbarOpened] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbarOpened(false);
    };

    const validationSchema = Yup.object({
        userName: Yup.string()
            .required()
            .max(50, 'The field User Name may not be greater than 50 characters.'),
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters."),
        phoneNumber: Yup.string()
            .matches(PHONE_REG_EXP, 'Phone number is not valid. Must contain from 11 up to 13 characters, valid formats: +31636363634, 1234567890, 075-63546725, 123-456-7890, (123)456-7890, (123) 456-7890, 123.456.7890'),
        avatarUrl: Yup.string()
            .max(1000, 'The field Avatar Url may not be greater than 1000 characters.'),
    })

    const defaultValues: IUser = {
        id: auth.user.id,
        userName: auth.user.userName,
        email: auth.user.email,
        emailConfirmed: auth.user.emailConfirmed,
        phoneNumber: auth.user.phoneNumber || '',
        avatarUrl: auth.user.avatarUrl || ''
    }

    const { control, handleSubmit, formState: { errors }, register } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const updateUserData = async (user: IUser) => {
        try {
            setLoading(true);
            setUserError(null);
            await updateUserAxios(user);
            setSnackbarOpened(true);
        } catch (e) {
            setUserError(e.message);
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = async (user: IUser) => updateUserData(user);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-centered">
            <input {...register("id")} type="hidden" />
            <Grid container direction="column" alignContent="center" mt={2}>
                <Grid item>
                    <Controller name="userName" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="User Name" type="text" margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <AccountCircleIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.userName)} helperText={errors.userName?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="email" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Email" type="email" margin="normal" className="form-text-input" disabled
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <MailOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.email)} helperText={errors.email?.message} />}
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Controller name="emailConfirmed" control={control}
                                render={({ field: props }) => (
                                    <Checkbox
                                        {...props}
                                        checked={props.value}
                                        disabled
                                        onChange={(e) => props.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Email Confirmed?"
                    />
                </Grid>
                <Grid item>
                    <Controller name="phoneNumber" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Phone" type="text" margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <PhoneIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.phoneNumber)} helperText={errors.phoneNumber?.message} />} />
                </Grid>
                <Grid item>
                    <Controller name="avatarUrl" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Avatar Url" type="text" margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <LinkIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.avatarUrl)} helperText={errors.avatarUrl?.message} />}
                    />
                </Grid>
                <Grid item my={3}>
                    <Grid container spacing={5} direction="row" justifyContent="center">
                        <Grid item>
                            <Button variant="outlined" type="submit">
                                {loading ? 'Saving...' : 'Save'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
            </Grid>
            <Snackbar
                open={snackbarOpened}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Successfully updated!"
            />
        </form>
    )
}