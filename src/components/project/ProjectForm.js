import { useState, useEffect } from 'react';
import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({handleSubmit, btnText, projectData}) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => { // O useEffect é utilizado para executar o useState apenas uma vez e não deixar o react ficar executando infinitas vezes uma requisição na página
        fetch('http://localhost:5000/categories', { // Utilizado para acesar a API (que nesse projeto foi simulada por meio da biblioteca json-server utilizando o arquivo db.json)
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((err) => console.log(err));
    }, []); // O segundo parâmetro é o valor inicial, nesse caso vazio []

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    };

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value});
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type='number'
                text='Orçamento do Projeto'
                name='budget'
                placeholder='Insira o orçamento total'
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                text='Selecione a Categoria'
                name='category_id'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    );
}

export default ProjectForm;