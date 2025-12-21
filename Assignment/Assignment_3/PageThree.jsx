import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Storage } from "../src/Storage";

function PageThree() {
  const { id } = useParams();
  const { profiles } = useContext(Storage);
  const p = profiles[id];

  return (
    <div style={{ padding: 20 }}>
      <h1>{p.name}'s Profile</h1>

      <img src={p.image} width="160" height="160"
        style={{ borderRadius: "10px", objectFit: "cover" }} />
      <h3>Age: {p.age}</h3>
      <h3>Place: {p.place}</h3>
      <h3>Occupation: {p.occupation}</h3>
      <h3>Gender: {p.gender}</h3>
    <h3>Anime Name: {p.anime_name}</h3>
    </div>
  );
}

export default PageThree;
