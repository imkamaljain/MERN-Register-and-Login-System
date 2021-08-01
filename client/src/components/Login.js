import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FormatUtils from '../utils/FormatUtils';

const formatUtils = new FormatUtils();

export default function Login({ setLoginUser, setMessage }) {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };
    const doLogin = () => {
        const { email, password } = user;
        if (email && password) {
            if (formatUtils.validateEmail(email)) {
            axios.post('http://localhost:5000/login', user)
                .then(res => {
                    setMessage(res.data.message);
                    setLoginUser(res.data.user);
                    history.push('/');
                });
            } else {
                alert('Invalid Email Address format.');
            }
        } else {
            alert('Please enter all required fields.');
        }
    };

    return (
        <div className="loginContainer">
            <h1>Login</h1>
            <label htmlFor="email">Email Address:</label>
            <input type="email" name="email" placeholder="Email Address" value={user.email} onChange={handleChange}></input>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" placeholder="Password" value={user.password}
                onChange={handleChange}
                onKeyPress={event => event.key === 'Enter' ? doLogin() : null} >
            </input>
            <div className="button" onClick={doLogin}>Login</div>
            <div className="divider">
                <span>or</span>
            </div>
            <div className="button" onClick={() => history.push('/register')}>Register</div>
        </div>
    );
};