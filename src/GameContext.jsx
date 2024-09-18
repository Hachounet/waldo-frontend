import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [blurry, setBlurry] = useState(true); // Say if Blurry must activate blurry effect
  const [startModal, setStartModal] = useState(false); // If true, display Start game Modal
  const [endModal, setEndModal] = useState(false); // If true, display End game Modal
  const [choiceModal, setChoiceModal] = useState(true); // Sign up/Log in Modal
  const [loginModal, setLoginModal] = useState(false); // If true, display Login modal
  const [signUpModal, setSignUpModal] = useState(false);
  const [leaderboardModal, setLeaderboardModal] = useState(false);
  const [charactersFound, setCharactersFound] = useState([]); // Backend should respond to populate this array. Purpose is just for display. Backend handle real winning situation

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
        loginModal,
        setLoginModal,
        choiceModal,
        setChoiceModal,
        signUpModal,
        setSignUpModal,
        leaderboardModal,
        setLeaderboardModal,
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
