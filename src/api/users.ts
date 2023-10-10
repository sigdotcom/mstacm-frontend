import axios from "axios";
import { Auth } from "aws-amplify";
import { useQuery, useMutation } from "react-query";

const fetchUsers = async () => {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;

  const { data } = await axios.get(
    process.env.REACT_APP_API_URL + "/listUsers",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return data;
};

export const useListUsers = (options = {}) => {
  return useQuery("users", fetchUsers, options);
};

const insertResume = async (file: string) => {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  // const formData = new FormData();
  // formData.append('resume', file);

  // Adjust URL and config as needed
  const response = await axios.post(
    process.env.REACT_APP_API_URL + "/resumes/insert",
    file,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

export const useInsertResume = () => {
  return useMutation(insertResume);
};
