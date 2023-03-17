import { useActions } from "../../../hooks/useActions";
import { Grid } from "@mui/material"
import SearchTextFilter from "../../../components/FiltersArea/SearchTextFilter/SearchTextFilter"

export default function AdminUserFilters(): JSX.Element {
    const { setUserPage, setUserSearchCriteria } = useActions();

    const onChangeSearch = (search: string): void => {
        if (search.length === 0) setUserSearchCriteria("");
        if (search.length < 3) return;
        setUserPage(1);
        setUserSearchCriteria(search);
    }

    return (
        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <SearchTextFilter title="Search user" onSearch={onChangeSearch} />
        </Grid>
    )
}