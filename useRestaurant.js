import { useContext } from 'react';
import { RestaurantContext } from '../Context/RestaurantContext'; // Ensure this path is correct


const useRestaurantContext = () => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error('RestaurantContext not found');
    }
    return context;
};


export default useRestaurantContext;
