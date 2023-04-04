import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Favoritos from './pages/Favoritos';
import Filme from './pages/Filme';

import React from 'react';
import Error from './pages/Error';
import Header from './components/Header';

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/favoritos' element={<Favoritos />} />
                <Route path='/filme/:id' element={<Filme />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;
