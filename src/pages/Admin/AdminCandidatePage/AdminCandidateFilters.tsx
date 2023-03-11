import { ChangeEvent } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { CandidateStatus } from "../../../types/candidate";
import { AdminCandidateFiltersProps } from "./types";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";

export default function AdminCandidateFilters({ onAddNew }: AdminCandidateFiltersProps) {
    const { filters } = useTypedSelector(state => state.candidate);
    const { setCandidateActiveFilter } = useActions();

    const activeCandidatesFilterHandler = (checked: boolean): void => {
        checked ? setCandidateActiveFilter(CandidateStatus.Active) : setCandidateActiveFilter(CandidateStatus.All)
    }

    return (
        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => activeCandidatesFilterHandler(checked)}
                            checked={filters.active === CandidateStatus.Active ? true : false}
                        />}
                    label="Show only active" />
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    style={{ marginTop: '15px' }}
                    onClick={onAddNew}>
                    + Create New
                </Button>
            </Grid>
        </Grid>
    )
}