import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config.js';

import './login.css';


export default function Login({ create }) {
    const heading = create ? 'Signup' : 'Login';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        if (create) {
            signup();
        }
        else {
            login();
        }
    };

    const signup = () => {
        console.log('#m BACKEND_URL: ', BACKEND_URL);
        axios.post(`${BACKEND_URL}/auth/signup`, formData)
            .then(r => {
                saveUser(r)
                navigate('/')
            })
            .catch(err => {
                setError(err?.response?.data?.error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const login = () => {

        navigate('/')

        axios.post(`${BACKEND_URL}/auth/login`, { email: formData.email, password: formData.password })
            .then(r => {
                saveUser(r)
                navigate('/')
            })
            .catch(err => {
                setError(err?.response?.data?.error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const saveUser = (r) => {
        if (r.data.token) {
            const user = JSON.stringify(r.data)
            const token = JSON.stringify(r.data.token)

            localStorage.setItem('user', user)
            localStorage.setItem('accessToken', token)

        }
    }

    return (
        <div className="login-form">
            <h2>{heading}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                {
                    create &&
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                }

                {
                    create &&
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                }
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{heading}</button>
            </form>
            {!create && <button type='button' ><Link to="/signup">Signup</Link></button>}

            {error && <p className='error'>{error}</p>}
        </div>
    );
}
