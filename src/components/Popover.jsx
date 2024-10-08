import { useState, useRef, useEffect } from 'react';
import Avatar from './Avatar';
import { useGameContext } from '../GameContext';
import PropTypes from 'prop-types';
import { postRequest } from '../hooks/fetchHelper';
import {
  character1,
  character2,
  character3,
  character4,
  playURL,
  startURL,
} from '../DevHub';

const Popover = ({ children, position, clickPosition }) => {
  const [isVisible, setIsVisible] = useState(false); // Manages the visibility state of the popover
  const popoverRef = useRef(null); // Reference to the popover element
  const triggerRef = useRef(null); // Reference to the button element that triggers the popover
  const { setCharactersFound, setEndModal, setMarkers } = useGameContext();
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsVisible(false); // Close the popover if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAvatarClick = async (characterName) => {
    let sessionId =
      localStorage.getItem('sessionId') ||
      (await postRequest(startURL)).sessionId;
    localStorage.setItem('sessionId', sessionId);
    sendPlayRequest(characterName, sessionId);
  };

  const sendPlayRequest = (characterName, sessionId) => {
    const formValues = {
      characterName: characterName,
      posX: clickPosition.x,
      posY: clickPosition.y,
      sessionId: sessionId,
    };

    postRequest(playURL, formValues).then((data) => {
      if (data.endOfGame) {
        setCharactersFound((prev) => [...prev, data.characterName.name]);
        setMarkers((prevState) => [
          ...prevState,
          { x: clickPosition.x, y: clickPosition.y },
        ]);
        setEndModal(true);
      }

      if (data.characterFound) {
        setCharactersFound((prev) => [...prev, data.characterName.name]);
        setMarkers((prevState) => [
          ...prevState,
          { x: clickPosition.x, y: clickPosition.y },
        ]);
        setIsVisible(false);
      }
    });
  };

  return (
    <div className="popover-container">
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className="popover-trigger"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {children}
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className="popover-content z-10 bg-transparent backdrop-blur-sm backdrop-saturate-50"
          role="dialog"
          aria-modal="true"
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
          }}
        >
          <div className="">
            <span className="text-yellow-50">Character</span>
            <ul className="flex flex-col">
              <li>
                <button onClick={() => handleAvatarClick(character1)}>
                  <Avatar src="/batman.png" />
                </button>
              </li>
              <li>
                <button onClick={() => handleAvatarClick(character2)}>
                  <Avatar src="/gladys.png" />
                </button>
              </li>
              <li>
                <button onClick={() => handleAvatarClick(character3)}>
                  <Avatar src="/grievious.png" />
                </button>
              </li>
              <li>
                <button onClick={() => handleAvatarClick(character4)}>
                  <Avatar src="/mrbook.png" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.object.isRequired,
  clickPosition: PropTypes.object.isRequired,
};
