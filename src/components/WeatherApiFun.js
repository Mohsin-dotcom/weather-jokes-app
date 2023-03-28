import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const openWeatherApiKey = '66c39711f284671c344d0a2fd3f71347';

const WeatherApiFun = () => {

  const inputRef = useRef(null);

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [joke, setJoke] = useState('');
  const [jokeCategories, setjokeCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("dev")

  useEffect(() => {
    getJokeCatogeries();
  }, [])

  const getJokeCatogeries = () => {
    let apiUrl = `https://api.chucknorris.io/jokes/categories`;
    axios.get(apiUrl)
      .then((response) => {
        setjokeCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching joke categories', error);
      });
  }

  const getWeather = () => {
    inputRef.current.focus();
    if (!city) return

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`;
    axios.get(apiUrl)
      .then((response) => {
        setWeather(response.data);
        getJoke();
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  const getJoke = () => {
    const apiUrl = `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`;
    axios.get(apiUrl)
      .then((response) => {
        setJoke(response.data.value);
      })
      .catch((error) => {
        console.error('Error fetching joke data:', error);
      });
  };


  const handleCityChange = (event) => {
    setJoke("");
    setWeather("");
    setCity(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md p-6 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl mb-4 text-center font-bold">Weather + Jokes App</h1>
        <div className="flex flex-col items-center space-y-4">
          <div className='flex flex-row w-full justify-end'>
            <label htmlFor="category-select" className="text-lg font-semibold pr-2">
              Joke category
            </label>
            <div className="relative">
              <select
                name="category"
                id="category-select"
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {jokeCategories.map((item, index) => (
                  <option key={`category-${index}`} value={item}>{item}</option>
                )
                )}

              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.293 6.707a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-row space-x-2">
            <input
              type="text"
              value={city}
              ref={inputRef}
              id="city-input"
              placeholder="Enter a city"
              onChange={handleCityChange}
              className="p-2 border rounded-md outline-none w-full md:w-2/3"
            />
            <button
              type='button'
              onClick={getWeather}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md `}
            >
              Get Weather and a random Joke
            </button>

          </div>
          {weather && joke && (
            <>
              <p className="text-lg">
                The current temperature in {city} is {Math.round(weather.main.temp)}°C
                and the weather condition is <span className='font-bold'>{weather.weather[0].description}</span>.
              </p>
              <p className="text-lg">Here's a Chuck Norris joke: {joke}</p>
            </>
          )}
        </div>
      </div>
    </div>

  );
}

export default WeatherApiFun;