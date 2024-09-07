import { Star1 } from "iconsax-react";
import React, { useState, useEffect } from "react";

const ProductFiltter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ratings, setRatings] = useState({
    rate5: false,
    rate4: false,
    rate3: false,
    rate2: false,
    rate1: false,
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const selectedRatings = Object.entries(ratings)
      .filter(([_, isChecked]) => isChecked)
      .map(([key, _]) => parseInt(key.replace("rate", "")));

    onFilterChange({
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
      ratings: selectedRatings,
    });
  };

  const handleRatingChange = (rating: string) => {
    setRatings((prev) => ({ ...prev, [rating]: !prev[rating] }));
  };

  return (
    <div className="shadow-md p-5 sticky rounded-md flex flex-col gap-4">
      <h2 className="p-1 border-b">Filter By</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3>Price Range</h3>
            <div className="forms flex gap-2">
              <input
                type="number"
                min={1}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-[120px] border p-1 rounded-sm bg-transparent"
                placeholder="Min"
              />
              <input
                type="number"
                min={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-[120px] border p-1 rounded-sm bg-transparent"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Rating</h3>
            <div className="forms flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={ratings[`rate${rating}`]}
                    onChange={() => handleRatingChange(`rate${rating}`)}
                    className="w-[20px] border p-1 rounded-sm bg-transparent"
                  />
                  <div className="flex gap-2">
                    {[...Array(rating)].map((_, i) => (
                      <Star1 key={i} fill="solid" className="text-primary" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn border p-1 rounded-sm">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFiltter;