import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { AdminCountryFormProps } from "./types";
import { ICountry } from "../../../types/country";
import { Button, Grid, SwipeableDrawer, TextField, Typography } from "@mui/material";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

export default function AdminCountryForm({ country, closeForm, openForm }: AdminCountryFormProps): JSX.Element {
    const { createCountry, updateCountry } = useActions();
    const [error, setError] = useState<null | string>(null);

    const toggleDrawer = (anchor: string, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            if (!open) closeForm(null);
        };

    const validationSchema = Yup.object({
        id: Yup.number()
            .required(),
        name: Yup.string()
            .required()
            .min(1, 'Name must be at least 1 character.')
            .max(20, 'The field Name may not be greater than 20 characters.'),
        code: Yup.string()
            .required()
            .min(3, 'Code must be exactly 3 characters long.')
            .max(3, 'Code must be exactly 3 characters long.')
    })

    const defaultValues: ICountry = {
        id: country.id,
        name: country.name,
        code: country.code,
        officeDtos: null
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (country: ICountry): Promise<void> => {
        country.id === 0 ? createCountry(country) : updateCountry(country);
        onCancelHandler();
    }

    const onCancelHandler = () => {
        setError(null);
        reset();
        closeForm(null);
    }

    return (
        <SwipeableDrawer
            open={openForm}
            anchor='left'
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <input {...register("id")} type="hidden" />
                <Grid container direction="column" justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Typography variant="h5" component={'p'} sx={{ padding: '20px', fontWeight: 400 }}>
                        Country Form
                    </Typography>
                    <Grid item>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Name" type="text"
                                    margin="normal" fullWidth
                                    error={Boolean(errors.name)} helperText={errors.name?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="code"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Code" type="text"
                                    margin="normal" fullWidth
                                    error={Boolean(errors.code)} helperText={errors.code?.message}
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
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error && <ErrorMessage message={error} />}
        </SwipeableDrawer>
    )
}