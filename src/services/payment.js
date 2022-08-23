import API from "./api";

export const USD_LKR = async (amount) => {
    try {
      const response = await API.get(`https://api.fastforex.io/convert?api_key=a30f2fcec5-51289c4682-rgoyc6&from=USD&to=LKR&amount=${amount}`);
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