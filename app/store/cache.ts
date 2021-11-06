import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const PREFIX_KEY = "CACHE";
const EXPIRATION = 1000;

export const storeData = async <T>(key: string, value: T) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(PREFIX_KEY + key, JSON.stringify(item));
  } catch (e) {
    // saving error
    console.log(e);
  }
};

// export const getData = async <T>(key: string): Promise<T> => {
//   try {
//     const item = await AsyncStorage.getItem(PREFIX_KEY + key);
//     if (item) {
//       const parsedItem = JSON.parse(item);
//       const now = moment(Date.now()); // current time
//       // const expiration = moment(parsedItem.timestamp).add(1, "days"); // expiration time
//       const expiration = moment(parsedItem.timestamp).add(
//         EXPIRATION,
//         "milliseconds"
//       ); // expiration time
//       if (now.isBefore(expiration)) {
//         return parsedItem.value as T;
//       } else {
//         await AsyncStorage.removeItem(PREFIX_KEY + key);
//       }
//       //   return parsedItem.value as T;
//     }
//   } catch (e) {
//     // error reading value
//     console.log(e);
//   }
//   return null;
// };

const isExpired = (item: number) => {
    
}
    

export const getData2 = async <T>(key: string) => {
  try {
    const item = await AsyncStorage.getItem(PREFIX_KEY + key);
    if (!item) return null;
    const parsedItem = JSON.parse(item);
    const now = moment(Date.now()); // current time
    const storedTime = moment(parsedItem.timestamp); // stored time
    const isExpired = now.diff(storedTime, "minutes") > EXPIRATION;
    if (isExpired) {
      //Command Query Separation
      await AsyncStorage.removeItem(PREFIX_KEY + key);
      return null;
    }
    return parsedItem.value as T;
  } catch (e) {
    // error reading value
    console.log(e);
  }
  return null;
};
