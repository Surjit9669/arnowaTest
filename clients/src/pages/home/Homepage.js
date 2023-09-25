import React, { useEffect, useState } from 'react'
import Header from './Header';
import MessageForm from './MessageForm';
import './homepage.css';
import SessionTable from './SessionTable';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import ShowTable from './ShowTable';

export default function Homepage() {
    const [user, setUserData] = useState({})
    const [sessionData, setSessionData] = useState([])

    const tempToken = localStorage?.getItem('accessToken');
    const token = JSON.parse(tempToken)


    const currentUser = () => {

        axios.get(`${BACKEND_URL}/auth/user`, {
            headers: { authorization: token },
        })
            .then((r) => {
                setUserData(r?.data)
            }).catch((err) => {
                console.log(err);
            })

    };

    const getSeesion = () => {

        axios.get(`${BACKEND_URL}/session/previouslogin`, {
            headers: { authorization: token },
        })
            .then((r) => {
                // setUserData(r?.data)
                setSessionData(r?.data)

            }).catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        currentUser();
        getSeesion()
    }, []);




    return (
        <>
            <Header user={user} />
            <main>
                <MessageForm user={user} />

                {/* <SessionTable data={data} /> */}
                <ShowTable data={sessionData} />
            </main>
        </>
    )
}
