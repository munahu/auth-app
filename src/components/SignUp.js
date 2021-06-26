import { Link } from 'react-router-dom';
import { useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import styles from '../styles/AuthPage.module.css';

function SignUp() {  
    const { createUser } = useFirebaseAuth();

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
            await createUser(email, password);
        } catch(err) {
            handleErrors(err.message);
        }
    }

    const handleErrors = (error) => {
        switch(error) {
            case "The email address is already in use by another account.":
              setError("Looks like you may already have an account with us. Use your credentials to log in instead.");
              break;
            case "Password should be at least 6 characters":
              setError("Password should be at least 6 characters");
              break;
            default:
             setError("Unable to create account. Please try again later.")
          }
    }

    return (
        <div className={styles.loginPage}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.headings}>
                    <h1 className={styles.heading}>Create an account</h1>
                    <h2 className={styles.subheading}>
                        Already have an account? 
                        <Link to="/login">
                            Log in
                        </Link>
                    </h2>
                </div>
                { error && <span className={styles.errorMessage}>{error}</span>}
                <div className={`${styles.inputs} ${styles.signUpInputs}`}>
                    <div className={styles.section}>
                        <label htmlFor="email">Email address</label>
                        <input onChange={handleEmailChange} id="email" type="email" />
                    </div>
                    <div className={`${styles.section} ${styles.password}`}>
                        <label htmlFor="password">Password</label>
                        <input onChange={handlePasswordChange} id="password" className={styles.password} type="password" />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp