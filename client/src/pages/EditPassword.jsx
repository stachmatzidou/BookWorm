import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../styles/EditPassword.scss";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditPassword = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
    const password_Regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,23}$/;

    //useEffect to check if password and confirm are valid, every time they change
    useEffect(() => {
        const result = password_Regex.test(password);
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword]);

    const updatePassword = async (e) => {
        e.preventDefault();
        if (!validPassword) return toast.error("Invalid Password");
        if (!validConfirmPassword)
            return toast.error("Passwords do not match!");
        try {
            const updatedUser = {
                current: currentPassword,
                password: password,
            };
            await axios.patch("/api/users/current", updatedUser);
            toast.success("Password Updated Successfully!");
            navigate("/home/profile");
        } catch (error) {
            console.log(error);
            toast.error("Server Error!");
        }
    };
    return (
        <div className="update-password-container">
            <form className="update-password-form" onSubmit={updatePassword}>
                <label htmlFor="current">Current Password</label>
                <input
                    id="current"
                    name="current"
                    type="password"
                    placeholder="Current Password"
                    required
                    value={currentPassword}
                    onChange={(e) => {
                        setCurrentPassword(e.target.value);
                    }}
                />
                <label htmlFor="password">New Password</label>
                <div className="input-container">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="on"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <div className="svg-container">
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={validPassword ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={
                                validPassword || !password ? "hide" : "invalid"
                            }
                        />
                    </div>
                </div>
                <p
                    className={
                        passwordFocus && password && !validPassword
                            ? "instructions"
                            : "hide"
                    }
                >
                    <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.
                    <br />
                    Must include uppercase letter, one lowercase letter, a
                    number and a special character.
                </p>

                <label htmlFor="confirm">Confirm New Password</label>
                <div className="input-container">
                    <input
                        id="confirm"
                        name="confirm"
                        type="password"
                        autoComplete="on"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setConfirmPasswordFocus(true)}
                        onBlur={() => setConfirmPasswordFocus(false)}
                    />
                    <div className="svg-container">
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={
                                validConfirmPassword && confirmPassword
                                    ? "valid"
                                    : "hide"
                            }
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={
                                validConfirmPassword || !confirmPassword
                                    ? "hide"
                                    : "invalid"
                            }
                        />
                    </div>
                </div>
                <p
                    className={
                        confirmPasswordFocus && !validConfirmPassword
                            ? "instructions"
                            : "hide"
                    }
                >
                    <FontAwesomeIcon icon={faInfoCircle} /> Must match password.
                </p>
                <div className="update-password-buttons">
                    <button
                        type="button"
                        className="update-password-go-back"
                        onClick={() => navigate("/home/profile")}
                    >
                        Go Back
                    </button>
                    <button className="update-password-update">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditPassword;
