import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubscribersList() {
    const [subscribers, setSubscribers] = useState([]);
    const [newSubscriber, setNewSubscriber] = useState({ name: '', subscribedToChannel: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch subscribers when the component mounts
        async function fetchSubscribers() {
            try {
                const response = await axios.get('/subscribers'); // Assuming proxy is set up
                setSubscribers(response.data);
            } catch (error) {
                console.error('Error fetching subscribers:', error);
                setError('Error fetching subscribers');
            }
        }

        fetchSubscribers();
    }, []);

    async function addSubscriber(event) {
        event.preventDefault()

        try {
            const response = await axios.post('/subscribers', newSubscriber);
            setSubscribers([...subscribers, response.data]);
            setNewSubscriber({ name: '', subscribedToChannel: '' });
        } catch (err) {
            console.error('Error adding subscriber :', err);
            setError('Error adding subscriber');
        }
    }

    async function deleteSubscriber(id) {
        try {
            await axios.delete(`/subscribers/${id}`);
            setSubscribers(subscribers.filter(subscriber => subscriber._id !== id));
        } catch (err) {
            console.error('Error deleting subscriber :', err);
            setError('Error deleting subscriber');
        }
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            <h2>Subscribers List</h2>
            <ul>
                {subscribers.map(subscriber => (
                    <li key={subscriber._id}>
                        {subscriber.name} - {subscriber.subscribedToChannel}
                        <button onClick={() => deleteSubscriber(subscriber._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Add Subscriber</h2>
            <form onSubmit={addSubscriber}>
                <input 
                    type='text' 
                    placeholder='Name' 
                    value={newSubscriber.name}
                    onChange={event => setNewSubscriber({ ...newSubscriber, name: event.target.value })} 
                />
                <input 
                    type='text' 
                    placeholder='Channel Subscribed' 
                    value={newSubscriber.subscribedToChannel}
                    onChange={event => setNewSubscriber({ ...newSubscriber, subscribedToChannel: event.target.value })} 
                />
                <button type='submit'>Add</button>
            </form>
        </div>
    );
}

export default SubscribersList;
