import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { BlurView } from "expo-blur";

import { colors, theme } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

export default function ModalManageOrder({ toggleModal, is_guarantee }) {
  const options = [
    {
      id: 1,
      title: "Recibido",
      name: "received",
      type: "A",
    },
    {
      id: 2,
      title: "Ingresado",
      name: "admitted",
      type: "A",
    },
    {
      id: 3,
      title: "En revision",
      name: "in_revision",
      type: "A",
    },
    {
      id: 4,
      title: "Revisado",
      name: "revised",
      type: "A",
    },
    {
      id: 5,
      title: "En espera de respuesta de la marca",
      type: "G",
    },
    {
      id: 6,
      title: "Negacion de garantia",
      type: "G",
    },
    {
      id: 7,
      title: "Cotizado",
      type: "C",
    },
    {
      id: 8,
      title: "En espera de repuestos",
      name: "waiting_for_spare_parts",
      type: "A",
    },
    {
      id: 9,
      title: "En Reparacion",
      name: "in_repair",
      type: "A",
    },
    {
      id: 10,
      title: "Listo para entregar",
      name: "repaired",
      type: "A",
    },
    {
      id: 11,
      title: "Entregado",
      name: "delivered",
      type: "A",
    },
  ];

  const getOptions = () => {
    if (is_guarantee) {
      let list = options.filter((item) => item.type !== "C");
      return list;
    } else {
      let list = options.filter((item) => item.type !== "G");
      return list;
    }
  };

  const Item = ({ title }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
  );
  return (
    <BlurView
      intensity={10}
      blurReductionFactor={1}
      style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable onPress={toggleModal} style={styles.closeContainer}>
          <Icon name="close" color={colors[theme].card} size={30} />
        </Pressable>
        <FlatList
          data={getOptions()}
          renderItem={({ item }) => <Item title={item.title} />}
          style={styles.flatlistContainer}
        />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(35),
  },
  flatlistContainer: {
    backgroundColor: colors[theme].background,
    borderColor: colors[theme].card,
    borderWidth: 1,
    borderRadius: moderateScale(20),
    paddingHorizontal: horizontalScale(35),
    paddingVertical: verticalScale(5),
    marginBottom: moderateScale(60),
    maxHeight: verticalScale(200),
    width: moderateScale(250),
  },
  headerContainer: {
    position: "relative",
    top: 0,
  },
  closeContainer: {
    position: "relative",
    top: verticalScale(35),
    left: moderateScale(210),
    zIndex: 1,
  },
  itemContainer: {
    marginVertical: verticalScale(10),
  },
  itemTitle: {
    color: colors[theme].text,
  },
});
