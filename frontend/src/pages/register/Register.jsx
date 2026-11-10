import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { useAuth } from "../../utils/auth";
import styles from "./styles.module.scss";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputValue, setInputValue] = useState({ email: "", username: "", password: "", confirmPassword: "" });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValue((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await api.post("/user/register", {
                ...inputValue,
                email: inputValue.email.trim(),
                username: inputValue.username.trim(),
            });
            if (!data.success || !data.user) throw new Error(data.message || "Unable to create your account.");
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
                <h1 className={styles.heading}>Create account</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.usernameContainer}>
                        <TextField
                            value={inputValue.username}
                            onChange={handleOnChange}
                            name="username"
                            type="text"
                            label="Username"
                            autoComplete="username"
                            size="small"
                            className={styles.usernameInput}
                            inputProps={{ minLength: 3, maxLength: 32, pattern: "[A-Za-z0-9_]+" }}
                            required
                        />
                    </div>
                    <div className={styles.emailContainer}>
                        <TextField
                            value={inputValue.email}
                            onChange={handleOnChange}
                            name="email"
                            type="email"
                            label="Email address"
                            autoComplete="email"
                            size="small"
                            className={styles.emailInput}
                            inputProps={{ maxLength: 254 }}
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
                            autoComplete="new-password"
                            size="small"
                            className={styles.passwordInput}
                            inputProps={{ minLength: 12, maxLength: 128 }}
                            required
                        />
                        <IconButton className={styles.icon} type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? "Hide password" : "Show password"}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </IconButton>
                    </div>
                    <div className={styles.confirmPasswordContainer}>
                        <TextField
                            value={inputValue.confirmPassword}
                            onChange={handleOnChange}
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            label="Confirm password"
                            autoComplete="new-password"
                            size="small"
                            className={styles.confirmPasswordInput}
                            inputProps={{ minLength: 12, maxLength: 128 }}
                            required
                        />
                        <IconButton className={styles.icon} type="button" onClick={() => setShowConfirmPassword((shown) => !shown)} aria-label={showConfirmPassword ? "Hide confirmation" : "Show confirmation"}>
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </IconButton>
                    </div>
                    <p className={styles.passwordHint}>Use 12–128 characters with an uppercase letter, lowercase letter, number, and symbol.</p>
                    <Button type="submit" variant="contained" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={22} /> : "Create account"}
                    </Button>
                    <div className={styles.loginLink}>Already have an account? <NavLink to="/login">Log in</NavLink></div>
                </form>
            </div>
        </div>
    );
};

export default Register;
