import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminEmployeeFormProps } from "./types";
import { IEmployee } from "../../../types/employee";
import { EMAIL_REG_EXP } from "../../../types/common/RegularExpressions";
import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SwipeableDrawer, TextField, Typography } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

export default function AdminEmployeeForm({ employee, closeForm }: AdminEmployeeFormProps): JSX.Element {
    const { offices } = useTypedSelector(state => state.vacancy);
    const { createEmployee, updateEmployee } = useActions();
    const [error, setError] = useState<null | string>(null);

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
            .max(50, 'The field Full Name may not be greater than 50 characters.'),
        email: Yup.string()
            .max(50, 'The field Email may not be greater than 50 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 50 characters."),
        position: Yup.string()
            .required()
            .min(1, 'Position must be at least 1 character.')
            .max(50, 'The field Position may not be greater than 50 characters.'),
        description: Yup.string()
            .required()
            .min(1, 'Description must be at least 1 characters.')
            .max(1024, 'The field Description may not be greater than 1024 characters.'),
        avatarUrl: Yup.string()
            .required()
            .min(2, 'ImageUrl must be at least 2 characters.')
            .max(1024, 'The field ImageUrl may not be greater than 1024 characters.'),
        officeId: Yup.number()
            .required('Office required.')
    })

    const defaultValues: IEmployee = {
        id: employee.id,
        fullName: employee.fullName,
        email: employee.email,
        position: employee.position,
        description: employee.description,
        avatarUrl: employee.avatarUrl,
        officeId: employee.officeId,
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (employee: IEmployee): Promise<void> => {
        employee.id === 0 ? createEmployee(employee) : updateEmployee(employee);
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
                        Employee Form
                    </Typography>
                    <Grid item>
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Full Name" type="text"
                                    margin="normal" fullWidth
                                    error={Boolean(errors.fullName)} helperText={errors.fullName?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Email" type="email"
                                    margin="normal" fullWidth
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
                        <Controller
                            name="position"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Position" type="text"
                                    margin="normal" fullWidth
                                    error={Boolean(errors.position)} helperText={errors.position?.message}
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
                            name="avatarUrl"
                            control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Avatar Url" type="text"
                                    margin="normal" fullWidth
                                    error={Boolean(errors.avatarUrl)} helperText={errors.avatarUrl?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="level-label">Office</InputLabel>
                            <Controller
                                name="officeId"
                                defaultValue={offices[1].id}
                                control={control}
                                render={({ field }) => (
                                    <Select label="Office" {...field}>
                                        {offices.slice(1).map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
                                    </Select>
                                )}
                            />
                            <FormHelperText error={true}>{errors.officeId?.message}</FormHelperText>
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
            {error && <ErrorMessage message={error} />}
        </SwipeableDrawer>
    )
}