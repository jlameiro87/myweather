import React from 'react';
import './styles.css';
import moment from 'moment';
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
        <p className="day">Date: {moment().format('dddd')} {moment().format('LL')}</p>
      </div>

      <div className="flex">
        <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
      </div>

      <div className="flex">
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="description">Description: {weatherData.weather[0].description}</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US')}</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US')}</p>
      </div>
    </div>
  )
}

export default Weather;
