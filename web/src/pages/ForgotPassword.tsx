import React from 'react';

import { useHistory } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';

import Sidebar from '../components/SidebarDashboard';

import '../styles/pages/forgot-password.css';

export default function ForgotPassword() {

    const history = useHistory()

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
                <form>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" className="dashboard-input-default"/>
                    <button 
                        type='submit' 
                        className="btn-dashboard-default btn-logon"
                        onClick={() => history.push('/dashboard/password-reset')}
                    >
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}