import { Octokit } from "octokit";
import REACT_APP_KEY from "./.env";

const { secret } = REACT_APP_KEY
export const octokit = new Octokit({     
     auth: {secret},    
});

const {
     data: { login },
   } = await octokit.rest.users.getAuthenticated();
   console.log("Hello, %s", login);


