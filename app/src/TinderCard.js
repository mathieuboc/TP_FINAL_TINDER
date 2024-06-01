import React from 'react';
import TinderCard from 'react-tinder-card';

const UserCard = ({ user }) => (
  <TinderCard className="swipe" key={user.name} preventSwipe={['up', 'down']}>
    <div style={{ backgroundImage: 'url(' + user.img + ')' }} className="card">
      <h3>{user.name}</h3>
      <p>{user.age} ans - {user.city}</p>
      <p>{user.description}</p>
    </div>
  </TinderCard>
);

export default UserCard;