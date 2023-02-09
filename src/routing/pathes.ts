interface PageRouteItem {
    path: string;
    name: string;
    title: string;
}

export const ABOUT: PageRouteItem = { path: '/about', name: 'About', title: 'About Us' };
export const CONTACT: PageRouteItem = { path: '/contact', name: 'Contact', title: 'Contact' };
export const HOME: PageRouteItem = { path: '/', name: 'Home', title: 'Home page' };
export const SERVICES: PageRouteItem = { path: '/services', name: 'Services', title: 'Services page' };
export const TEAM: PageRouteItem = { path: '/team', name: 'Team', title: 'Team page' };
export const VACANCIES: PageRouteItem = { path: '/vacancy', name: 'Vacancies', title: 'Vacancies page' };
export const ERROR: PageRouteItem = { path: '/error', name: 'Error', title: 'Error page' };

// Sign Up & Sign In
export const LOGIN: PageRouteItem = { path: '/login', name: 'Login', title: 'Sign In' };
export const REGISTER: PageRouteItem = { path: '/register', name: 'Register', title: 'Sign Up' };
export const REGISTER_COMPLETE: PageRouteItem = { path: '/register-complete', name: 'RegisterComplete', title: 'Registration Complete' };

// Profile


// Admin pages
export const USERS: PageRouteItem = { path: '/users', name: 'Users', title: 'Dashboard - Users page' };

// Main Menu
export const MainMenuPathes: PageRouteItem[] = [HOME, ABOUT, SERVICES, TEAM, VACANCIES, CONTACT]

