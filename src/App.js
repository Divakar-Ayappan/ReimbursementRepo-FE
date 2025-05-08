import {Route, Routes} from 'react-router-dom';
import MainLayout from './componenets/layout/MainLayout';
import OverviewPage from './pages/OverviewPage';
import RulesPage from './pages/RulesPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="overview" element={<OverviewPage />} />
                <Route path="rules" element={<RulesPage />} />
            </Route>
        </Routes>
    );
}


export default App;
