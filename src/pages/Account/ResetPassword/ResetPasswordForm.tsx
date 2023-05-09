import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { resetPasswordAxios } from "../../../api/auth";
import { IResetPasswordDto } from "../../../types/auth";
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions";
import { Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MessageAppearance } from "../../../components/Messages/types";
import { Link, useSearchParams } from "react-router-dom";
import SuccessMessage from "../../../components/Messages/SuccessMessage";
import { RouteNames } from "../../../routing";

export default function ResetPasswordForm(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    const validationSchema = Yup.object({
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters."),
        password: Yup.string()
            .max(100, 'The field Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters."),
        confirmPassword: Yup.string()
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters.")
    })

    const defaultValues: IResetPasswordDto = { code: searchParams.get("code"), email: searchParams.get("email"), password: '', confirmPassword: '' }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onSubmit = async (resetPasswordDto: IResetPasswordDto) => {
        try {
            setLoading(true);
            setError(null);
            setShowSuccessMessage(false);
            await resetPasswordAxios(resetPasswordDto);
            setShowSuccessMessage(true);
            reset();
        } catch (e) {
            setError(e.message || 'Unknown server error.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-centered">
            <input {...register("code")} type="hidden" />
            <Grid container direction="column" alignContent="center" mt={2}>
                <Grid item>
                    <Controller name="email" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Email" type="email" disabled
                                margin="normal" className="form-text-input"
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
                    <Controller name="confirmPassword" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Confirm Password" type={showConfirmPassword ? 'text' : 'password'}
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
                                error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword?.message} />}
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
            {showSuccessMessage && <SuccessMessage appearance={MessageAppearance.REGULAR}>
                Password has been changed successfully. Please <Link to={RouteNames.LOGIN}>Sign In</Link> using new password.
            </SuccessMessage>}
        </form>
    )
}