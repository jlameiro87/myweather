import React, { useEffect, useState } from 'react';
import './App.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from './components/Weather';
import CityInput from './components/CityInput';

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!lat && !long) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
      }

      if (!lat || !long) return;

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result);
        });
    };
    fetchData();
  }, [lat, long]);

  const selectCity = (lat, lon) => {
    setLat(lat);
    setLong(lon);
  };

  return (
    <div className="App">
      {
        (typeof data.main != 'undefined') ? (<><CityInput selectCity={selectCity} /><Weather weatherData={data} /></>) : (<div><Dimmer active><Loader>Loading..</Loader></Dimmer></div>)
      }
    </div>
  );
}

export default App;
