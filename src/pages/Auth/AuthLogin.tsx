import { Auth } from "aws-amplify";
import React from "react";

const AuthLogin: React.FC = () => {
  Auth.federatedSignIn();

  return (
    <div>
      <p>Logging in...</p>
    </div>
  );
};

export default AuthLogin;
