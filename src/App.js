import React, { useState } from "react"

const api = { 
  key: '262dee7b47154f7bc6cdacbec5b80183',
  url: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (event) => {
     if(event.key === 'Enter') { 
       fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('')
          setWeather(result)
          console.log(result)
        })
     } 
  }

  const dateBulderer = (d) => { 
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }
  

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <div className="search-box">
        <input 
            type="text" 
            className={(typeof weather.main != 'undefined') ? 'search' : 'search middle'} 
            placeholder='Search...' 
            onChange={event => setQuery(event.target.value)}
            value={query}
            onKeyPress={search}
        /> 
      </div>

     { (typeof weather.main != "undefined") ? ( 
       <div>
         <div className='country'>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h4>{dateBulderer(new Date())}</h4>
        </div>

        <div className='temperature'>
          <h1>{Math.round(weather.main.temp)}&#176;c</h1>
          <h2>{weather.weather[0].description}</h2>
        </div>

       </div>
      ) : ("")}

    </div>
  );
}

export default App;
