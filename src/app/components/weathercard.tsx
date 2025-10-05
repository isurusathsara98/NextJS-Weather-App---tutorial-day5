import React from 'react'

function WeatherCard({location, current}: {location: any, current: any}) {
  return (
    <div className='flex flex-col items-center gap-2 mt-4 border border-black rounded-lg p-2
     '>
      <h2  className='text-xl font-sans mt-3'>{location.name}, {location.country}</h2>
      <p>Temperature: {current.temp_c}°C</p>
      <p>Condition: {current.condition.text}</p>
      <img src={current.condition.icon} alt={current.condition.text} />
    </div>
  )
}

export default WeatherCard;
