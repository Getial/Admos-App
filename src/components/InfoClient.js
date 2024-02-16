import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  ActivityIndicator,
} from "react-native";

import { colors, theme, fontFamily } from "../utils/desing";
import { getClientApi } from "../api/clients";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

export default function InfoClient({ clientId }) {
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
    // Linking.canOpenURL();
  };

  const sendWhatsAppMessage = () => {
    let msg = `Buenas tardes don ${client.fullname}`;
    let message = msg.replaceAll(" ", "%20");
    let mobile = `57${client.phone_number}`;
    let url = `https://wa.me/${mobile}?text=${message}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            "Por favor instala whatsapp para enviar mensajes directos"
          );
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.titleInfo}>Nombre: </Text>
            <Text style={styles.info}>{client.fullname}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleInfo}>Celular: </Text>
            <Text style={styles.info}>{client.phone_number}</Text>
            <Pressable style={styles.btn} onPress={callClient}>
              <Text style={styles.textBtn}>Llamar</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={sendWhatsAppMessage}>
              <Text style={styles.textBtn}>whatsapp</Text>
            </Pressable>
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
        </>
      ) : (
        <ActivityIndicator size="large" color={colors[theme].card} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "75%",
  },
  subtitle: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "center",
    marginBottom: verticalScale(25),
    fontSize: moderateScale(23),
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    // backgroundColor: "red",
    marginBottom: verticalScale(5),
    // justifyContent: "space-around",
  },
  titleInfo: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: verticalScale(15),
    fontSize: moderateScale(18),
  },
  info: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "right",
    marginBottom: verticalScale(15),
    fontSize: moderateScale(14),
  },
  btn: {
    width: "25%",
    maxWidth: 150,
    borderColor: colors[theme].input,
    borderWidth: 1,
    borderRadius: moderateScale(15),
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(8),
    marginLeft: horizontalScale(10),
    alignSelf: "flex-start",
    // marginBottom: verticalScale(30),
  },
  textBtn: {
    color: colors[theme].text,
    textAlign: "center",
  },
});
