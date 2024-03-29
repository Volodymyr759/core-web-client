import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import moment from "moment";
import { useActions } from "../../../hooks/useActions";
import { AdminCandidateFormProps } from "./types";
import { ICandidate } from "../../../types/candidate";
import { EMAIL_REG_EXP, PHONE_REG_EXP } from "../../../types/common/RegularExpressions";
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SwipeableDrawer, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

export default function AdminCandidateForm({ candidate, closeForm }: AdminCandidateFormProps): JSX.Element {
    const { createCandidate, updateCandidate } = useActions();
    const { vacancySearchResult } = useTypedSelector(state => state.vacancy);
    const [error, setError] = useState<null | string>(null);
    const [joinedAtValue, setJoinedAtValue] = useState<Date>(candidate.joinedAt);

    const vacancies = vacancySearchResult.itemList;

    const toggleDrawer = (anchor: string, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            if (!open) closeForm();
        };

    const validationSchema = Yup.object({
        id: Yup.number()
            .required(),
        fullName: Yup.string()
            .required()
            .min(1, 'Full Name must be at least 1 character.')
            .max(50, 'The field FullName may not be greater than 50 characters.'),
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid."),
        phone: Yup.string()
            .matches(PHONE_REG_EXP, 'Phone number is not valid. Must contain from 11 up to 13 characters, valid formats: +31636363634, 1234567890, 075-63546725, 123-456-7890, (123)456-7890, (123) 456-7890, 123.456.7890'),
        notes: Yup.string()
            .required()
            .min(1, 'Notes must be at least 1 characters.'),
        joinedAt: Yup.date()
            .required('Choose the date.'),
        vacancyId: Yup.number()
            .positive()
            .required('Vacancy Id is required.')
    })

    const defaultValues: ICandidate = {
        id: candidate.id,
        fullName: candidate.fullName,
        email: candidate.email,
        phone: candidate.phone,
        notes: candidate.notes,
        isDismissed: candidate.isDismissed,
        joinedAt: candidate.joinedAt,
        vacancyId: candidate.vacancyId,
        vacancyDto: candidate.vacancyDto
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (candidate: ICandidate): Promise<void> => {
        candidate.joinedAt = joinedAtValue;
        candidate.id === 0 ? createCandidate(candidate) : updateCandidate(candidate);
        onCancelHandler();
    }

    const onCancelHandler = () => {
        setError(null);
        reset();
        closeForm();
    }

    return (
        <SwipeableDrawer
            open={true}
            anchor='right'
            transitionDuration={1500}
            sx={{ zIndex: 1202 }}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <input {...register("id")} type="hidden" />
                <Grid container direction={'column'} justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Typography variant="h5" component={'p'} sx={{ padding: '20px', fontWeight: 400 }}>
                        {candidate.id === 0 ? 'Add Candidate' : 'Edit Candidate'}
                    </Typography>
                    <Grid item>
                        <Controller name="fullName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Full Name" type="text" margin="normal" fullWidth
                                    error={Boolean(errors.fullName)} helperText={errors.fullName?.message} />} />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Email" type="email" margin="normal" fullWidth
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
                                <TextField {...field} label="Phone" type="text" margin="normal" fullWidth
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
                                <TextField {...field} label="Notes" fullWidth
                                    margin="normal" multiline rows={4} variant='outlined' style={{ height: 'none' }}
                                    error={Boolean(errors.notes)} helperText={errors.notes?.message} />} />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Controller name="isDismissed" control={control}
                                    render={({ field: props }) => (
                                        <Checkbox
                                            {...props}
                                            checked={props.value}
                                            onChange={(e) => props.onChange(e.target.checked)}
                                        />
                                    )}
                                />
                            }
                            label="Dismissed?"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="level-label">Vacancy</InputLabel>
                            <Controller
                                name="vacancyId"
                                defaultValue={vacancies[0].id}
                                control={control}
                                render={({ field }) => (
                                    <Select label="Vacancy" {...field}>
                                        {vacancies.map((vacancy) => <MenuItem key={vacancy.id} value={vacancy.id}>{vacancy.title}</MenuItem>)}
                                    </Select>
                                )}
                            />
                            <FormHelperText error={true}>{errors.vacancyId?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Controller name="joinedAt" control={control}
                            render={({ field }) =>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        {...field}
                                        label="Joined At"
                                        format="DD/MM/YYYY"
                                        value={moment(joinedAtValue)}
                                        onChange={(newValue) => setJoinedAtValue(newValue.toDate())}
                                    />
                                </LocalizationProvider>
                            } />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" spacing={2} sx={{ padding: '20px' }} >
                    <Grid item sm={6} sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" onClick={onCancelHandler}>Cancel</Button>
                    </Grid>
                    <Grid item sm={6} sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" type="submit">Send</Button>
                    </Grid>
                </Grid>
            </form>
            {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
        </SwipeableDrawer>
    )
}