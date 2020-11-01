import React from 'react';

import { useHistory } from 'react-router-dom';

import { HiCheck, HiOutlineXCircle } from "react-icons/hi";

import Icon from '../images/delete-ilustration.png';

import '../styles/pages/delete-orphanage-confirm.css';

export default function DeleteOrphanageConfirm() {

    const history = useHistory();

    return (
        <div id="page-delete-orphanage-confirm">
            <section>
                <h1>Excluir!</h1>
                <p>
                    Você tem certeza que quer
                    excluir Orf. Esperança?
                </p>
                <div>
                    <button
                        onClick={() => history.push('/')}
                    >
                        <HiOutlineXCircle size={24} color="#FFF" />
                        Não
                    </button>
                    <button
                        onClick={() => history.push('/dashboard/orphanages-created')}
                    >
                        <HiCheck size={24} color="#FFF" />
                        Sim
                    </button>
                </div>
            </section>
            <img src={Icon} alt=""/>
        </div>
    );
}