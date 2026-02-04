import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  progress,
  isRunning,
  onStart,
  onStop,
  onReset,
}) => {
  const formatTime = (seconds: number): string => {
    return seconds.toFixed(1);
  };

  return (
    <div className="flex flex-col items-center my-5">
      <div className="relative w-32 h-32 mb-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="8"
            className="opacity-30"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeLinecap="round"
            className="transition-all duration-100 ease-linear"
            style={{
              strokeDasharray: `${2 * Math.PI * 45}`,
              strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`,
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
            }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-xl font-bold text-gray-800">{formatTime(timeLeft)}s</span>
        </div>
      </div>
      <div className="flex gap-3">
        {isRunning ? (
          <button 
            className="px-4 py-2 border-none rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 bg-orange-500 text-white hover:bg-orange-600 active:translate-y-0.5"
            onClick={onStop}
          >
            Pause
          </button>
        ) : (
          <button 
            className="px-4 py-2 border-none rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 bg-green-500 text-white hover:bg-green-600 active:translate-y-0.5"
            onClick={onStart}
          >
            Start
          </button>
        )}
        <button 
          className="px-4 py-2 border-none rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 bg-gray-600 text-white hover:bg-gray-700 active:translate-y-0.5"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerDisplay;