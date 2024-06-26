import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { shareAsync } from "expo-sharing";
import Icon from "react-native-vector-icons/FontAwesome5";

import InfoClient from "../../components/InfoClient";
import ModalManageOrder from "../../components/ModalManageOrder";
import ModalAddServiceNumber from "../../components/ModalAddServiceNumber";
import { getOrderDetailsApi } from "../../api/orders";
import generatePDF from "../../utils/generatePDF";
import useTheme from "../../hooks/useTheme";
import { fontFamily } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";

export default function DetailOrderScreen({ route, navigation }) {
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [modalManagerVisible, setModalManagerVisible] = useState(false);
  const [modalServiceNumberVisible, setModalServiceOrderVisible] =
    useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);

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

  const toggleModalManager = () => {
    if (modalServiceNumberVisible) {
      setModalServiceOrderVisible(false);
    }
    setModalManagerVisible(!modalManagerVisible);
  };

  const toggleModalServiceNumber = () => {
    if (modalManagerVisible) {
      setModalManagerVisible(false);
    }
    setModalServiceOrderVisible(!modalServiceNumberVisible);
  };

  const printOrder = () => {
    generatePDF(order).then(async (result) => {
      await shareAsync(result.uri);
    });
    setIsMenuVisible(false);
  };

  const Menu = () => {
    return (
      <View style={styles.menuContainer}>
        <Pressable onPress={printOrder} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Imprimir Orden</Text>
        </Pressable>

        <Pressable
          onPress={() => console.log("Editar orden")}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>Editar Orden</Text>
        </Pressable>

        <Pressable
          onPress={() => console.log("ver anteriores")}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>Ver anteriores</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => {
            navigation.navigate("AllDetailOrder", {
              order: order,
            });
            setIsMenuVisible(false);
          }}
        >
          <Text style={styles.menuButtonText}>Ver mas detalles</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* button back */}
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon name="arrow-left" color={theme.card} size={moderateScale(30)} />
      </Pressable>

      {/* button options */}
      <Pressable
        onPress={() => setIsMenuVisible(!isMenuVisible)}
        style={styles.buttonOptions}
      >
        <Icon
          name={isMenuVisible ? "times" : "ellipsis-v"} //times for close icon and ellipsis-v for options icon
          color={theme.card}
          size={moderateScale(30)}
        />
      </Pressable>

      {/* menu */}
      {isMenuVisible && <Menu />}

      {/* Title */}
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Orden de servicio </Text>
        <Pressable
          style={styles.containerOrderNumber}
          disabled={order.service_number !== null ? true : false}
          onPress={toggleModalServiceNumber}
        >
          <Text style={styles.txtOrderNumber}>
            {order.service_number !== null ? order.service_number : "xxxxx"}
          </Text>
        </Pressable>
      </View>

      {/* informacion del cliente */}
      <View style={styles.infoClientContainer}>
        <Text style={styles.subtitle}>Informacion del cliente</Text>
        {order.client ? (
          <InfoClient clientId={order.client} />
        ) : (
          <ActivityIndicator size="large" color={theme.card} />
        )}
      </View>

      {/* detalles de la orded */}
      <View style={styles.detailsOrderContainer}>
        <Text style={styles.subtitle}>Detalles del producto</Text>
        {!isLoading ? (
          <View>
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
            <View style={styles.infoObservations}>
              <Text style={styles.titleInfo}>Observaciones: </Text>
              <Text style={styles.infoTxtObservations}>
                {order.observations}
              </Text>
            </View>
            <Pressable
              onPress={toggleModalManager}
              style={styles.stateContainer}
            >
              <Text style={styles.titleState}> {order.state_description}</Text>
              <Icon name="angle-down" color={theme.card} size={30} />
            </Pressable>
            {/* <View style={styles.btnsContainer}>
              <Pressable style={styles.btn} onPress={printOrder}>
                <Text style={styles.textBtn}>Imprimir orden</Text>
              </Pressable>
              <Pressable
                style={styles.btn}
                onPress={() =>
                  navigation.navigate("AllDetailOrder", {
                    id: id,
                  })
                }
              >
                <Text style={styles.textBtn}>Ver mas detalles</Text>
              </Pressable>
            </View> */}
          </View>
        ) : (
          <ActivityIndicator size="large" color={theme.card} />
        )}
      </View>

      {/* modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalManagerVisible}
        onRequestClose={toggleModalManager}
      >
        <ModalManageOrder
          toggleModalManager={toggleModalManager}
          toggleModalServiceNumber={toggleModalServiceNumber}
          is_guarantee={order.is_guarantee}
          stateOrder={order.state_description}
          id={order.id}
          order={order}
          setOrder={setOrder}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalServiceNumberVisible}
        onRequestClose={toggleModalServiceNumber}
      >
        <ModalAddServiceNumber
          toggleModalServiceNumber={toggleModalServiceNumber}
          id={order.id}
          setOrder={setOrder}
        />
      </Modal>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingVertical: verticalScale(50),
    },
    buttonBack: {
      position: "absolute",
      top: verticalScale(30),
      left: horizontalScale(30),
    },
    buttonOptions: {
      width: horizontalScale(30),
      alignItems: "center",
      position: "absolute",
      top: verticalScale(30),
      right: horizontalScale(20),
    },
    menuContainer: {
      position: "absolute",
      top: verticalScale(65),
      right: horizontalScale(20),
      padding: moderateScale(10),
      backgroundColor: theme.background,
      borderRadius: moderateScale(5),
      shadowColor: theme.card,
      // shadowOffset: {
      //   width: 0,
      //   height: 0,
      // },
      // shadowOpacity: 0.1,
      // shadowRadius: 1,
      elevation: 5,
      zIndex: 1,
    },
    menuButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginBottom: 5,
    },
    menuButtonText: {
      fontSize: moderateScale(18),
      color: theme.text,
    },
    containerTitle: {
      position: "absolute",
      top: verticalScale(30),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      color: theme.title,
      fontFamily: fontFamily,
      fontWeight: "900",
      // textAlign: "center",
      fontSize: moderateScale(25),
      // backgroundColor: "red",
    },
    containerOrderNumber: {
      marginBottom: verticalScale(25),
    },
    txtOrderNumber: {
      color: theme.card,
      fontFamily: fontFamily,
      fontWeight: "bold",
      fontSize: moderateScale(26),
    },
    infoClientContainer: {
      marginTop: verticalScale(20),
    },
    detailsOrderContainer: {
      width: "75%",
    },
    subtitle: {
      color: theme.title,
      fontFamily: fontFamily,
      textAlign: "center",
      marginBottom: verticalScale(25),
      fontSize: moderateScale(23),
    },
    stateContainer: {
      display: "flex",
      flexDirection: "row",
      width: "70%",
      maxWidth: moderateScale(190),
      borderColor: theme.card,
      borderWidth: 1,
      borderRadius: moderateScale(10),
      justifyContent: "space-around",
      alignItems: "center",
      alignSelf: "center",
      paddingTop: verticalScale(7),
      paddingBottom: verticalScale(5),
      paddingRight: horizontalScale(2),
      marginBottom: verticalScale(30),
      marginTop: verticalScale(30),
    },
    infoContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    infoObservations: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    titleState: {
      color: theme.title,
      width: "70%",
      textAlign: "left",
      // backgroundColor: "red",
      // textAlign: "left",
    },
    titleInfo: {
      color: theme.title,
      fontFamily: fontFamily,
      fontWeight: "bold",
      textAlign: "left",
      marginBottom: verticalScale(10),
      fontSize: moderateScale(16),
    },
    info: {
      color: theme.title,
      fontFamily: fontFamily,
      textAlign: "right",
      marginBottom: verticalScale(10),
      fontSize: moderateScale(14),
    },
    infoTxtObservations: {
      color: theme.text,
      fontSize: moderateScale(14),
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
      borderColor: theme.input,
      borderWidth: 1,
      borderRadius: moderateScale(10),
      paddingTop: verticalScale(7),
      paddingBottom: verticalScale(10),
      // marginBottom: verticalScale(30),
    },
    textBtn: {
      color: theme.text,
      textAlign: "center",
    },
  });
