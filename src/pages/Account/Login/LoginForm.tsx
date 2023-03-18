import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { ILoginDto } from "../../../types/auth";
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions";
import { loginAxios } from "../../../api/auth";
import { RouteNames } from "../../../routing";
import { Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";

export default function LoginForm(): JSX.Element {
    const { login } = useActions();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const validationSchema = Yup.object({
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters."),
        password: Yup.string()
            .max(100, 'The field Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one number and one uppercase and lowercase letter, and lenght 7 up to 100 characters."),
        remember: Yup.boolean()
            .required()
    })

    const defaultValues: ILoginDto = { email: '', password: '', remember: true }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onSubmit = async (loginModel: { email: string, password: string, remember: boolean }) => {
        try {
            setLoading(true);
            setError(null);
            const authModel = await loginAxios(loginModel);
            localStorage.setItem("auth", JSON.stringify(authModel));
            login(authModel);
            reset();
            navigate(RouteNames.HOME)
        } catch (e) {
            setError(e.message || 'Unknown server error.');
        } finally {
            setLoading(false);
        }
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-centered">
            <Grid container direction="column" alignContent="center" mt={2}>
                <Grid item>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Email" type="email" margin="normal" className="form-text-input"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <MailOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.email)} helperText={errors.email?.message}
                            />
                        }
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
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.password)} helperText={errors.password?.message} />}
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        sx={{ marginTop: '10px' }}
                        control={
                            <Controller name="remember" control={control}
                                render={({ field: props }) =>
                                    <Checkbox  {...props} checked={props.value}
                                        onChange={(event) => props.onChange(event.target.checked)} />}
                            />
                        }
                        label={<p>Remember Me?</p>}
                    />
                </Grid>
                <Grid item>
                    <Grid container sx={{ marginTop: '-20px' }} spacing={5} direction="row" justifyContent="center">
                        <Grid item>
                            <Button variant="outlined" onClick={() => navigate(RouteNames.HOME)}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" type="submit">
                                {loading ? 'Sending...' : 'Log In'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
