const axios = require("axios");

const getWeather = async (city) => {
  const url = `https://wttr.in/${city}?format=j1`;

  const response = await axios.get(url);

  return response.data;
};

module.exports = {
  getWeather,
};
