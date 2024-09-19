import PropTypes from 'prop-types';
import Marker from './Marker';
import { useGameContext } from '../GameContext';

const Image = ({ src, onClick }) => {
  const { markers } = useGameContext();

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={src}
        alt="Waldo"
        onClick={onClick}
        style={{ width: '100%' }}
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ x: marker.x, y: marker.y }}
        />
      ))}
    </div>
  );
};

export default Image;

Image.propTypes = {
  src: PropTypes.string,
  onClick: PropTypes.func,
};
