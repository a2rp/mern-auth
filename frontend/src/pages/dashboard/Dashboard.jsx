import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useAuth } from "../../utils/auth";
import styles from "./styles.module.scss";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

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
            <div className={styles.main}>
                <h3 className={styles.heading}>Welcome <span>{user?.username}</span></h3>
                <p>You are signed in. Your session is verified by the API.</p>
                <Button className={styles.logoutButton} onClick={handleLogout} variant="contained">Log out</Button>
            </div>
        </div>
    );
};

export default Dashboard;
