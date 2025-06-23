import { Navigate, Outlet } from 'react-router-dom';
import {JWT_COOKIE_NAME} from "../commons/Constants";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem(JWT_COOKIE_NAME);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
