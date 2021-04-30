import React, { useState, useEffect } from 'react';
import { AiOutlineUndo } from 'react-icons/ai';
import { BiPlayCircle } from 'react-icons/bi';
import { MdPauseCircleOutline } from 'react-icons/md';
import Modal from './Modal';

function Counter() {
  const [baseMin, setBaseMin] = useState(2);
  const [minutes, setMinutes] = useState(baseMin);
  const [baseSec, setBaseSec] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const [btnText, setBtnText] = useState(<BiPlayCircle />);
  const [breakTime, setBreakTime] = useState(0);
  const [breakStatus, setBreakStatus] = useState(false);
  const [visibility, setVisibility] = useState('visible');
  const [statusColor, setStatusColor] = useState('#EF6461');
  const [session, setSession] = useState(2);
  const [sessionCounter, setSessionCounter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (baseMin <= 0) {
    alert('Please set timer bigger than 0! Thank you!');
    setBaseMin(1);
    setMinutes(1);
    return;
  }

  if (breakTime < 0) {
    alert('Please set timer bigger than 0! Thank you!');
    setBreakTime(0);
    return;
  }

  if (session < 1) {
    alert('Please set timer bigger than 0! Thank you!');
    setSession(1);
  }

  //Timer
  const timer = () => {
    let interval = setInterval(() => {
      clearInterval(interval);

      // Add round function!!!
      if (sessionCounter === session) {
        if (breakStatus && minutes == 0 && seconds == 0) {
          setStart(false);
          setStatusColor('#EF6461');
          setIsOpen(true);
        }
      }

      if (
        sessionCounter != session &&
        breakStatus &&
        minutes == 0 &&
        seconds == 0
      ) {
        setBreakStatus(!breakStatus);
        setMinutes(baseMin);
        setStatusColor('#EF6461');
        setBreakStatus(breakStatus);
        setSessionCounter(sessionCounter + 1);
      }

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          if (breakStatus) {
            setBreakStatus(false);
            setMinutes(baseMin);
            return;
          }
          let minutes = breakTime;
          let seconds = 59;

          setMinutes(minutes);
          setSeconds(seconds);
          setBreakStatus(true);
          setStatusColor('#aff69b');
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  };

  //Set timer's character
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  //Start timer
  useEffect(() => {
    if (start) {
      timer();
      setBtnText(<MdPauseCircleOutline />);
      setVisibility('hidden');

      return;
    }
    setBtnText(<BiPlayCircle />);
  }, [minutes, seconds, start]);

  //Main functions
  function startStop() {
    setStart(!start);
    setVisibility(!visibility);
    if (sessionCounter === 0) {
      setSessionCounter(sessionCounter + 1);
    }
  }

  function reStart() {
    setIsOpen(false);
    setStart(true);
    setSessionCounter(1);
  }

  function reset() {
    setStart(false);
    setBreakStatus(false);
    setMinutes(25);
    setSeconds(0);
    setSessionCounter(0);
  }
  //Setting function
  function decrementMin() {
    setBaseMin(minutes - 1);
    setMinutes(minutes - 1);
    setSeconds(baseSec);
  }

  function incrementMin() {
    setMinutes(minutes + 1);
    setBaseMin(minutes + 1);
    setSeconds(baseSec);
  }

  function incrementBreakMin() {
    setBreakTime(breakTime + 1);
  }
  function decrementBreakMin() {
    setBreakTime(breakTime - 1);
  }

  function incrementSession() {
    setSession(session - 1);
  }

  function decrementSession() {
    setSession(session + 1);
  }

  //Print
  return (
    <div className="counter">
      <div className="display-container">
        <div className="timer" style={{ color: statusColor }}>
          {timerMinutes}:{timerSeconds}
        </div>
        <div className="sessionCounter">{sessionCounter}</div>
        <div className="ctrlBtn">
          <div>
            <span onClick={startStop} className="playBtn btn">
              {btnText}
            </span>
          </div>
          <div>
            <span onClick={reset}>
              <AiOutlineUndo className="rstBtn btn" />
            </span>
          </div>
        </div>
      </div>
      <div className="setModul">
        <div className="session modul">
          <h2>sessions</h2>
          <div className="controller">
            <p
              className="btn"
              onClick={incrementSession}
              style={{ visibility: visibility }}
            >
              -
            </p>
            <p className="nbr">{session}</p>
            <p
              className="btn"
              onClick={decrementSession}
              style={{ visibility: visibility }}
            >
              +
            </p>
          </div>
        </div>
      </div>

      <div className="setModul">
        <div className="worktime modul">
          <h2>work time</h2>
          <div className="controller">
            <p
              className="btn"
              onClick={decrementMin}
              style={{ visibility: visibility }}
            >
              -
            </p>
            <p className="nbr">{baseMin}</p>
            <p
              className="btn"
              onClick={incrementMin}
              style={{ visibility: visibility }}
            >
              +
            </p>
          </div>
          <h4>min</h4>
        </div>
        <div className="breaktime modul">
          <h2>break time</h2>
          <div className="controller">
            <p
              className="btn"
              onClick={decrementBreakMin}
              style={{ visibility: visibility }}
            >
              -
            </p>
            <p className="nbr">{breakTime + 1}</p>
            <p
              className="btn"
              onClick={incrementBreakMin}
              style={{ visibility: visibility }}
            >
              +
            </p>
          </div>
          <h4>min</h4>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => (
          setIsOpen(false), setVisibility('visible'), setSessionCounter(0)
        )}
      >
        <p className="modalText">your sessions over</p>
        <p className="restartSession" onClick={reStart}>
          restart sessions
        </p>
      </Modal>
    </div>
  );
}

export default Counter;
