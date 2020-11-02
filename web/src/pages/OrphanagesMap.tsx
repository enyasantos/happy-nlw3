import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.png';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [52, 58],
    iconAnchor: [26, 58],

    popupAnchor: [170, 2]
    
})

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function Landing() {

    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages-status/?status=accept')
        .then(response => {
            const orphanages = response.data;
            setOrphanages(orphanages)
        })
        .catch(err => {console.log(err)})
    }, []);

    return (
        <div id="page-orphanages-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="logo da happy para marcar pontos"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Mariana</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>
            <Map 
                center={[ -20.3688967,-43.4157686 ]}
                zoom={15.25}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                {orphanages.map(orphanage => (
                    <Marker
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[ orphanage.latitude , orphanage.longitude ]}
                    >
                        <Popup closeButton={false} maxWidth={240} minWidth={240} className='map-popup'>
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight  size={20} color="#ffff"/>
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
} 