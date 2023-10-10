import axios from "axios";
import { Auth } from "aws-amplify";
import { useQuery, useMutation } from "react-query";
import { transformDynamoDbItem } from "../common/utils";

const fetchCurrentUser = async () => {
  const user = await Auth.currentAuthenticatedUser();
  const userSession = user.signInUserSession;

  return userSession;
};

export const useCurrentUser = (options = {}) => {
  return useQuery("users", fetchCurrentUser, options);
};

const fetchUsers = async () => {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;

  const { data } = await axios.get(
    process.env.REACT_APP_API_URL + "/users/list",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const transformedData = data.map(transformDynamoDbItem);

  return transformedData;
};

export const useListUsers = (options = {}) => {
  return useQuery("users", fetchUsers, options);
};

const updatePermission = async (payload: {
  userId: string;
  userRole: string;
  userPoolId: string;
}) => {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;

  const response = await axios.post(
    process.env.REACT_APP_API_URL + "users/permissions",
    payload,

    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

export const useUpdatePermission = () => {
  return useMutation(updatePermission);
};
