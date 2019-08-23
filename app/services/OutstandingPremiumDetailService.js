import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, setData, getData } from "../utils/Utils";

const OutstandingPremiumDetailService = async (cob) => {
  const { wsUrl, wsOutstandingPremiumDetail, type, KEY_DATA_USER } = Constants;
  const { username, password, profile } = await getData(KEY_DATA_USER);
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
      name: "intermediarycode",
      value: profile.code
    },
    {
      name: "cobcode",
      value: cob
    }
  ];

  const envelope = await setEnvelope(wsOutstandingPremiumDetail, data);
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
        message: "Invalid NIK and/or Password"
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

export { OutstandingPremiumDetailService };
