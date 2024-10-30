import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import useRestaurantContext from "../Hooks/useRestaurant";
import axios from "axios";
import "./CardItem.css"; // Import custom CSS file

const CardItem = () => {
    const { location, rating, selectedItems } = useRestaurantContext();
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    // Fetch all restaurants on component mount
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get("http://localhost:4002/api/restaurants");
                if (response.data.success) {
                    setRestaurants(response.data.data);
                    setFilteredRestaurants(response.data.data); // Initialize filteredRestaurants
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []);

    // Apply filters whenever location, rating, or selectedItems change
    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...restaurants]; // Start with all restaurants

            // Filter by location
            if (location) {
                filtered = filtered.filter((item) => item.location.toLowerCase() === location.toLowerCase());
            }

            // Filter by rating
            if (rating) {
                filtered = filtered.filter((item) => {
                    return rating === "3" ? item.rating >= 3 : item.rating >= 4;
                });
            }

            // Filter by cuisines
            if (selectedItems.length > 0) {
                filtered = filtered.filter((item) => {
                    return item.cuisines.some((cuisine) => selectedItems.includes(cuisine));
                });
            }

            setFilteredRestaurants(filtered); // Update the filtered restaurants
            console.log("Filtered Restaurants:", filtered); // Add this for debugging
        };

        applyFilters();
    }, [location, rating, selectedItems, restaurants]); // Dependencies

    return (
        <div className="card-container">
            {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((item) => (
                    <Card key={item._id} className="restaurant-card">
                        <Card.Img variant="top" src={item.image} className="card-image" />
                        <Card.Body>
                            <center>
                            <Card.Title className="card-title">{item.name}</Card.Title></center>
                            <Card.Text className="card-text">
                                Types of food we offer: {item.cuisines?.join(", ")}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Address: {item.address}</ListGroup.Item>
                            <ListGroup.Item>City: {item.location}</ListGroup.Item>
                            <ListGroup.Item>Rating: {item.rating}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                ))
            ) : (
                <p>No restaurants found based on the applied filters.</p>
            )}
        </div>
    );
};

export default CardItem;
