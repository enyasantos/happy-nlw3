import React from 'react';

import { useHistory } from 'react-router-dom';

import Icon from '../images/create-ilustration.png';

import '../styles/pages/create-orphanage-confirm.css';

export default function CreateOrphanageConfirm() {

    const history = useHistory();

    return (
        <div id="page-create-orphanage-confirm">
            <section>
                <h1>Ebaaa!</h1>
                <p>
                    O cadastro deu certo e foi enviado
                    ao administrador para ser aprovado.
                    Agora é só esperar :)
                </p>
                <button
                    onClick={() => history.push('/orphanages-map')}
                >
                    Voltar para o mapa
                </button>
            </section>
            <img src={Icon} alt=""/>
        </div>
    );
}