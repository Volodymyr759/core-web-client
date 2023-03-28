import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { EMAIL_REG_EXP } from "../../../types/common/RegularExpressions";
import { forgotPasswordAxios } from "../../../api/auth";
import { Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import SuccessMessage from "../../../components/Messages/SuccessMessage";
import { MessageAppearance } from "../../../components/Messages/types";

export default function ForgotPasswordForm(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

    const validationSchema = Yup.object({
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters.")
    })

    const defaultValues: { email: string } = { email: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onSubmit = async ({ email }: { email: string }) => {
        try {
            setLoading(true);
            setError(null);
            setShowSuccessMessage(false);
            await forgotPasswordAxios(email);
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
                    <Grid container sx={{ marginTop: '-20px', marginBottom: '40px' }} spacing={5} direction="row" justifyContent="center">
                        <Grid item>
                            <Button variant="outlined" onClick={() => { setShowSuccessMessage(false); reset(); }}>
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
            </Grid>
            {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
            {showSuccessMessage && <SuccessMessage appearance={MessageAppearance.REGULAR}>
                Link has been send to your email. Please use the link in email to reset password.
            </SuccessMessage>}
        </form>
    )
}