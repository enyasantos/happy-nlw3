import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import { RiMapPinLine, RiErrorWarningLine } from 'react-icons/ri';
import { BiPowerOff } from 'react-icons/bi';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import LogoImage from '../images/map-marker.png';

import '../styles/pages/orphanages-created.css';

const happyMapIcon = L.icon({
    iconUrl: LogoImage,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
});

export default function OrphanagesCreated() {

    const history = useHistory();

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
                    <button><BiPowerOff size={26} color="#FFF" /></button>
                </footer>
            </aside>
            <main className="content-orphanages-created">
                <header>
                    <h1>Orfanatos Cadastrados</h1>
                    <p>2 orfanatos</p>
                </header>
                <section>
                    <div className="orphanage-map">
                        <div className="content">
                        <Map 
                            center={[-20.3688967,-43.4157686]} 
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
                            <Marker interactive={false} icon={happyMapIcon} position={[-20.3688967,-43.4157686]} />
                        </Map>
                        </div>
                        <div className="footer">
                            <h3>Orf. Esperança</h3>
                            <div className="buttons">
                                <button onClick={() => history.push('/dashboard/orphanages-edit')}>
                                    <FiEdit3 size={20} color="#15C3D6" />
                                </button>
                                <button>
                                    <FiTrash size={20} color="#15C3D6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="orphanage-map">
                        <div className="content">
                        <Map 
                            center={[-20.3688967,-43.4157686]} 
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
                            <Marker interactive={false} icon={happyMapIcon} position={[-20.3688967,-43.4157686]} />
                        </Map>
                        </div>
                        <div className="footer">
                            <h3>Orf. Esperança</h3>
                            <div className="buttons">
                                <button 
                                    onClick={() => history.push('/dashboard/orphanages-edit')}
                                >
                                    <FiEdit3 size={20} color="#15C3D6" />
                                </button>
                                <button><FiTrash size={20} color="#15C3D6" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="orphanage-map">
                        <div className="content">
                        <Map 
                            center={[-20.3688967,-43.4157686]} 
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
                            <Marker interactive={false} icon={happyMapIcon} position={[-20.3688967,-43.4157686]} />
                        </Map>
                        </div>
                        <div className="footer">
                            <h3>Orf. Esperança</h3>
                            <div className="buttons">
                                <button><FiEdit3 size={20} color="#15C3D6" /></button>
                                <button><FiTrash size={20} color="#15C3D6" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="orphanage-map">
                        <div className="content">
                        <Map 
                            center={[-20.3688967,-43.4157686]} 
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
                            <Marker interactive={false} icon={happyMapIcon} position={[-20.3688967,-43.4157686]} />
                        </Map>
                        </div>
                        <div className="footer">
                            <h3>Orf. Esperança</h3>
                            <div className="buttons">
                                <button><FiEdit3 size={20} color="#15C3D6" /></button>
                                <button><FiTrash size={20} color="#15C3D6" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="orphanage-map">
                        <div className="content">
                        <Map 
                            center={[-20.3688967,-43.4157686]} 
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
                            <Marker interactive={false} icon={happyMapIcon} position={[-20.3688967,-43.4157686]} />
                        </Map>
                        </div>
                        <div className="footer">
                            <h3>Orf. Esperança</h3>
                            <div className="buttons">
                                <button><FiEdit3 size={20} color="#15C3D6" /></button>
                                <button><FiTrash size={20} color="#15C3D6" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="orphanage-map">
                        <div className="content">
                        <Map 
                            center={[-20.3688967,-43.4157686]} 
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
                            <Marker interactive={false} icon={happyMapIcon} position={[-20.3688967,-43.4157686]} />
                        </Map>
                        </div>
                        <div className="footer">
                            <h3>Orf. Esperança</h3>
                            <div className="buttons">
                                <button><FiEdit3 size={20} color="#15C3D6" /></button>
                                <button><FiTrash size={20} color="#15C3D6" /></button>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    );
}