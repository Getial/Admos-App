import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import { colors, theme, fontFamily } from "../utils/desing";
import { getClientApi } from "../api/clients";

export default function InfoClient({ clientId }) {
  console.log("info client--->>", clientId);
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const client = await getClientApi(clientId);
        setClient(client);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  const callClient = async () => {
    Linking.openURL(`tel:${client.phone_number}`);
  };

  return (
    <View>
      <Text style={styles.subtitle}>Informacion del cliente</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.titleInfo}>Nombre: </Text>
        <Text style={styles.info}>{client.fullname}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleInfo}>Celular: </Text>
        <Text style={styles.info}>{client.phone_number}</Text>
        <TouchableOpacity onPress={callClient}>
          <Text style={styles.txtBtnCall}>Llamar</Text>
        </TouchableOpacity>
      </View>
      {client.email && (
        <View style={styles.infoContainer}>
          <Text style={styles.titleInfo}>Email: </Text>
          <Text style={styles.info}>{client.email}</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.titleInfo}>Ciudad o Municipio: </Text>
        <Text style={styles.info}>{client.municipality}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "center",
    marginBottom: 25,
    fontSize: 32,
  },
  subtitle: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "center",
    marginBottom: 25,
    fontSize: 25,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  titleInfo: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "left",
    marginBottom: 25,
    fontSize: 18,
  },
  info: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "right",
    marginBottom: 25,
    fontSize: 15,
  },
  txtBtnCall: {
    backgroundColor: colors[theme].card,
    color: colors[theme].text,
    textAlign: "center",
    width: 100,
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
});
