import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ selectedService }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingData = {
            name,
            email,
            phone,
            serviceId: selectedService._id,
            date,
        };

        axios.post('http://localhost:3000/api/bookings', bookingData)
            .then(response => {
                alert('Booking successful!');
            })
            .catch(error => {
                alert('Error creating booking');
            });
    };

    return (
        <div>
            <h2>Book a Cleaning Service</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>Date</label>
                    <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <button type="submit">Submit Booking</button>
            </form>
        </div>
    );
};

export default BookingForm;
