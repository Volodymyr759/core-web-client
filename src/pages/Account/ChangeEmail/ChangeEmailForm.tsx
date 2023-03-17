import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { RouteNames } from "../../../routing";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { changeEmailAxios } from "../../../api/auth";
import { IChangeEmailDto } from "../../../types/auth";
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions";
import { Button, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangeEmailForm(): JSX.Element {
    const navigate = useNavigate();
    const { auth } = useTypedSelector(state => state.auth)
    const { login } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [snackbarOpened, setSnackbarOpened] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbarOpened(false);
    };

    const validationSchema = Yup.object({
        existingEmail: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters."),
        newEmail: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters."),
        password: Yup.string()
            .matches(PASSWORD_REG_EXP, "The field New Password is not valid. . Must contain at least one number and one uppercase and lowercase letter, and lenght 7 up to 100 characters."),
    })

    const defaultValues: IChangeEmailDto = { existingEmail: auth.user.email, newEmail: '', password: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onSubmit = async (changeEmailDto: IChangeEmailDto) => {
        try {
            setLoading(true)
            setError(null)
            await changeEmailAxios(changeEmailDto);
            setSnackbarOpened(true);
            reset();
            setTimeout(() => {
                localStorage.removeItem('auth');
                login(null);
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
                    <Controller name="existingEmail" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Existing Email" type="email"
                                margin="normal" className="form-text-input" disabled
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <MailOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.existingEmail)} helperText={errors.existingEmail?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="newEmail" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="New Email" type="email"
                                margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <MailOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.newEmail)} helperText={errors.newEmail?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="password" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Password" type={showPassword ? 'text' : 'password'}
                                margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {setShowPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.password)} helperText={errors.password?.message} />}
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
                message="Email has been changed successfully."
            />
        </form>
    )
}