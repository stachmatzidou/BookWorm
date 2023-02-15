import React, {useState, useEffect} from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const getUserInfo = async () => {
        try {
            const { data } = await axios.get("/api/users/current");
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
    },[]);

    return <div>
        {user && <h1>Welcome {user.username}</h1>}
        {<h1>Welcome {user?.username}</h1>}
    </div>;
};

export default Profile;
