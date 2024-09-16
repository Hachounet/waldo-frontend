import PropTypes from 'prop-types';
import { useGameContext } from '../GameContext';
import Modal from './Modal';

export default function Blurry({ children }) {
  const { blurry, startModal, endModal } = useGameContext();

  const textChoice = startModal ? 'start' : null;

  return (
    <>
      {startModal || endModal ? (
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
