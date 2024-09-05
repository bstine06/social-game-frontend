import React, { useState, useEffect } from 'react';

function TestComponent() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Step 1: Attempt to get the session
        fetch(`${backendUrl}/get-session`, {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => {
            console.log('Response Status:', response.status);
            console.log('Response Headers:', response.headers);
            return response.text();
        })
        .then(sessionData => {
            console.log('Session Data:', sessionData);
            if (sessionData.includes("No session ID found")) {
                return fetch(`${backendUrl}/set-session`, {
                    method: 'GET',
                    credentials: 'include' // Include cookies in the request
                })
                .then(response => response.text())
                .then(data => setMessage("New session created: " + data))
                .catch(error => console.error('Error creating session:', error));
            } else {
                setMessage("Session found: " + sessionData);
            }
        })
        .catch(error => {
            console.error('Error fetching session data:', error);
            alert(`Error: ${error.message}`); // Display a user-friendly message
        });
        
    }, []);

    return (
        <div>
            <h2>Unique session information:</h2>
            <p>{message}</p>
        </div>
    );
}

export default TestComponent;
