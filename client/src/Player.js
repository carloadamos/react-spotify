import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";
import { getSelectedTrack } from "./state/reducer/trackReducer";

export default function Player({ token }) {
  const uri = useSelector(getSelectedTrack);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [uri]);

  return (
    <SpotifyPlayer token={token} uris={uri} play={play} showSaveIcon={true} />
  );
}
