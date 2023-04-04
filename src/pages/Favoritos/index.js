import React, { useEffect } from 'react';
import './favoritos.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Favoritos = () => {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return item.id !== id;
        });

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));
        toast.success('Filme excluído com sucesso.');
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            <ul>
                {filmes.length === 0 && (
                    <span className='sem-filmes'>
                        Você não possui nenhum filme salvo.
                    </span>
                )}
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link
                                    className='detalhes'
                                    to={`/filme/${item.id}`}
                                >
                                    Ver detalhes
                                </Link>
                                <button
                                    onClick={() => excluirFilme(item.id)}
                                    className='excluir'
                                >
                                    <i className='ri-delete-bin-line'></i>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Favoritos;
