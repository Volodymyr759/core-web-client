import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { HOME, REGISTER_PAGE } from "../routing/pathes";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useActions } from "../hooks/useActions";
import { ILoginDto } from "../types/auth";

const LoginPage = () => {
    const { login } = useActions();
    const navigate = useNavigate();
    
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

    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = (loginModel: { email: string, password: string, remember: boolean }): void => {
        login(loginModel as ILoginDto);
        console.log("Login model: ", loginModel);
        navigate(HOME);
    }

    return (
        <div>
            <p>Log in.</p>
            <p>Or Sign Up: <Link to={REGISTER_PAGE}>registration</Link></p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Email"
                                // fullWidth
                                type="email"
                                margin="normal"
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
                                // fullWidth
                                type="password"
                                margin="normal"
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
                <div>
                    <Button onClick={() => alert('Canceled.')}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Log In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;