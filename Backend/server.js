const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define service schema
const serviceSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
});

const Service = mongoose.model('Service', serviceSchema);

// Define booking schema
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    serviceId: mongoose.Schema.Types.ObjectId,
    date: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes
// Get all services
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching services' });
    }
});

// Create a booking
app.post('/api/bookings', async (req, res) => {
    const { name, email, phone, serviceId, date } = req.body;
    const booking = new Booking({
        name,
        email,
        phone,
        serviceId,
        date,
    });

    try {
        await booking.save();
        res.status(201).json({ message: 'Booking successful!' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating booking' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
