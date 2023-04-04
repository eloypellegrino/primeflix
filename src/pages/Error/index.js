import React from 'react';
import { Link } from 'react-router-dom';
import './error.css';

const Error = () => {
    return (
        <div className='error'>
            <h1>Ops! Essa página não foi encontrada :(</h1>
            <Link className='link' to={'/'}>
                Veja todos os filmes
            </Link>
        </div>
    );
};

export default Error;
