import API from "./api";

const config = {
    service_id: "service_0rawi6b", // service ID
    user_id: "h_uhlagvU70OZFpzL", // Publick Key
}


export const sendMail = async (data) => {

    data = {
        ...config,
        template_id: "template_hqsxaok",
        template_params: { ...data }
    }

    try {
        const response = await API.post("https://api.emailjs.com/api/v1.0/email/send", data);
        return response.data;
    } catch (e) {
        throw e;
    }
};