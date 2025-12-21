import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "../src/Storage";

function PageOne() {
  const navigate = useNavigate();
  const { profiles, setProfiles } = useContext(Storage);

  const [form, setForm] = useState({
    name: "",
    age: "",
    place: "",
    occupation: "",
    gender: "",
    image: "",
    anime_name: ""
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfiles([...profiles, { ...form, id: profiles.length }]);
    navigate("/list");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Enter Your Details</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImage} required /><br /><br />

        <input placeholder="Name" onChange={(e) =>
          setForm({ ...form, name: e.target.value })} required /><br /><br />

        <input placeholder="Age" onChange={(e) =>
          setForm({ ...form, age: e.target.value })} required /><br /><br />

        <input placeholder="Place" onChange={(e) =>
          setForm({ ...form, place: e.target.value })} required /><br /><br />

        <input placeholder="occupation" onChange={(e) =>
          setForm({ ...form, occupation: e.target.value })} required /><br /><br />

          <input placeholder="anime name" onChange={(e) =>
          setForm({ ...form, anime_name: e.target.value })} required /><br /><br />

        <select onChange={(e) =>
          setForm({ ...form, gender: e.target.value })} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PageOne;
