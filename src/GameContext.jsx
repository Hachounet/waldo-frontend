import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [blurry, setBlurry] = useState(true); // Say if Blurry must activate blurry effect
  const [startModal, setStartModal] = useState(true); // If true, display Start game Modal
  const [endModal, setEndModal] = useState(false);
  const [charactersFound, setCharactersFound] = useState([]); // Backend should respond to populate this array. Purpose is just for display. Backend handle real winning situation

  useEffect(() => {
    if (!startModal) {
      console.log(
        'I will wait here to have respond from backend that I have correctly created timer session'
      );
      //   setBlurry(false);
    }
  }, [startModal]);

  return (
    <GameContext.Provider
      value={{
        blurry,
        setBlurry,
        charactersFound,
        setCharactersFound,
        startModal,
        setStartModal,
        endModal,
        setEndModal,
      }}
    >
      {' '}
      {children}{' '}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired, // Child are react elements
};

export const useGameContext = () => {
  return useContext(GameContext);
};
