import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './filmes.css';
import api from '../../services/api';
import { BeatLoader } from 'react-spinners';
import 'remixicon/fonts/remixicon.css';
import { toast } from 'react-toastify';

const Filme = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            await api
                .get(`/movie/${id}`, {
                    params: {
                        api_key: '1108c2c235d98c8d5a909ce452b4312e',
                        language: 'pt-BR',
                    },
                })
                .then((response) => {
                    console.log(response);
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate('/', { replace: true });
                });
        }

        loadFilmes();

        return () => {};
    }, [navigate, id]);

    if (loading) {
        return (
            <div className='loading'>
                <BeatLoader
                    loading={loading}
                    color={'#eee'}
                    size={20}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                />
            </div>
        );
    }

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some(
            (filmesSalvo) => filmesSalvo.id === filme.id
        );

        if (hasFilme) {
            toast.warn('Esse filme já está na sua lista.');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));

        toast.success('Filme salvo com sucesso.');
    }

    return (
        <div className='filme-info'>
            <div className='filme-header'>
                <div>
                    <span className='filme-category'>
                        {filme.genres[0].name}
                    </span>
                    <h1>{filme.title}</h1>
                </div>
                <div className='filme-score'>
                    <h3>Avaliação</h3>
                    <span>{filme.vote_average.toFixed(1)} / 10</span>
                </div>
            </div>

            <img
                className='filme-img'
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                alt={filme.title}
            />
            <img
                className='light'
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                alt={filme.title}
            />

            <div className='area-buttons'>
                <button onClick={salvarFilme}>
                    <i className='ri-star-line'></i>Salvar
                </button>
                <button>
                    <i className='ri-movie-line'></i>
                    <a
                        href={`https://youtube.com/results?search_query=${filme.title}`}
                        target='blank'
                        rel='noreferrer'
                    >
                        Ver o trailer
                    </a>
                </button>
            </div>

            <h3 className='filme-sinopse-title'>Sinopse</h3>
            <p className='filme-sinopse'>{filme.overview}</p>
        </div>
    );
};

export default Filme;
