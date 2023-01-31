import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Projects.module.css';
import LinkButton from '../layout/LinkButton';
import Message from '../layout/Message';
import Container from '../layout/Container';
import ProjectCard from '../project/ProjectCard';

function Projects() {
    const [projects, setProjects] = useState([]);

    const location = useLocation();
    let message = '';

    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => { // O useEffect é utilizado para executar o useState apenas uma vez e não deixar o react ficar executando infinitas vezes uma requisição na página
        fetch('http://localhost:5000/projects', { // Utilizado para acesar a API (que nesse projeto foi simulada por meio da biblioteca json-server utilizando o arquivo db.json)
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },    
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            setProjects(data);
        })
        .catch((err) => console.log(err));
    }, []); // O segundo parâmetro é o valor inicial, nesse caso vazio []

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto'/>
            </div>
            {message && <Message type='success' msg={message}/>}
            <Container customClass='start'>
                {
                    projects.length > 0 && projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            key={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                        />
                    ))
                }
            </Container>
        </div>
    );
}

export default Projects;