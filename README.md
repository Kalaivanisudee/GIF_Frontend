# GIF Search and Gallery Application

## Overview

This is a GIF search and gallery application built using the MERN stack (MongoDB, Express.js, React, Node.js). It includes user authentication and functionality to search for GIFs from the GIPHY API, manage favorites, and handle user registration and login.

## Features

- **User Authentication:** Users can register, login, and logout.

- **GIF Search:** Search for GIFs using the GIPHY API. 

- **Favorites:** Mark GIFs as favorites and view them separately.

- **Pagination:** Navigate through search results with pagination.

## Tech Stack

- **Frontend:** React, Material-UI

- **Backend:** Node.js, Express.js

- **Database:** MongoDB

- **APIs:** GIPHY API for GIFs

- **Authentication:** JSON Web Tokens (JWT)

## Usage

- **Register** a new user account via the registration form.

- **Login** with the registered account credentials.

- **Search** for GIFs using the search bar.

- **Toggle favorites** by clicking the heart icon on each GIF.

- **View favorites** in the dedicated section.

## API Endpoints

- **POST /auth/register:** Register a new user.

- **POST /auth/login:** Log in a user and receive a JWT token.

- **GET /api/favorites:** Get all favorite GIFs for the authenticated user.

- **POST /api/favorites:** Add a GIF to favorites.

- **DELETE /api/favorites/:** Remove a GIF from favorites.

## Conclusion

This GIF search and gallery app showcases your skills in full-stack development. It integrates React with Material-UI for the front end and Node.js with Express for the back end, featuring user authentication, favorites management, and GIF search functionality using the GIPHY API. This project highlights your ability to build and manage a complete web application.