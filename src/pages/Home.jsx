import React, { useState, useEffect } from "react";
import {
  Forecast,
  Inputs,
  SunriseAndSunset,
  TemperatureAndDetails,
} from "../components";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../components/Api";

const Home = () => {
  useEffect(() => {
    handleOnSearchChange();
  }, []);

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (
    searchData = { value: "28.7041 77.1025", label: "Delhi" }
  ) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        document
          .querySelector(".back")
          .classList.add(
            `bg-url('https://source.unsplash.com/1600x900/?Delhi')`
          );
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div
      className={`bg-[#000a18] text-blue-100 py-40 px-24 max-[734px]:px-0 justify-center flex`}
    >
      <div className=" flex-col  flex  max-w-[2300px]">
        <div className="bg-gradient-to-b from-[#15bff7]  to-[#1068f3] max-[934px]:h-[560px] weather_box shadow-[0_35px_60px_-15px_rgba(0,205,231,0.3)] mb-10 w-full">
          <Inputs onSearchChange={handleOnSearchChange} />

          {currentWeather && <TemperatureAndDetails data={currentWeather} />}
        </div>
        <div className="second_box w-full bg-gradient-to-b from-[#baeeff]  to-[#e0ecff] ">
          {currentWeather && <SunriseAndSunset data={currentWeather} />}
        </div>
        {forecast && <Forecast title="Daily" data={forecast} />}
      </div>
    </div>
  );
};

export default Home;
