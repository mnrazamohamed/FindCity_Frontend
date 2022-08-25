import API from "./api";

export const USD_LKR = async (amount) => {
    try {
      const response = await API.get(`https://api.fastforex.io/convert?from=USD&to=LKR&api_key=d202e96799-00f52fb750-rh3v4l&amount=${amount}`); 
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