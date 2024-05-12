"use client";

import React from 'react';

interface EventProviderProps {
    children: React.ReactNode;
}

const EventProvider = ({ children }: EventProviderProps) => {
    const [messages, setMessages] = React.useState<string[]>([]);

    React.useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/subscribe');
        console.log("EVENT !!!!!");
        eventSource.onmessage = function(event) {
            console.log('New event from server:', event.data);
        };
        eventSource.addEventListener('sse', function(event) {
            console.log('Message:', event.data);
            setMessages(prevMessages => [...prevMessages, event.data]);
        });
    
        return () => {
            eventSource.close();
        };
    }, []);

    return <React.Fragment>{children}</React.Fragment>
}

export default EventProvider