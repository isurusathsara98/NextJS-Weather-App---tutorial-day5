
const baseUrl = "http://api.weatherapi.com/v1/current.json?key=" + process.env.NEXT_PUBLIC_WEATHER_API_KEY + "&q=India&aqi=no";

export const fetchData = async (city: string) => {
	  try {
		const response = await fetch(baseUrl.replace("India", city));

		console.log(baseUrl);
		const data = await response.json();
		return data;
	  } catch (error) {
		throw new Error("Error fetching weather data:" + error);
	  }
	};
  
