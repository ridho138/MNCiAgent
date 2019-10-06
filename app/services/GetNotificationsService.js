import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, getData, updateDate } from "../utils/Utils";

const GetNotificationsService = async () => {
  const { wsUrl, wsGetNotifications, type, KEY_DATA_USER } = Constants;
  const { username, password } = await getData(KEY_DATA_USER);
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
      name: "type",
      value: type
    }
  ];

  const envelope = await setEnvelope(wsGetNotifications, data);
  let result;

  try {
    let postService = await axios.post(wsUrl, envelope, {
      headers: { "Content-Type": "application/soap+xml" }
    });
    let dataResponse = await postService.data;
    let dataResponseSplit = dataResponse.split("<?xml");
    let response = JSON.parse(dataResponseSplit[0]);

    if (response[0] !== "" && response[0] !== undefined) {
      result = response;
      result = {
        status: "SUCCESS",
        message: response.message
      };
      await updateDate(KEY_DATA_USER, JSON.stringify({ password: newpassword }));
    } else {
      result = {
        status: "FAILED",
        message: "Tidak ada data."
      };
    }
  } catch (error) {
    result = {
      status: "FAILED",
      message: JSON.stringify(error.message)
    };
  }

  return result;
};

export { GetNotificationsService };
