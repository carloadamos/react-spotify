import React, { useEffect, useState } from 'react';

import Browse from './Browse';
import Login from './Login';
import Playlist from './pages/Playlist';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get('code'));
  }, [code]);

  return (
    <Router>
      <Route
        exact
        path='/'
        render={() => (code ? <Browse code={code} /> : <Login />)}
      />
      <Route exact path='/playlist' component={Playlist} />
    </Router>
  );
}

export default App;
