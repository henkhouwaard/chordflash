import React from 'react';
import type { ChordType, AppSettings } from '../types/chord';
import { NOTES } from '../utils/chordUtils';

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
}) => {
  const chordTypes: { value: ChordType; label: string }[] = [
    { value: 'major7', label: 'Major 7th' },
    { value: 'minor7', label: 'Minor 7th' },
    { value: 'dominant7', label: 'Dominant 7th' },
    { value: 'halfDiminished', label: 'Half Diminished 7th' },
  ];

  const handleTimerChange = (value: number) => {
    onSettingsChange({ ...settings, timerDuration: value });
  };

  const handleKeyToggle = (key: string) => {
    const newKeys = settings.selectedKeys.includes(key)
      ? settings.selectedKeys.filter(k => k !== key)
      : [...settings.selectedKeys, key];
    
    onSettingsChange({ ...settings, selectedKeys: newKeys });
  };

  const handleChordTypeToggle = (type: ChordType) => {
    const newTypes = settings.selectedChordTypes.includes(type)
      ? settings.selectedChordTypes.filter(t => t !== type)
      : [...settings.selectedChordTypes, type];
    
    onSettingsChange({ ...settings, selectedChordTypes: newTypes });
  };

  const selectAllKeys = () => {
    onSettingsChange({ ...settings, selectedKeys: [...NOTES] });
  };

  const clearAllKeys = () => {
    onSettingsChange({ ...settings, selectedKeys: [] });
  };

  const selectAllChordTypes = () => {
    onSettingsChange({ 
      ...settings, 
      selectedChordTypes: chordTypes.map(ct => ct.value) 
    });
  };

  const clearAllChordTypes = () => {
    onSettingsChange({ ...settings, selectedChordTypes: [] });
  };

  return (
    <>
      <button 
        className="fixed top-5 right-5 bg-gray-800 text-white border-none rounded-full px-5 py-3 cursor-pointer text-base z-50 transition-colors duration-200 hover:bg-gray-600"
        onClick={onToggle}
      >
        ⚙️ Settings
      </button>
      
      <div className={`fixed top-0 ${isOpen ? 'right-0' : '-right-96'} w-96 h-screen bg-white shadow-xl transition-all duration-300 z-40 overflow-y-auto`}>
        <div className="pt-20 px-5 pb-5">
          <h3 className="mt-0 mb-8 text-gray-800 text-center text-xl font-semibold">Practice Settings</h3>
          
          {/* Timer Settings */}
          <div className="mb-8 pb-5 border-b border-gray-200">
            <label htmlFor="timer-duration" className="block mb-3 font-semibold text-gray-800">Timer Duration (seconds):</label>
            <div className="flex items-center gap-3">
              <input
                id="timer-duration"
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={settings.timerDuration}
                onChange={(e) => handleTimerChange(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="font-bold min-w-10 text-center">{settings.timerDuration}s</span>
            </div>
          </div>

          {/* Key Selection */}
          <div className="mb-8 pb-5 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <label className="font-semibold text-gray-800">Select Keys:</label>
              <div className="flex gap-1">
                <button 
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs cursor-pointer transition-colors duration-200 hover:bg-gray-200"
                  onClick={selectAllKeys}
                >
                  All
                </button>
                <button 
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs cursor-pointer transition-colors duration-200 hover:bg-gray-200"
                  onClick={clearAllKeys}
                >
                  None
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {NOTES.map(note => (
                <button
                  key={note}
                  className={`${settings.selectedKeys.includes(note) 
                    ? 'bg-green-500 text-white border-green-600' 
                    : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                  } border-2 rounded-lg p-3 cursor-pointer font-bold transition-all duration-200 text-center`}
                  onClick={() => handleKeyToggle(note)}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>

          {/* Chord Type Selection */}
          <div className="mb-8 pb-5 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <label className="font-semibold text-gray-800">Select Chord Types:</label>
              <div className="flex gap-1">
                <button 
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs cursor-pointer transition-colors duration-200 hover:bg-gray-200"
                  onClick={selectAllChordTypes}
                >
                  All
                </button>
                <button 
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs cursor-pointer transition-colors duration-200 hover:bg-gray-200"
                  onClick={clearAllChordTypes}
                >
                  None
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {chordTypes.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-3 p-2 rounded cursor-pointer transition-colors duration-200 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={settings.selectedChordTypes.includes(value)}
                    onChange={() => handleChordTypeToggle(value)}
                    className="m-0 transform scale-110"
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mt-5">
            <p className="my-1 text-sm text-gray-600">
              <strong className="text-gray-800">Selected:</strong> {settings.selectedKeys.length} keys, {settings.selectedChordTypes.length} chord types
            </p>
            <p className="my-1 text-sm text-gray-600">
              <strong className="text-gray-800">Total combinations:</strong> {settings.selectedKeys.length * settings.selectedChordTypes.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;