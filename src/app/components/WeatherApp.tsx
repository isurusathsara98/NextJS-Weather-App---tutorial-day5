'use client'
import React, {  useRef, useState } from 'react'
import { fetchData } from './Weatherapi';
import Image from 'next/image';
import WeatherCard from './weathercard';

function WeatherApp() {
    const city  = useRef(null);
    const [error, setError] = useState<string | null>(null);
    const [weather, setWeather] = useState<{location: any, current: any}| undefined>({location: null, current: null});

    
  const Submit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(city?.current?.value===""){
      setError("Please enter a valid city");
      setWeather(undefined)
    }
    else{
      try{
      setError(null);
      const data = await fetchData(city?.current?.value);
      setWeather(data);
      console.log(weather);
      }
      catch(err){
        setError("Error fetching weather data");
        setWeather(undefined);
        console.log(err);
      }
    }
  } 

  const ResetData = () =>{
    if (city.current) {
    city.current.value = "";
  }
  setWeather(undefined); 
  setError(null);
  }

  return (
    <div className='text-center p-4 m-4 border border-gray-300 rounded-lg
     bg-white/60 backdrop-blur-sm flex flex-col gap-3 md:min-w-[400px] max-w-sm h-full ' >
      <h1 className='text-xl font-bold'>Weather For You</h1>
    <form onSubmit={Submit} className='flex flex-col gap-3 items-center'>
      <input type="text" ref={city} className='bg-white rounded-md border-1 p-1 text-center' 
      placeholder='Enter city name'
      onKeyDown={(e)=>e.key==="Enter" && Submit}/>
      
      {error && <p className='text-red-800'> {error} </p>}
      <div className='gap-5 flex'>
      <button type='submit' className='bg-blue-400 text-white rounded-md p-1 
      hover:bg-blue-600 transition-colors duration-300 hover:scale-105 max-w-30'>
        Submit</button>

        <button type="button"  className='bg-blue-400 text-white rounded-md p-1 
      hover:bg-blue-600 transition-colors duration-300 hover:scale-105 max-w-30' 
      onClick={ResetData}>
          Reset
        </button>

      </div>

    </form>
    {weather && weather.location && weather.current && 
    

    <WeatherCard location={weather?.location} current={weather?.current}/>
    }
    </div>  
  )
}

export default WeatherApp
