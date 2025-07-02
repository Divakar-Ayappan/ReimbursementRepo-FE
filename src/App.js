import '../src/styles/variable.css'
import {AuthContext} from "./context/AuthContext";
import {useState} from "react";
import {appRoutes} from "./routes/routes";
import {useRoutes} from "react-router-dom";

function App() {

    //Load user
    const [user, setUser] = useState(
        () => {
            const savedUser = sessionStorage.getItem('user');
            console.log('saved user', savedUser);
            return savedUser ? JSON.parse(savedUser) : null;
        }
    );

    const routes = useRoutes(appRoutes);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {routes}
        </AuthContext.Provider>
    );
}


export default App;
