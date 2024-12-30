import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recommendations")
      .then((response) => setRecommendations(response.data))
      .catch((err) => setError("Failed to fetch recommendations.",err));
  }, []);

  const limitWords = (text, wordLimit) => {
    if (!text) return ""; 
  
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + " ...";
  };
  
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommendations</h2>
      {error && <p className="text-red-600 font-medium">{error}</p>}
      <div className="flex flex-wrap gap-6">
        {recommendations.map((product) => (
          <div
            key={product.id}
            className="bg-white border p-1 border-gray-300 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] overflow-hidden flex flex-col"
          >
            {/* Link to Product Detail */}
            <Link to={`/product/${product.id}`}>
              {/* Image section */}
              <img
                src={product?.image}
                alt={product.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">
                  {limitWords(product.name, 5)}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {limitWords(product.description, 8)}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">${product.price}</p>
                  <p className="text-sm text-gray-500">
                  ${product.rating} ⭐
                  </p>
                </div>
              </div>
            </Link>
          </div>
    ))}
      </div>
    </div>

  );
};

export default Recommendations;




