import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, getData } from "../utils/Utils";

const AddQuotationService = async dataQuotation => {
  const { wsUrl, wsAddQuotation, type, KEY_DATA_USER } = Constants;
  const { username, password, profile } = await getData(KEY_DATA_USER);
  const {
    lob_code,
    tob_code,
    sob_code,
    insured_name,
    insured_address,
    eff_date,
    merk,
    model,
    subModel,
    telpTertanggung,
    emailTertanggung,
    vehicle_code,
    color,
    plat_no,
    center_license_no,
    sub_license_no,
    manufacture_year,
    stnk_name,
    functional,
    engine_no,
    chassis_no,
    paket,
    tsi,
    additional,
    faktur_date,
    tenor,
    premi,
    policy_cost,
    stamp,
    refId
  } = dataQuotation;
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
      name: "lob_code",
      value: lob_code
    },
    {
      name: "tob_code",
      value: tob_code
    },
    {
      name: "sob_code",
      value: sob_code
    },
    {
      name: "intermediary_code",
      value: profile.code
    },
    {
      name: "insured_name",
      value: insured_name
    },
    {
      name: "insured_address",
      value: insured_address
    },
    {
      name: "eff_date",
      value: eff_date
    },
    {
      name: "vehicle_code",
      value: ""+vehicle_code
    },
    {
      name: "color",
      value: color
    },
    {
      name: "plat_no",
      value: plat_no
    },
    {
      name: "center_license_no",
      value: center_license_no
    },
    {
      name: "sub_license_no",
      value: sub_license_no
    },
    {
      name: "manufacture_year",
      value: manufacture_year
    },
    {
      name: "stnk_name",
      value: stnk_name
    },
    {
      name: "functional",
      value: functional
    },
    {
      name: "engine_no",
      value: engine_no
    },
    {
      name: "chassis_no",
      value: chassis_no
    },
    {
      name: "package",
      value: paket
    },
    {
      name: "tsi",
      value: tsi
    },
    {
      name: "additional",
      value: additional
    },
    {
      name: "faktur_date",
      value: faktur_date
    },
    {
      name: "tenor",
      value: tenor
    },
    {
      name: "premi",
      value: premi
    },
    {
      name: "policy_cost",
      value: policy_cost
    },
    {
      name: "stamp",
      value: stamp
    },
    {
      name: "telp",
      value: telpTertanggung
    },
    {
      name: "email",
      value: emailTertanggung
    },
    {
      name: "merk",
      value: merk
    },
    {
      name: "model",
      value: model
    },
    {
      name: "submodel",
      value: subModel
    }
  ];
  // console.log(data);
  const envelope = await setEnvelope(wsAddQuotation, data);
  // console.log(envelope);
  let result;

  try {
    let postService = await axios.post(wsUrl, envelope, {
      headers: { "Content-Type": "application/soap+xml" }
    });
    let dataResponse = await postService.data;
    let dataResponseSplit = dataResponse.split("<?xml");
    let response = JSON.parse(dataResponseSplit[0]);
    // console.log(dataResponse);
    // console.log(response);
    if (response.status === "Success") {
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
  // console.log(result);
  return result;
};

export { AddQuotationService };
