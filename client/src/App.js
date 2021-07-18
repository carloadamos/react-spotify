import React, { useEffect, useState } from "react";

import Browse from "./Browse";
import Login from "./Login";

function App() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, [code]);

  return code ? <Browse code={code} /> : <Login />;
}

export default App;
