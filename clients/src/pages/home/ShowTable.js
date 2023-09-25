
import React, { useEffect, useState } from 'react'


const ShowTable = ({ data }) => {
    const [previousLogins, setPreviousLogins] = useState([]);


    useEffect(() => {
        setPreviousLogins(data)
    }, [data])



    const getSessionDuration = (created, updated) => {

        const createdTimestamp = new Date(created);
        const updatedTimestamp = new Date(updated);


        const durationInMiliSecond = updatedTimestamp - createdTimestamp;


        const durationInSeconds = Math.floor(durationInMiliSecond / 1000);


        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;


        const formattedDuration =
            (hours > 0 ? hours + 'h ' : '') +
            (minutes > 0 ? minutes + 'm ' : '') +
            (seconds + 's');

        return formattedDuration;
    }

    function convertDate(c) {
        return new Date(c)
    }




    return (

        <div style={{ marginTop: '10px' }}>
            <h4>Previous Logins:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Login Time</th>
                        <th>Logout Time</th>

                        <th>Session Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {previousLogins.map((login, index) => (
                        <tr key={index}>
                            <td>{convertDate(login.createdAt).toLocaleString()}</td>
                            <td>{convertDate(login.updatedAt).toLocaleString()}</td>

                            <td>{getSessionDuration(login.createdAt, login.updatedAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}

export default ShowTable