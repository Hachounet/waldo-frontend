import PropTypes from 'prop-types';
import { useGameContext } from '../GameContext';

export default function Ring({ children, characterName }) {
  const { charactersFound } = useGameContext();

  return (
    <>
      {charactersFound.includes(characterName) ? (
        <div className="flex items-center justify-center w-[85px] h-[85px] rounded-full border-4 border-green-600 ring-neon-green">
          {children}
        </div>
      ) : (
        <div className="flex items-center justify-center w-[85px] h-[85px] rounded-full border-4 border-red-600 ring-neon-red">
          {children}
        </div>
      )}
    </>
  );
}

Ring.propTypes = {
  children: PropTypes.node.isRequired,
  characterName: PropTypes.string.isRequired,
};
