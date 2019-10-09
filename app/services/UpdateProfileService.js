import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, updateDate, getData } from "../utils/Utils";

const UpdateProfileService = async phonenumber => {
  const { wsUrl, wsUpdateProfile, type, KEY_DATA_USER } = Constants;
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
      name: "phonenumber",
      value: phonenumber
    },
    {
      name: "type",
      value: type
    }
  ];

  const envelope = await setEnvelope(wsUpdateProfile, data);
  let result;

  try {
    let postService = await axios.post(wsUrl, envelope, {
      headers: { "Content-Type": "application/soap+xml" }
    });
    let dataResponse = await postService.data;
    let dataResponseSplit = dataResponse.split("<?xml");
    let response = JSON.parse(dataResponseSplit[0]);

    if (response.status === "Success") {
     result = {
        status: "SUCCESS",
        message: response.message
      };
      await updateDate(KEY_DATA_USER, JSON.stringify({ profile: {phonenumber: phonenumber} }));
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

  return result;
};

export { UpdateProfileService };
