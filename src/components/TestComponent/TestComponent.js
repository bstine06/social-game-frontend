import React, { useState, useEffect } from 'react';

function TestComponent() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Step 1: Attempt to get the session
        fetch('http://localhost:8443/get-session', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => response.text())
        .then(sessionData => {
            if (sessionData.includes("No session ID found")) {
                // Step 2: If no session ID found, set a new session
                return fetch('http://localhost:8443/set-session', {
                    method: 'GET',
                    credentials: 'include' // Include cookies in the request
                })
                .then(response => response.text())
                .then(data => setMessage("New session created: " + data));
            } else {
                setMessage("Session found: " + sessionData);
            }
        })
        .catch(error => console.error('Error fetching session data:', error));
    }, []);

    return (
        <div>
            <h1>Response from Spring Boot:</h1>
            <pre>{message}</pre>
        </div>
    );
}

export default TestComponent;
