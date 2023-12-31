import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorageConstants from '../constants/asyncStorageConstants';

const setItem = async (key, value) => {
  console.log(key, value, 'key-value-chat');
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e)
  }
};

const getItem = async key => {
  try {
    await AsyncStorage.getItem(key).then(res => {
      console.log(res , "response")
      return res
    })
   
  } catch (e) {
    console.log(e , "error")
  }
};

const removeItem = async key => {
  const response = await AsyncStorage.removeItem(key, error =>
    console.log(error, 'error-removeItem'),
  );
  return response;
};

const clearStorage = async () => {
  await AsyncStorage.clear(error =>
    console.log(error, 'error-clear-local-storage'),
  );

};

export {setItem, getItem, clearStorage, removeItem};