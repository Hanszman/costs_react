import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

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

    return (
        <>
            {
                project.name ? (
                    <div className={styles.project_details}>
                        <Container customClass='column'>
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
                                            <p>Form</p>
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