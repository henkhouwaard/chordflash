import React, { useState } from 'react';
import type { Chord } from '../types/chord';
import { getChordSymbol, getChordName } from '../utils/chordUtils';

interface FlashcardProps {
  chord: Chord;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ chord, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onFlip();
  };

  const resetFlip = () => {
    setIsFlipped(false);
  };

  // Reset flip state when chord changes
  React.useEffect(() => {
    resetFlip();
  }, [chord]);

  return (
    <div 
      className={`w-80 h-52 mx-auto my-5 perspective-1000 cursor-pointer select-none transition-transform duration-300 hover:-translate-y-2 active:translate-y-0`}
      onClick={handleClick}
    >
      <div className={`relative w-full h-full text-center transition-transform duration-600 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden border-2 border-gray-800 rounded-2xl shadow-lg flex flex-col justify-center items-center p-5 box-border bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="text-5xl font-bold mb-3 drop-shadow-md">
            {getChordSymbol(chord.root, chord.type)}
          </div>
          <div className="text-xl mb-5 opacity-90">
            {getChordName(chord.root, chord.type)}
          </div>
          <div className="text-sm opacity-70 italic mt-auto">
            Click to see chord spelling
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden border-2 border-gray-800 rounded-2xl shadow-lg flex flex-col justify-center items-center p-5 box-border bg-gradient-to-br from-pink-400 to-red-500 text-white rotate-y-180">
          <div className="text-5xl font-bold mb-3 drop-shadow-md">
            {getChordSymbol(chord.root, chord.type)}
          </div>
          <div className="text-center mb-5">
            <div className="text-base mb-3 opacity-90">Chord spelling:</div>
            <div className="text-2xl font-bold tracking-wider drop-shadow-sm">
              {chord.notes.join(' - ')}
            </div>
          </div>
          <div className="text-sm opacity-70 italic mt-auto">
            Click to go back
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;