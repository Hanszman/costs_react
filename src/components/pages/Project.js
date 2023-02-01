import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ProjectForm from '../project/ProjectForm';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => { // O useEffect é utilizado para executar o useState apenas uma vez e não deixar o react ficar executando infinitas vezes uma requisição na página
        setTimeout(() => { // Colocado pra mostrar o loading por mais tempo
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
        }, 300);
    }, []); // O segundo parâmetro é o valor inicial

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function editPost(project) {
        // Budget validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, { // Utilizado para acesar a API (que nesse projeto foi simulada por meio da biblioteca json-server utilizando o arquivo db.json)
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            // Mensagem
            setMessage('Projeto atualizado!');
            setType('success');
        })
        .catch((err) => console.log(err));
    }

    return (
        <>
            {
                project.name ? (
                    <div className={styles.project_details}>
                        <Container customClass='column'>
                            {message && <Message type={type} msg={message}/>}
                            <div className={styles.details_container}>
                                <h1>Projeto: {project.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                                </button>
                                {
                                    !showProjectForm ? (
                                        <div className={styles.project_info}>
                                            <p>
                                                <span>Categoria:</span> {project.category.name}
                                            </p>
                                            <p>
                                                <span>Total de Orçamento:</span> R$ {project.budget}
                                            </p>
                                            <p>
                                                <span>Total Utilizado:</span> R$ {project.cost}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className={styles.project_info}>
                                            <ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={project}/>
                                        </div>
                                    )
                                }
                            </div>
                        </Container>
                    </div>
                ) : (
                    <Loading/>
                )
            }
        </>
    );
}

export default Project;