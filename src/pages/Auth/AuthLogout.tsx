import { Auth } from "aws-amplify";
import React from "react";

const AuthLogout: React.FC = () => {
  const checkUserAuthentication = async () => {
    try {
      await Auth.signOut();
      console.log("Successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  checkUserAuthentication();
  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default AuthLogout;
