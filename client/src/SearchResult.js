// Core
import React, { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getTracks, selectTrack } from "./state/reducer/trackReducer";

// Component
import Track from "./Track";

export default function SearchResult() {
  const dispatch = useDispatch();
  const tracks = useSelector(getTracks);
  const [track, setTrack] = useState();

  return tracks && tracks.length ? (
    tracks.map((track) => (
      <Track
        key={track.uri}
        track={track}
        handleClick={() => dispatch(selectTrack(track.uri))}
      />
    ))
  ) : (
    <div>No tracks</div>
  );
}
