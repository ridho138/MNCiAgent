import axios from "axios";
import { Constants } from "./Constants";
import { setEnvelope } from "./Utils";

const ServiceLogin = async (dataUser, isLogin) => {
  const { wsUrl, wsLogin, type, KEY_DATA_USER } = Constants;
  const { username, password, registrationId } = dataUser;
  const data = [
    {
      name: "username",
      value: username
    },
    {
      name: "password",
      value: password
    },
    {
      name: "registrationId",
      value: registrationId
    },
    {
      name: "type",
      value: type
    }
  ];

  const envelope = await setEnvelope(wsLogin, data);
  let result;

  try {
    let postService = await axios.post(wsUrl, envelope, {
      headers: { "Content-Type": "application/soap+xml" }
    });
    let dataResponse = await postService.data;
    let dataResponseSplit = dataResponse.split("<?xml");
    let response = JSON.parse(dataResponseSplit[0]);

    if (response[0] !== "" && response[0] !== undefined) {
      result = {
        ...dataUser,
        isLogin: isLogin,
        status: "SUCCESS",
        profile: response[0]
      };
      await setData(KEY_DATA_USER, JSON.stringify(result));
    } else {
      result = {
        status: "Invalid NIK and/or Password"
      };
    }
  } catch (error) {
    result = {
      status: JSON.stringify(error)
    };
  }
  return result;
};

export { ServiceLogin };
