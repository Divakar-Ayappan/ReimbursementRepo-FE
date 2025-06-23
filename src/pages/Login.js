import React, {useEffect, useState} from "react";
import styles from "../styles/Login.module.css";
import Logo from "../assets/Divum logo.svg";
import ReimbursementImage from "../assets/Reimbusment image.png";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../api/requestApis";
import {JWT_COOKIE_NAME} from "../commons/Constants";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [touched, setTouched] = useState({email: false, password: false});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("email")?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        setEmailError("");
        setPasswordError("");

        if (!email.endsWith("@divum.in")) {
            setEmailError("Please enter a valid email ending with @divum.in");
            isValid = false;
        }

        if (password === "") {
            setPasswordError("Password is required");
            isValid = false;
        }

        if (isValid) {
            setLoading(true);
            try {
                const response = await loginUser({ email, password });

                if (response.status === "SUCCESSFUL") {
                    sessionStorage.setItem(JWT_COOKIE_NAME, response.token);
                    navigate("/overview");
                } else {
                    setPasswordError("Invalid credentials");
                }
            } catch (error) {
                console.error("Login failed:", error);
                setPasswordError("Login failed. Try again.");
            }

        }
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({...prev, [field]: true}));
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <div className={styles.formSection}>
                    <img src={Logo} alt="Logo" className={styles.logo}/>
                    <h1>Welcome back</h1>
                    <p>Please enter your details</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => handleBlur("email")}
                                className={`${styles.input} ${emailError && touched.email ? styles.inputError : ""}`}
                                aria-describedby="email-error"
                                required
                            />
                            {emailError && touched.email && (
                                <small id="email-error" className={styles.errorText}>{emailError}</small>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => handleBlur("password")}
                                    className={`${styles.input} ${passwordError && touched.password ? styles.inputError : ""}`}
                                    aria-describedby="password-error"
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {passwordError && touched.password && (
                                <small id="password-error" className={styles.errorText}>{passwordError}</small>
                            )}
                        </div>

                        <button type="submit" className={styles.loginButton} disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>
            </div>

            <div className={styles.imageSection}>
                <img src={ReimbursementImage} alt="Illustration" className={styles.illustration}/>
            </div>
        </div>
    );
};

export default Login;
