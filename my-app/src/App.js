import logo from './logo.svg';
import './App.css';
import React from 'react';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

function Title(props) {
  return <h1>{props.children}</h1>;
}

const Form = function ({ updateCounter }) {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const hangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text)

  function handleInputChange(data) {
    const userValue = data.target.value;

    if (hangul(userValue)) {
      setErrorMessage('한글은 입력할 수 없습니다.');
    } else {
      setErrorMessage("");
    }

    setValue(userValue.toUpperCase());
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    if (value === '') {
      setErrorMessage('값이 없으므로 추가할 수 없습니다.');
    } else {
      setErrorMessage('');
      updateCounter();
    }
  }
  return (
    <form action="" onSubmit={handleFormSubmit}>
      <input type="text" name="name" placeholder="상품명을 입력하세요" onChange={handleInputChange} value={value} />
      <button type="submit">추가</button>
      <p style={{ color: "#f00" }}>{errorMessage}</p>
    </form>
  );
};

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

const Favorites = ({ favorites }) => {
  return (
    <ul className="favorites">
      {favorites.map((item, index=Date.now()) => <FoodItem src={item} key={index} />)}
    </ul>
  );
};
const App = () => {
  const foodOne = 'img/food-one.jpg';
  const foodTwo = 'img/food-two.jpg';
  const foodThree = 'img/food-three.jpg';
  const [mainFood, setMainFood] = React.useState(foodOne);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });
  const food = favorites[0];
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const choiceFavorites = favorites.includes(mainFood);

  function updateCounter(event) {
    setMainFood(foodTwo);
    setCounter((pre) => {
      const nextCounter = pre + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });
  }

  function handleIconClick() {
    setFavorites((pre) => {
      const nextFavorites = [...pre, mainFood];
      jsonLocalStorage.setItem('favorites', nextFavorites);
      return nextFavorites;
    });
  }

  return (
    <div>
      <Title>페이지 {counter}</Title>
      <Form updateCounter={updateCounter} />
      <MainCard src={mainFood} handleIconClick={handleIconClick} choiceFavorites={choiceFavorites} />
      <Favorites favorites={favorites} />
    </div>
  );
};


export default App;
