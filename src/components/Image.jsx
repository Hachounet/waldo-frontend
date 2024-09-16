const Image = ({ src, onClick }) => {
  return (
    <img
      src={src}
      alt="Game"
      onClick={onClick}
      className="cursor-pointer"
    />
  );
};

export default Image;
