import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { IChangePasswordDto } from "../../../types/auth";
import { changePasswordAxios } from "../../../api/auth";
import { Button, Grid, Snackbar, TextField } from "@mui/material";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { RouteNames } from "../../../routing";

export default function ChangePasswordForm(): JSX.Element {
    const navigate = useNavigate();
    const { auth } = useTypedSelector(state => state.auth)
    const { logout } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [snackbarOpened, setSnackbarOpened] = useState<boolean>(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbarOpened(false);
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required()
            .min(2, 'Email must be at least 2 characters.')
            .max(50, 'The field Title may not be greater than 50 characters.'),
        oldPassword: Yup.string()
            .required()
            .min(7, 'Old Password must be at least 7 characters.')
            .max(100, 'The field Old Password may not be greater than 100 characters.'),
        newPassword: Yup.string()
            .required()
            .min(7, 'New Password must be at least 7 characters.')
            .max(100, 'The field New Password may not be greater than 100 characters.'),
        confirmNewPassword: Yup.string()
            .required()
            .min(7, 'Confirmed password must be at least 7 characters.')
            .max(100, 'The field Description may not be greater than 100 characters.')
    })

    const defaultValues: IChangePasswordDto = { email: '', oldPassword: '', newPassword: '', confirmNewPassword: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onSubmit = async (changePasswordDto: IChangePasswordDto) => {
        try {
            setLoading(true)
            setError(null)
            await changePasswordAxios(changePasswordDto);
            setSnackbarOpened(true);
            reset();
            setTimeout(() => {
                logout(auth.user.email, auth.tokens.accessToken);
                navigate(RouteNames.LOGIN);
            }, 3000);
        } catch (e) {
            setError(e.message || 'Unknown server error.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignContent="center" mt={2}>
                <Grid item>
                    <Controller name="email" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Email" type="email" margin="normal" fullWidth
                                error={Boolean(errors.email)} helperText={errors.email?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="oldPassword" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Old Password" type="password" margin="normal" fullWidth
                                error={Boolean(errors.oldPassword)} helperText={errors.oldPassword?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="newPassword" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="New Password" type="password" margin="normal" fullWidth
                                error={Boolean(errors.newPassword)} helperText={errors.newPassword?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="confirmNewPassword" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Confirm New Password" type="password" margin="normal" fullWidth
                                error={Boolean(errors.confirmNewPassword)} helperText={errors.confirmNewPassword?.message} />}
                    />
                </Grid>
                <Grid item my={3}>
                    <Grid container spacing={5} direction="row" justifyContent="center">
                        <Grid item>
                            <Button variant="outlined" onClick={() => reset()}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" type="submit">
                                {loading ? 'Sending...' : 'Send'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {error &&
                    <Grid item>
                        <ErrorMessage message={error} />
                    </Grid>}
            </Grid>
            <Snackbar
                open={snackbarOpened}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Password has been changed successfully."
            />
        </form>
    )
}