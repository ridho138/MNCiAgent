import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope } from "../utils/Utils";

const WorkshopService = async (city) => {
  const { wsUrl, wsWorkshop } = Constants;
  const data = [
    {
      name: "city",
      value: city
    }
  ];

  const envelope = await setEnvelope(wsWorkshop, data);
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

export { WorkshopService };
