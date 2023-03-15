export interface IRoute {
    path: string;
    component: JSX.Element;
    title: string;
}

export enum RouteNames {
    ABOUT = '/about',
    CONTACT = '/contact',
    HOME = "/",
    SERVICES = '/services',
    TEAM = '/team',
    VACANCY = '/vacancy',
    VACANCY_DETAILES = '/vacancy/:vacancyId',
    ERROR = '/error',
    LOGIN = '/login',
    PROFILE = "/profile",
    REGISTER = '/register',
    REGISTER_COMPLETE = '/register-complete',
    EMAIL_CONFIRM = '/email-confirm',
    USERS = '/users',
    ADMIN_CANDIDATES = '/admin/candidates',
    ADMIN_COUNTRIES = '/admin/countries',
    ADMIN_OFFICES = '/admin/offices',
    ADMIN_SERVICES = '/admin/services',
    ADMIN_TEAM = '/admin/team',
    ADMIN_VACANCIES = '/admin/vacancies'
}
