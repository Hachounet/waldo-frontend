import './App.css';
import { useEffect, useState } from 'react';
import Image from './components/Image';
import Blurry from './components/Blurry';
import CharactersHub from './components/CharactersHub';
import Popover from './components/Popover';
import { GameProvider } from './GameContext';

function App() {
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (event) => {
    const x = event.clientX + window.scrollX;
    const y = event.clientY + window.scrollY;

    setPopoverPosition({
      x: x + 100,
      y: y,
    });
  };

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      console.log(event.composedPath());
      console.log(event.clientX + window.scrollX);
      console.log(event.clientY + window.scrollY);
    });
  }, []);

  return (
    <>
      <GameProvider>
        <Blurry>
          <CharactersHub />
          <Popover position={popoverPosition}>
            <Image
              src={'src/assets/waldopic.webp'}
              onClick={handleImageClick}
            />
          </Popover>
        </Blurry>
      </GameProvider>
    </>
  );
}

export default App;
