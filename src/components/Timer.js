import React, { useReducer, useState, useEffect} from "react";
import { formatTime } from '../Helper';

const initState = { timeRemaining: 1500, target: 4, current: 1, break: false};

// Default increment and decrement by 1 unless specified
const reducer = (state, { type, payload = 1 }) => {
  switch (type) {
    case "increment":
      return { ...state, timeRemaining: state.timeRemaining + payload };
    case "decrement":
       if (state.timeRemaining <= 0) {
            return { ...state, timeRemaining: initState.timeRemaining }
        }
      return { ...state, timeRemaining: state.timeRemaining - payload };
    case "reset":
      return { ...state, timeRemaining: initState.timeRemaining };
    case "break_toggle":
        return {...state, break: !state.break}
    default:
      return new Error();
  }
};

const Timer = props => {
  const [timerId, setTimerId] = useState(null);
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
      document.title = `${state.break ? 'Taking a break...' : ''} ${formatTime(state.timeRemaining)} | Pomodoro Timer`
      return function cleanup() {
          document.title = 'Pomodoro Timer';
      }
  })
  const stopTimer = () => {
    clearInterval(timerId);
  };
  const startTimer = (dispatch) => {
    clearInterval(timerId);
    dispatch({ type: "break_toggle"});
    let [snap_time, snap_id] = [state.timeRemaining, timerId];
    setTimerId(
      setInterval(() => {
        dispatch({ type: "decrement" });
        --snap_time;
        if (snap_time <= 0) {
            dispatch({ type: "break_toggle"});
        }
      }, 1000)
    );
  };
  return (
    <div className="timer">
      <h1>Pomodoro Timer</h1>
      <h2>Time Remaining: {formatTime(state.timeRemaining)}</h2>
      <h2>Session: {state.current} / {state.target} </h2>
      <div className="btn-panel">
        <button onClick={() => dispatch({ type: "increment", payload: 60 })}>
          + Minute
        </button>
        <button onClick={() => dispatch({ type: "decrement", payload: 60 })}>
          - Minute
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <button
          onClick={() => {
            startTimer(dispatch);
          }}
        >
          Start 
        </button>
        <button onClick={() => stopTimer()}>Stop</button>
      </div>
      <style jsx global>{`
        html {
            font-family: 'Arial', Helvetica, sans-serif;
        } 
      `}
      </style>
      <style jsx>
        {`
          .timer {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 600px;
            margin: 0 auto;
          }
          .btn-panel {
            max-width: calc(140px * 3);
            display: flex;
            flex-wrap: wrap;
            align-items: center;
          }
          button {
            font-size: 1em;
            color: white;
            padding: .25em 1em;
            background: #4286f4;
            border: 0;
            border-radius: 3px;
            margin: 10px;
          }
          h1 {
            font-size: 2.5em;
            font-weight: 600;
            color: #24292e;
          }
          h2 {
            font-size: 1.5em;
            font-weight: 500;
            color: #24292e;
          }
        `}
      </style>
    </div>
  );
};

export default Timer;
