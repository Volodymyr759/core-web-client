import React from "react";
import AboutPage from "../pages/AboutPage/AboutPage";
import ServicesPage from "../pages/CompanyServices/ServicesPage";
import ContactPage from "../pages/ContactPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import { RegisterCompletePage } from "../pages/Register/RegisterCompletePage";
import RegisterPage from "../pages/Register/RegisterPage";
import TeamPage from "../pages/TeamPage/TeamPage";
import UsersPage from "../pages/UsersPage";
import VacanciesPage from "../pages/Vacancies/VacanciesPage";
import VacancyDetailes from "../pages/Vacancies/VacancyDetails";

export interface IRoute {
    path: string;
    component: () => React.ReactNode;
    title: string;
}

export enum RouteNames {
    ABOUT = '/about',
    CONTACT = '/contact',
    HOME = "/",
    SERVICES = '/services',
    TEAM = '/team',
    VACANCY = '/vacancy',
    VACANCY_DETAILES = '/vacancy/detailes/:id',
    ERROR = '/error',
    LOGIN = '/login',
    REGISTER = '/register',
    REGISTER_COMPLETE = '/register-complete',
    USERS = '/users'
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.ABOUT, component: AboutPage, title: 'About Us' },
    { path: RouteNames.CONTACT, component: ContactPage, title: 'Contact' },
    { path: RouteNames.HOME, component: HomePage, title: 'Home' },
    { path: RouteNames.SERVICES, component: ServicesPage,  title: 'Services' },
    { path: RouteNames.TEAM, component: TeamPage, title: 'Team' },
    { path: RouteNames.VACANCY, component: VacanciesPage, title: 'Vacancies' },
    { path: RouteNames.VACANCY_DETAILES, component: VacancyDetailes, title: 'Vacancy detailes' },
    // Sign Up & Sign In
    { path: RouteNames.LOGIN, component: LoginPage, title: 'Sign In' },
    { path: RouteNames.REGISTER, component: RegisterPage, title: 'Sign Up' },
    { path: RouteNames.REGISTER_COMPLETE, component: RegisterCompletePage, title: 'Registration Complete' }

]

export const roleRegisteredRoutes: IRoute[] = [
    { path: RouteNames.USERS, component: UsersPage, title: 'Dashboard - Users page' }
]