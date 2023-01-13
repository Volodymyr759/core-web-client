import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { HOME, ERROR, REGISTER_PAGE, LOGIN_PAGE, USERS_PAGE, ABOUT, SERVICES, TEAM, VACANCIES, CONTACT, REGISTER_COMPLETE } from './routing/pathes';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import UsersPage from './pages/UsersPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ServicesPage from './pages/ServicesPage';
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
                    <Route path={ABOUT} element={
                        <PublicLayout title='About Us'>
                            <AboutPage />
                        </PublicLayout>
                    } />
                    <Route path={CONTACT} element={
                        <PublicLayout>
                            <ContactPage />
                        </PublicLayout>
                    } />
                    <Route path={ERROR} element={
                        <PublicLayout>
                            <ErrorPage />
                        </PublicLayout>
                    } />
                    <Route path={HOME} element={
                        <PublicLayout>
                            <HomePage />
                        </PublicLayout>
                    } />
                    <Route path={LOGIN_PAGE} element={
                        <PublicLayout>
                            <LoginPage />
                        </PublicLayout>
                    } />
                    <Route path={REGISTER_COMPLETE} element={
                        <PublicLayout>
                            <RegisterCompletePage />
                        </PublicLayout>
                    } />
                    <Route path={REGISTER_PAGE} element={
                        <PublicLayout>
                            <RegisterPage />
                        </PublicLayout>
                    } />
                    <Route path={SERVICES} element={
                        <PublicLayout>
                            <ServicesPage />
                        </PublicLayout>
                    } />
                    <Route path={TEAM} element={
                        <PublicLayout>
                            <TeamPage />
                        </PublicLayout>
                    } />
                    <Route path={VACANCIES} element={
                        <PublicLayout>
                            <VacanciesPage />
                        </PublicLayout>
                    } />
                    <Route path={USERS_PAGE} element={
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
