import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { AdminOfficeFormProps } from "./types";
import { IOffice } from "../../../types/office";
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SwipeableDrawer, TextField, Typography } from "@mui/material";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { MessageAppearance } from "../../../components/Messages/types";

export default function AdminOfficeForm({ office, closeForm }: AdminOfficeFormProps): JSX.Element {
    const { countrySearchResult } = useTypedSelector(state => state.country);
    const { createOffice, updateOffice } = useActions();
    const [error, setError] = useState<null | string>(null);

    const countries = countrySearchResult.itemList;

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
        name: Yup.string()
            .required()
            .min(1, 'Name must be at least 1 character.')
            .max(100, 'The field Name may not be greater than 100 characters.'),
        description: Yup.string()
            .required()
            .min(1, 'Description must be at least 3 characters.')
            .max(1000, 'Description may not be greater than 1000 characters.'),
        address: Yup.string()
            .required()
            .min(1, 'Address must be at least 3 characters.')
            .max(1000, 'The field Address may not be greater than 1000 characters.'),
        latitude: Yup.number()
            .required()
            .min(0, 'Latitude must be at greater than 0.')
            .max(180, 'The field Latitude may not be greater than 180.'),
        longitude: Yup.number()
            .required()
            .min(0, 'Longitude must be at greater than 0.')
            .max(180, 'The field Longitude may not be greater than 180.'),
        countryId: Yup.number()
            .required()
    })

    const defaultValues: IOffice = {
        id: office.id,
        name: office.name,
        description: office.description,
        address: office.address,
        latitude: office.latitude,
        longitude: office.longitude,
        countryId: office.countryId
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (office: IOffice): Promise<void> => {
        office.id === 0 ? createOffice(office) : updateOffice(office);
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
            anchor='left'
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <input {...register("id")} type="hidden" />
                <Grid container direction="column" justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Typography variant="h5" component={'p'} sx={{ padding: '20px', fontWeight: 400 }}>
                        Office Form
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
                            name="description"
                            control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Description"
                                    fullWidth margin="normal" multiline rows={4} variant='outlined' style={{ height: 'none' }}
                                    error={Boolean(errors.description)} helperText={errors.description?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Address" type="text"
                                    margin="normal" fullWidth
                                    error={Boolean(errors.address)} helperText={errors.address?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="latitude"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Latitude" type="number"
                                    margin="normal" fullWidth
                                    error={Boolean(errors.latitude)} helperText={errors.latitude?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="longitude"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Longitude" type="number"
                                    margin="normal" fullWidth
                                    error={Boolean(errors.longitude)} helperText={errors.longitude?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="level-label">Country</InputLabel>
                            <Controller
                                name="countryId"
                                defaultValue={countries[0].id}
                                control={control}
                                render={({ field }) => (
                                    <Select label="Country" {...field}>
                                        {countries.map((country) => <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>)}
                                    </Select>
                                )}
                            />
                            <FormHelperText error={true}>{errors.countryId?.message}</FormHelperText>
                        </FormControl>
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
            {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
        </SwipeableDrawer>
    )
}