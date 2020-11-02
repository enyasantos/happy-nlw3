import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { RiMapPinLine, RiErrorWarningLine } from 'react-icons/ri';
import { BiPowerOff } from 'react-icons/bi';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import LogoImage from '../images/map-marker.png';

import '../styles/pages/orphanages-created.css';
import api from '../services/api';

const happyMapIcon = L.icon({
    iconUrl: LogoImage,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
});

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function OrphanagesCreated() {

    const history = useHistory();
    
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);
    const [ message, setMessage ] = useState('');

    function handleLogout() {
        localStorage.clear();
        history.push('/dashboard/logon');
    }

    useEffect(() => {
        api.get('orphanages-status/?status=accept')
        .then(response => {
            const orphanages = response.data;
            if(orphanages.length !== 0 )
                setOrphanages(orphanages)
            else
                setMessage('Nenhum no momento :(')
        })
        .catch(err => {console.log(err)})
    }, []);

    return (
        <div id="page-orphanages-created">
            <aside>
                <header>
                    <img src={LogoImage} alt="happy"/>
                </header>
                <main>
                    <Link to="/dashboard/orphanages-created" className="active"><RiMapPinLine size={26} /></Link>
                    <Link to="/dashboard/orphanages-pending"><RiErrorWarningLine size={26} /></Link>
                </main>
                <footer>
                    <button onClick={handleLogout}><BiPowerOff size={26} color="#FFF" /></button>
                </footer>
            </aside>
            <main className="content-orphanages-created">
                <header>
                    <h1>Orfanatos Cadastrados</h1>
                    {orphanages.length
                        ? <p>{orphanages.length} orfanatos</p>
                        : <p></p>
                    }
                </header>
                <section>
                    {orphanages.length
                    ?
                    orphanages.map(orphanage => (
                        <div key={orphanage.id} className="orphanage-map">
                            <div className="content">
                            <Map 
                                center={[orphanage.latitude, orphanage.longitude]} 
                                zoom={16} 
                                style={{ width: '100%', height: '100%' }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer 
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                            </Map>
                            </div>
                            <div className="footer">
                                <h3>{orphanage.name}</h3>
                                <div className="buttons">
                                    <button onClick={() => history.push({
                                        pathname: '/dashboard/orphanages-edit',
                                        state: {id: orphanage.id}
                                    })}>
                                        <FiEdit3 size={20} color="#15C3D6" />
                                    </button>
                                    <button onClick={() => history.push({
                                        pathname: '/dashboard/delete-orphanage-confirm',
                                        state: {id: orphanage.id}
                                    })}>
                                        <FiTrash size={20} color="#15C3D6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    : <p className="message" >{message}</p>
                    }
                </section>
            </main>
        </div>
    );
}