import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { VacancyApplyFormProps } from "./types";
import { ICandidate } from "../../types/candidate";
import { createCandidateAxios } from "../../api/candidate";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function VacancyApplyForm({ vacancyId, closeDrawer }: VacancyApplyFormProps): JSX.Element {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required()
            .min(2, 'Full name must be at least 2 characters.')
            .max(50, 'The field Full name may not be greater than 50 characters.'),
        email: Yup.string()
            .required()
            .min(6, 'Email must be at least 6 characters.')
            .max(50, 'The field Email may not be greater than 50 characters.'),
        phone: Yup.string()
            .required()
            .min(2, 'Phone must be at least 2 characters.')
            .max(15, 'The field Phone may not be greater than 15 characters.'),
        notes: Yup.string()
            .required()
            .min(2, 'Note must be at least 2 characters.')
            .max(1024, 'The field Note may not be greater than 1024 characters.'),
        isDismissed: Yup.boolean()
            .required(),
        joinedAt: Yup.date()
            .required(),
        vacancyId: Yup.number()
            .required()
    })

    const defaultValues: { fullName: string, email: string, phone: string, notes: string, isDismissed: boolean, joinedAt: Date, vacancyId: number } = {
        fullName: '',
        email: '',
        phone: '',
        notes: '',
        isDismissed: false,
        joinedAt: new Date(),
        vacancyId: vacancyId
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const createCandidate = async (candidate: ICandidate) => {
        try {
            setLoading(true);
            await createCandidateAxios(candidate);
        } catch (e) {
            setError(e.message || "Oops! Something went wrong while joining the vacancy.");
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = (candidate: ICandidate): void => {
        createCandidate(candidate);
    }

    const onCancelHandler = () => {
        setError(null);
        reset();
        closeDrawer();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <input {...register("isDismissed")} type="hidden" />
                <input {...register("joinedAt")} type="hidden" />
                <input {...register("vacancyId")} type="hidden" />
                <Grid container justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Typography variant="h4" component={'p'} sx={{ padding: '20px', fontWeight: 600 }}>
                        Join Us!
                    </Typography>
                    <Grid item>
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Full Name"
                                    type="text"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.fullName)}
                                    helperText={errors.fullName?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Email"
                                    type="email"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Phone"
                                    type="text"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.phone)}
                                    helperText={errors.phone?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="notes"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Notes"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    variant='outlined'
                                    style={{ height: 'none' }}
                                    error={Boolean(errors.notes)}
                                    helperText={errors.notes?.message}
                                />
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" spacing={2} sx={{ padding: '20px' }} >
                    <Grid item sm={6} sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" onClick={onCancelHandler}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item sm={6} sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" type="submit">
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error && <ErrorMessage message={error} />}
        </>
    )
}