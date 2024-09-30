import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/foods/get-all-food');
        const data = await response.json();
        setFoods(data.data); 
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Food Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="bg-white shadow-md rounded-md p-4">
            <Link to={`/food-detail/${food._id}`}>
              <img src={food.image} alt={food.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold mb-2">{food.title}</h2>
              <p className="text-gray-700 mb-2">{food.description}</p>
              <p className="text-gray-900 font-bold">${food.price}</p>
              <p className="text-gray-600 text-sm">Category: {food.category}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
