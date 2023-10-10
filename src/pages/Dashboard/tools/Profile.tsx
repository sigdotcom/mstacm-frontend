import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../../api/users";

const Profile = () => {
  const { data, isLoading } = useCurrentUser();
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (!isLoading) {
      setRole(data?.accessToken?.payload?.scope.split(".").pop() || "");
      setUsername(data?.accessToken?.payload?.username || "");
    }
  }, [data, isLoading]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1>Profile</h1>
      <p>Logged in as: {username}</p>
      <p>Access Level: {role}</p>
    </div>
  );
};

export default Profile;
