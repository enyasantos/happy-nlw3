import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';

import Sidebar from '../components/SidebarDashboard';

import '../styles/pages/logon.css';

export default function Logon() {

    const history = useHistory()

    return (
        <div id="page-logon">
            <Sidebar />
            <main className="content-logon">
                <button 
                    className="btn-back"
                    type="button" 
                    onClick={() => history.push('/')}
                >
                    <FaArrowLeft size={24} color="#15C3D6"/>
                </button>
                <h3>Fazer login</h3>
                <form>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" className="dashboard-input-default"/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" className="dashboard-input-default"/>
                    <div>
                        <label>
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            <p>Lembrar-me</p>
                        </label>
                        <Link to="/dashboard/forgot-password">Esqueci minha senha</Link>
                    </div>
                    <button 
                        type='submit' 
                        className="btn-dashboard-default btn-logon"
                        onClick={() => history.push('/orphanages-created')}
                    >
                        Entrar
                    </button>
                </form>
            </main>
        </div>
    );
}