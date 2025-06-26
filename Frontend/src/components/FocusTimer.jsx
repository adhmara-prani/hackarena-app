// src/components/FocusTimer.jsx
import React, { useEffect, useRef, useState } from "react";
import { Timer, Play, Square, RotateCcw, Flame } from "lucide-react";
import FaceDetectionMini from "../pages/FaceDetectionMini.jsx";

const FocusTimer = ({ isDarkMode, cardClasses, setStreak, streak }) => {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [attentionSpan, setAttentionSpan] = useState(null);
  const faceRef = useRef();

  useEffect(() => {
    let timer;
    if (isTimerRunning && timerMinutes < 120) {
      timer = setInterval(() => {
        setTimerMinutes((prev) => {
          if (prev + 1 >= 120) {
            setIsTimerRunning(false);
            setGoalAchieved(true);
            setStreak((prevStreak) => prevStreak + 1);
            faceRef.current?.stopDetection();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  useEffect(() => {
    if (!goalAchieved && timerMinutes >= 120) {
      setGoalAchieved(true);
      setStreak((prev) => prev + 1);
    }
  }, [timerMinutes, goalAchieved, setStreak]);

  const handleStart = () => {
    setIsTimerRunning(true);
    faceRef.current?.startDetection();
  };

  const handlePause = () => {
    setIsTimerRunning(false);
    faceRef.current?.stopDetection();
  };

  const handleReset = () => {
    setTimerMinutes(0);
    setIsTimerRunning(false);
    setGoalAchieved(false);
    faceRef.current?.stopDetection();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <>
      <div
        className={`${cardClasses} backdrop-blur-sm rounded-2xl p-6 border shadow-xl`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
            <Timer className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Focus Timer</h2>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-purple-500 mb-2">
            {formatTime(timerMinutes)}
          </div>
          <div className="text-sm opacity-75 mb-4">Deep focus time today</div>

          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Daily Goal</div>
            <div className="text-lg font-bold">
              {Math.floor(timerMinutes / 60)} / 2min
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{
                  width: `${Math.min((timerMinutes / 120) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <div className="text-xs opacity-75 mt-1">
              {Math.floor((timerMinutes / 120) * 100)}% complete
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {!isTimerRunning ? (
            <button
              onClick={handleStart}
              className="bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="bg-orange-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Square className="w-4 h-4" />
              <span>Pause</span>
            </button>
          )}
          <button
            onClick={handleReset}
            className="bg-yellow-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="font-medium">Streak:</span>
          <span className="font-bold">{streak} days</span>
        </div>
      </div>

      {attentionSpan !== null && (
        <div className="text-center text-sm text-emerald-600 font-medium">
          Attention Span: {attentionSpan}%
        </div>
      )}

      <FaceDetectionMini
        ref={faceRef}
        setAttentionSpan={setAttentionSpan}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default FocusTimer;
