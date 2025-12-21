const DetailsPage = ({ character, setSelectedCharacter }) => {
  if (!character) return null;

  return (
    <div className="details">
      <button onClick={() => setSelectedCharacter(null)}>⬅ Back</button>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p><strong>Anime:</strong> {character.anime}</p>
      <p>{character.details}</p>
    </div>
  );
};

export default DetailsPage;
