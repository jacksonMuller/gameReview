import { useState } from 'react';
import Search from './Search';
import { Button } from './ui/Button';
import { Modal } from './Modal';
import FetchTopGames from './fetchTopGames';
import GameCard from './GameCard';

const Content = ({ user, modalOpen, modalContent, setModalOpen, openModal }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async (searchResults) => {
    // If searchResults is empty, query = ''
    // If there are search results, query = 'searched'
    setResults(searchResults);
    setQuery(searchResults.length > 0 ? 'searched' : '');
  };

  return (
    <>
      {!user && <div>User is not logged in</div>}
      <div className="flex flex-row justify-between items-center sm:px-5">
        <Search setResults={handleSearch} />
      </div>

      {query === '' && (
        // Show top games only if no search query
        <FetchTopGames onGameClick={openModal} />
      )}

      {query === 'searched' && results.length > 0 && (
        <div>
          <h1 className="text-4xl font-bold mt-8">Search Results</h1>
          <ul>
            {results.map((result) => (
              <button
                key={result.id}
                type="button"
                className='w-1/3 sm:w-1/5 mx-2 my-2'
                onClick={() => openModal(result)}
              >
                <GameCard game={result} />
              </button>
            ))}
          </ul>
        </div>
      )}

      {modalOpen && <Modal result={modalContent} setModalOpen={setModalOpen} />}
    </>
  );
};

export default Content;
