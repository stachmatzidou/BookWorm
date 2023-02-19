import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditProfile = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
        const updatedUser = {
            _id: user._id,
            username: username,
            email: email
        };
        await axios.patch("/api/users/current", updatedUser);
        setUser(updatedUser);
        toast.success("User Updated Successfully!");
        navigate("/home/profile");
    } catch (error) {
        console.log(error);
        toast.error("Server Error!");
    };
};

    return (
        <div>
            <form onSubmit={updateUserInfo}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Link to="/home/profile">Go Back</Link>
                <button>Update</button>
            </form>
        </div>
    );
};

export default EditProfile;
