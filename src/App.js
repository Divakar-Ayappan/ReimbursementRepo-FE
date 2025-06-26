import {Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from './componenets/layout/MainLayout';
import OverviewPage from './pages/OverviewPage';
import RulesPage from './pages/RulesPage';
import '../src/styles/variable.css'
import Login from "./pages/Login";
import ProtectedRoute from "./componenets/ProtectedRoute";
import {AuthContext} from "./context/AuthContext";
import {useState} from "react";

function App() {

    //Load user
    const [user, setUser] = useState(
        () => {
            const savedUser = sessionStorage.getItem('user');
            console.log('saved user', savedUser);
            return savedUser ? JSON.parse(savedUser) : null;
        }
    );

    return (
        <AuthContext.Provider value={{user, setUser}}>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route element={<MainLayout/>}>
                        <Route index element={<Navigate to="overview" replace/>}/>
                        <Route path="overview" element={<OverviewPage/>}/>
                        <Route path="rules" element={<RulesPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </AuthContext.Provider>
    );
}


export default App;
