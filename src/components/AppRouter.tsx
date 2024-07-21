import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter = () => {
    const isAuth = useTypedSelector(state => state.auth.auth);
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.element />}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to='/' replace />}>
                </Route>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.element />}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to='/login' replace />}>
                </Route>
            </Routes>
    )
}

export default AppRouter
