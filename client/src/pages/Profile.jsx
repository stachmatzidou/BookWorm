import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = ({user,setUser}) => {
    return <div>
        {<h1>Welcome {user?.username}</h1>}
        <p>What would you like to do?</p>
        <Link to="edit">Manage my account</Link>
        <Link to="password">Change Password</Link>
    </div>;
};

export default Profile;
