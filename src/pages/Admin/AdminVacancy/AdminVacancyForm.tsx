import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminVacancyFormProps } from "./types";
import { IVacancy } from "../../../types/vacancy";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'scroll',
    maxHeight: '90%',
    display: 'block',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AdminVacancyForm({ vacancy, closeForm }: AdminVacancyFormProps): JSX.Element {
    const { offices } = useTypedSelector(state => state.vacancy);
    const { createVacancy, updateVacancy } = useActions();
    const [error, setError] = useState<null | string>(null);
    const [editorValue, setEditorValue] = useState(vacancy.description);

    const validationSchema = Yup.object({
        id: Yup.number()
            .required(),
        title: Yup.string()
            .required()
            .min(1, 'Title must be at least 1 character.')
            .max(50, 'The field Title may not be greater than 50 characters.'),
        description: Yup.string()
            .required('Description is a required field.'),
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
        officeId: vacancy.officeId,
        officeDto: vacancy.officeDto,
        candidates: vacancy.candidates
    }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (vacancy: IVacancy): Promise<void> => {
        vacancy.description = editorValue;
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
                            {vacancy.id === 0 ? 'Add Vacancy' : 'Edit Vacancy'}
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
                            <FormControl>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) =>
                                        <ReactQuill
                                            {...field}
                                            style={{ width: '800px' }}
                                            theme="snow"
                                            value={editorValue}
                                            onChange={setEditorValue}
                                        />
                                    }
                                />
                                <FormHelperText error={Boolean(errors.description)}>{errors.description?.message}</FormHelperText>
                            </FormControl>
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
                                    defaultValue={offices[0].id}
                                    control={control}
                                    render={({ field }) => (
                                        <Select label="Office" {...field}>
                                            {offices.map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
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
                {error && <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>}
            </Box >
        </Modal >
    )
}