import styles from "./styles.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useAuth } from "../../utils/auth";

const Header = () => {
    const navigate = useNavigate();
    const { status, logout } = useAuth();

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Log out?",
            showCancelButton: true,
            confirmButtonText: "Log out",
            cancelButtonText: "Stay signed in",
        });
        if (!result.isConfirmed) return;
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className={styles.container}>
            <NavLink to="/home" className={styles.siteName}>MERN AUTH</NavLink>
            <nav className={styles.navlinks} aria-label="Main navigation">
                <NavLink to="/home" className={styles.navlink}>Home</NavLink>
                {status === "authenticated" && <NavLink to="/dashboard" className={styles.navlink}>Dashboard</NavLink>}
                {status === "anonymous" && <NavLink to="/login" className={styles.navlink}>Login</NavLink>}
                {status === "anonymous" && <NavLink to="/register" className={styles.navlink}>Register</NavLink>}
                {status === "authenticated" && <Button className={styles.logoutButton} variant="contained" onClick={handleLogout}>Logout</Button>}
            </nav>
        </div>
    );
};

export default Header;
