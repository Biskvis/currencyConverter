import { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css'
import swapI from './assets/swap.png'

function App() {
  
  const [ amount, setAmount ] = useState(0)
  const [ from, setFrom ] = useState('EUR')
  const [ to, setTo] = useState('USD')
  const [ info, setInfo ] = useState({})
  const [ converted, setConverted] = useState(null)
  const currencies = ['EUR', 'USD', 'CAD', 'NZD', 'AUD', 'GBP', 'JPY', 'CHF', 'CZK', 'DKK', 'PLN', 'NOK', 'SEK'];
  
  useEffect(() => {
    fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_5UDOUrqPdNPBf7x1bGv7gmMPTiIRRCslq3VNATDN&currencies=EUR%2CUSD%2CCAD%2CNZD%2CAUD%2CGBP%2CJPY%2CCHF%2CCZK%2CDKK%2CPLN%2CNOK%2CSEK&base_currency=EUR')
    .then(res => res.json())
    .then(data => setInfo(data.data))
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    setConverted(amount / info[from] * info[to])
  }

  function handleSwap() {
    let a = from;
    let b = to;
    setFrom(b);
    setTo(a);
  }

  return (
    <>
      <h1>Currency converter</h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='form'>
          <label>
            Amount
            <br />
            <input
            className='amount'
            name='amount'
            type='number'
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
            />
          </label>
          {/* <label>
            From
            <br />
            <select></select>
          </label> */}
          <label>
            From
            <br />
            <Dropdown className='currency' options={currencies} onChange={(e) => setFrom(e.value) } value={from}  />
          </label>
          <button className='swap' onClick={handleSwap}><img src={swapI} /></button>
          <label>
            To
            <br />
            <Dropdown className='currency' options={currencies} onChange={(e) => setTo(e.value) } value={to}  />
          </label>

          </div>
          <div className='convert-btn'>
          <button type='submit'>Convert</button>

          </div>
        </form>
        <div className='converted'>
          {converted !== null && <h2>Converted Amount:<br />
            <div className='converted-amount'>
              <span>
              {amount} <span className='converted-cur'>{from}</span> = {Math.round(converted * 1000) / 1000} <span className='converted-cur'>{to}</span>
              </span>
            </div>
            </h2>}
        </div>
      
    </>
  )
}

export default App
