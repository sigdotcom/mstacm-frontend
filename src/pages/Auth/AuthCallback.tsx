import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";

const AuthCallback: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUserAuthentication = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("User is authenticated:", user);
      return true;
    } catch (error) {
      console.log("User is not authenticated:", error);
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        checkUserAuthentication();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return <div>{isAuthenticated ? <p>Authed..</p> : <p>Authticating..</p>}</div>;
};

export default AuthCallback;
