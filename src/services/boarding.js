import API from "./api";

export const getBoarding_boardingID = async (boardingID) => {
    try {
        const response = await API.get(`/boarding/${boardingID}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getBoarding_userID = async (userID) => {
    try {
        const response = await API.get(`/boarding/uid/${userID}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getBoardings = async (query) => {
    try {
        const response = await API.get(`/boarding/?${query}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const createBoarding = async (data) => {
    try {
        const response = await API.post(`/boarding`, data);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const deleteBoarding = async (boardingID) => {
    try {
        const response = await API.delete(`/boarding/${boardingID}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const updateBoarding = async (boardingID,data) => {
    try {
        const response = await API.patch(`/boarding/${boardingID}`, data);
        return response.data;
    } catch (e) {
        throw e;
    }
};