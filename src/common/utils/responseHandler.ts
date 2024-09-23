const success = (message: string, data: any = null) => {
  if (!data) {
    return {
      status: 'success',
      message,
    }
  } else {
    const key = Object.keys(data)[0];
    const value = data[key];
    return {
      status: 'success',
      message,
      [key]: value,
    };
  }
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
