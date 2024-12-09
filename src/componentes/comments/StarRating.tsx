import { useEffect, useState } from "react";

interface StarRatingProps {
  maxRating?: number;
  value?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
  value = 0,
  onRatingChange,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  useEffect(() => {
    setSelectedRating(value);
  }, [value]);

  const handleRatingClick = (value: number) => {
    setSelectedRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Rating:
      </label>
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, index) => {
          const value = index + 1;
          return (
            <svg
              key={value}
              className={`w-8 h-8 cursor-pointer ${
                value <= selectedRating ? "text-yellow-400" : "text-gray-400"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleRatingClick(value)}
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
