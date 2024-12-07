import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Signup.module.css';  // Assuming you're using CSS modules

const Signup = () => {
  const [userCreds, setUserCreds] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
  });

  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  // Handle form input changes
  const handleSignupForm = (event) => {
    const { name, value } = event.target;
    setUserCreds((prevValue) => ({ ...prevValue, [name]: value }));
  };

  // Validate the form fields before submitting
  const validateSignupForm = () => {
    const { fullName, username, email, password, confirmPassword, phone, dob } = userCreds;

    if (!fullName || !username || !email || !password || !phone || !dob) {
      setError("All fields are required.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be 10 digits.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError(""); // Reset error message if validation passes
    return true;
  };

  // Signup function
  const signup = async () => {
    if (!validateSignupForm()) return;

    setLoading(true); 
    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCreds),
      });

      if (res.status === 201) {
        const data = await res.json();

        if (data.token) {
          localStorage.setItem("sayit-info", JSON.stringify(data));
          setTimeout(() => navigate("/login"), 3000);  // Navigate to login page after 3 seconds
        } else {
          setError("Signup successful but no token received.");
        }
      } else if (res.status === 400) {
        const data = await res.json();
        setError(data.message || "Invalid input data.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Error during signup. Please check your network and try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={(e) => e.preventDefault()}>
        <h2 className={styles.signupTitle}>Sign Up</h2>

        <label className={styles.signupLabel}>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={userCreds.fullName}
            onChange={handleSignupForm}
            className={styles.signupInput}
          />
        </label>

        <label className={styles.signupLabel}>
          Username:
          <input
            type="text"
            name="username"
            value={userCreds.username}
            onChange={handleSignupForm}
            className={styles.signupInput}
          />
        </label>

        <label className={styles.signupLabel}>
          Email:
          <input
            type="email"
            name="email"
            value={userCreds.email}
            onChange={handleSignupForm}
            className={styles.signupInput}
          />
        </label>

        <label className={styles.signupLabel}>
          Phone Number:
          <input
            type="text"
            name="phone"
            value={userCreds.phone}
            onChange={handleSignupForm}
            className={styles.signupInput}
          />
        </label>

        <label className={styles.signupLabel}>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={userCreds.dob}
            onChange={handleSignupForm}
            className={styles.signupInput}
          />
        </label>

        <label className={styles.signupLabel}>
          Password:
          <input
            type="password"
            name="password"
            value={userCreds.password}
            onChange={handleSignupForm}
            className={styles.signupInput}
          />
        </label>

        <label className={styles.signupLabel}>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={userCreds.confirmPassword}
            onChange={handleSignupForm}
            className={styles.signupInput}
          />
        </label>

        {error && <p className={styles.signupError}>{error}</p>}

        <button
          type="button"
          onClick={signup}
          className={styles.signupButton}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
