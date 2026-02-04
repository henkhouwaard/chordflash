import { useState, useEffect, useCallback } from 'react';

interface UseTimerProps {
  duration: number; // in seconds
  onTimerEnd: () => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  progress: number; // percentage of time elapsed (0-100)
}

export const useTimer = ({ 
  duration, 
  onTimerEnd, 
  autoStart = false 
}: UseTimerProps): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(duration);
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    let intervalId: number;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 0.1; // Update every 100ms for smooth progress
          if (newTime <= 0) {
            setIsRunning(false);
            onTimerEnd();
            return 0;
          }
          return newTime;
        });
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeLeft, onTimerEnd]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return {
    timeLeft: Math.max(0, timeLeft),
    isRunning,
    start,
    stop,
    reset,
    progress,
  };
};