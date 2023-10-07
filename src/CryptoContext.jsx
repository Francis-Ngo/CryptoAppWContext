import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
const CryptoContext = createContext();

// Create a provider component
export const CryptoProvider = (props) => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  // Function for API using Axios
  useEffect(() => {
    axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en'
    )
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    })
    .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CryptoContext.Provider value={{ coins, search, handleChange, filteredCoins }}>
      {props.children}
    </CryptoContext.Provider>
  );
};


export default CryptoContext.Provider