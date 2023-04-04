import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import BeatLoader from 'react-spinners/BeatLoader';
import './home.css';

const Home = () => {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    const override = {
        display: 'block',
        margin: '0 auto',
        borderColor: 'royalblue',
    };

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: '1108c2c235d98c8d5a909ce452b4312e',
                    language: 'pt-BR',
                    page: 1,
                },
            });
            setFilmes(response.data.results.slice(0, 18));
            setLoading(false);
        }

        loadFilmes();
    }, []);

    if (loading) {
        return (
            <div className='loading'>
                <BeatLoader
                    loading={loading}
                    cssOverride={override}
                    color={'#eee'}
                    size={20}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                />
            </div>
        );
    }

    return (
        <div className='container-home'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <h1>{filme.title}</h1>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                alt={filme.title}
                            />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
