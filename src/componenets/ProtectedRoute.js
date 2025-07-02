import {Navigate, Outlet} from 'react-router-dom';
import {JWT_COOKIE_NAME, USER_DETAILS_NAME} from "../commons/Constants";

const ProtectedRoute = () => {
    const userDetails = JSON.parse(sessionStorage.getItem(USER_DETAILS_NAME));
    const token = userDetails?.[JWT_COOKIE_NAME];

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
