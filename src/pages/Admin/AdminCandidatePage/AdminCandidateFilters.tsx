import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { CandidateStatus } from "../../../types/candidate";
import { AdminCandidateFiltersProps } from "./types";
import { Grid } from "@mui/material";
import SearchTextFilter from "../../../components/FiltersArea/SearchTextFilter/SearchTextFilter";
import CheckBoxFilter from "../../../components/FiltersArea/CheckBoxFilter/CheckBoxFilter";
import CreateNewButton from "../../../components/FiltersArea/CreateNewButton/CreateNewButton";

export default function AdminCandidateFilters({ onAddNew }: AdminCandidateFiltersProps) {
    const { filters } = useTypedSelector(state => state.candidate);
    const { setCandidatePage, setCandidateSearchCriteria, setCandidateActiveFilter } = useActions();

    const activeCandidatesFilterHandler = (checked: boolean): void => {
        checked ? setCandidateActiveFilter(CandidateStatus.Active) : setCandidateActiveFilter(CandidateStatus.All)
    }

    const onChangeSearch = (search: string): void => {
        if (search.length === 0) setCandidateSearchCriteria("");
        if (search.length < 3) return;
        setCandidatePage(1);
        setCandidateSearchCriteria(search);
    }

    return (
        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <CheckBoxFilter label="Show only not dismissed" onCheck={activeCandidatesFilterHandler} isChecked={filters.active === CandidateStatus.Active ? true : false} />
            <SearchTextFilter title="Search candidate" onSearch={onChangeSearch} />
            <CreateNewButton onAction={onAddNew}>+ New Candidate</CreateNewButton>
        </Grid>
    )
}