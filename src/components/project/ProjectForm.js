import { useState, useEffect } from 'react';
import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({btnText}) {
    const [categories, setCategories] = useState([]);

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
    }, []); // O segundo parâmetro é o valor inicial, nesse caso, as options vazias []

    return (
        <form className={styles.form}>
            <Input
                type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto'
            />
            <Input
                type='number'
                text='Orçamento do Projeto'
                name='budget'
                placeholder='Insira o orçamento total'
            />
            <Select
                text='Selecione a Categoria'
                name='category_id'
                options={categories}
            />
            <SubmitButton text={btnText}/>
        </form>
    );
}

export default ProjectForm;