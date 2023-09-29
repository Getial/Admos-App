import { API_HOST } from "../utils/constants";
import axios from "axios";

export async function getOrdersApi() {
  const url = `${API_HOST}/orders/`;
  try {
    const response = await axios.get(url);
    const result = await response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addNewOrderApi(formData) {
  const url = `${API_HOST}/orders/`;
  const config = {
    method: "post",
    url: url,
    headers: {
      Accept: "application/json",
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

export async function getSimpleOrdersApi() {
  const url = `${API_HOST}/orders/simpleinformation/`;
  try {
    const response = await axios.get(url);
    const result = await response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getOrderDetailsApi(id) {
  const url = `${API_HOST}/orders/${id}/`;
  try {
    const response = await axios.get(url);
    const result = await response.data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateOrder(id, formData) {
  const url = `${API_HOST}/orders/${id}/`;
  const config = {
    method: "patch",
    url: url,
    headers: {
      Accept: "application/json",
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
