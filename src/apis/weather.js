import axios from "axios";

const key = process.env.WEATHER_API_KEY;

const getWeather = async (lat, long) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&aqi=no`;
    const res = await axios.get(url);

    const { temp_c: temp } = res.data.current;
    return { temp };
  } catch (err) {
    return { err: "Unable to access Weather Api" };
  }
};

export { getWeather };
