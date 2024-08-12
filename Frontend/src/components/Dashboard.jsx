import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(10);
    const [link, setLink] = useState('');

    const handleUpdate = () => {
        // Convert timer to number
        const timerValue = Number(timer);

        // Ensure timerValue is non-negative
        if (timerValue < 0) {
            alert('Timer value cannot be negative');
            return;
        }

        // Check if description is empty
        if (!description.trim()) {
            alert('Description cannot be empty');
            return;
        }

        // Send POST request
        axios.post('http://localhost:8000/api/banner/post', { description, timer: timerValue, link })
            .then(response => {
                alert('Banner updated successfully');
                // Clear timer and link fields after success
                setTimer(10);
                setLink('');
            })
            .catch(error => {
                console.error('Error updating banner:', error);
                alert('Failed to update banner');
            });
    };

    const handleTimerChange = (e) => {
        const value = e.target.value;
        // Ensure that the value is a non-negative number
        if (value === '' || Number(value) >= 0) {
            setTimer(value);
        }
    };

    return (
        <div className="dashboard">
            <h2>Banner Dashboard</h2>
            <div className="form-group">
                <label>Description:</label>
                <input 
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label>Timer (seconds):</label>
                <input 
                    type="number" 
                    value={timer} 
                    onChange={handleTimerChange} 
                />
            </div>
            <div className="form-group">
                <label>Link:</label>
                <input 
                    type="text" 
                    value={link} 
                    onChange={(e) => setLink(e.target.value)} 
                />
            </div>
            <button onClick={handleUpdate}>Update Banner</button>
        </div>
    );
};

export default Dashboard;
