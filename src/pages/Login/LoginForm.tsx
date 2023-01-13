import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { HOME } from "../../routing/pathes";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useActions } from "../../hooks/useActions";
import { ILoginDto } from "../../types/auth";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const LoginForm = () => {
    const { login } = useActions();
    const navigate = useNavigate();
    const { auth, error, loading } = useTypedSelector(state => state.auth);

    const validationSchema = Yup.object({
        email: Yup.string()
            .required()
            .min(2, 'Email must be at least 2 characters.')
            .max(255, 'The field Title may not be greater than 255 characters.'),
        password: Yup.string()
            .required()
            .min(2, 'Password must be at least 2 characters.')
            .max(255, 'The field Description may not be greater than 255 characters.'),
        remember: Yup.boolean()
            .required()
    })

    const defaultValues: { email: string, password: string, remember: boolean } = {
        email: '',
        password: '',
        remember: false
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = (loginModel: { email: string, password: string, remember: boolean }): void => {
        login(loginModel as ILoginDto);
    }

    if (auth) {
        reset();
        navigate(HOME.path);
    };

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
                                label="Password"
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
                    <FormControlLabel
                        control={
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field: props }) =>
                                    <Checkbox
                                        {...props}
                                        checked={props.value}
                                        onChange={(event) => props.onChange(event.target.checked)}
                                    />
                                }
                            />
                        }
                        label={<p>Remember Me?</p>}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={() => navigate(HOME.path)}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {loading ? 'Sending...' : 'Log In'}
                    </Button>
                </div>
            </form>
            {error && <ErrorMessage message={error} />}
        </>
    )
}

export default LoginForm;