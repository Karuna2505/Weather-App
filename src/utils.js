import sunny from "./Assets/sun.png";
import bright from "./Assets/cloudy.png";
import mostlyCloud from "./Assets/rain.png";

const apikey = "bebeda89094447c896b114554232806";
export const getWeatherForecastData = async (city) => {
  try {
    if(city){
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7`
      );
  
      return await response.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function getCurrentWeatherData(city) {
  try {
    if(city){
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}`
      );
      return await response.json();
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}



//get image according to cloud info
export function getWeatherImageName(cloudInfo) {
  let weatherImage;
  let weatherDescription = "";

  if (cloudInfo < 30) {
    weatherDescription = "Sunny";
    weatherImage = sunny;
  } else if (cloudInfo < 70) {
    weatherDescription = "Partly cloudy";
    weatherImage = bright;
  } else {
    weatherDescription = "Mostly Cloudy";
    weatherImage = mostlyCloud;
  }
  return { weatherDescription, weatherImage };
}

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
