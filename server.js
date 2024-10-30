const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 4002;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies

// MongoDB connection (ensure you have your connection string in .env file)
const mongoUri = process.env.MONGODB_URI;
console.log('MongoDB URI:', mongoUri); // Log the MongoDB URI for debugging

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Sample Restaurant Model
const RestaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    location: String,
    cuisines: [String],
    rating: Number,
    image: String,
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

// Route for fetching all restaurants
app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find(); // Fetch all restaurants from the database
        res.json({ success: true, data: restaurants });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ success: false, message: "Error fetching restaurants" });
    }
});
// Route for fetching all restaurants with filters
app.get('/api/restaurants', async (req, res) => {
    try {
        const { location, rating, cuisines } = req.query; // Destructure query parameters

        // Build filter object based on query parameters
        const filter = {};

        // Filter by location
        if (location) {
            filter.location = location; // Matches exact location
        }

        // Filter by rating (greater than or equal to the given rating)
        if (rating) {
            filter.rating = { $gte: Number(rating) }; // MongoDB operator for greater than or equal
        }

        // Filter by cuisines (matches any of the specified cuisines)
        if (cuisines) {
            const cuisineArray = cuisines.split(','); // Split the comma-separated cuisines into an array
            filter.cuisines = { $in: cuisineArray }; // MongoDB operator for "in" (matches any of the values)
        }

        // Fetch restaurants based on the filter object
        const restaurants = await Restaurant.find(filter);

        res.json({ success: true, data: restaurants });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ success: false, message: "Error fetching restaurants" });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
