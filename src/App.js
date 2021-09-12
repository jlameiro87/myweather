import React, { useEffect, useState } from 'react';
import './App.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from './components/Weather';

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      console.log("Latitude is:", lat)
      console.log("Longitude is:", long)

      if (!lat || !long) return;

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          console.log(result);
        });
    };
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {
        (typeof data.main != 'undefined') ? (<Weather weatherData={data} />) : (<div><Dimmer active><Loader>Loading..</Loader></Dimmer></div>)
      }
    </div>
  );
}

export default App;
