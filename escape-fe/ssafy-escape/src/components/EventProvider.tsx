"use client";

import React from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
interface EventProviderProps {
    children: React.ReactNode;
}

const EventProvider = ({ children }: EventProviderProps) => {
    const [messages, setMessages] = React.useState<string[]>([]);
    
    const EventSource = EventSourcePolyfill || NativeEventSource
    const accessToken = sessionStorage.getItem("access_token");
    
    const eventSource = new EventSource('http://localhost:8080/notify/subscribe',{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            Connection: 'keep-alive',
            },
        }
    );
    React.useEffect(() => {
        
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