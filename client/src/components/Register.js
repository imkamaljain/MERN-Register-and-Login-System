import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FormatUtils from '../utils/FormatUtils';

const formatUtils = new FormatUtils();

export default function Register({ setMessage }) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        reEnterPassword: ''
    });
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };
    const doRegister = () => {
        const { name, email, password, reEnterPassword } = user;
        if (!name || !email || !password || !reEnterPassword) {
            alert('Please enter all required fields.');
        } else {
            if (!formatUtils.validateEmail(email)) {
                alert('Invalid Email Address format.');
            } else if (password !== reEnterPassword) {
                alert('Passwords do not match.');
            } else {
                axios.post('http://localhost:5000/register', { name, email, password })
                    .then(res => {
                        setMessage(res.data.message);
                        history.push('/login');
                    });
            }
        }
    };

    return (
        <div className="registerContainer">
            <h1>Register</h1>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange}></input>
            <label htmlFor="email">Email Address:</label>
            <input type="email" name="email" placeholder="Email Address" value={user.email} onChange={handleChange}></input>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange}></input>
            <label htmlFor="reEnterPassword">Re-enter Password:</label>
            <input type="password" name="reEnterPassword" placeholder="Re-enter Password" value={user.reEnterPassword} onChange={handleChange}></input>
            <div className="button" onClick={doRegister}>Register</div>
            <div className="divider">
                <span>or</span>
            </div>
            <div className="button" onClick={() => history.push('/login')}>Login</div>
        </div>
    );
};