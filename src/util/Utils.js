import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const setData = async (key, value) => {
  try {
    const isExist = await AsyncStorage.getItem(key);
    let checkData = JSON.parse(isExist);

    if (checkData) {
      await clearData(key);
    }

    await AsyncStorage.setItem(key, value)
      .then(() => {
        console.log("It was saved successfully");
      })
      .catch(() => {
        console.log("There was an error saving the product");
      });
  } catch (error) {
    console.log(`setData --> ${error}`);
  }
};

const getData = async key => {
  try {
    const Data = await AsyncStorage.getItem(key);
    const DataJSON = JSON.parse(Data);
    return DataJSON;
  } catch (error) {
    console.log(`getData --> ${error}`);
  }
};

const clearData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const toDateTime = date => {
  let result = "-";
  if (date !== null) {
    result = moment(date).format("D-MMM-YYYY, H:mm:ss");
  }
  return result;
};

const toDate = date => {
  let result = "-";
  if (date !== null) {
    result = moment(date).format("D-MMM-YYYY");
  }
  return result;
};

const toTime = date => {
  let result = "-";
  if (date !== null) {
    result = moment(date).format("H:mm:ss");
  }
  return result;
};

const tes = async () => {
  const Datax = await AsyncStorage.getItem("KEY_NOTIF");
  return Datax;
};

const notifCount = () => {
  //let x = 3
  AsyncStorage.getItem("KEY_NOTIF").then(value => {
    console.log("Datax");
    console.log(value);
    return value;
  });

  // if(Datax){
  //   x = Datax
  // }
  //const Data = 17
  //return x;
};

const setEnvelope = (soapAction, data) => {
  
  let xmls = `<?xml version="1.0" encoding="utf-8"?>\
                <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
                xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
                <soap12:Body>\
                <${soapAction} xmlns="WSMNCIERS">`;

  data.map(val => {
    xmls += `<${val.name}>${val.value}</${val.name}>`;
  });

  xmls += `</${soapAction}></soap12:Body></soap12:Envelope>`;

  return xmls;
};

export { setData, getData, clearData, toDateTime, toDate, toTime, notifCount, setEnvelope };
