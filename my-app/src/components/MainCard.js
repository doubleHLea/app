import React from 'react';

const MainCard = ({ src, handleIconClick, choiceFavorites }) => {
  const [click, setClick] = React.useState('');
  const santaIcon = choiceFavorites ? '💜' : '🎅';

  function handleClick() {
    setClick(Number(click + 1));
    handleIconClick();
  }

  return (
    <div className="main-card">
      <img
        src={src}
        alt="올리브 오일"
        width="400"
        style={{ border: "1px solid green" }}
      />
      <button onClick={handleClick}>{santaIcon}{null || click}</button>
    </div>
  );
}

export default MainCard;