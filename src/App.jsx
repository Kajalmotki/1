import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MobileLayout from './components/Layout/MobileLayout';
import Home from './pages/Home';
import Horoscope from './pages/Horoscope';
import Tarot from './pages/Tarot';
import Shop from './pages/Shop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MobileLayout />}>
        <Route index element={<Home />} />
        <Route path="horoscope" element={<Horoscope />} />
        <Route path="tarot" element={<Tarot />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
