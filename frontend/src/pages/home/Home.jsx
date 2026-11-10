import React from 'react'
import styles from "./styles.module.scss";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                A full-stack authentication demo with server-verified sessions and protected dashboard routes.
            </div>
        </div>
    )
}

export default Home

