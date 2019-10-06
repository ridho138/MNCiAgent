import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, setData, getData } from "../utils/Utils";

const FirstReportClaimService = async ({
  phonenumber,
  licenseno,
  policyno,
  insuredname,
  lossdate,
  losstime,
  lossplace,
  lossdescription
}) => {
  const { wsUrl, wsFirstReportClaim, type, KEY_DATA_USER } = Constants;
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
      name: "licenseno",
      value: licenseno
    },
    {
      name: "policyno",
      value: policyno
    },
    {
      name: "insuredname",
      value: insuredname
    },
    {
      name: "lossdate",
      value: lossdate
    },
    {
      name: "losstime",
      value: losstime
    },
    {
      name: "lossplace",
      value: lossplace
    },
    {
      name: "lossdescription",
      value: lossdescription
    },
    {
      name: "status",
      value: "PENDING"
    },
    {
      name: "type",
      value: type
    },
    {
      name: "referenceno",
      value: ""
    },
    {
      name: "insuredobject",
      value: "MOTOR VEHICLE"
    }
  ];

  const envelope = await setEnvelope(wsFirstReportClaim, data);
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
        message: response.message
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

export { FirstReportClaimService };
