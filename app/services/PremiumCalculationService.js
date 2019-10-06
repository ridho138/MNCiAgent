import axios from "axios";
import { Constants } from "../utils/Constants";
import { setEnvelope, setData, getData } from "../utils/Utils";

const PremiumCalculationService = async dataPenawaran => {
  const { wsUrl, wsPremiumCalculation, type, KEY_DATA_USER } = Constants;
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
      name: "package",
      value: dataPenawaran.package
    },
    {
      name: "vehicle_code",
      value: dataPenawaran.vehicle_code
    },
    {
      name: "plat_no",
      value: dataPenawaran.plat_no
    },
    {
      name: "tsi",
      value: dataPenawaran.tsi
    },
    {
      name: "tenor",
      value: dataPenawaran.tenor
    },
    {
      name: "manufacture_year",
      value: dataPenawaran.manufacture_year
    },
    {
      name: "effective_date",
      value: dataPenawaran.effective_date
    },
    {
      name: "main_coverage",
      value: dataPenawaran.main_coverage
    },
    {
      name: "eq_coverage",
      value: dataPenawaran.eq_coverage
    },
    {
      name: "stfwd_coverage",
      value: dataPenawaran.stfwd_coverage
    },
    {
      name: "rscc_coverage",
      value: dataPenawaran.rscc_coverage
    },
    {
      name: "ts_coverage",
      value: dataPenawaran.ts_coverage
    },
    {
      name: "tpl_coverage",
      value: dataPenawaran.tpl_coverage
    },
    {
      name: "ba_coverage",
      value: dataPenawaran.ba_coverage
    }
  ];

  const envelope = await setEnvelope(wsPremiumCalculation, data);
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

export { PremiumCalculationService };
