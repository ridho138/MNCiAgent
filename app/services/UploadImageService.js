import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, getData } from "../utils/Utils";

const UploadImageService = async dataImage => {
  const { wsUrl, wsUploadImage, type, KEY_DATA_USER } = Constants;
  const { username, password, profile } = await getData(KEY_DATA_USER);
  const { refId, title, description, size, image } = dataImage
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
      name: "refid",
      value: refId
    },
    {
      name: "title",
      value: title
    },
    {
      name: "description",
      value: description
    },
    {
      name: "size",
      value: size
    },
    {
      name: "image",
      value: image
    }
  ];
console.log(data)
  const envelope = await setEnvelope(wsUploadImage, data);
  let result;
  console.log(envelope)
  try {
    let postService = await axios.post(wsUrl, envelope, {
      headers: { "Content-Type": "application/soap+xml" }
    });
    let dataResponse = await postService.data;
    let dataResponseSplit = dataResponse.split("<?xml");
    let response = JSON.parse(dataResponseSplit[0]);
    console.log(response)
    if (response.status === "Success") {
      result = {
        status: "SUCCESS",
        data: response
      };
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

export { UploadImageService };
