import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { HOME, ERROR, REGISTER, LOGIN, USERS, ABOUT, SERVICES, TEAM, VACANCIES, CONTACT, REGISTER_COMPLETE } from './routing/pathes';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import UsersPage from './pages/UsersPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ServicesPage from './pages/CompanyServices/ServicesPage';
import TeamPage from './pages/TeamPage/TeamPage';
import VacanciesPage from './pages/VacanciesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import { RegisterCompletePage } from './pages/Register/RegisterCompletePage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Public Pages */}
                    <Route path={ABOUT.path} element={
                        <PublicLayout title={ABOUT.title}>
                            <AboutPage />
                        </PublicLayout>
                    } />
                    <Route path={CONTACT.path} element={
                        <PublicLayout title={CONTACT.title}>
                            <ContactPage />
                        </PublicLayout>
                    } />
                    <Route path={ERROR.path} element={
                        <PublicLayout title={ERROR.title}>
                            <ErrorPage />
                        </PublicLayout>
                    } />
                    <Route path={HOME.path} element={
                        <PublicLayout title={HOME.title}>
                            <HomePage />
                        </PublicLayout>
                    } />
                    <Route path={SERVICES.path} element={
                        <PublicLayout title={SERVICES.title}>
                            <ServicesPage />
                        </PublicLayout>
                    } />
                    <Route path={TEAM.path} element={
                        <PublicLayout title={TEAM.title}>
                            <TeamPage />
                        </PublicLayout>
                    } />
                    <Route path={VACANCIES.path} element={
                        <PublicLayout title={VACANCIES.title}>
                            <VacanciesPage />
                        </PublicLayout>
                    } />
                    {/* Auth Pages */}
                    <Route path={LOGIN.path} element={
                        <PublicLayout title={LOGIN.title}>
                            <LoginPage />
                        </PublicLayout>
                    } />
                    <Route path={REGISTER_COMPLETE.path} element={
                        <PublicLayout title={REGISTER_COMPLETE.title}>
                            <RegisterCompletePage />
                        </PublicLayout>
                    } />
                    <Route path={REGISTER.path} element={
                        <PublicLayout title={REGISTER.title}>
                            <RegisterPage />
                        </PublicLayout>
                    } />
                    {/* Protected Pages */}
                    <Route path={USERS.path} element={
                        <AdminLayout>
                            <UsersPage />
                        </AdminLayout>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
