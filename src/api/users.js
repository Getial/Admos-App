import { API_HOST } from "../utils/constants";
import axios from "axios";

export async function addNewUserApi(formValues) {
  try {
    const config = {
      method: "post",
      url: `${API_HOST}/users/signup/`,
      headers: {
        Accept: "application/json",
        "content-type": "multipart/form-data",
      },
      data: formValues,
    };

    const response = await axios(config);
    const result = await response.data;
    return result;
  } catch (error) {
    throw error;
  }
}
