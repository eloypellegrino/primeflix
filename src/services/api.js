// Base url: https://api.themoviedb.org/3/
// Url: https://api.themoviedb.org/3/movie/550?api_key=1108c2c235d98c8d5a909ce452b4312e

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

export default api;
