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
    REGISTER = '/register',
    REGISTER_COMPLETE = '/register-complete',
    USERS = '/users'
}
