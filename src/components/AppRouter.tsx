import { Routes, Route } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AboutPage from '../pages/About/AboutPage';
import { Roles } from '../types/auth';
import { IRoute, RouteNames } from '../routing';
import AdminCandidatePage from '../pages/Admin/AdminCandidate/AdminCandidatePage';
import AdminCountryPage from '../pages/Admin/AdminCountry/AdminCountryPage';
import AdminServicePage from '../pages/Admin/AdminService/AdminServicePage';
import AdminOfficePage from '../pages/Admin/AdminOffice/AdminOfficePage';
import AdminTeamPage from '../pages/Admin/AdminTeam/AdminTeamPage';
import AdminVacancyPage from '../pages/Admin/AdminVacancy/AdminVacancyPage';
import ServicesPage from '../pages/CompanyServices/ServicesPage';
import ContactPage from '../pages/Contact/ContactPage';
import ErrorPage from '../pages/Error/ErrorPage';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Account/Login/LoginPage';
import RegisterCompletePage from '../pages/Account/RegisterComplete/RegisterCompletePage';
import RegisterPage from '../pages/Account/Register/RegisterPage';
import TeamPage from '../pages/Team/TeamPage';
import UsersPage from '../pages/Admin/AdminUser/AdminUsersPage';
import VacanciesPage from '../pages/Vacancies/VacanciesPage';
import VacancyDetailes from '../pages/Vacancies/VacancyDetails';
import AdminLayout from './Layouts/AdminLayout';
import PublicLayout from './Layouts/PublicLayout';
import EmailConfirmPage from '../pages/Account/EmailConfirm/EmailConfirmPage';
import ProfilePage from '../pages/Account/Profile/ProfilePage';
import ChangeEmailPage from '../pages/Account/ChangeEmail/ChangeEmailPage';
import ChangePasswordPage from '../pages/Account/ChangePassword/ChangePasswordPage';
import TestUI from '../pages/Test/TestUI';
import FavoriteVacanciesPage from '../pages/Vacancies/FavoriteVacanciesPage';
import ForgotPasswordPage from '../pages/Account/ForgotPassword/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Account/ResetPassword/ResetPasswordPage';

export default function AppRouter() {
    const { auth } = useTypedSelector(state => state.auth);

    const anonimousRoleRoutes: IRoute[] = [
        { path: RouteNames.ABOUT, title: "About Us", component: <AboutPage /> },
        { path: RouteNames.CONTACT, title: "Contact", component: <ContactPage /> },
        { path: RouteNames.EMAIL_CONFIRM, title: "Email confirmation page", component: <EmailConfirmPage /> },
        { path: RouteNames.FORGOT_PASSWORD, title: "Forgot Password", component: <ForgotPasswordPage /> },
        { path: RouteNames.HOME, title: "Shuffle Solutions", component: <HomePage /> },
        { path: RouteNames.SERVICES, title: "Services", component: <ServicesPage /> },
        { path: RouteNames.TEAM, title: "Team", component: <TeamPage /> },
        { path: RouteNames.TEST_UI, title: "UI Tests", component: <TestUI /> },
        { path: RouteNames.VACANCY, title: "Vacancies", component: <VacanciesPage /> },
        { path: RouteNames.LOGIN, title: "Sign In", component: <LoginPage /> },
        { path: RouteNames.REGISTER, title: "Sign Up", component: <RegisterPage /> },
        { path: RouteNames.REGISTER_COMPLETE, title: "Registration Complete", component: <RegisterCompletePage /> },
        { path: RouteNames.RESET_PASSWORD, title: "Reset Your Password", component: <ResetPasswordPage /> },
        { path: "*", title: "Error: wrong route!", component: <ErrorPage status='403' message='Access denied, try login to continue.' /> }
    ];

    const registeredRoleRoutes: IRoute[] = [
        { path: RouteNames.CHANGE_EMAIL, title: "Change email", component: <ChangeEmailPage /> },
        { path: RouteNames.CHANGE_PASSWORD, title: "Change password", component: <ChangePasswordPage /> },
        { path: RouteNames.FAVORITE_VACANCIES, title: "Favorite Vacancies", component: <FavoriteVacanciesPage /> },
        { path: RouteNames.PROFILE, title: "Profile", component: <ProfilePage /> },
        { path: RouteNames.VACANCY_DETAILES, title: "Vacancy Detailes", component: <VacancyDetailes /> }
    ]

    const adminRoleRoutes: IRoute[] = [
        { path: RouteNames.ADMIN_CANDIDATES, title: "Candidates", component: <AdminCandidatePage /> },
        { path: RouteNames.ADMIN_COUNTRIES, title: "Contries", component: <AdminCountryPage /> },
        { path: RouteNames.ADMIN_OFFICES, title: "Offices", component: <AdminOfficePage /> },
        { path: RouteNames.ADMIN_SERVICES, title: "Services", component: <AdminServicePage /> },
        { path: RouteNames.ADMIN_TEAM, title: "Team", component: <AdminTeamPage /> },
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
            auth.roles.includes(Roles.ADMIN) || auth.roles.includes(Roles.DEMO) ?
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