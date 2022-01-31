import axios from "axios";

const key = process.env.GEOCODING_API_KEY;

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
