import { Reviews } from './Reviews'; // Import the Reviews component

export const Modal = ({ result, setModalOpen }) => {
  // Helper function to format release date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 w-full h-full">
      <button className="absolute top-2 right-2 text-white" onClick={() => setModalOpen(false)}>Close</button>
      <div className="bg-white p-6 rounded shadow-lg w-3/4 flex flex-col max-h-[90%] overflow-y-auto">
        {/* Top Section: Game Image and Details */}
        <div className="flex mb-4">
          <div className="flex-shrink-0 mr-4">
            <img 
              src={result.cover?.url} 
              alt={result.name} 
              className="w-26 h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="flex-grow flex flex-col">
            <h2 
              className="font-bold text-gray-800 mb-4 text-left"
              style={{
                fontSize: '35px',
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
              {result.aggregated_rating && (
                <div className="flex">
                  <strong className="w-32 text-gray-800">Rating:</strong>
                  <p className="text-gray-700">{result.aggregated_rating.toFixed(1)} / 100</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Reviews */}
        <div className="flex flex-col">
          <Reviews gameId={result.id} />
        </div>
      </div>
    </div>
  );
};
