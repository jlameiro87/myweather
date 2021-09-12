import React, { useState } from 'react';
import './styles.css';
import { Input, Button } from 'semantic-ui-react';

const CityInput = ({ selectCity }) => {
  const [city, setCity] = useState('');
  const [data, setData] = useState([]);

  const searchCity = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/find/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        if (result && result.list?.length > 0)
          setData(result.list);
      });
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleClick = () => {
    searchCity();
  };

  const handleCityChange = (event) => {
    const value = event.target.value.split(', ');
    if (value.length === 3) {
      const latArray = value[1].split(':');
      const lonArray = value[2].split(':');

      selectCity(latArray[1], lonArray[1]);
    }
  };

  const resetData = () => {
    setData([]);
    setCity('');
  };

  const getInputWithData = () => {
    return <div className="div-search"><Input className="input-search-data" list='cities' placeholder='Choose a city...' onChange={handleCityChange} /><datalist id='cities'>{data.map((item, index) => <option key={index} value={item.name + ' ' + item.sys.country + ', lat:' + item.coord.lat + ', lon:' + item.coord.lon}>{item.name + ' ' + item.sys.country + ', lat:' + item.coord.lat + ', lon:' + item.coord.lon}</option>)}</datalist><Button className="button-reset" secondary onClick={resetData}>Reset</Button></div>;
  };

  const getSearchInput = () => {
    return <Input action={{ icon: 'search', onClick: handleClick }} onChange={handleInputChange} className="input-search" focus placeholder='Search...' value={city} />;
  };

  return (
    <>
      {
        (data && data.length > 0) ? getInputWithData() : getSearchInput()
      }
    </>
  )
}

export default CityInput
