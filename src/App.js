import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedo } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const formatTime = (second) => {
  const minuteString = Math.floor(second / 60)
    .toString()
    .padStart(2, "0");

  const secondString = (second % 60).toString().padStart(2, "0");

  return `${minuteString}:${secondString}`;
};

export default function App() {
  const [time, setTime] = useState({
    second: 1500,
    run: "pause"
  });

  const refTime = useRef(null);
  const refCurentTime = useRef(1500);

  useEffect(() => {
    let timeInterval, curentSecond;
    if (time.run === "run" && time.second > 0) {
      curentSecond = time.second;
      timeInterval = setInterval(() => {
        if (refTime !== null && curentSecond > 0) {
          curentSecond -= 1;
          refCurentTime.current = curentSecond;
          refTime.current.innerHTML = formatTime(curentSecond);
        }
      }, 1000);
    }

    if (time.run === "reset") {
      refTime.current.innerHTML = formatTime(1500);
    }

    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [time.run]);

  const handleTime = (act) => {
    if (act === "run") {
      setTime((prev) => ({ ...prev, run: "run" }));
    } else if (act === "pause") {
      const second = refCurentTime.current;
      setTime((prev) => ({ second: second, run: "pause" }));
    } else {
      setTime((prev) => ({ second: 1500, run: "reset" }));
    }
  };

  return (
    <div className="App">
      <h1 ref={refTime}>{formatTime(time.second)}</h1>
      <button
        className="btn-run"
        onClick={() => handleTime("run")}
        disabled={time.run === "run"}
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button
        className="btn-pause"
        onClick={() => handleTime("pause")}
        disabled={time.run === "pause" || time.run === "reset"}
      >
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button className="btn-reset" onClick={() => handleTime("reset")}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
}
