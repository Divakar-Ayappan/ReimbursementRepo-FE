import ProtectedRoute from "../componenets/ProtectedRoute";
import Login from "../pages/Login";
import MainLayout from "../componenets/layout/MainLayout";
import OverviewPage from "../pages/OverviewPage";
import {Navigate} from "react-router-dom";
import RulesPage from "../pages/RulesPage";
import ManagePage from "../pages/ManagePage";

export const appRoutes = [
    {
        path: "/login",
        element: <Login />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: "overview",
                        element: (
                            <ProtectedRoute allowedRoles={['EMPLOYEE', 'MANAGER']}>
                                <OverviewPage />
                            </ProtectedRoute>
                        )
                    },
                    {
                        index: true,
                        element: (
                            <ProtectedRoute allowedRoles={['EMPLOYEE', 'MANAGER']}>
                                <Navigate to="overview" replace />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "rules",
                        element: <RulesPage />
                    },
                    {
                        path: "manage",
                        element: (
                            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}>
                                <ManagePage />
                            </ProtectedRoute>
                        )
                    }
                ]
            }
        ]
    }

];
