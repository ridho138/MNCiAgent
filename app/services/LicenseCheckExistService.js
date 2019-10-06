import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, setData, getData } from "../utils/Utils";

const LicenseCheckExistService = async (licenseno) => {
  const { wsUrl, wsLicenseCheckExist, type, KEY_DATA_USER } = Constants;
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
      name: "licenseno",
      value: licenseno
    },
    {
      name: "type",
      value: type
    }
  ];

  const envelope = await setEnvelope(wsLicenseCheckExist, data);
  let result;
  
  try {
    let postService = await axios.post(wsUrl, envelope, {
      headers: { "Content-Type": "application/soap+xml" }
    });
    let dataResponse = await postService.data;
    let dataResponseSplit = dataResponse.split("<?xml");
    let response = JSON.parse(dataResponseSplit[0]);
    
    if (response[0] !== "" && response[0] !== undefined) {
      result = response
      result = {
        status: "SUCCESS",
        data: response
      };
    } else {
      result = {
        status: "FAILED",
        message: "Nomor Kendaraan tidak ditemukan."
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

export { LicenseCheckExistService };
