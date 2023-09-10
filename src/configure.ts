import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { fromSSO } from "@aws-sdk/credential-provider-sso";
import * as fs from "fs";

const REGION = "us-east-1";
const PROFILE = "dev";

// Initializing the SSM client with specific profile and region
const ssmClient = new SSMClient({
  region: REGION,
  credentials: fromSSO({ profile: PROFILE }),
});

// Fetch parameters
async function fetchParameters() {
  try {
    const authDomain = new GetParameterCommand({
      Name: "authDomain",
      WithDecryption: true,
    });
    const userPoolId = new GetParameterCommand({
      Name: "userPoolId",
      WithDecryption: true,
    });
    const userPoolWebClientId = new GetParameterCommand({
      Name: "userPoolWebClientId",
      WithDecryption: true,
    });
    const redirectSignIn = new GetParameterCommand({
      Name: "redirectSignIn",
      WithDecryption: true,
    });

    const redirectSignOut = new GetParameterCommand({
      Name: "redirectSignOut",
      WithDecryption: true,
    });

    const authDomainResponse = await ssmClient.send(authDomain);
    const userPoolIdResponse = await ssmClient.send(userPoolId);
    const userPoolWebClientIdResponse = await ssmClient.send(
      userPoolWebClientId
    );
    const redirectSignInResponse = await ssmClient.send(redirectSignIn);
    const redirectSignOutResponse = await ssmClient.send(redirectSignOut);

    const envContent = `
        REACT_APP_AUTH_DOMAIN=${authDomainResponse.Parameter?.Value}
        REACT_APP_USER_POOL_ID=${userPoolIdResponse.Parameter?.Value}
        REACT_APP_USER_POOL_CLIENT_ID=${userPoolWebClientIdResponse.Parameter?.Value}
        REACT_APP_REDIRECT_SIGNIN_URL=${redirectSignInResponse.Parameter?.Value}
        REACT_APP_REDIRECT_SIGNOUT_URL=${redirectSignOutResponse.Parameter?.Value}
      `;
    const formattedEnv = envContent
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .trim();
    fs.writeFileSync(".env", formattedEnv);
  } catch (error) {
    console.error("Error fetching parameters:", error);
  }
}

fetchParameters();
