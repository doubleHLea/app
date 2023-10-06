import './App.css';
import React from 'react';
import Title from './components/Title'
import Form from './components/Form'
import MainCard from './components/MainCard'
import Favorites from './components/Favorites'

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const App = () => {
  const foodOne = 'img\food-one.jpg';
  const foodTwo = 'img\food-two.jpg';
  // const foodThree = 'img/food-three.jpg';
  const [mainFood, setMainFood] = React.useState(foodOne);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });
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
      <Title>[components] 페이지 {counter}</Title>
      <Form updateCounter={updateCounter} />
      <MainCard src={mainFood} handleIconClick={handleIconClick} choiceFavorites={choiceFavorites} />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
