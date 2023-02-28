import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Button, Checkbox, FormControlLabel, Grid, SwipeableDrawer, TextField, Typography } from "@mui/material";
import { AdminServiceFormProps } from "./types";
import { CompanyServiceStatus, ICompanyService } from "../../../types/companyService";
import { createServiceAxios, updateServiceAxios } from "../../../api/service";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { SortOrder } from "../../../types/sortOrder";


export default function AdminServiceForm({ closeDrawer, openServiceForm }: AdminServiceFormProps): JSX.Element {
    const { currentCompanyService } = useTypedSelector(state => state.service);
    const { getServices, setCurrentService } = useActions();
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
            if (!open) closeDrawer();
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
        title: currentCompanyService.title,
        description: currentCompanyService.description,
        imageUrl: currentCompanyService.imageUrl,
        isActive: currentCompanyService.isActive,
        id: currentCompanyService.id
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (service: ICompanyService): Promise<void> => {
        try {
            setLoading(true);
            service.id === 0 ? await createServiceAxios(service) : await updateServiceAxios(service);
            // Update list of services for AdminServiceTable-component
            getServices(100, 1, CompanyServiceStatus.All, SortOrder.Ascending);
        } catch (error) {
            setError(error.message || "Oops! Something went wrong while handling the service.");
        } finally {
            setLoading(false);
            onCancelHandler();
        }
    }

    const onCancelHandler = () => {
        setError(null);
        reset();
        closeDrawer();
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
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error && <ErrorMessage message={error} />}
        </SwipeableDrawer>
    )
}