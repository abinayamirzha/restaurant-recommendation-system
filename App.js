// src/App.js
import React from 'react';
import { Provider } from './components/Context/RestaurantContext';
import NavBar from "./components/NavBar/NavBar";
import Filters from "./components/Filters/Filters";
import CardItem from "./components/RestaurantCard/Card";
import style from "./App.module.css";

function App() {
    return (
        <Provider>
            <div className={style.appContainer}>
                <NavBar />
                <div className={style.mainContent}>
                    <Filters />
                    <div className={style.restaurantsContainer}>
                        <h3 className={style.restaurantsHeader}>Restaurants</h3>
                        <CardItem />
                    </div>
                </div>
            </div>
        </Provider>
    );
}

export default App;
