import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, setData, getData } from "../utils/Utils";

const ExpiryPolicyGroupService = async (datefrom = "2019-01-01", dateto = "2019-08-19") => {
  const { wsUrl, wsExpiryPolicyGroup, type, KEY_DATA_USER } = Constants;
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
      name: "datefrom",
      value: datefrom
    },
    {
      name: "dateto",
      value: dateto
    },
    {
      name: "intermediarycode",
      value: profile.code
    }
  ];

  const envelope = await setEnvelope(wsExpiryPolicyGroup, data);
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

export { ExpiryPolicyGroupService };
