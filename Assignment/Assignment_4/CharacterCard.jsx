const CharacterCard = ({ character, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p><strong>Anime:</strong> {character.anime}</p>
    </div>
  );
};

export default CharacterCard;
