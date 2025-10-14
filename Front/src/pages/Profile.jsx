import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2>Profile page</h2>
      {user && <p>Hello, {user.username}!</p>}
    </div>
  );
};
export default ProfilePage;