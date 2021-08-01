import React from 'react';

export default function Home({ user, setLoginUser }) {
    return (
        <div className="homeContainer">
            <h1>Welcome Back, {user.name}</h1>
            <div className="button" onClick={() => setLoginUser({})}>Log out</div>
        </div>
    );
};