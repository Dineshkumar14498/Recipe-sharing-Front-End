import React, { useState, useEffect, useMemo } from 'react';
import foodRecipe from '../assets/foodrecipe.png';
import RecipeItems from '../components/RecipeItems';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';
import axios from 'axios';  
import { apiUrl } from '../api';  

export default function Home() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);  
    const [searchTerm, setSearchTerm] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dietaryPref, setDietaryPref] = useState('');
    const [rating, setRating] = useState('');

    const addRecipe = () => {
        let token = localStorage.getItem("token");
        if (token) navigate("/addRecipe");
        else setIsOpen(true);
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(apiUrl + '/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            return (
                (!searchTerm || recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (!cuisine || recipe.cuisine === cuisine) &&
                (!dietaryPref || recipe.dietary === dietaryPref) &&
                (!rating || recipe.rating >= rating)
            );
        });
    }, [recipes, searchTerm, cuisine, dietaryPref, rating]);

    return (
        <>
            <section className='home'>
                <div className='left'>
                    <h1>Food Recipe</h1>
                    <h5>Discover, share, and explore delicious recipes!</h5>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className='right'>
                    <img src={foodRecipe} width="300px" height="300px" alt="Food Recipe"></img>
                </div>
            </section>

            <div className='search-filter-container'>
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                    <option value="">Cuisine</option>
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                </select>
                <select value={dietaryPref} onChange={(e) => setDietaryPref(e.target.value)}>
                    <option value="">Dietary Preference</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                </select>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="">Rating</option>
                    <option value="4">4 Stars & Up</option>
                    <option value="3">3 Stars & Up</option>
                    <option value="2">2 Stars & Up</option>
                </select>
                <button onClick={() => {
                    setSearchTerm('');
                    setCuisine('');
                    setDietaryPref('');
                    setRating('');
                }}>Reset Filters</button>
            </div>

            {isOpen && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
            <div className='recipe'>
                <RecipeItems recipes={filteredRecipes} />
            </div>
        </>
    );
}
