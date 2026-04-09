export interface CurrentData {
  temperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
}

export interface DayData {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  precipitation: number;
  windSpeedMax: number;
}

export interface WeatherData {
  current: CurrentData;
  daily: DayData[];
}

export interface CityConfig {
  name: string;
  lat: number;
  lon: number;
}
