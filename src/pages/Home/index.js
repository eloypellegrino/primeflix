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

  // Pegar o primeiro filme
  const primeiroFilme = filmes[0];

  // Estilos dinâmicos para o background
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to top, #111, transparent), url(https://image.tmdb.org/t/p/original/${primeiroFilme?.backdrop_path})`
  };

  return (
    <>
    <div className='backgroundImage' style={backgroundImageStyle}>
      <div className='containerImage'>
        {/* Alterar o título para o nome do filme */}
        <h1 className='title'>{primeiroFilme?.title}</h1>
        <a href={`/filme/${primeiroFilme?.id}`} className='cta'>Ver detalhes</a>
      </div>
    </div>

    <div className='container-home'>
    <h2 className='subTitle'>Últimos lançamentos</h2>
      <div className='lista-filmes'>
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <Link to={`/filme/${filme.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  alt={filme.title}
                />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Home;
