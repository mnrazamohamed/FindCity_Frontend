import API from "./api";

export const loginUser = async (data) => {
  try {
    const response = await API.post("/user/login", data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const singupUser = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const getUser = async (userID) => {
  try {
    const response = await API.get(`/user/${userID}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getUsers = async () => {
  try {
    const response = await API.get(`/user`);
    return response.data;
  } catch (e) {
    throw e;
  }
};


export const getUser_FP = async (data) => {
  try {
    const response = await API.get(`/user/fp/${data}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updatePassword_FP = async (data) => {
  try {
    const response = await API.patch(`/user/fp/${data.userID}`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updateUser = async (userID,data) => {
  try {
    const response = await API.patch(`/user/${userID}`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const deleteUser = async (userID) => {
  try {
    const response = await API.delete(`/user/${userID}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};