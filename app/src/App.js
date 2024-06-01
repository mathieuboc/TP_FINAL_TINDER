import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/profiles')
      .then(response => {
        setUsers(response.data);
        setCurrentIndex(0);  
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    console.log('You swiped: ' + direction);
    const nextIndex = currentIndex + 1;
    if (nextIndex < users.length) {
      setCurrentIndex(nextIndex);  
    } else {
      console.log('No more cards');
      setCurrentIndex(-1);  
    }
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  const swipe = (dir) => {
    if (currentIndex < users.length) {
      const user = users[currentIndex];
      swiped(dir, user.name);
    }
  };

  return (
    <div className="app">
      <div className="cardContainer">
        {currentIndex >= 0 && currentIndex < users.length ? (
          <TinderCard
            key={users[currentIndex].name}
            onSwipe={(dir) => swiped(dir, users[currentIndex].name)}
            onCardLeftScreen={() => outOfFrame(users[currentIndex].name)}
            preventSwipe={['up', 'down']}
          >
            <div className="card">
              <div className="profilePic" style={{ backgroundImage: `url(${users[currentIndex].img})` }}></div>
              <div className="profileInfo">
                <h3>{users[currentIndex].name}</h3>
                <p>{users[currentIndex].age} ans - {users[currentIndex].city}</p>
                <p>{users[currentIndex].description}</p>
              </div>
            </div>
          </TinderCard>
        ) : (
          <div>Vous avez vu tous les profils, revenez plus tard !</div>
        )}
      </div>
      <div className="buttons">
        <button onClick={() => swipe('left')}><FontAwesomeIcon icon={faTimes} color="red" /></button>
        <button onClick={() => swipe('right')}><FontAwesomeIcon icon={faHeart} color="green" /></button>
      </div>
    </div>
  );  
}

export default App;