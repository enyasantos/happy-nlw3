import React, { FormEvent, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';

import Sidebar from '../components/SidebarDashboard';

import '../styles/pages/forgot-password.css';

import api from '../services/api';

export default function ForgotPassword() {

    const history = useHistory();

    const [ email, setEmail ] = useState('');
    const [ messageError, setMessageError ] = useState('');
    const [ messageSuccess, setMessageSuccess ] = useState('');

    function handleConfirm(event: FormEvent) {
        event.preventDefault();
        const data = { email }
        api.post('forgot-password', data)
        .then(response => setMessageSuccess(response.data.message))
        .catch(err => setMessageError(`*Erro: ${err.response.data.message}`))
    }

    return (
        <div id="page-forgot-password">
            <Sidebar />
            <main className="content-forgot-password">
                <button 
                    className="btn-back"
                    type="button" 
                    onClick={() => history.goBack()}
                >
                    <FaArrowLeft size={24} color="#15C3D6"/>
                </button>
                <h3>Esqueci a senha</h3>
                <p>
                    Sua redefinição de senha será enviada
                    para o e-mail cadastrado.
                </p>
                {messageError && <p className="messageError">{messageError}</p>}
                {messageSuccess && <p className="messageSuccess">{messageSuccess}</p>}
                <form>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="dashboard-input-default"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                    <button 
                        type='submit' 
                        className="btn-dashboard-default btn-logon"
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}