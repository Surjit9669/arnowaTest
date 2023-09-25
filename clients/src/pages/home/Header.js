import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../config';
import './header.css';

export default function Header({ user }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        const tempUser = localStorage.getItem('user');
        const user = JSON.parse(tempUser);

        axios.get(`${BACKEND_URL}/auth/logout`, { headers: { "authorization": user.token } })
            .then(r => {
                localStorage.removeItem('user');
                localStorage.clear();
                navigate('/login')
            })
            .catch(r => {
                console.log(r)
            })

    }

    function capitalizeLetter(str) {
        return str[0].toUpperCase() +
            str.slice(1)
    }

    return (
        <>
            <header>
                <div>
                    {
                        user?.name && <div>
                            <h3>Hi, WelCome {
                                capitalizeLetter(user?.name)

                            }</h3>
                        </div>
                    }
                    <button type="submit" onClick={handleLogout}>Logout</button>
                </div>

            </header>
        </>
    )

}
