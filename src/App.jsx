import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField, Card, CardMedia, CardContent, Typography, IconButton, Box, Container,
   Divider
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import './App.css';

const API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchGifs(searchTerm, page);
    }
  }, [searchTerm, page]);

  const fetchGifs = async (query, page) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}`);
    setGifs(res.data.data);
    setTotalPages(Math.ceil(res.data.pagination.total_count / limit));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchGifs(searchTerm, value);
  };

  const toggleFavorite = (gif) => {
    let updatedFavorites;

    if (favorites.find(fav => fav.id === gif.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== gif.id);
    } else {
      updatedFavorites = [...favorites, gif];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (gif) => {
    return favorites.some(fav => fav.id === gif.id);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2">GIF Search and Gallery</Typography>
        {!isAuthenticated ? (
          <Box>
            <Register />
            <Login setAuth={setIsAuthenticated} />
          </Box>
        ) : (
          <Box>
            <Logout setAuth={setIsAuthenticated} />
            <Box sx={{ mt: 4, mb: 4 }}>
              <TextField
                fullWidth
                label="Search GIFs"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && fetchGifs(searchTerm, page)}
              />
            </Box>

            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography variant="h5" gutterBottom>Favorites</Typography>
              <Divider />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                {favorites.length > 0 ? (
                  favorites.map(gif => (
                    <Box key={gif.id} sx={{ width: { xs: '100%', sm: '48%', md: '31%' } }}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={gif.images.fixed_height.url}
                          alt={gif.title}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {gif.title}
                          </Typography>
                          <IconButton onClick={() => toggleFavorite(gif)} color="error">
                            <Favorite />
                          </IconButton>
                        </CardContent>
                      </Card>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No favorites selected yet.
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>Search Results</Typography>
              <Divider />
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {gifs.map(gif => (
                <Box key={gif.id} sx={{ width: { xs: '100%', sm: '48%', md: '31%' } }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={gif.images.fixed_height.url}
                      alt={gif.title}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {gif.title}
                      </Typography>
                      <IconButton onClick={() => toggleFavorite(gif)} color="error">
                        {isFavorite(gif) ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;
