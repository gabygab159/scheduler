import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    } else {
      setHistory((prev) => [...prev.slice(0, history.length - 1), mode]);
    }
  };

  const back = (mode) => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, history.length - 1)]);
    }
  };

  return { transition, mode: history[history.length - 1], back };
}
