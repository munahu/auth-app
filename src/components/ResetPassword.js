import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import styles from '../styles/ResetPassword.module.css';

function ResetPassword() {
    const inputRef = useRef(null);

    const[email, setEmail] = useState();

    const [showEmailSentMessage, setShowEmailSentMessage] = useState(false);

    const { resetPassword } = useFirebaseAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail(inputRef.current.value);
        setShowEmailSentMessage(true);
        resetPassword(inputRef.current.value);
    }
    return (
        <div className={styles.resetPassword}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Link to="/login" className={styles.backToLogin}>
                    Back to Login
                </Link>
                <div className={styles.content}>
                    <h1 className={styles.heading}>Reset your password</h1>
                    <h2 className={styles.subheading}>
                        Enter the email address associated with your account.
                    </h2>
                    <div className={styles.section}>
                        <label htmlFor="email">Email address</label>
                        <input ref={inputRef} id="email" type="email" />
                    </div>
                    {   showEmailSentMessage &&
                        <div className={styles.emailSentMessage}> 
                            <span>If</span>
                            <span>an</span>
                            <span>account</span>
                            <span>exists</span>
                            <span>with</span>
                            <span>your</span>
                            <span>email</span>
                            <span>address,</span>
                            <span className={styles.email}>{email}</span>
                            <span>we</span>
                            <span>just</span>
                            <span>sent</span>
                            <span>you</span>
                            <span>an</span>
                            <span>email</span>
                            <span>with</span>
                            <span>instructions</span>
                            <span>to</span>
                            <span>reset</span>
                            <span>your</span>
                            <span>password</span>
                        </div>
                    }
                    <div className={styles.buttonContainer}>
                        <button>Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword