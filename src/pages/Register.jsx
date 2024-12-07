import styles from "./auth.module.css";
import { useState } from "react";

const Register = () => {
  // State for user data
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  // State for toast message
  const [toastMessage, setToastMessage] = useState({
    type: false, // Using boolean instead of string
    message: "",
  });

  // Reset toast message after 5 seconds
  const resetToast = () => {
    setTimeout(() => {
      setToastMessage({ type: false, message: "" });
    }, 5000);
  };

  // Handle form changes
  const handleForm = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    if (!user.name || !user.username || !user.password || !user.gender) {
      setToastMessage({
        type: false,
        message: "All fields are required!",
      });
      resetToast();
      return false;
    }
    return true;
  };

  // Handle register button click
  const register = () => {
    if (!validateForm()) return; // Validate before sending request

    fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status !== 201) {
          setToastMessage({
            type: false,
            message: "Some problem occurred, please try again.",
          });
        } else {
          setToastMessage({
            type: true,
            message: "User registered successfully!",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setToastMessage({
          type: false,
          message: "Registration failed!",
        });
      })
      .finally(() => {
        resetToast(); // Hide toast after delay
      });
  };

  return (
    <div className={styles.container}>
      {/* Toast Message */}
      {toastMessage.message && (
        <div
          className={
            toastMessage.type ? styles.toastSuccess : styles.toastError
          }
        >
          {toastMessage.message}
        </div>
      )}

      {/* Registration Form */}
      <form className={styles.form}>
        <h2 className={styles.title}>Register</h2>

        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            onChange={handleForm}
            value={user.name}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Username:
          <input
            type="text"
            name="username"
            onChange={handleForm}
            value={user.username}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleForm}
            value={user.password}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Gender:
          <select
            name="gender"
            onChange={handleForm}
            value={user.gender}
            className={styles.input}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <button type="button" onClick={register} className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
