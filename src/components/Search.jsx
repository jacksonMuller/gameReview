import { useState } from 'react'
import searchGames from '../services/searchGames';
import { Button } from './ui/Button';

const Search = ({setResults}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await searchGames(query);
      setResults(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <>
      <form onSubmit={(e) => handleSearch(e)}>
          <input className='text-black rounded-md px-4 py-2 w-30%' type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Enter game name' />
          <Button className='mx-2 px-0.7 py-0.7 font-small' type='submit' disabled={loading}>{loading ? 'Loading...' : 'Search'}</Button>
      </form>
      {error && <p>Can't search nothing</p>}
    </>
  )
}

export default Search