import React, { FormEvent, ChangeEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import L from 'leaflet';
import api from '../services/api';
import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../images/map-marker.png';

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import { useHistory } from "react-router-dom";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {

  const history = useHistory();

  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0});
  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ instructions, setInstructions ] = useState('');
  const [ openingHours, setOpeningHours ] = useState('');
  const [ whatsappNumber, setWhatsappNumber ] = useState('');
  const [ openOnWeekends, setOpenOnWeekends ] = useState(true);
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages] = useState<string[]>([])

  function numberPhoneMask(value: string) {
    const currentNumber = value;
    const isNumber = value.length;
    console.log(isNumber)
    let numberPhoneFormated = '';
    setWhatsappNumber(value);
    if(isNumber === 2) {
      numberPhoneFormated = currentNumber.replace(/^(\d{2}).*/,"($1)");
      setWhatsappNumber(numberPhoneFormated);
    }
    if(isNumber === 8) {
      const cleanNumber = currentNumber.replace(/\D/g,"");
      numberPhoneFormated = cleanNumber.replace(/^(\d{2})(\d{4}).*/,"($1) $2-");
      setWhatsappNumber(numberPhoneFormated);
    }
    if(isNumber === 15) {
      const cleanNumber = currentNumber.replace(/\D/g,"");
      numberPhoneFormated = cleanNumber.replace(/^(\d{2})(\d{5})(\d{4}).*/,"($1) $2-$3");
      setWhatsappNumber(numberPhoneFormated);
    }
  }
  
  function hanldeMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp_number', whatsappNumber.replace(/\D/g,""));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', openingHours);
    data.append('open_on_weekends', String(openOnWeekends));
    images.forEach(image => {
      data.append('images', image);
    })
    await api.post('orphanages', data);

    history.push('/create-orphanage-confirm');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files)
      return;

    const selectedImages  = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  function handleRemoveImage(image: String, index: number) {

    let currentPreviewImages: string[];
    let currentSelectedImages: File[];

    currentPreviewImages = []    
    currentSelectedImages = [] 

    previewImages.forEach(img => {
      if(img !== image)
        currentPreviewImages.push(img);
    });

    images.forEach((img, i) => {
      if(i !== index)
        currentSelectedImages.push(img)
    })

    setPreviewImages(currentPreviewImages);
    setImages(currentSelectedImages);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-20.3688967,-43.4157686]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={hanldeMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[
                    position.latitude,
                    position.longitude
                  ]} 
                />
              ) }

              {/* <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} /> */}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300} 
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp-number">Número de Whatsapp</label>
              <input 
                id="whatsapp-number" 
                value={whatsappNumber}
                maxLength={15}
                onChange={event => {
                  numberPhoneMask(event.target.value)
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map( (image, index) => {
                  return (
                    <div key={image} className="image-box">
                      <button type="button" onClick={()=>handleRemoveImage(image, index)}>x</button>
                      <img src={image} alt={name}/>
                    </div>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input 
                id="opening_hours" 
                value={openingHours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  onClick={() => setOpenOnWeekends(true)}
                  type="button" 
                  className={openOnWeekends ? "active" : ''}
                >
                  Sim
                </button>
                <button 
                  onClick={() => setOpenOnWeekends(false)}
                  className={!openOnWeekends ? "active" : ''}
                  type="button"
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
