import React, { useState } from 'react';
import profileImg from '../assets/profile.png';
import { useLoaderData } from 'react-router-dom';
import { apiUrl } from '../api';
import axios from 'axios';

export default function RecipeDetails() {
    const recipe = useLoaderData();
    const [rating, setRating] = useState(0); // State to hold the rating
    const [message, setMessage] = useState(''); // State to show submission message

    const handleRating = async (rate) => {
        setRating(rate);
        try {
            await axios.post(apiUrl +`recipe/rate`, {
                recipeId: recipe._id,
                rating: rate,
            }, {
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem("token"),
                }
            });
            setMessage('Thank you for your rating!');
        } catch (error) {
            console.error('Error rating the recipe:', error);
        }
    };

    return (
        <>
            <div className='outer-container'>
                <div className='profile'>
                    <img src={profileImg} width="50px" height="50px" alt="Profile" />
                    <h5>{recipe.email}</h5>
                </div>
                <h3 className='title'>{recipe.title}</h3>
                <img src={apiUrl + `images/${recipe.coverImage}`} width="220px" height="200px" alt="Recipe" />
                <div className='recipe-details'>
                    <div className='ingredients'>
                        <h4>Ingredients</h4>
                        <ul style={{ fontSize: '1.2em', lineHeight: '1.5' }}>
                            {recipe.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='instructions'>
                        <h4>Instructions</h4>
                        <span style={{ fontSize: '1.2em', lineHeight: '1.5' }}>{recipe.instructions}</span>
                    </div>
                </div>
                <div className='rating-section'>
                    <h4>Rate this Recipe</h4>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => handleRating(star)} style={{ cursor: 'pointer', fontSize: '2em' }}>
                            {star <= rating ? '★' : '☆'}
                        </span>
                    ))}
                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    );
}
