// src/components/Filters/Filters.js
import { Form } from "react-bootstrap";
import useRestaurantContext from "../Hooks/useRestaurant";
import style from "./Filters.module.css"; // Import the CSS module

const Filters = () => {
    const { selectedItems, setSelectedItems, setLocation, setRating } = useRestaurantContext();

    const options = [
        { value: "North Indian", label: "North Indian" },
        { value: "South Indian", label: "South Indian" },
        { value: "Chinese", label: "Chinese" },
        { value: "Desserts", label: "Desserts" },
        { value: "Italian", label: "Italian" },
        { value: "Oriental", label: "Oriental" },
        { value: "Pastas", label: "Pastas" },
        { value: "Pizzas", label: "Pizzas" },
        { value: "Japanese", label: "Japanese" },
        { value: "Sushi", label: "Sushi" },
        { value: "Barbecue", label: "Barbecue" },
        { value: "Steak", label: "Steak" },
        { value: "Seafood", label: "Seafood" },
    ];

    const handleCheckboxChange = (value) => {
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
            setSelectedItems([...selectedItems, value]);
        }
    };

    return (
        <div className={style.filtersContainer}>
            <div className={style.locationContainer}>
                <Form.Select
                    aria-label="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    className={style.select}
                >
                    <option hidden>Select Location</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                </Form.Select>
            </div>
            <div className={style.cuisinesContainer}>
                <Form.Label className={style.label}>Select Cuisines:</Form.Label>
                {options.map((option) => (
                    <Form.Check
                        key={option.value}
                        type="checkbox"
                        id={option.value}
                        label={option.label}
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        className={style.checkbox}
                    />
                ))}
            </div>
            <div className={style.ratingContainer}>
                <Form.Select
                    aria-label="Select Rating"
                    onChange={(e) => setRating(e.target.value)}
                    className={style.select}
                >
                    <option hidden>Select Rating</option>
                    <option value="3">3 and above</option>
                    <option value="4">4 and above</option>
                </Form.Select>
            </div>
        </div>
    );
};

export default Filters;
