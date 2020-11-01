import React from 'react';

import LogoImage from '../images/logotipo.png';

import '../styles/components/sidebar-dashboard.css';

export default function SidebarDashboard() {

    return (
        <aside className="dashboard-sidebar">
            <aside>
                <img src={LogoImage} alt="happy"/>
                <address>
                    <p>Mariana</p>
                    <p>Minas Gerais</p>
                </address>
            </aside>
        </aside>

    )
}