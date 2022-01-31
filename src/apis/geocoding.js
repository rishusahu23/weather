import axios from "axios";

// WEATHER_API_KEY="769f8e0e121f42acb91171211222901"
// GEOCODING_API_KEY=pk.eyJ1IjoicmlzaHVzYWh1MjMiLCJhIjoiY2thMmp1dXpuMGI4eDNkb2dudTEyZW00YyJ9.Nmv2NTFYcmHbqhaci4PpPQ

const key =
  "pk.eyJ1IjoicmlzaHVzYWh1MjMiLCJhIjoiY2thMmp1dXpuMGI4eDNkb2dudTEyZW00YyJ9.Nmv2NTFYcmHbqhaci4PpPQ";

const getLatAndLong = async (location) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
      )}.json?access_token=${key}`
    );
    if (!response.data.features.length) {
      return { err: "Please Enter correct address" };
    }

    const [long, lat] = response.data.features[0].center;
    const place = response.data.features[0].place_name;
    return { lat, long, place };
  } catch (err) {
    return { err: "Unable to connect to MapBox Api" };
  }
};

export { getLatAndLong };
