import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, setData, getData } from "../utils/Utils";

const GetVehicleService = async keyword => {
  const { wsUrl, wsGetVehicle, type, KEY_DATA_USER } = Constants;
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
    },
    {
      name: "keyword",
      value: keyword
    }
  ];

  const envelope = await setEnvelope(wsGetVehicle, data);
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
        data: response
      };
    } else {
      result = {
        status: "FAILED",
        message: "Data tidak ditemukan"
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

export { GetVehicleService };
