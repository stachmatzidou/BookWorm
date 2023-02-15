import axios from "axios";
import { useState, useEffect } from "react";

export default () => {
    // Check whether the logged in 
    const [auth, setAuth] = useState();
    const verifyAuth = async () => {
        try {
            const res = await axios.get(
                "/api/auth/status"
            );
            setAuth(res.data);
        } catch (error) {
            console.log(error);
            setAuth(false);
        }
    };
//Call verifyAuth function on page render
    useEffect(() => {
        verifyAuth();
    },[]);

    return { auth };
};
