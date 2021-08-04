import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../index';
import axios from 'axios';

export default function Home() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (!token) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            await axios.get("http://localhost:5000/user/", {
                headers: {
                    "x-auth-token": localStorage.getItem("auth-token")
                }
            }).then(res => {
                setUserData({
                    name: res.data.name,
                    email: res.data.email
                });
            });
        };

        checkLoggedIn();
    }, []);

    const doLogout = async () => {
        let token = localStorage.getItem("auth-token");
        setUserData({});
        localStorage.setItem("auth-token", "");
        await axios.post("http://localhost:5000/user/logout", {
            token: token
        });
    };

    return (
        <div className="homeContainer">
            {userData && Object.keys(userData).length > 0 ? (
                <>
                    <h1>Welcome Back, {userData.name}</h1>
                    <div className="button" onClick={doLogout}>Log out</div>
                </>
            ) : (
                <>
                    <h1>You are not logged in.</h1>
                    <div className="button" onClick={() => history.push('/login')}>Login</div>
                </>
            )}
        </div>
    );
};