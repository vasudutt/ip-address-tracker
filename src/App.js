import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Info from './components/Info';
import Loader from './components/Loader';

const API_KEY = process.env.REACT_APP_API_KEY;

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState({});
  const [formInput, setFormInput] = useState('');
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUserData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setPosition([userData.latitude, userData.longitude]);
    }
  }, [userData]);

  useEffect(() => {
    fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${formInput}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message) {
            toast.error('Invalid IP Address!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            setUserData(result);
          }
        },
        (error) => {
          toast.error('Invalid IP Address!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );
  }, [formInput]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <div className="grid grid-rows-3 w-screen h-screen overflow-hidden">
        <div className="absolute">
          <ToastContainer />
        </div>
        <Info userData={userData} setFormInput={setFormInput} />

        <div className="bg-pattern" />

        <MapContainer
          id="map"
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <ChangeView center={position} zoom={13} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default App;
