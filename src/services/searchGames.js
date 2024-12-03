export const searchGames = async (query) => {
  const url = "https://searchgames-wy3rojkptq-uc.a.run.app";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({ query }), // Send the query in the body
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Search Results:", data);
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export default searchGames;
