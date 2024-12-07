import React from 'react';

const GameCard = ({ game, onClick }) => {
  const displayRating = game.averageRating 
    ? game.averageRating.toFixed(1) 
    : 'N/A';

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg p-2 w-1/6 cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105 border border-white"
      onClick={onClick}
    >
      <div className="relative w-full h-32 overflow-hidden rounded">
        <img
          src={game.cover?.url || ''}
          alt={game.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-bold text-white truncate">{game.name}</h3>
        <p className="text-gray-400 text-xs mt-1">
          Rating: {displayRating} / 10
        </p>
      </div>
    </div>
  );
};

export default GameCard;
