import { useEffect, useState } from 'react';
import { getTopGames } from '../services/fetchReviews';
import searchGames from '../services/searchGames';
import GameCard from './GameCard';

export default function FetchTopGames({ onGameClick }) {
  const [topGames, setTopGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopGames = async () => {
      try {
        const gamesFromDb = await getTopGames(); 
        const detailedGames = [];

        for (const game of gamesFromDb) {
          let detailsData = null;

          if (game.name && game.name.trim() !== '') {
            try {
              const searchResults = await searchGames(game.name);
              if (searchResults && searchResults.length > 0) {
                const exactMatch = searchResults.find(
                  (r) => r.name.toLowerCase() === game.name.toLowerCase()
                );
                const chosenResult = exactMatch ? exactMatch : searchResults[0];

                detailsData = {
                  name: chosenResult.name,
                  coverUrl: chosenResult.cover?.url || '',
                  summary: chosenResult.summary || '',
                  genres: chosenResult.genres || [],
                  platforms: chosenResult.platforms || [],
                  first_release_date: chosenResult.first_release_date || null,
                };
              }
            } catch (error) {
              console.error(`Error searching for ${game.name}:`, error);
            }
          } else {
            console.warn(`Game with ID ${game.gameId} has no valid name, skipping search...`);
          }

          if (detailsData) {
            detailedGames.push({
              ...game,
              id: game.gameId,
              name: detailsData.name,
              cover: { url: detailsData.coverUrl },
              summary: detailsData.summary,
              genres: detailsData.genres,
              platforms: detailsData.platforms,
              first_release_date: detailsData.first_release_date,
            });
          } else {
            // Fallback if no details found
            detailedGames.push({
              ...game,
              id: game.gameId,
              name: game.name || 'Unknown Game',
              cover: { url: '' },
              summary: '',
              genres: [],
              platforms: [],
              first_release_date: null,
            });
          }
        }

        setTopGames(detailedGames);
      } catch (error) {
        console.error('Error loading top games:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopGames();
  }, []);

  if (loading) {
    return <p className="mt-8 px-5 text-white">Loading top games...</p>;
  }

  return (
    <div className="mt-8 px-5 flex justify-center">
      <div className="max-w-6xl w-full">
        {topGames.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center">Top Rated Games</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {topGames.map((game) => (
                <GameCard 
                  key={game.gameId} 
                  game={game} 
                  onClick={() => onGameClick(game)} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
