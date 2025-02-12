import React, { useState } from 'react';
import ServicesList from './components/ServicesList';
import BookingForm from './components/BookingForm';

function App() {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <div className="App">
            <h1>Welcome to Sir Smith Cleaning Company</h1>
            {!selectedService ? (
                <ServicesList setSelectedService={setSelectedService} />
            ) : (
                <BookingForm selectedService={selectedService} />
            )}
        </div>
    );
}

export default App;
