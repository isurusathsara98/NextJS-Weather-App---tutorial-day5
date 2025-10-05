import Image from "next/image";
import WeatherApp from "./components/WeatherApp";
import GPTWeatherApp from "./components/GPTWeatherApp";

  export default function Home() {
    return (
      <div className="min-h-screen bg-cover bg-center items-center justify-center flex flex-col" 
      style={{ backgroundImage: "url('/assets/weather1.jpg')" }}>
        <WeatherApp/>
        <GPTWeatherApp/>  
      </div>
    );
}
