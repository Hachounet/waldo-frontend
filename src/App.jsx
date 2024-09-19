import './App.css';
import { useState } from 'react';
import Image from './components/Image';
import Blurry from './components/Blurry';

import CharactersHub from './components/CharactersHub';
import Popover from './components/Popover';
import { GameProvider } from './GameContext';

function App() {
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (event) => {
    const x = event.clientX + window.scrollX;
    const y = event.clientY + window.scrollY;

    setPopoverPosition({
      x: x + 100,
      y: y,
    });

    setClickPosition({
      x: x,
      y: y,
    });
  };

  return (
    <>
      <GameProvider>
        <Blurry>
          <CharactersHub />
          <Popover
            position={popoverPosition}
            clickPosition={clickPosition}
          >
            <Image
              src={'/waldopic.webp'} // switch by "/src/assets/waldopic.webp" if needed
              onClick={handleImageClick}
            />
          </Popover>
        </Blurry>
      </GameProvider>
    </>
  );
}

export default App;
