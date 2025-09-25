import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
        .then((userData) => {
            if (userData) {
                dispatch(login({userData}));
            } else {
                dispatch(logout())
            }
        })
        .finally(() => setLoading(false));
    }, [])

    return !loading ? (
        <div>
            <Header />
            <main>
                TODO : <Outlet />
            </main>
            <Footer />
        </div>
    ) : null;
}

export default App;