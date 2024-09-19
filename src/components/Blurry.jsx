import PropTypes from 'prop-types';
import { useGameContext } from '../GameContext';
import Modal from './Modal';

export default function Blurry({ children }) {
  const { startModal, endModal, errorModal, choiceModal, leaderboardModal } =
    useGameContext();

  let textChoice = []; // Array for JSX elements

  const textChoiceStart = (
    <>
      The rules are simple: Once you will have clicked on the Play button, a
      timer will be set on. You will need to be as quick as possible to find the
      4 characters displayed on the top-right of the picture. Once you are done,
      you can see your time. You can save your time by giving a pseudo. Enjoy !
    </>
  );

  const textChoiceEnd = (
    <>
      Congratulations! You have finished! Click to let your username and see the
      leaderboard !
    </>
  );

  const textChoicePseudo = (
    <>
      <form
        className="flex flex-col"
        id="formpseudo"
      >
        <label htmlFor="pseudo">Pseudo</label>
        <input
          type="text"
          name="pseudo"
          id="pseudoinput"
          className=" text-black"
        />
      </form>
    </>
  );

  const textChoiceLeaderboard = <>Here are the 10 best players.</>;

  const textChoiceError = <>An error occurred. Please try again later.</>;

  const activeModalsCount = [
    startModal,
    endModal,
    choiceModal,
    leaderboardModal,
    errorModal,
  ].filter(Boolean).length;

  if (activeModalsCount >= 2) {
    textChoice = textChoiceError;
  } else if (
    startModal &&
    !endModal &&
    !choiceModal &&
    !leaderboardModal &&
    !errorModal
  ) {
    textChoice = textChoiceStart;
  } else if (
    !startModal &&
    endModal &&
    !choiceModal &&
    !leaderboardModal &&
    !errorModal
  ) {
    textChoice = textChoiceEnd;
  } else if (
    !startModal &&
    !endModal &&
    choiceModal &&
    !leaderboardModal &&
    !errorModal
  ) {
    textChoice = textChoicePseudo;
  } else if (
    !startModal &&
    !endModal &&
    !choiceModal &&
    leaderboardModal &&
    !errorModal
  ) {
    textChoice = textChoiceLeaderboard;
  } else if (
    !startModal &&
    !endModal &&
    !choiceModal &&
    !leaderboardModal &&
    errorModal
  ) {
    textChoice = textChoiceError;
  }

  return (
    <>
      {startModal || endModal || choiceModal || leaderboardModal ? (
        <>
          <div className="flex absolute min-w-[100vw] min-h-[100vh] bg-transparent items-center">
            {' '}
            <Modal textChoice={textChoice} />
          </div>

          <div className=" blur-lg">{children}</div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}

Blurry.propTypes = {
  children: PropTypes.node.isRequired,
};
