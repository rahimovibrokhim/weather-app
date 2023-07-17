import axios from "axios";
import { useState } from "react";

function App() {
  let [data, useData] = useState({});
  let [location, setLocation] = useState("");

  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1c4361f927f02ed83106103338350c1f&units=metric`;
  const searchLocation = (event) => {
    if (event.key == "Enter") {
      axios.get(URL).then((response) => {
        useData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data?.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data?.main?.temp.toFixed()}&#x2103;</h1> : ""}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : ""}
          </div>
        </div>
        {data.main != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}&#x2103;</p>
              ) : (
                ""
              )}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : ""}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : (
                ""
              )}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
