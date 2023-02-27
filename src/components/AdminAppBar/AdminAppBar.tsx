import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AdminServicePage from "../../pages/Admin/AdminServicePage/AdminServicePage";
import AdminTeamPage from "../../pages/Admin/AdminTeamPage/AdminTeamPage";
import AdminVacancyPage from "../../pages/Admin/AdminVacancyPage/AdminVacancyPage";
import UsersPage from "../../pages/Admin/AdminUserPage/UsersPage";
import { IRoute, RouteNames } from "../../routing";

const adminMenuRoutes: IRoute[] = [
    { path: RouteNames.ADMIN_TEAM, title: "Team", component: <AdminTeamPage /> },
    { path: RouteNames.ADMIN_SERVICES, title: "Services", component: <AdminServicePage /> },
    { path: RouteNames.ADMIN_VACANCIES, title: "Vacancies", component: <AdminVacancyPage /> },
    { path: RouteNames.USERS, title: "Users", component: <UsersPage /> }
]

export default function AdminAppBar(): JSX.Element {
    return (
        <Grid container spacing={2} style={{ margin: '16px 0 5px' }}>
            {adminMenuRoutes.map((page) => (
                <Button key={page.path} sx={{ textTransform: 'none', padding: '0', marginLeft: '10px', minWidth: '0' }} >
                    <Link to={page.path}>{page.title}</Link>
                </Button>
            ))}
        </Grid>
    )
}