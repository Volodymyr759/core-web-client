import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { registerAxios } from "../../api/auth";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { RegisterFormState } from "./types";
import { RouteNames } from "../../routing";

export default function RegisterForm(): JSX.Element {
    const navigate = useNavigate();

    const initState: RegisterFormState = {
        loading: false,
        error: null
    };

    const [registrationState, setRegistrationState] = useState<RegisterFormState>(initState);

    const validationSchema = Yup.object({
        email: Yup.string()
            .required()
            .min(2, 'Email must be at least 2 characters.')
            .max(255, 'The field Title may not be greater than 255 characters.'),
        password: Yup.string()
            .required()
            .min(2, 'Password must be at least 2 characters.')
            .max(255, 'The field Description may not be greater than 255 characters.'),
        confirmPassword: Yup.string()
            .required()
            .min(2, 'Confirmed password must be at least 2 characters.')
            .max(255, 'The field Description may not be greater than 255 characters.')
    })

    const defaultValues: { email: string, password: string, confirmPassword: string } = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (registerDto: { email: string, password: string, confirmPassword: string }) => {
        try {
            setRegistrationState(prevRegisterFormState => {
                return { loading: true, error: null };
            })
            await registerAxios({
                email: registerDto.email,
                password: registerDto.password,
                confirmPassword: registerDto.confirmPassword
            });
            reset();
            navigate(RouteNames.REGISTER_COMPLETE);
        } catch (e) {
            setRegistrationState(prevRegisterFormState => {
                return { ...prevRegisterFormState, error: e.message || 'Unknown server error.' }
            })
        } finally {
            setRegistrationState(prevRegisterFormState => {
                return { ...prevRegisterFormState, loading: false }
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Email"
                                type="email"
                                margin="normal"
                                size="medium"
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                        }
                    />
                </div>
                <div>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Rassword"
                                type="password"
                                margin="normal"
                                // size="medium"
                                fullWidth
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                            />
                        }
                    />
                </div>
                <div>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Confirm Password"
                                type="password"
                                margin="normal"
                                // size="medium"
                                fullWidth
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                            />
                        }
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={() => navigate(RouteNames.HOME)}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {registrationState.loading ? 'Sending...' : 'Sign Up'}
                    </Button>
                </div>
            </form>
            {registrationState.error && <ErrorMessage message={registrationState.error} />}
        </>
    )
}
