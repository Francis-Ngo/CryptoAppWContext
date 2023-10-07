import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import { CryptoContext } from './CryptoContext';

function App() {
  
  const [search, setSearch] = useState('');
  const {coins} = useContext(CryptoContext);
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

   const handleChange =(e) => {
     setSearch(e.target.value);
   };

   const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
   );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search Currency</h1>
        <form>
          <input type='text' placeholder='Search' 
           className='coin-input' onChange={handleChange} />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
        <Coin
           key={coin.id}
           name={coin.name}
           price={coin.current_price}
           symbol={coin.symbol}
           marketcap={coin.total_volume}
           volume={coin.market_cap}
           image={coin.image}
           priceChange={coin.price_change_percentage_24h}
        />
        );
        })}
    </div>
  );
};

export default App;