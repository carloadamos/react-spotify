import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Category({ category }) {
  const handleClick = (id) => {
    axios
      .post('http://localhost:3001/getPlaylistsForCategory', {
        id,
      })
      .then((response) => {
        console.log(response.data);
        // setSelectedCategory(response.data.items);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div onClick={() => handleClick(category.id)}>
      <img
        src={category.icons[0].url}
        alt={category.name}
        style={{
          height: category.icons[0].height,
          width: category.icons[0].width,
        }}
      />
      <div>{category.name}</div>
    </div>
  );
}
