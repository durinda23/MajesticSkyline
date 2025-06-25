import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RentCard from './rentCard';

const Rent = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axios
      .get('http://majesticapi/getHousesForRent.php')
      .then((response) => {
        setHouses(response.data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки домов для аренды:', error);
      });
  }, []);

  return (
    <section className="rent">
      <div className="rent__list">
        {houses.length > 0 ? (
          houses.map((house) => <RentCard key={house.ID_house} house={house} />)
        ) : (
          <p>Нет доступных домов для аренды</p>
        )}
      </div>
    </section>
  );
};

export default Rent;