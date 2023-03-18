import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { VacancyApplyFormProps } from "./types";
import { ICandidate } from "../../types/candidate";
import { createCandidateAxios } from "../../api/candidate";
import { Button, Grid, IconButton, InputAdornment, SwipeableDrawer, TextField, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import ErrorMessage from "../../components/Messages/ErrorMessage";
import { EMAIL_REG_EXP, PHONE_REG_EXP } from "../../types/common/RegularExpressions";
import { MessageAppearance } from "../../components/Messages/types";

export default function VacancyApplyForm({ candidate, closeForm, openForm, onSuccess }: VacancyApplyFormProps): JSX.Element {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const toggleDrawer =
        (anchor: string, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                if (!open) closeForm(null);
            };

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('The field Name is a required field (up to 50 characters).')
            .max(50, 'The field Name may not be greater than 50 characters.'),
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters."),
        phone: Yup.string()
            .matches(PHONE_REG_EXP, 'Phone number is not valid. Must contain from 11 up to 13 characters, valid formats: +31636363634, 1234567890, 075-63546725, 123-456-7890, (123)456-7890, (123) 456-7890, 123.456.7890'),
        notes: Yup.string()
            .required('The field Note is a required field (up to 1024 characters).')
            .max(1024, 'The field Note may not be greater than 1024 characters.'),
        isDismissed: Yup.boolean()
            .required(),
        joinedAt: Yup.date()
            .required(),
        vacancyId: Yup.number()
            .required()
    })

    const defaultValues: { fullName: string, email: string, phone: string, notes: string, isDismissed: boolean, joinedAt: Date, vacancyId: number } = {
        fullName: candidate.fullName,
        email: candidate.email,
        phone: candidate.phone,
        notes: candidate.notes,
        isDismissed: candidate.isDismissed,
        joinedAt: candidate.joinedAt,
        vacancyId: candidate.vacancyId
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

    const createCandidate = async (candidate: ICandidate) => {
        try {
            setLoading(true);
            await createCandidateAxios(candidate);
            onSuccess();
        } catch (e) {
            setError(e.message || "Oops! Something went wrong while joining the vacancy.");
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = (candidate: ICandidate): void => {
        createCandidate(candidate);
        onCancelHandler();
    }

    const onCancelHandler = () => {
        setError(null);
        reset();
        closeForm(null);
    }

    return (
        <SwipeableDrawer open={openForm} anchor='left'
            onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <Grid container justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Typography variant="h4" component={'p'} sx={{ padding: '20px', fontWeight: 600 }}>
                        Join Us!
                    </Typography>
                    <Grid item>
                        <Controller name="fullName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Name" type="text" margin="normal" className="form-text-input"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.fullName)} helperText={errors.fullName?.message} />} />
                    </Grid>
                    <Grid item>
                        <Controller name="email" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Email" type="email" margin="normal" className="form-text-input"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <MailOutlineIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.email)} helperText={errors.email?.message} />} />
                    </Grid>
                    <Grid item>
                        <Controller name="phone" control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Phone" type="text" margin="normal" className="form-text-input"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <PhoneIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.phone)} helperText={errors.phone?.message} />} />
                    </Grid>
                    <Grid item>
                        <Controller name="notes" control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Notes" margin="normal" className="form-text-input" multiline rows={4}
                                    error={Boolean(errors.notes)} helperText={errors.notes?.message} />} />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" spacing={2} sx={{ padding: '20px' }} >
                    <Grid item sm={6} sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" onClick={onCancelHandler}>Cancel</Button>
                    </Grid>
                    <Grid item sm={6} sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" type="submit">
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
        </SwipeableDrawer>
    )
}