import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, setData } from "../utils/Utils";

const LoginService = async dataUser => {
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
        status: "SUCCESS",
        profile: response[0]
      };
      await setData(KEY_DATA_USER, JSON.stringify(result));
    } else {
      result = {
        status: "FAILED",
        message: response.message
      };
    }
  } catch (error) {
    result = {
      status: "FAILED",
      message: "Terjadi suatu kesalahan.",
      data: JSON.stringify(error.message)
    };
  }
  console.log(result);
  return result;
};

export { LoginService };
