export interface IRoute {
    path: string;
    component: JSX.Element;
    title: string;
}

export enum RouteNames {
    ADMIN_CANDIDATES = '/admin/candidates',
    ADMIN_COUNTRIES = '/admin/countries',
    ADMIN_OFFICES = '/admin/offices',
    ADMIN_SERVICES = '/admin/services',
    ADMIN_TEAM = '/admin/team',
    ADMIN_VACANCIES = '/admin/vacancies',
    ABOUT = '/about',
    CONTACT = '/contact',
    CHANGE_EMAIL = '/change-email',
    CHANGE_PASSWORD ='/change-password',
    EMAIL_CONFIRM = '/email-confirm',
    ERROR = '/error',
    FAVORITE_VACANCIES = '/favorite-vacancies',
    FORGOT_PASSWORD = '/forgot-password',
    HOME = "/",
    LOGIN = '/login',
    PROFILE = "/profile",
    REGISTER = '/register',
    REGISTER_COMPLETE = '/register-complete',
    RESET_PASSWORD = '/reset-password',
    SERVICES = '/services',
    TEAM = '/team',
    TEST_UI = '/test',
    USERS = '/users',
    VACANCY = '/vacancy',
    VACANCY_DETAILES = '/vacancy/:vacancyId'
}
