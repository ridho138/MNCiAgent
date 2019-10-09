import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, setData, getData } from "../utils/Utils";

const CreateQuotationDocumentService = async (qs_no) => {
  const { wsUrl, wsCreateQuotationDocument, type, KEY_DATA_USER } = Constants;
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
      name: "qs_no",
      value: qs_no
    }
  ];

  const envelope = await setEnvelope(wsCreateQuotationDocument, data);
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
        data: response.data
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

export { CreateQuotationDocumentService };
