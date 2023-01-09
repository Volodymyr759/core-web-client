import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { HOME } from "../../routing/pathes";
import { Button, TextField } from "@mui/material";
import { registerAxios } from "../../api/auth";
import { useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const RegisterForm = (): JSX.Element => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const [axiosError, setAxiosError] = useState<string>('');

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
            setLoading(true);
            await registerAxios({
                email: registerDto.email,
                password: registerDto.password,
                confirmPassword: registerDto.confirmPassword
            });
            reset();
            navigate(HOME);
        } catch (e) {
            setAxiosError(e.message || 'Unknown server error.')
        } finally {
            setLoading(false);
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
                    <Button onClick={() => navigate(HOME)}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {loading ? 'Sending...' : 'Sign Up'}
                    </Button>
                </div>
            </form>
            {axiosError.length > 0 && <ErrorMessage message={axiosError} />}
        </>
    )
}

export default RegisterForm;