import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [blurry, setBlurry] = useState(true); // Say if Blurry must activate blurry effect
  const [startModal, setStartModal] = useState(true); // If true, display Start game Modal
  const [endModal, setEndModal] = useState(false); // If true, display End game Modal
  const [choiceModal, setChoiceModal] = useState(false); // Pseudo choice in Modal
  const [leaderboardModal, setLeaderboardModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [charactersFound, setCharactersFound] = useState([]); // Backend should respond to populate this array. Purpose is just for display. Backend handle real winning situation
  const [markers, setMarkers] = useState([]);
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
        choiceModal,
        setChoiceModal,
        leaderboardModal,
        setLeaderboardModal,
        errorModal,
        setErrorModal,
        markers,
        setMarkers,
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

export const useGameContext = () => useContext(GameContext);
