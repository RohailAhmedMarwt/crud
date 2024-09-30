import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FoodDetail = () => {
  const { id } = useParams();  // Extract the food item ID from the URL
  const [food, setFood] = useState(null);  // State to hold food item details
  const [showModal, setShowModal] = useState(false);  // Modal state for update form
  const [title, setTitle] = useState('');  // State for title
  const [price, setPrice] = useState('');  // State for price
  const [category, setCategory] = useState('');  // State for category
  const [description, setDescription] = useState('');  // State for description
  const [image, setImage] = useState('');  // State for image
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/foods/food-detail/${id}`);
        const data = await response.json();
        setFood(data.data);  // Set food item details
        setTitle(data.data.title);  // Pre-fill form fields
        setPrice(data.data.price);
        setCategory(data.data.category);
        setDescription(data.data.description);
        setImage(data.data.image);
      } catch (error) {
        console.error('Error fetching food detail:', error);
      }
    };

    fetchFoodDetail();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/foods/update-food/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price,
          category,
          description,
          image,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setFood(data.data);  // Update food state with new data
        setShowModal(false);  // Close modal
      } else {
        console.error(data.message);  // Log error message
      }
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/foods/delete-food/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/');  // Redirect to homepage after deletion
      } else {
        console.error(data.message);  // Log error message
      }
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{food.title}</h1>
      <img src={food.image} alt={food.title} className="w-full h-96 object-cover rounded-md mb-6" />
      <p className="text-gray-700 mb-4">{food.description}</p>
      <p className="text-gray-900 font-bold text-2xl">${food.price}</p>
      <p className="text-gray-600 text-sm">Category: {food.category}</p>

      {/* Update and Delete buttons */}
      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => setShowModal(true)}
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {/* Modal for updating food item */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-1/2">
            <h2 className="text-2xl font-bold mb-6">Update Food</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetail;
