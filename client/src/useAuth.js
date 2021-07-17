import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        setAccessToken(res.data.token);
      })
      .catch((err) => {
        window.location = "/";
      })
      .finally(() => window.history.pushState({}, null, "/"));
  }, [code]);

  return accessToken;
}
