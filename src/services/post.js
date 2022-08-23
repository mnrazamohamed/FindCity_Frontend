import API from "./api";

export const getPosts = async (userID = "") => {
  try {
    const response = await API.get(`/post/${userID}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getPost = async (userID, postID) => {
  try {
    const response = await API.get(`/post/${userID}/${postID}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updatePost = async (userID, postID, data) => {
  try {
    const response = await API.patch(`/post/${userID}/${postID}`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
};


export const creatPost = async (data) => {
  try {
    const response = await API.post(`/post`, data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const deletePost = async (userID, postID) => {
  try {
    const response = await API.delete(`/post/${userID}/${postID}`);
    return response.data
  } catch (e) {
    throw e;
  }
};