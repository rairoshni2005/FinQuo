import { useState } from "react";
import styles from "./auth.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    let [userCreds, setUserCreds] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(""); // For handling error messages

    const navigate = useNavigate();

    // Handle form input changes
    const handleForm = (event) => {
        setUserCreds((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    };

    // Login function
    async function login() {
        try {
            let res = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                body: JSON.stringify(userCreds),
                headers: { "Content-Type": "application/json" },
            });

            if (res.status === 200) {
                let data = await res.json();

                if (data.token) {
                    // Store the token in localStorage
                    localStorage.setItem("sayit-info", JSON.stringify(data));
                    navigate("/chat"); // Navigate to home/chat page after successful login
                } else {
                    console.log("No token found in response.");
                    setError("Invalid login credentials. Please try again.");
                }
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            console.log("Error during login:", err);
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h2 className={styles.title}>Login</h2>

                {/* Username */}
                <label className={styles.label}>
                    Username:
                    <input
                        type="text"
                        name="username"
                        onChange={handleForm}
                        className={styles.input}
                    />
                </label>

                {/* Password */}
                <label className={styles.label}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        onChange={handleForm}
                        className={styles.input}
                    />
                </label>

                {/* Error message */}
                {error && <p className={styles.error}>{error}</p>}

                {/* Login Button */}
                <button type="button" onClick={login} className={styles.button}>
                    Login
                </button>

                {/* Sign Up Link */}
                <p className={styles.signupLink}>
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className={styles.signupButton}
                    >
                        Sign up here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
