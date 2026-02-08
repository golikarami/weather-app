import { useState } from "react";
import { getCurrentWeather } from "./services/api";
interface City {
  id: number;
  name: string;
  lat: string;
  lon: string;
}

const cities = [
  { id: 1, name: "Tehran", lat: "35.7219", lon: "51.3347" },
  { id: 2, name: "Ahvaz", lat: "31.3183", lon: "48.6706" },
  { id: 3, name: "Shiraz", lat: "29.5926", lon: "52.5836" },
];

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    const selectLocation: City = JSON.parse(value);
    getCurrentWeather({
      lat: selectLocation.lat,
      lon: selectLocation.lon,
    }).then((res) => {
      setWeatherData(res);
    });
  };

  return (
    <>
      <h1>Weather App</h1>
      <h3>pressure: {weatherData?.main.pressure}</h3>
      <h3>temp: {weatherData?.main.temp}</h3>
      <h3>wind speed: {weatherData?.main.wind.speed}</h3>

      <select onChange={handleChange}>
        {cities.map((item) => (
          <option key={item.id} value={JSON.stringify(item)}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
}
export default App;
