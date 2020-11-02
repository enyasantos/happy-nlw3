import React, {FormEvent} from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { HiCheck, HiOutlineXCircle } from "react-icons/hi";

import Icon from '../images/delete-ilustration.png';

import '../styles/pages/delete-orphanage-confirm.css';

import api from '../services/api';

interface LocationState {
    from: {
      pathname: string;
    };
    id: string;
}

export default function DeleteOrphanageConfirm() {

    const history = useHistory();

    const location = useLocation<LocationState>();

    async function handleDelete(event: FormEvent) {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const id = location.state.id;
            await api.delete(`orphanages/${id}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              }
          });
            alert('Orfanato deletado com sucesso');
            history.push('/dashboard/orphanages-created');
        }catch(err) {
            alert('Erro ao tentar deletar orfanato.');
        }
    }

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
                        onClick={() => history.push('/dashboard/orphanages-created')}
                    >
                        <HiOutlineXCircle size={24} color="#FFF" />
                        Não
                    </button>
                    <button
                        onClick={handleDelete}
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