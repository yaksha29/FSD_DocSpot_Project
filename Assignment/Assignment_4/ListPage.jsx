import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";

function ListPage({ search = "", filter = "All", setSelectedCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.jikan.moe/v4/characters")
      .then((res) => {
        const data = res.data?.data || [];
        const mapped = data.map((item) => ({
          id: item.mal_id ?? item?.id,
          name: item.name,
          image: item.images?.jpg?.image_url || "",
          anime:
            item.anime && item.anime.length ? item.anime[0].name : "Various",
          details: item.about || ""
        }));
        setCharacters(mapped);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = characters.filter((c) => {
    const matchesFilter = filter === "All" || c.anime === filter;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container">
      <h1>Characters</h1>
      {loading && <p>Loading...</p>}

      <div className="card-grid">
        {filtered.map((ch) => (
          <CharacterCard
            key={ch.id}
            character={ch}
            onClick={() => setSelectedCharacter && setSelectedCharacter(ch)}
          />
        ))}
      </div>
    </div>
  );
}

export default ListPage;
