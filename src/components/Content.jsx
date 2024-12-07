import { useState } from 'react';
import Search from './Search';
import { Button } from './ui/Button';
import { Modal } from './Modal';
import FetchTopGames from './fetchTopGames';

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
      <div className="flex flex-row justify-between items-center px-5">
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
              <Button
                key={result.id}
                className="text-white flex flex-start w-4/5 p-2 m-5"
                type="button"
                onClick={() => openModal(result)}
              >
                {result.name}
              </Button>
            ))}
          </ul>
        </div>
      )}

      {modalOpen && <Modal result={modalContent} setModalOpen={setModalOpen} />}
    </>
  );
};

export default Content;
