# TastyVault Food Recipe App

## Overview

TastyVault is a web application built with React, Node.js, Express.js, and MongoDB, designed to provide users with a platform to discover, save, and share delicious food recipes.

## Features

* User authentication and authorization
* Recipe search and filtering
* Recipe saving and favoriting
* User-generated recipe submissions
* Responsive design for mobile and desktop devices
* Secure password hashing and storage

## Technologies Used

- **Front-end**: **React.js** - Used for building a dynamic and interactive user interface, enhancing user engagement.
- **Back-end**: **Node.js** & **Express.js** - Provide a robust server environment for handling requests and responses.
- **Database**: **MongoDB** - Used for storing and managing user data, tour details, and authentication information.
- **State Management**: **Redux** - Manages application state consistently across various components.
- **Routing**: **React Router** - Manages client-side routing, enabling smooth navigation between different pages.
- **Authentication**: **JWT** & **Bcrypt** - Ensures secure user authentication and password management.



## API Endpoints

* get("/",getRecipes) //Get all recipes
* get("/:id",getRecipe) //Get recipe by id
* post("/",upload.single('file'),verifyToken ,addRecipe) //add recipe
* put("/:id",upload.single('file'),editRecipe) //Edit recipe
* delete("/:id",deleteRecipe) //Delete recipe


## Database Schema

### Recipes Collection

* `_id` (ObjectId)
* `title` (String)
* `description` (String)
* `ingredients` (Array)
* `instructions` (Array)
* `userId` (ObjectId)

### Users Collection

* `_id` (ObjectId)
* `username` (String)
* `email` (String)
* `password` (String)




## Support

For any issues or concerns, please open an issue on GitHub or contact dineshvlr9500@gmail.com.

## 🤝 Connect with Me

**LinkedIn:** www.linkedin.com/in/dinesh-kumar-2565191b4

