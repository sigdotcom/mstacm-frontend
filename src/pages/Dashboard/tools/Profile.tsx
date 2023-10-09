import React from "react";
import { useListUsers } from "../../../api/users";

const Profile = () => {
  const { data, error, isLoading } = useListUsers();

  console.log(data);
  console.error(error);
  return (
    <div>
      <p>Profile</p>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Profile;
