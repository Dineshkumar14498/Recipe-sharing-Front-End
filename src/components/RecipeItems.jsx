import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { apiUrl } from '../api';
import Comments from '../components/Comments'

export default function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState()
    let path = window.location.pathname === "/myRecipe";
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
    const [isFavRecipe, setIsFavRecipe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);

    const onDelete = async (id) => {
        await axios.delete(apiUrl + `recipe/${id}`)
            .then((res) => console.log(res));
        setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id));
        let filterItem = favItems.filter(recipe => recipe._id !== id);
        localStorage.setItem("fav", JSON.stringify(filterItem));
    };

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id);
        favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem;
        localStorage.setItem("fav", JSON.stringify(favItems));
        setIsFavRecipe(pre => !pre);
    };


    return (
        <div className='card-container'>
            {
                allRecipes?.map((item, index) => {
                    return (
                        <div key={index} className='card' onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
                            <img src={apiUrl + `images/${item.coverImage}`} alt="recipe cover" />
                            <div className='card-body'>
                                <h2 className='title'>{item.title}</h2>
                                <div className='icons'>
                                    <div className='timer'><BsStopwatchFill /> {item.time}</div>
                                    {(!path) ? (
                                        <FaHeart onClick={() => favRecipe(item)}
                                            style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }} />
                                    ) : (
                                        <div className='action'>
                                            <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                            <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                                        </div>
                                    )}
                                </div>

                                {/* Comments Section */}
                                <Comments recipeId={item._id} />

                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}