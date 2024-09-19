import { useEffect, useState } from 'react';
import { useGameContext } from '../GameContext';
import { postRequest } from '../hooks/fetchHelper';
import PropTypes from 'prop-types';
import { leaderboardURL, pseudoURL, startURL } from '../DevHub';

export default function Modal({ textChoice }) {
  const {
    startModal,
    setStartModal,
    endModal,
    setEndModal,
    choiceModal,
    setChoiceModal,
    leaderboardModal,
    setLeaderboardModal,
    setErrorModal,
    setCharactersFound,
    setMarkers,
  } = useGameContext();

  const [leaderboardRank, setLeaderboardRank] = useState([]);
  const [userTime, setUserTime] = useState(0);

  useEffect(() => {
    if (leaderboardModal) {
      const formValues = {
        sessionId: localStorage.getItem('sessionId'),
      };

      postRequest(leaderboardURL, formValues).then((data) => {
        setLeaderboardRank(data.rankedUsers);
        setUserTime(data.playerElapsedTime || 0); // Default to 0 if no time is returned
      });
    }
  }, [leaderboardModal]);

  const handleModalToggle = async () => {
    if (startModal) {
      const sessionId = localStorage.getItem('sessionId');

      if (sessionId) {
        localStorage.removeItem('sessionId');
      }

      const data = await postRequest(startURL);
      localStorage.setItem('sessionId', data.sessionId);
      setStartModal(false);
    } else if (endModal) {
      setEndModal(false);
      setChoiceModal(true);
    } else if (leaderboardModal) {
      setLeaderboardRank([]);
      setLeaderboardModal(false);
      setStartModal(true);
      setCharactersFound([]);
      setMarkers([]);
      setUserTime(0);
    } else if (choiceModal) {
      const sessionId = localStorage.getItem('sessionId');

      if (!sessionId) {
        window.location.href = '/';
      } else {
        const pseudo = document.getElementById('pseudoinput').value;

        const formValues = {
          pseudo: pseudo,
          sessionId: sessionId,
        };

        const result = await postRequest(pseudoURL, formValues);

        if (result.error) {
          setChoiceModal(false);
          setErrorModal(true);
        } else {
          setChoiceModal(false);
          setLeaderboardModal(true);
        }
      }
    }
  };

  return (
    <dialog
      id="my_modal_1"
      className="modal z-10"
      open
    >
      <div className="modal-box max-w-[400px] text-center bg-slate-600 p-2 text-slate-200">
        <h3 className="font-bold text-lg">A Wheres Waldo Game</h3>
        <div className="py-4">{textChoice}</div>
        <div className="py-4">
          {leaderboardRank.length > 0 ? (
            <ul>
              {leaderboardRank.map((user) => (
                <li key={user.rank}>
                  <span>{user.rank}</span>.
                  <span className="font-bold"> {user.pseudo}</span>:{' '}
                  {(user.elapsedTime / 1000).toFixed(2)} s
                </li>
              ))}
            </ul>
          ) : null}
          <span className=" text-orange-300">
            {userTime > 0
              ? `Your time is ${(userTime / 1000).toFixed(2)} s`
              : ''}
          </span>
        </div>
        <div className="modal-action">
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 btn"
            onClick={handleModalToggle}
          >
            {leaderboardModal ? 'Retry' : 'Next'}
          </button>
        </div>
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  textChoice: PropTypes.node.isRequired, // Child nodes are required
};
