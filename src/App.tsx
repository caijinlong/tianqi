import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CityWeather from './components/CityWeather';
import { CITIES } from './api/weather';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100">
      <div className="max-w-6xl mx-auto px-4">
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
