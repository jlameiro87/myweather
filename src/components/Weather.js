import React from 'react';
import './styles.css';
import { Button } from 'semantic-ui-react';

const Weather = ({ weatherData }) => {
  const refresh = () => {
    window.location.reload();
  }

  return (
    <div className="main">
      <div className="top">
        <p className="header">{weatherData.name}</p>
        <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
      </div>

      <div className="flex">
        <p className="day">Date: {new Date(weatherData.dt*1000+(weatherData.timezone*1000)).toString()}</p>
      </div>

      <div className="flex">
        <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
      </div>

      <div className="flex">
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US')}</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US')}</p>
      </div>

      <div className="flex">
        <p className="temp">Description: {weatherData.weather[0].description}</p>
        <p><img className="img" alt="icon" src={`${process.env.REACT_APP_ICON_URL}/${weatherData.weather[0].icon}@2x.png`} /></p>
      </div>
    </div>
  )
}

export default Weather;
