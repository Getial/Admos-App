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
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

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
          size={moderateScale(30)}
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
            <Pressable
              style={styles.btn}
              onPress={() => console.log("imprimir")}>
              <Text style={styles.textBtn}>Imprimir orden</Text>
            </Pressable>
            <Pressable
              style={styles.btn}
              onPress={() => console.log("Ver mas detalles")}>
              <Text style={styles.textBtn}>Ver mas detalles</Text>
            </Pressable>
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
    paddingVertical: verticalScale(50),
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(60),
    left: horizontalScale(30),
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "center",
    marginBottom: verticalScale(25),
    fontSize: moderateScale(25),
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
    width: "60%",
    maxWidth: 250,
    borderColor: colors[theme].card,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(5),
    marginBottom: verticalScale(30),
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
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: verticalScale(25),
    fontSize: moderateScale(16),
  },
  info: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "right",
    marginBottom: verticalScale(25),
    fontSize: moderateScale(13),
  },
  btnsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    // backgroundColor: "aqua",
  },
  btn: {
    width: "45%",
    maxWidth: 150,
    borderColor: colors[theme].input,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(10),
    // marginBottom: verticalScale(30),
  },
  textBtn: {
    color: colors[theme].text,
    textAlign: "center",
  },
});
