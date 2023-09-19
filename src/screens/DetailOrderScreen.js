import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";

import InfoClient from "../components/InfoClient";
import ModalManageOrder from "../components/ModalManageOrder";
import { getOrderDetailsApi } from "../api/orders";
import { colors, theme, fontFamily } from "../utils/desing";

export default function DetailOrderScreen({ route, navigation }) {
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  //get details order
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const responseOrder = await getOrderDetailsApi(id);
        setOrder(responseOrder);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={colors[theme].card}
          size={30}
          style={styles.iconPlus}
        />
      </Pressable>
      <Text style={styles.title}>Orden de servicio {order.service_number}</Text>
      {order.client && <InfoClient clientId={order.client} />}
      <View style={styles.detailsOrderContainer}>
        <Text style={styles.subtitle}>Detalles del producto</Text>
        <View>
          <Pressable onPress={toggleModal} style={styles.stateContainer}>
            <Text style={styles.titleState}> {order.state_description}</Text>
            <Icon
              name="angle-down"
              color={colors[theme].card}
              size={30}
              style={styles.iconPlus}
            />
          </Pressable>
          <View style={styles.infoContainer}>
            <Text style={styles.titleInfo}>Producto: </Text>
            <Text style={styles.info}>
              {order.category_name} {order.brand_name} {order.reference_name}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleInfo}>Motivo del ingreso: </Text>
            <Text style={styles.info}>{order.reason_for_entry}</Text>
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity onPress={() => console.log("imprimir")}>
              <Text style={styles.txtBtnCall}>Imprimir orden</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Ver mas detalles")}>
              <Text style={styles.txtBtnCall}>Ver mas detalles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <ModalManageOrder toggleModal={toggleModal} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 50,
  },
  buttonBack: {
    position: "absolute",
    top: 100,
    left: 100,
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "center",
    marginBottom: 25,
    fontSize: 25,
  },
  detailsOrderContainer: {
    width: "75%",
  },
  subtitle: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "center",
    marginBottom: 25,
    fontSize: 25,
  },
  stateContainer: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    borderColor: colors[theme].card,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 7,
    paddingBottom: 5,
    marginBottom: 30,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  titleState: {
    color: colors[theme].title,
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
  btnsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  txtBtnCall: {
    backgroundColor: colors[theme].card,
    color: colors[theme].text,
    textAlign: "center",
    width: 120,
    marginHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 50,
  },
});
