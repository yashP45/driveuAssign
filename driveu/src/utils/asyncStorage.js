import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorageConstants from '../constants/asyncStorageConstants';
import logger from './logger';

const setItem = async (key, value) => {
  logger.log(key, value, 'key-value-chat');
  const response = await AsyncStorage.setItem(key, value, err =>
    logger.log(err, 'error-setItem'),
  );

  return response;
};

const getItem = async key => {
  const response = await AsyncStorage.getItem(key, error =>
    logger.log(error, 'error-getItem'),
  );
  return response;
};

const removeItem = async key => {
  const response = await AsyncStorage.removeItem(key, error =>
    logger.log(error, 'error-removeItem'),
  );
  return response;
};

const clearStorage = async () => {
  await AsyncStorage.clear(error =>
    logger.log(error, 'error-clear-local-storage'),
  );
  await AsyncStorage.setItem(asyncStorageConstants.firstOpened, 'true');
};

export {setItem, getItem, clearStorage, removeItem};