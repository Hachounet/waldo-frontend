import PropTypes from 'prop-types';

const Marker = ({ position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: position.y, // Ajustez en fonction de votre système de coordonnées
        left: position.x, // Ajustez en fonction de votre système de coordonnées
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        {/* Your SVG content here */}
        <circle
          cx="10"
          cy="10"
          r="10"
          fill="red"
        />
      </svg>
    </div>
  );
};

export default Marker;

Marker.propTypes = {
  position: PropTypes.object,
};
