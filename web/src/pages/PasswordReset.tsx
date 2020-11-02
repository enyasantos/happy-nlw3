import React, { useState, useEffect, FormEvent } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

import Sidebar from '../components/SidebarDashboard';

import '../styles/pages/password-reset.css';

import api from '../services/api';

interface KeyRouteParams {
    key: string;
}

export default function PasswordReset() {

    const history = useHistory();
    const { key } = useParams<KeyRouteParams>();

    const [ keyUrl, setKeyUrl ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirm, setPasswordConfirm ] = useState('');
    const [ messageError, setMessageError ] = useState('');

    const [ isRevealPassword, setIsRevealPassword ] = useState(false);
    const [ isRevealConfirmPassword, setIsRevealConfirmPassword ] = useState(false);

    function handleRevealPassword() {
        setIsRevealPassword(!isRevealPassword);
    }

    function handleRevealConfirmPassword() {
        setIsRevealConfirmPassword(!isRevealConfirmPassword);
    }

    function handleConfirm(event: FormEvent) {
        event.preventDefault();
        if( password !== passwordConfirm){
            setMessageError(`*Erro: As senhas são diferentes.`)
        } else {
            const data = { password }
            api.put(`forgot-password/${keyUrl}`, data)
            .then(response => {
                alert(response.data.message);
                history.push('/dashboard/logon');
            })
            .catch(err => setMessageError(`*Erro: ${err.response.data.message}. Tente novamente.`));
        }
    }

    useEffect(() => {
        setKeyUrl(key);
    }, [key]);

    return (
        <div id="page-password-reset">
            <Sidebar />
            <main className="content-password-reset">
                <h3>Redefinição de senha</h3>
                <p>
                    Escolha uma nova senha para você
                    acessar o dashboard do Happy
                </p>
                {messageError && <p className="messageError">{messageError}</p>}
                <form>
                    <label htmlFor="password">Nova senha</label>
                    <div>
                        <input 
                            type={isRevealPassword ? "text" : "password" }
                            id="password" 
                            className="dashboard-input-default"
                            value={password}
                            onChange={(event) => {setPassword(event.target.value);}}
                        />
                        <span onClick={handleRevealPassword}>
                            {isRevealPassword 
                            ? <FaRegEyeSlash size={26} color="#15C3D6"/> 
                            : <FaRegEye size={26} color="#15C3D6" />
                            }
                        </span>
                    </div>
                    <label htmlFor="confirm-password">Confirmar senha</label>
                    <div>
                        <input 
                            type={isRevealConfirmPassword ? "text" : "password" }
                            id="confirm-password" 
                            className="dashboard-input-default"
                            value={passwordConfirm}
                            onChange={(event) => {setPasswordConfirm(event.target.value);}}
                        />
                        <span onClick={handleRevealConfirmPassword}>
                            {isRevealConfirmPassword 
                            ? <FaRegEyeSlash size={26} color="#15C3D6"/> 
                            : <FaRegEye size={26} color="#15C3D6" />
                            }
                        </span>
                    </div>
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