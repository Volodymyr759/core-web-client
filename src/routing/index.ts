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
import VacanciesPage from "../pages/VacanciesPage";

export interface IRoute {
    path: string;
    component: React.ReactNode;
    title: string;
}

export enum RouteNames {
    ABOUT = '/about',
    CONTACT = '/contact',
    HOME = "/",
    SERVICES = '/services',
    TEAM = '/team',
    VACANCIES = '/vacancies',
    ERROR = '/error',
    LOGIN = '/login',
    REGISTER = '/register',
    REGISTER_COMPLETE = '/register-complete',
    USERS = '/users'
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.ABOUT, component: AboutPage(), title: 'About Us' },
    { path: RouteNames.CONTACT, component: ContactPage(), title: 'Contact' },
    { path: RouteNames.HOME, component: HomePage(), title: 'Home page' },
    { path: RouteNames.SERVICES, component: ServicesPage(),  title: 'Services page' },
    { path: RouteNames.TEAM, component: TeamPage(), title: 'Team page' },
    { path: RouteNames.VACANCIES, component: VacanciesPage(), title: 'Vacancies page' },
    // { path: RouteNames.ERROR, component: ErrorPage, exact: true, name: 'Error', title: 'Error page' },
    // Sign Up & Sign In
    { path: RouteNames.LOGIN, component: LoginPage(), title: 'Sign In' },
    { path: RouteNames.REGISTER, component: RegisterPage(), title: 'Sign Up' },
    { path: RouteNames.REGISTER_COMPLETE, component: RegisterCompletePage(), title: 'Registration Complete' }

]

export const roleRegisteredRoutes: IRoute[] = [
    { path: RouteNames.USERS, component: UsersPage(), title: 'Dashboard - Users page' }
]