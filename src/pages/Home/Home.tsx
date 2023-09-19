import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkUserAuthentication } from "../../common";

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthenticated(await checkUserAuthentication());
    };
    checkAuth();
  }, []);

  return (
    <div>
      <h1>ACM Web</h1>

      <ul>
        {isAuthenticated ? (
          <li>
            <Link to="/dashboard">Go to Dashboard</Link>
          </li>
        ) : (
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
        )}

        {isAuthenticated ? (
          <li>
            <Link to="/auth/logout">Logout</Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default Home;
