import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope } from "../utils/Utils";

const EventScheduleService = async () => {
  const { wsUrl, wsEventSchedule } = Constants;
  const data = [
    {
      name: "date",
      value: "2019-08-28"
    }
  ];

  const envelope = await setEnvelope(wsEventSchedule, data);
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
          status: "SUCCESS",
          data: response
      }
    } else {
      result = {
        status: "FAILED",
        message: "Workshop Failed"
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

export { EventScheduleService };
