import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { RouteNames } from "../../../routing";
import { IRegisterDto } from "../../../types/auth";
import { Button, Grid, TextField } from "@mui/material";
import { registerAxios } from "../../../api/auth";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

export default function RegisterForm(): JSX.Element {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const validationSchema = Yup.object({
        email: Yup.string()
            .required()
            .min(2, 'Email must be at least 2 characters.')
            .max(50, 'The field Email may not be greater than 50 characters.'),
        password: Yup.string()
            .required()
            .min(7, 'Password must be at least 7 characters.')
            .max(100, 'The field Password may not be greater than 100 characters.'),
        confirmPassword: Yup.string()
            .required()
            .min(2, 'Confirmed password must be at least 2 characters.')
            .max(255, 'The field Confirmed password may not be greater than 255 characters.')
    })

    const defaultValues: IRegisterDto = { email: '', password: '', confirmPassword: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onSubmit = async (registerDto: IRegisterDto) => {
        try {
            setLoading(true)
            setError(null)
            await registerAxios({
                email: registerDto.email,
                password: registerDto.password,
                confirmPassword: registerDto.confirmPassword
            });
            reset();
            navigate(RouteNames.REGISTER_COMPLETE);
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
                    <Controller name="password" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Rassword" type="password" margin="normal" fullWidth
                                error={Boolean(errors.password)} helperText={errors.password?.message} />}
                    />
                </Grid>
                <Grid item>
                    <Controller name="confirmPassword" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Confirm Password" type="password" margin="normal" fullWidth
                                error={Boolean(errors.password)} helperText={errors.password?.message} />}
                    />
                </Grid>
                <Grid item my={3}>
                    <Grid container spacing={5} direction="row" justifyContent="center">
                        <Grid item>
                            <Button variant="outlined" onClick={() => navigate(RouteNames.HOME)}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" type="submit">
                                {loading ? 'Sending...' : 'Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {error &&
                    <Grid item>
                        <ErrorMessage message={error} />
                    </Grid>}
            </Grid>
        </form>
    )
}
