import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "./Pages/Home"
import MainNavigation from "./components/MainNavigation"
import  AddFoodRecipe  from "./Pages/AddFoodRecipe"
import EditRecipe from "./Pages/EditRecipe"
import RecipeDetails from "./Pages/RecipeDetails"
import axios from 'axios'
import { apiUrl } from './api'




const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get(apiUrl + "recipe" ).then(res=>{
    allRecipes=res.data
  })
  return allRecipes
}

const getMyRecipes=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const getRecipe=async({params})=>{
  let recipe;
 await axios.get( apiUrl + `recipe/${params.id}`)
  .then(res=>recipe=res.data)

  await axios.get( apiUrl +  `user/${recipe.createdBy}`)
  .then(res=>{
    recipe={...recipe,email:res.data.email}
  })

  return recipe
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
    {path:"/",element:<Home/>,loader:getAllRecipes},
    {path:"/myRecipe",element:<Home/>,loader:getMyRecipes},
    {path:"/favRecipe",element:<Home/>,loader:getFavRecipes},
    {path:"/addRecipe",element:<AddFoodRecipe/>},
    {path:"/editRecipe/:id",element:<EditRecipe/>},
    {path:"/recipe/:id",element:<RecipeDetails/>,loader:getRecipe}
  ]}
 
])



export default function App() {
  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  )
}