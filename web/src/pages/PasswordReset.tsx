import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

import Sidebar from '../components/SidebarDashboard';

import '../styles/pages/password-reset.css';

export default function PasswordReset() {

    const history = useHistory();

    const [ isRevealPassword, setIsRevealPassword ] = useState(false);
    const [ isRevealConfirmPassword, setIsRevealConfirmPassword ] = useState(false);

    function handleRevealPassword() {
        setIsRevealPassword(!isRevealPassword);
    }

    function handleRevealConfirmPassword() {
        setIsRevealConfirmPassword(!isRevealConfirmPassword);
    }

    return (
        <div id="page-password-reset">
            <Sidebar />
            <main className="content-password-reset">
                <h3>Redefinição de senha</h3>
                <p>
                    Escolha uma nova senha para você
                    acessar o dashboard do Happy
                </p>
                <form>
                    <label htmlFor="password">Nova senha</label>
                    <div>
                        <input 
                            type={isRevealPassword ? "text" : "password" }
                            id="password" 
                            className="dashboard-input-default"
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
                        onClick={() => history.push('/dashboard/orphanages-created')}
                    >
                        Entrar
                    </button>
                </form>
            </main>
        </div>
    );
}