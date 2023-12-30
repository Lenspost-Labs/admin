import { apiCheckWhitelist } from "src/apis/backendApis/AuthApi";

export const fnCheckWhitelist = async (email: string | null) => {

  const res = await apiCheckWhitelist({email: email});
  console.log("Check Whitelist");
  console.log(res);
  
  return res;
};

