import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { useAuth } from "../../utils/auth";
import styles from "./styles.module.scss";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState({ email: "", password: "" });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValue((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await api.post("/user/login", {
                email: inputValue.email.trim(),
                password: inputValue.password,
            });
            if (!data.success || !data.user) throw new Error(data.message || "Unable to log in.");
            login(data.user);
            toast.success(data.message);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Unable to reach the API.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1 className={styles.heading}>Log in</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.emailContainer}>
                        <TextField
                            value={inputValue.email}
                            onChange={handleOnChange}
                            name="email"
                            type="email"
                            label="Email address"
                            autoComplete="username"
                            size="small"
                            className={styles.emailInput}
                            required
                        />
                    </div>
                    <div className={styles.passwordContainer}>
                        <TextField
                            value={inputValue.password}
                            onChange={handleOnChange}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            autoComplete="current-password"
                            size="small"
                            className={styles.passwordInput}
                            required
                        />
                        <IconButton className={styles.icon} type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? "Hide password" : "Show password"}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </IconButton>
                    </div>
                    <Button type="submit" variant="contained" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={22} /> : "Log in"}
                    </Button>
                    <div className={styles.registerLink}>Need an account? <NavLink to="/register">Register</NavLink></div>
                </form>
            </div>
        </div>
    );
};

export default Login;
