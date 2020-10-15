import React from 'react';

import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import LogoImage from '../images/logo.png';

import '../styles/pages/landing.css';

export default function Landing() {

    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={LogoImage} alt="logo happy"/>
                <main>
                <h1>Leve felicidade para o mundo</h1>
                <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div className="location">
                <strong>Mariana</strong>
                <span>Minas Gerais</span>
                </div>

                <Link to="/orphanages-map" className="enter-app">
                <FiArrowRight size={26} color="rgba(0, 0, 0, .6)"/>
                </Link>
            </div>
        </div>
    );
}