import {Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from './componenets/layout/MainLayout';
import OverviewPage from './pages/OverviewPage';
import RulesPage from './pages/RulesPage';
import '../src/styles/variable.css'
import Login from "./pages/Login";

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login/>} />
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/overview" replace />} />
                <Route path="overview" element={<OverviewPage />} />
                <Route path="rules" element={<RulesPage />} />
            </Route>
        </Routes>
    );
}


export default App;
