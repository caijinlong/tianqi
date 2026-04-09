import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CityWeather from './components/CityWeather';
import { CITIES } from './api/weather';

function App() {
  return (
    <div className="sky-bg">
      {/* 漂浮的云朵 */}
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      <div className="cloud cloud-4" />
      <div className="cloud cloud-5" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CITIES.map((city) => (
            <CityWeather key={city.name} city={city} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
