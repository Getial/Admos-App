import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESION_STORAGE } from "../utils/constants";

export async function getSesionApi() {
  try {
    const response = await AsyncStorage.getItem(SESION_STORAGE);
    return JSON.parse(response);
  } catch (error) {
    throw error;
  }
}

export async function setLoginSesionApi(user) {
  try {
    await AsyncStorage.setItem(SESION_STORAGE, JSON.stringify(user));
  } catch (error) {
    throw error;
  }
}

export async function setLogoutSesionApi() {
  try {
    await AsyncStorage.removeItem(SESION_STORAGE);
  } catch (error) {
    throw error;
  }
}
