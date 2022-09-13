import API from "./api";

export const USD_LKR = async (amount) => {
    try {
      const response = await API.get(`https://api.fastforex.io/convert?from=USD&to=LKR&api_key=8b7fcc4ba3-1fc34b95a0-ri4qqw&amount=${amount}`); 
        return response.data.result.LKR;
    } catch (e) {
        throw e;
    }
};

export const createPayment = async (data) => {
    try {
      const response = await API.post("/payment", data);
      return response.data
    } catch (e) {
      throw e;
    }
  };


export const updatePayment = async (data) => {
  try {
    const response = await API.patch(`/payment/${data._id}`, data);
    return response.data
  } catch (e) {
    throw e;
  }
};


export const getPayment = async (postID) => {
  try {
    const response = await API.get(`/payment/${postID}`);
    return response.data
  } catch (e) {
    throw e;
  }
};