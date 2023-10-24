import { API_HOST } from "../utils/constants";
import axios from "axios";

export async function addNewEvidenceApi(formData) {
  const url = `${API_HOST}/evidences/`;
  const config = {
    method: "post",
    url: url,
    headers: {
      "content-type": "multipart/form-data",
    },
    data: formData,
  };
  try {
    const response = await axios(config);
    const result = await response.data;
    return result;
  } catch (error) {
    throw error;
  }
}
