import { useContext } from "react";
import { Storage } from "../src/Storage";
import { useNavigate } from "react-router-dom";

function PageTwo() {
  const { profiles } = useContext(Storage);
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile List</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20
      }}>
        {profiles.map((p) => (
          <div key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              textAlign: "center",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/details/${p.id}`)}
          >
            <img src={p.image} width="120" height="120"
              style={{ borderRadius: "50%", objectFit: "cover" }} />
            <h3>{p.name}</h3>
            <p>Age: {p.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageTwo;
