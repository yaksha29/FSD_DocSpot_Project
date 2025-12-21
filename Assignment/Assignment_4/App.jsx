import { useState } from "react";
import HomePage from "./HomePage";
import ListPage from "./ListPage";
import DetailsPage from "./Detailspage";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <>
      <HomePage
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {!selectedCharacter ? (
        <ListPage
          search={search}
          filter={filter}
          setSelectedCharacter={setSelectedCharacter}
        />
      ) : (
        <DetailsPage
          character={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
        />
      )}
    </>
  );
}

export default App;
