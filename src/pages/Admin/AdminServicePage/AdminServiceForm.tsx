import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Button, Checkbox, FormControlLabel, Grid, SwipeableDrawer, TextField, Typography } from "@mui/material";
import { AdminServiceFormProps } from "./types";
import { ICompanyService } from "../../../types/companyService";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { useActions } from "../../../hooks/useActions";

export default function AdminServiceForm({ service, closeForm, openServiceForm }: AdminServiceFormProps): JSX.Element {
    const { createService, updateService } = useActions();
    const [error, setError] = useState<null | string>(null);

    const toggleDrawer = (anchor: string, open: boolean) =>
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
        title: Yup.string()
            .required()
            .min(2, 'Title must be at least 2 characters.')
            .max(100, 'The field Title may not be greater than 100 characters.'),
        description: Yup.string()
            .required()
            .min(6, 'Description must be at least 6 characters.')
            .max(1024, 'The field Description may not be greater than 1024 characters.'),
        imageUrl: Yup.string()
            .required()
            .min(2, 'ImageUrl must be at least 2 characters.')
            .max(1024, 'The field ImageUrl may not be greater than 1024 characters.'),
        isActive: Yup.boolean()
            .required(),
        id: Yup.number()
            .required()
    })

    const defaultValues: { title: string, description: string, imageUrl: string, isActive: boolean, id: number } = {
        title: service.title,
        description: service.description,
        imageUrl: service.imageUrl,
        isActive: service.isActive,
        id: service.id
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (service: ICompanyService): Promise<void> => {
        service.id === 0 ? createService(service) : updateService(service);
        onCancelHandler();
    }

    const onCancelHandler = () => {
        setError(null);
        reset();
        closeForm(null);
    }

    return (
        <SwipeableDrawer
            open={openServiceForm}
            anchor='left'
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <input {...register("id")} type="hidden" />
                <Grid container justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Typography variant="h5" component={'p'} sx={{ padding: '20px', fontWeight: 400 }}>
                        Company Service Form
                    </Typography>
                    <Grid item>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Title"
                                    type="text"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.title)}
                                    helperText={errors.title?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    variant='outlined'
                                    style={{ height: 'none' }}
                                    error={Boolean(errors.description)}
                                    helperText={errors.description?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="imageUrl"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Image Url"
                                    type="text"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.imageUrl)}
                                    helperText={errors.imageUrl?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="isActive"
                                    control={control}
                                    render={({ field: props }) => (
                                        <Checkbox
                                            {...props}
                                            checked={props.value}
                                            onChange={(e) => props.onChange(e.target.checked)}
                                        />
                                    )}
                                />
                            }
                            label="Is Active?"
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