const HomePage = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div className="navbar">
      <h1> Anime Explorer  </h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search character..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>
    </div>
  );
};

export default HomePage;
