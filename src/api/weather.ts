import axios from 'axios';
import type { CityConfig, WeatherData } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const CITIES: CityConfig[] = [
  { name: '北京', lat: 39.9042, lon: 116.4074 },
  { name: '黄梅', lat: 30.0703, lon: 115.9443 },
];

export async function fetchWeather(city: CityConfig): Promise<WeatherData> {
  const { data } = await axios.get(BASE_URL, {
    params: {
      latitude: city.lat,
      longitude: city.lon,
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      timezone: 'Asia/Shanghai',
      past_days: 14,
      forecast_days: 16,
    },
  });

  return {
    current: {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
    },
    daily: data.daily.time.map((date: string, i: number) => ({
      date,
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      weatherCode: data.daily.weather_code[i],
      precipitation: data.daily.precipitation_sum[i],
      windSpeedMax: data.daily.wind_speed_10m_max[i],
    })),
  };
}
