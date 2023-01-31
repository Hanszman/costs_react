import { useState, useEffect } from 'react';
import styles from './Message.module.css';

function Message({type, msg}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => { // O useEffect é utilizado para executar o useState apenas uma vez e não deixar o react ficar executando infinitas vezes uma requisição na página
        if (!msg) {
            setVisible(false);
            return;
        }
        setVisible(true);

        const timer = setTimeout(() => { // A mensagem vai desaparecer depois de 3 segundos
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [msg]); // O segundo parâmetro é o valor inicial

    return (
        <>
            {
                visible && (
                    <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
                )
            }
        </>
    );
}

export default Message;