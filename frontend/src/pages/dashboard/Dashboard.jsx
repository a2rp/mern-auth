import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { Button, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

const Dashboard = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const config = {
                method: "POST",
                url: "/user",
                withCredentials: true,
            };

            const response = await axios(config);
            // console.log(response, "dashboard response");
            const username = response.data.username;
            setUsername(username);
            return response.data.success
                ? (setIsLoggedIn(true), toast.info(`Hello ${username}`))
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
        // console.log(cookies, "dashboard cookies");
    }, [cookies, navigate, removeCookie]);

    const logout = () => {
        Swal.fire({
            title: "Do you want to logout?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Logout",
            denyButtonText: `Don't logout`
        }).then((result) => {
            if (result.isConfirmed) {
                removeCookie("token");
                navigate("/login");
            }
        });
    };

    return (
        <>
            {isLoggedIn === false
                ? <CircularProgress sx={{ padding: "5px" }} />
                : <>

                    <div className={styles.container}>
                        <div className={styles.main}>
                            <h3 className={styles.heading}>Welcome <span>{username}</span></h3>
                            <Button
                                className={styles.logoutButton}
                                onClick={logout} variant="contained"
                            >LOGOUT</Button>
                        </div>
                    </div>
                </>}
        </>
    );
};

export default Dashboard;
