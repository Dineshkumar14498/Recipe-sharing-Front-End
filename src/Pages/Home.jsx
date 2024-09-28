import React, { useState } from 'react'
import foodrecipe from "../assets/foodrecipe.png"
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const handleSearch = (filters) => {
        console.log("Search Filters:", filters);
    };


    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token)
            navigate("/addRecipe")
        else {
            setIsOpen(true)
        }
    }

    return (
        <>


            <section className='home'>
                <div className='left'>
                    <h1>Food Recipes</h1>
                    <h5>Your ultimate destination for sharing and discovering delicious recipes from around <br />
                        the world. Whether you're a seasoned chef or just starting your culinary journey, <br />
                        there's something for everyone here.
                    </h5>
                    <button onClick={addRecipe}>Share your recipes</button>
                </div>



                <div className='right'>
                    <img src={foodrecipe} width="320px" height="300px"></img>
                </div>
            </section>
            {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
                  

            <div className='recipe'>
                <RecipeItems />
            </div>

        </>
    )
}