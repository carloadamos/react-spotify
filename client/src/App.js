import React, { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, [code]);

  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
