import { Routes, Route } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { publicRoutes, roleRegisteredRoutes } from '../routing';
import { Roles } from '../types/auth';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';

export const AppRouter = () => {
    const { auth } = useTypedSelector(state => state.auth);

    var setPublicRoutes = publicRoutes.map(route =>
        <Route key={route.path} path={route.path} element={
            <PublicLayout title={route.title}>
                {route.component}
            </PublicLayout>
        } />)

    return (
        auth === null ?
            <Routes>
                {
                    setPublicRoutes
                }
            </Routes >
            :
            auth.roles.includes(Roles.REGISTERED) &&
            <Routes>
                {
                    setPublicRoutes.concat(
                        roleRegisteredRoutes.map(route =>
                            <Route key={route.path} path={route.path} element={
                                <AdminLayout>
                                    {route.component}
                                </AdminLayout>
                            } />
                        ))
                }
            </Routes>

    )
}