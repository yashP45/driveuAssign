const logger = {
    log: __DEV__ ? console : () => {},
  };
  
  export default logger;