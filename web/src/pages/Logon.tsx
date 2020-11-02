import React, {FormEvent, useState} from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';

import Sidebar from '../components/SidebarDashboard';

import '../styles/pages/logon.css';
import api from '../services/api';

export default function Logon() {

    const history = useHistory();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function handleLogon(event: FormEvent ) {
        event.preventDefault();
        const data = {
            email,
            password
        }
        api.post('auth', data)
        .then(response => {
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            history.push('/dashboard/orphanages-created');
        })
        .catch(err => console.log(err.response.data.message));
    }

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
                    <input 
                        type="email" 
                        id="email" 
                        className="dashboard-input-default"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="dashboard-input-default"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
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
                        onClick={handleLogon}
                    >
                        Entrar
                    </button>
                </form>
            </main>
        </div>
    );
}