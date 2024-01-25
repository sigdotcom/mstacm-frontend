import React, { useEffect, useState } from "react";
import {
  useCurrentUser,
  useGetUser,
  useRequestAccount,
} from "../../../api/users";
import { Alert, Box, Button, IconButton } from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";

const Profile = () => {
  const { data: currentUserData } = useCurrentUser();
  const requestAccount = useRequestAccount();
  const userId = currentUserData?.accessToken?.payload?.username || "";

  const { data: getUserData, isLoading: getUserLoading } = useGetUser(userId, {
    refetchrefetchInterval: 2000,
  });

  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [awsAccountStatus, setAwsAccountStatus] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!getUserLoading && getUserData && userId !== "") {
      setRole(getUserData?.role || "");
      setEmail(getUserData?.email || "");
      setAwsAccountStatus(getUserData?.awsAccountStatus || "");
    }
  }, [getUserData, getUserLoading, userId]);

  const handleApproveAccount = async (e: any) => {
    e.preventDefault();

    try {
      await requestAccount.mutateAsync({
        userId: userId,
      });

      // Trigger the Alert on success
      setAlertOpen(true);

      // hide after 3 seconds
      setTimeout(() => setAlertOpen(false), 3000);
    } catch (error) {
      setErrorAlertOpen(true);
      setErrorMessage(
        "Error requesting account access: " + (error as Error).message
      );

      setTimeout(() => setErrorAlertOpen(false), 5000);
    }
  };

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
      <Box
        sx={{
          position: "fixed",
          top: 10, // You can adjust this as needed
          left: "50%",
          transform: "translateX(-50%)", // This will center the box horizontally
          zIndex: 1000, // Ensures the alerts are on top of other elements
        }}
      >
        {alertOpen && (
          <Alert
            variant="soft"
            color="success"
            startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
            endDecorator={
              <IconButton
                variant="plain"
                size="sm"
                color="success"
                onClick={() => setAlertOpen(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            Requested AWS Access!
          </Alert>
        )}

        {errorAlertOpen && (
          <Alert
            variant="outlined"
            color="danger"
            startDecorator={<AccountCircleRoundedIcon />}
            endDecorator={
              <IconButton
                variant="plain"
                size="sm"
                color="danger"
                onClick={() => setErrorAlertOpen(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            {errorMessage}
          </Alert>
        )}
      </Box>
      <p>Logged in as: {email}</p>
      <p>Access Level: {role}</p>

      {awsAccountStatus === "pending" ? (
        <Button
          loading
          loadingPosition="start"
          sx={{ padding: 0, width: 200, margin: "auto" }}
        >
          Waiting for approval...
        </Button>
      ) : awsAccountStatus !== "false" ? (
        <Button
          component="a"
          color="success"
          target="_blank"
          href="https://mstacm.awsapps.com/start#/"
          startDecorator={<OpenInNew />}
          sx={{ width: 200, margin: "auto" }}
        >
          Open AWS Console
        </Button>
      ) : (
        <Button
          onClick={handleApproveAccount}
          size="md"
          sx={{ width: 200, margin: "auto" }}
          variant="solid"
          color="primary"
        >
          Request AWS Access
        </Button>
      )}
      <Link to="/auth/logout" style={{ display: "block", marginTop: "10px" }}>
        <Button variant="outlined" color="neutral" sx={{ width: "200px" }}>
          Logout
        </Button>
      </Link>
    </div>
  );
};

export default Profile;
