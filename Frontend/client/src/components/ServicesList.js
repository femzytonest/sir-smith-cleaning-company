import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServicesList = ({ setSelectedService }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services', error));
    }, []);

    return (
        <div>
            <h2>Our Cleaning Services</h2>
            <ul>
                {services.map(service => (
                    <li key={service._id} onClick={() => setSelectedService(service)}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <p>${service.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServicesList;
