import React from "react";
import AppContext from "../context";
import Card from "../components/Card";

function Favorites() {
  const { favorites, onAddToFavorites } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Избранное</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card key={index} onFavorite={onAddToFavorites} favorited {...item} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
