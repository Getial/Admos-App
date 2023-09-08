import { API_HOST } from "../utils/constants";
import axios from "axios";

export async function addNewClientApi(formValues) {
  try {
    const config = {
      method: "post",
      url: `${API_HOST}/clients/`,
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

export async function getClientApi(id) {
  const url = `${API_HOST}/clients/${id}/`;
  try {
    const response = await axios.get(url);
    const result = await response.data;
    return result;
  } catch (error) {
    throw error;
  }
}
