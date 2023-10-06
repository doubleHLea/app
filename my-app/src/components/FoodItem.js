const FoodItem = ({ src }) => {
  return (
    <li>
      <img
        src={src}
        alt="음식"
        style={{
          width: "150px",
          height: "100px",
          backgroundSize: "contain"
        }}
      />
    </li>
  );
};

export default FoodItem;