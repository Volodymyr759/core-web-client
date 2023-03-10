import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminVacancyFormProps } from "./types";
import { IVacancy } from "../../../types/vacancy";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AdminVacancyForm({ vacancy, closeForm }: AdminVacancyFormProps): JSX.Element {
    const { offices } = useTypedSelector(state => state.vacancy);
    const { createVacancy, updateVacancy } = useActions();
    const [error, setError] = useState<null | string>(null);

    const validationSchema = Yup.object({
        id: Yup.number()
            .required(),
        title: Yup.string()
            .required()
            .min(1, 'Title must be at least 1 character.')
            .max(50, 'The field Title may not be greater than 50 characters.'),
        description: Yup.string()
            .required()
            .min(1, 'Description must be at least 1 characters.'),
        previews: Yup.number()
            .required(),
        isActive: Yup.boolean()
            .required(),
        officeId: Yup.number()
            .required('Office required.')
    })

    const defaultValues: IVacancy = {
        id: vacancy.id,
        title: vacancy.title,
        description: vacancy.description,
        previews: vacancy.previews,
        isActive: vacancy.isActive,
        officeId: vacancy.officeId
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (vacancy: IVacancy): Promise<void> => {
        vacancy.id === 0 ? createVacancy(vacancy) : updateVacancy(vacancy);
        onCancelHandler();
    }

    const onCancelHandler = () => {
        setError(null);
        reset();
        closeForm();
    }

    return (
        <Modal
            open={true}
            onClose={closeForm}
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("id")} type="hidden" />
                    <input {...register("previews")} type="hidden" />
                    <Grid container direction="column" justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                        <Typography variant="h5" component={'p'} sx={{ padding: '20px', fontWeight: 400, textAlign: 'center' }}>
                            Vacancy Form
                        </Typography>
                        <Grid item>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) =>
                                    <TextField {...field} label="Title" type="text"
                                        margin="normal" fullWidth
                                        error={Boolean(errors.title)} helperText={errors.title?.message}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) =>
                                    <TextField {...field} label="Description"
                                        fullWidth margin="normal" multiline rows={4} variant='outlined' style={{ height: 'none' }}
                                        error={Boolean(errors.description)} helperText={errors.description?.message}
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
            </Box >
        </Modal >
    )
}