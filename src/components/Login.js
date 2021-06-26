import { Link } from 'react-router-dom';
import { useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import styles from '../styles/AuthPage.module.css';

function Login() {  
    const { login } = useFirebaseAuth();

    const [error, setError] = useState();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(email, password);
        } catch(err) {
            setError("The login credentials you entered are invalid.")
        }
    }

    return (
        <div className={styles.authPage}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.content}>
                    <div className={styles.headings}>
                        <h1 className={styles.heading}>Welcome back</h1>
                        <h2 className={styles.subheading}>
                            Don't have an account?
                            <Link to="/">
                                Sign Up
                            </Link>
                        </h2>
                    </div>
                    { error && <span className={styles.errorMessage}>{error}</span>}
                    <div className={styles.inputs}>
                        <div className={styles.section}>
                            <label htmlFor="email">Email address</label>
                            <input onChange={handleEmailChange} id="email" type="email" />
                        </div>
                        <div className={`${styles.section} ${styles.password}`}>
                            <label htmlFor="password">Password</label>
                            <input onChange={handlePasswordChange} id="password" type="password" />
                            <Link to="/reset-password">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button>Sign in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login