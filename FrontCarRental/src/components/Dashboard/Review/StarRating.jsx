import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
  return (
    <div className="flex">
        {Array.from({ length: totalStars }, (_, index) => (
        index < filledStars ? (
            <FaStar key={index} className="w-4 h-4 text-[#e5780d]" />
        ) : (
            <FaRegStar key={index} className="w-4 h-4 text-[#e9ba7a]" />
        )
        ))}
    </div>
  );
};

export default StarRating;

