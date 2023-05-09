import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { RouteNames } from "../../../routing";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { changePasswordAxios } from "../../../api/auth";
import { IChangePasswordDto } from "../../../types/auth";
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions";
import { Button, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MessageAppearance } from "../../../components/Messages/types";

export default function ChangePasswordForm(): JSX.Element {
    const navigate = useNavigate();
    const { auth } = useTypedSelector(state => state.auth)
    const { logout } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [snackbarOpened, setSnackbarOpened] = useState<boolean>(false);
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbarOpened(false);
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters."),
        oldPassword: Yup.string()
            .max(100, 'The field Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters."),
        newPassword: Yup.string()
            .matches(PASSWORD_REG_EXP, "The field New Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters."),
        confirmNewPassword: Yup.string()
            .matches(PASSWORD_REG_EXP, "The field New Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters.")
    })

    const defaultValues: IChangePasswordDto = { email: auth.user.email, oldPassword: '', newPassword: '', confirmNewPassword: '' }

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
        <form onSubmit={handleSubmit(onSubmit)} className="form-centered">
            <Grid container direction="column" alignContent="center" mt={2}>
                <Grid item>
                    <Controller name="email" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Email" type="email"
                                margin="normal" className="form-text-input" disabled
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
                    <Controller name="oldPassword" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Old Password" type={showOldPassword ? 'text' : 'password'}
                                margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowOldPassword(!showOldPassword)}
                                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.oldPassword)} helperText={errors.oldPassword?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="newPassword" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="New Password" type={showNewPassword ? 'text' : 'password'}
                                margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.newPassword)} helperText={errors.newPassword?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="confirmNewPassword" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Confirm New Password" type={showConfirmPassword ? 'text' : 'password'}
                                margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
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
                {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
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