import React from "react";
import styles from "./styles.module.scss";
import Router from "./router";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./utils/auth";

const App = () => {
    return (
        <AuthProvider>
            <div className={styles.container}>
                <Header />
                <div className={styles.main}>
                    <div className={styles.routerContainer}><Router /></div>
                </div>
            </div>

            <ToastContainer />
        </AuthProvider>
    )
}

export default App

