import { Navigate, Outlet } from 'react-router-dom';
import { JWT_COOKIE_NAME, USER_DETAILS_NAME } from "../commons/Constants";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const userDetails = JSON.parse(sessionStorage.getItem(USER_DETAILS_NAME));
    const token = userDetails?.[JWT_COOKIE_NAME];
    const role = userDetails?.role;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    // ✅ If children are passed directly (from route config), render them
    return children ? children : <Outlet />;
};

export default ProtectedRoute;
