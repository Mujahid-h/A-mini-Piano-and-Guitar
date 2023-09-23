import React, { useState } from "react";
import "./App.css"; // Import your CSS file here
import OneSound from "./Sounds/1.mp3";
import TwoSound from "./Sounds/2.mp3";
import ThreeSound from "./Sounds/3.mp3";
import FourSound from "./Sounds/4.mp3";
import FiveSound from "./Sounds/5.mp3";
import SixSound from "./Sounds/6.mp3";
import SevenSound from "./Sounds/7.mp3";
import EightSound from "./Sounds/8.mp3";
import NineSound from "./Sounds/9.mp3";
import Piano_A from "./Sounds/PianoA.wav"; // Updated format to wav
import Piano_B from "./Sounds/PianoB.wav"; // Updated format to wav
import Piano_C from "./Sounds/PianoC.wav"; // Updated format to wav
import Piano_D from "./Sounds/PianoD.wav"; // Updated format to wav
import Piano_E from "./Sounds/PianoE.wav"; // Updated format to wav
import Piano_F from "./Sounds/PianoF.wav"; // Updated format to wav
import Piano_G from "./Sounds/PianoG.wav"; // Updated format to wav
import Piano_H from "./Sounds/PianoH.wav"; // Updated format to wav
import Piano_I from "./Sounds/PianoI.wav"; // Updated format to wav

const drumSoundsBank1 = {
  Guitar_1: OneSound,
  Guitar_2: TwoSound,
  Guitar_3: ThreeSound,
  Guitar_4: FourSound,
  Guitar_5: FiveSound,
  Guitar_6: SixSound,
  Guitar_7: SevenSound,
  Guitar_8: EightSound,
  Guitar_9: NineSound,
};

const drumSoundsBank2 = {
  Piano_A,
  Piano_B,
  Piano_C,
  Piano_D,
  Piano_E,
  Piano_F,
  Piano_G,
  Piano_H,
  Piano_I,
};

function App() {
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(50); // Initial volume value
  const [power, setPower] = useState(true); // Initial power state (on)
  const [bank, setBank] = useState(true); // Initial bank state (Bank 1)

  const play = (key) => {
    if (power) {
      const audio = new Audio(
        bank ? drumSoundsBank2[key] : drumSoundsBank1[key]
      );
      audio.volume = volume / 100;
      audio.play();
      setDisplay(key);
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    if (drumSoundsBank1[key] || drumSoundsBank2[key]) {
      play(key);
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const togglePower = () => {
    setPower(!power);
  };

  const toggleBank = () => {
    setBank(!bank);
  };

  return (
    <>
      <div id="drum-machine" tabIndex="0" onKeyDown={handleKeyPress}>
        <div className="container-fluid">
          <h1 className="text-center mt-5 mb-4 text-light">
            {bank ? "A MINI PIANO" : "A MINI GUITAR"}
          </h1>
          <div className="card mb-3 bg-dark text-light">
            <div className="card-body">
              <div className="text-center" id="display">
                {display || "Click a button to play!"}
              </div>
            </div>
          </div>

          <div className="controls mt-3 mb-3">
            <div className="control">
              <label>Power</label>
              <label className="switch">
                <input type="checkbox" checked={power} onChange={togglePower} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="control">
              <label>Bank</label>
              <label className="switch">
                <input type="checkbox" checked={bank} onChange={toggleBank} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="control">
              <label>Volume</label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>

          <div className="row justify-content-center">
            {Object.keys(bank ? drumSoundsBank2 : drumSoundsBank1).map(
              (key, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                  <button
                    className={`drum-pad btn btn-block ${
                      index % 2 === 0 ? "btn-secondary" : "btn-primary"
                    }`}
                    onClick={() => play(key)}
                  >
                    {key}
                    <audio
                      src={bank ? drumSoundsBank2[key] : drumSoundsBank1[key]}
                      className="clip"
                      id={key}
                    ></audio>
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
