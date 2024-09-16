import PropTypes from 'prop-types';

export default function Avatar({ src }) {
  return (
    <img
      src={src}
      className=" min-w-[75px] min-h-[75px] max-w-[75px] max-h-[75px] rounded-full  object-fill"
    ></img>
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
};
