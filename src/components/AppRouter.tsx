import { Routes, Route } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AboutPage from '../pages/AboutPage/AboutPage';
import AdminServicePage from '../pages/Admin/AdminServicePage/AdminServicePage';
import AdminTeamPage from '../pages/Admin/AdminTeamPage/AdminTeamPage';
import AdminVacancyPage from '../pages/Admin/AdminVacancyPage/AdminVacancyPage';
import ServicesPage from '../pages/CompanyServices/ServicesPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterCompletePage from '../pages/Register/RegisterCompletePage';
import RegisterPage from '../pages/Register/RegisterPage';
import TeamPage from '../pages/TeamPage/TeamPage';
import UsersPage from '../pages/Admin/AdminUserPage/UsersPage';
import VacanciesPage from '../pages/Vacancies/VacanciesPage';
import VacancyDetailes from '../pages/Vacancies/VacancyDetails';
import { IRoute, RouteNames } from '../routing';
import { Roles } from '../types/auth';
import AdminLayout from './Layouts/AdminLayout';
import PublicLayout from './Layouts/PublicLayout';

export default function AppRouter() {
    const { auth } = useTypedSelector(state => state.auth);

    const anonimousRoleRoutes: IRoute[] = [
        { path: RouteNames.ABOUT, title: "About Us", component: <AboutPage /> },
        { path: RouteNames.CONTACT, title: "Contact", component: <ContactPage /> },
        { path: RouteNames.HOME, title: "Home", component: <HomePage /> },
        { path: RouteNames.SERVICES, title: "Services", component: <ServicesPage /> },
        { path: RouteNames.TEAM, title: "Team", component: <TeamPage /> },
        { path: RouteNames.VACANCY, title: "Vacancies", component: <VacanciesPage /> },
        { path: RouteNames.LOGIN, title: "Sign In", component: <LoginPage /> },
        { path: RouteNames.REGISTER, title: "Sign Up", component: <RegisterPage /> },
        { path: RouteNames.REGISTER_COMPLETE, title: "Registration Complete", component: <RegisterCompletePage /> },
        { path: "*", title: "Error: wrong route!", component: <ErrorPage status='403' message='Access denied, try to login for continue.' /> }
    ];

    const registeredRoleRoutes: IRoute[] = [
        { path: RouteNames.VACANCY_DETAILES, title: "Vacancy Detailes", component: <VacancyDetailes /> }
    ]

    const adminRoleRoutes: IRoute[] = [
        { path: RouteNames.ADMIN_TEAM, title: "Team", component: <AdminTeamPage /> },
        { path: RouteNames.ADMIN_SERVICES, title: "Services", component: <AdminServicePage /> },
        { path: RouteNames.ADMIN_VACANCIES, title: "Vacancies", component: <AdminVacancyPage /> },
        { path: RouteNames.USERS, title: "Users page", component: <UsersPage /> }
    ]

    return (
        auth === null ?
            <Routes>
                {
                    anonimousRoleRoutes.map((route) => {
                        return (
                            <Route key={route.path} path={route.path} element={
                                <PublicLayout title={route.title}>{route.component}</PublicLayout>
                            } />
                        )
                    })
                }
            </Routes >
            :
            // auth.roles.includes(Roles.REGISTERED) && 
            // <Routes>
            //     {
            //         anonimousRoleRoutes.concat(registeredRoleRoutes).map((route) => {
            //             return (
            //                 <Route key={route.path} path={route.path} element={
            //                     <PublicLayout>{route.component}</PublicLayout>
            //                 } />
            //             )
            //         })
            //     }
            // </Routes>
            auth.roles.includes(Roles.ADMIN) ?
                <Routes>
                    {
                        anonimousRoleRoutes.concat(registeredRoleRoutes).concat(adminRoleRoutes).map((route) => {
                            return (
                                <Route key={route.path} path={route.path} element={
                                    <AdminLayout>{route.component}</AdminLayout>
                                } />
                            )
                        })
                    }
                </Routes>
                :
                <Routes>
                    {
                        anonimousRoleRoutes.concat(registeredRoleRoutes).map((route) => {
                            return (
                                <Route key={route.path} path={route.path} element={
                                    <PublicLayout>{route.component}</PublicLayout>
                                } />
                            )
                        })
                    }
                </Routes>
    )
}