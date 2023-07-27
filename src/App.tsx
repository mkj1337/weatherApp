import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState({} as any);
  const [location, setLocation] = useState<string>('');
  const [image, setImage] = useState<any>('');

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c93595a5cd0bafbfb9b7449e9d28bc49`;

  const searchLocation = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.key === 'Enter') {
        const { data } = await axios.get(apiURL);
        setData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await axios.get(
          `https://pixabay.com/api/?key=38504450-549082d1c19b14fe064187e72&q=${location}&image_type=photo`
        );
        setImage(data.hits[0].largeImageURL);
        setLocation('');
      } catch (err) {
        console.log(err);
      }
    };
    fetchImage();
  }, [data]);

  return (
    <div
      className="app"
      style={{ background: 'url(' + image + ') no-repeat center center/cover' }}
    >
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter a location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp} &deg;C</h1> : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like} &deg;C</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
