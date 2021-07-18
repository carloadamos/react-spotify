// Core
import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getTracks, selectTrack } from "./state/reducer/trackReducer";

// Component
import Track from "./Track";

export default function SearchResult() {
  const dispatch = useDispatch();
  const tracks = useSelector(getTracks);

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
