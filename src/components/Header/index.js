import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='container-header'>
            <header>
                <Link className='logo' to={'/'}>
                    <i className='ri-film-line'></i>PRIMEFLIX
                </Link>
                <Link className='favoritos' to={'/favoritos'}>
                    <i className='ri-archive-line'></i>Meus filmes
                </Link>
            </header>
        </div>
    );
};

export default Header;
