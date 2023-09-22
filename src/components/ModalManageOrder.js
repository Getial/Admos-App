import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { colors, theme } from "../utils/desing";

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
      console.log("garantia==>", list);
      return list;
    } else {
      let list = options.filter((item) => item.type !== "G");
      console.log("cobro==>", list);
      return list;
    }
  };

  const Item = ({ title }) => (
    <View style={styles.itemContainer}>
      <Text>{title}</Text>
    </View>
  );
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable onPress={toggleModal} style={styles.closeContainer}>
          <Icon name="close" color={colors[theme].card} size={40} />
        </Pressable>

        <FlatList
          data={getOptions()}
          renderItem={({ item }) => <Item title={item.title} />}
          style={styles.flatlistContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    // backgroundColor: colors[theme].background,
  },
  modalView: {
    margin: 20,
    // backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  flatlistContainer: {
    // margin: 20,
    backgroundColor: colors[theme].placeholder,
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 5,
    maxHeight: 200,
    width: 450,
  },
  closeContainer: {
    position: "relative",
    top: 50,
    left: 400,
    zIndex: 1,
  },
  itemContainer: {
    marginVertical: 10,
  },
});
