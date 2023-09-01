import React from "react";

type UserProfileProps = {
  user: UserData;
};

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div>
      <h2>User Profile</h2>

      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Username: {user.username}</p>
      {user.age && <p>Age: {user.age}</p>}
      {user.gender && <p>Gender: {user.gender}</p>}
    </div>
  );
};

export default UserProfile;
