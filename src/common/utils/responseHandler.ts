const success = (message: string, data: any = null) => {
  return !data
    ? {
        status: 'success',
        message,
      }
    : {
        status: 'success',
        message,
        data,
      };
};

const error = (message: string, data: any = null) => {
  return !data
    ? {
        status: 'success',
        message,
      }
    : {
        status: 'success',
        message,
        data,
      };
};

export { error, success };
