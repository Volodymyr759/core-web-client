import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { ILoginDto } from "../../../types/auth";
import { loginAxios } from "../../../api/auth";
import { RouteNames } from "../../../routing";
import { Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

export default function LoginForm(): JSX.Element {
    const { login } = useActions();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const validationSchema = Yup.object({
        email: Yup.string()
            .required()
            .min(2, 'Email must be at least 2 characters.')
            .max(255, 'The field Email may not be greater than 255 characters.'),
        password: Yup.string()
            .required()
            .min(2, 'Password must be at least 2 characters.')
            .max(255, 'The field Paeeword may not be greater than 255 characters.'),
        remember: Yup.boolean()
            .required()
    })

    const defaultValues: ILoginDto = { email: '', password: '', remember: false }

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

    if (error) return <ErrorMessage message={error} />;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignContent="center" mt={2}>
                <Grid item>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <TextField   {...field} label="Email" type="email" margin="normal" fullWidth
                                error={Boolean(errors.email)} helperText={errors.email?.message}
                            />
                        }
                    />
                </Grid>
                <Grid item>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Password" type="password" margin="normal" fullWidth
                                error={Boolean(errors.password)} helperText={errors.password?.message}
                            />
                        }
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
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
                    <Grid container spacing={5} direction="row" justifyContent="center">
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
