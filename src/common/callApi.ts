import axios from "axios";
import { Auth } from "aws-amplify";

const callApi = async () => {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  console.log(token);

  const response = await axios({
    method: "GET",
    url: "https://nnikhk3cq3.execute-api.us-east-1.amazonaws.com/Prod/resumes/list",
    headers: {
      Authorization: token,
    },
  }).catch((error) => {
    console.error("Error during Axios call:", error);
  });

  return response;
};
export default callApi;
