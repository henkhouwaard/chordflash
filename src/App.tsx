import { useState, useCallback, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import TimerDisplay from './components/TimerDisplay';
import SettingsPanel from './components/SettingsPanel';
import type { Chord, AppSettings } from './types/chord';
import { getChordNotes } from './utils/chordUtils';
import { useTimer } from './hooks/useTimer';

const DEFAULT_SETTINGS: AppSettings = {
  timerDuration: 5,
  selectedKeys: ['C', 'F', 'G', 'A', 'D'],
  selectedChordTypes: ['major7', 'minor7', 'dominant7', 'halfDiminished'],
};

function App() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [currentChord, setCurrentChord] = useState<Chord | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Generate a random chord based on current settings
  const generateRandomChord = useCallback((): Chord | null => {
    if (settings.selectedKeys.length === 0 || settings.selectedChordTypes.length === 0) {
      return null;
    }

    const randomKey = settings.selectedKeys[Math.floor(Math.random() * settings.selectedKeys.length)];
    const randomType = settings.selectedChordTypes[Math.floor(Math.random() * settings.selectedChordTypes.length)];

    return {
      root: randomKey,
      type: randomType,
      name: `${randomKey}${randomType}`,
      notes: getChordNotes(randomKey, randomType),
    };
  }, [settings.selectedKeys, settings.selectedChordTypes]);

  // Timer hook
  const timer = useTimer({
    duration: settings.timerDuration,
    onTimerEnd: () => {
      const newChord = generateRandomChord();
      setCurrentChord(newChord);
      if (newChord) {
        timer.reset();
        setTimeout(() => timer.start(), 100); // Small delay to ensure reset completes
      }
    },
  });

  // Initialize with first chord
  useEffect(() => {
    const initialChord = generateRandomChord();
    setCurrentChord(initialChord);
  }, [generateRandomChord]);

  // Update timer when settings change
  useEffect(() => {
    timer.reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.timerDuration]);

  // Generate new chord manually
  const handleNewChord = () => {
    const newChord = generateRandomChord();
    setCurrentChord(newChord);
    timer.reset();
  };

  const handleFlashcardFlip = () => {
    // Optional: Add any logic when flashcard is flipped
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  // Show message if no chords can be generated
  if (!currentChord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-center text-gray-800">
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
          isOpen={isSettingsOpen}
          onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
        />
        <div className="flex flex-col items-center justify-center h-screen text-white text-center p-5">
          <h2 className="text-4xl font-bold mb-5 drop-shadow-lg">No chords to practice!</h2>
          <p className="text-xl opacity-90 max-w-md">Please select some keys and chord types in the settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-center text-gray-800">
      <SettingsPanel
        settings={settings}
        onSettingsChange={handleSettingsChange}
        isOpen={isSettingsOpen}
        onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
      />
      
      <header className="pt-10 pb-5 px-5 text-white">
        <h1 className="text-5xl font-bold m-0 drop-shadow-lg font-bold">🎵 ChordFlash</h1>
        <p className="text-xl mt-3 mb-0 opacity-90">Practice your chord recognition</p>
      </header>

      <main className="p-5 max-w-4xl mx-auto">
        <TimerDisplay
          timeLeft={timer.timeLeft}
          progress={timer.progress}
          isRunning={timer.isRunning}
          onStart={timer.start}
          onStop={timer.stop}
          onReset={() => {
            timer.reset();
            handleNewChord();
          }}
        />

        <Flashcard
          chord={currentChord}
          onFlip={handleFlashcardFlip}
        />

        <div className="mt-8">
          <button 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-none rounded-full px-8 py-3 text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
            onClick={handleNewChord}
          >
            🔄 New Chord
          </button>
        </div>

        <div className="mt-10 p-5 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-1 text-white">
            <span className="text-sm opacity-80 font-medium">Practicing:</span>
            <span className="text-base font-semibold">
              {settings.selectedKeys.length} keys × {settings.selectedChordTypes.length} types = {settings.selectedKeys.length * settings.selectedChordTypes.length} combinations
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
