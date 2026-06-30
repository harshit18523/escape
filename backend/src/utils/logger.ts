const logger = {
  info: (...args: string[]) => {
    console.log("[INFO]", ...args);
  },
  error: (...args: any[]) => {
    console.error("[ERROR]", ...args);
  }
};

export default logger;
