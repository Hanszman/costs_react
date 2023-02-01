import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Projects.module.css';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation();
    let message = '';

    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => { // O useEffect é utilizado para executar o useState apenas uma vez e não deixar o react ficar executando infinitas vezes uma requisição na página
        setTimeout(() => { // Colocado pra mostrar o loading por mais tempo
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
                setRemoveLoading(true);
            })
            .catch((err) => console.log(err));
        }, 300);
    }, []); // O segundo parâmetro é o valor inicial, nesse caso vazio []

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, { // Utilizado para acesar a API (que nesse projeto foi simulada por meio da biblioteca json-server utilizando o arquivo db.json)
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },    
        })
        .then((resp) => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto'/>
            </div>
            {message && <Message type='success' msg={message}/>}
            {projectMessage && <Message type='success' msg={projectMessage}/>}
            <Container customClass='start'>
                {
                    projects.length > 0 && projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            key={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading/>}
                {
                    removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )
                }
            </Container>
        </div>
    );
}

export default Projects;