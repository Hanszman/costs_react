import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => { // O useEffect é utilizado para executar o useState apenas uma vez e não deixar o react ficar executando infinitas vezes uma requisição na página
        fetch(`http://localhost:5000/projects/${id}`, { // Utilizado para acesar a API (que nesse projeto foi simulada por meio da biblioteca json-server utilizando o arquivo db.json)
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },    
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            setProject(data);
        })
        .catch((err) => console.log(err));
    }, []); // O segundo parâmetro é o valor inicial

    return (
        <p>{project.name}</p>
    );
}

export default Project;