import React from 'react';
import 'flowbite';
import Navber from './Components/Navber';
import { Routes, Route } from 'react-router-dom';
import Food from './Pages/Food';
import Home from './Pages/Home';
import FoodDetails from './Pages/FoodDetails';

const App = () => {
  return (
    <div>
      <Navber />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/create-food" element={<Food />} />
        <Route path='/Food-detail/:id' element={<FoodDetails/>} />
      </Routes>
    </div>
  );
};

export default App;
