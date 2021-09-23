import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearSelectedTrack,
  getSelectedTrack,
} from '../state/reducer/trackReducer';
import { getToken } from '../state/reducer/tokenReducer';

import axios from 'axios';
import Player from '../Player';

import { useTable } from 'react-table';

const useStyles = makeStyles({
  root: {
    background: '#121212',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    background: '#1DB954',
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  headerLeft: {
    marginRight: '20px',
  },
  playlistImage: {
    height: '180px',
    width: '180px',
  },
  playlist: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tracks: {
    padding: '10px',
    flex: 1,
    overflowY: 'auto',
  },
  subTitle: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  owner: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  table: {
    borderCollapse: 'collapse',
  },
  row: {
    '&:hover': {
      background: '#121212',
      '& > *': {
        background: '#282828',
      },
    },
  },
  tableDefinition: {
    padding: '10px',
    background: '#121212',
    color: '#FFF',
    gap: 0,
    '&:first-child': {
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
    },
    '&:last-child': {
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
    },
  },
});

export default function PlaylistTracks() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const location = useLocation();
  const authToken = useSelector(getToken);
  const hasSelectedTrack = useSelector(getSelectedTrack);
  const [tracks, setTracks] = useState([]);
  const { playlist } = location.state ?? {};
  const convertDuration = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };
  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
      },
      {
        Header: 'TITLE',
        accessor: 'title',
      },
      {
        Header: 'ARTIST',
        accessor: 'artist',
      },
      {
        Header: 'ALBUM',
        accessor: 'album.name',
      },
      {
        Header: 'DURATION',
        accessor: 'duration',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tracks });

  useEffect(() => {
    axios
      .post('http://localhost:3001/getPlaylistTracks', {
        playlistId: playlist.id,
      })
      .then(({ data }) => {
        const trackResult = data.tracks.map(({ track }, index) => {
          return {
            id: (index += 1),
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images.reduce((smallest, image) => {
              if (image.height < smallest.height) return image;

              return smallest;
            }, track.album.images[1]).url,
            album: track.album,
            duration: convertDuration(track.duration_ms),
          };
        });

        setTracks(trackResult);
        dispatch(clearSelectedTrack());
      })
      .catch((error) => console.log('error', error));
  }, [playlist, dispatch]);

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Box className={styles.headerLeft}>
          <img
            className={styles.playlistImage}
            src={playlist.imageUrl}
            alt={playlist.name}
          />
        </Box>
        <Box className={styles.headerRight}>
          <Typography variant='subtitle1' className={styles.playlist}>
            PLAYLIST
          </Typography>
          <Typography variant='h3' className={styles.title}>
            {playlist.name}
          </Typography>
          <Typography variant='subtitle2' className={styles.subTitle}>
            {playlist.description}
          </Typography>
          <Typography variant='subtitle1' className={styles.owner}>
            {playlist.owner.display_name}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.tracks}>
        <table className={styles.table} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      background: '#121212',
                      color: '#FFF',
                      fontWeight: 'normal',
                      padding: '10px',
                      textAlign: 'left',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className={styles.row} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className={styles.tableDefinition}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Box>
          {hasSelectedTrack.length !== 0 && <Player token={authToken} />}
        </Box>
      </Box>
    </Box>
  );
}
