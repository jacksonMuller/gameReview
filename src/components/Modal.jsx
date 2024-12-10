import React from 'react';
import { Reviews } from './Reviews';

export const Modal = ({ result, setModalOpen }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 w-full h-full"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-3/4 max-w-2xl flex flex-col max-h-[90%] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-black"
          onClick={() => setModalOpen(false)}
        >
          X
        </button>
        
        <div className="flex flex-col md:flex-row mb-4">
          {result.cover?.url && (
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4 flex sm:block justify-center">
              <img 
                src={result.cover?.url} 
                alt={result.name} 
                className="w-40 md:w-26 h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <div className="flex-grow flex flex-col">
            <h2 
              className="font-bold text-gray-800 mb-4 text-left text-2xl sm:text-3xl"
              style={{
                wordBreak: 'break-word',
              }}
            >
              {result.name}
            </h2>
            <div className="flex flex-col gap-2">
              {result.summary && (
                <div className="flex">
                  <strong className="w-32 text-gray-800">Summary:</strong>
                  <p className="text-gray-700">{result.summary}</p>
                </div>
              )}
              {result.genres && (
                <div className="flex">
                  <strong className="w-32 text-gray-800">Genres:</strong>
                  <p className="text-gray-700">{result.genres.map((genre) => genre.name).join(', ')}</p>
                </div>
              )}
              {result.platforms && (
                <div className="flex">
                  <strong className="w-32 text-gray-800">Platforms:</strong>
                  <p className="text-gray-700">{result.platforms.map((platform) => platform.name).join(', ')}</p>
                </div>
              )}
              {result.first_release_date && (
                <div className="flex">
                  <strong className="w-32 text-gray-800">Release Date:</strong>
                  <p className="text-gray-700">{formatDate(result.first_release_date)}</p>
                </div>
              )}
              {typeof result.aggregated_rating === 'number' && (
                <div className="flex">
                  <strong className="w-32 text-gray-800">Rating:</strong>
                  <p className="text-gray-700">{result.aggregated_rating.toFixed(1)} / 100</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Reviews 
            gameId={result.id} 
            gameName={result.name} 
            coverUrl={result.cover?.url || ''} 
          />
        </div>
      </div>
    </div>
  );
};
export default Modal; 