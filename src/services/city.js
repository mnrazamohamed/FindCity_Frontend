import API from "./api";

export const getCities = async () => {
  try {
    const response = await API.get(`/city`);
    return response.data;
  } catch (e) {
    throw e;
  }
};