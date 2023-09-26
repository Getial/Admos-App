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

export default function ModalManageOrder({
  toggleModal,
  is_guarantee,
  stateOrder,
}) {
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
      name: "waiting_response_brand",
      type: "G",
    },
    {
      id: 6,
      title: "Negacion de garantia",
      name: "warranty denial",
      type: "G",
    },
    {
      id: 7,
      title: "Cotizado",
      name: "quoted",
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
      title: "Repuestos en taller",
      name: "spare_parts_ready",
      type: "A",
    },
    {
      id: 10,
      title: "En Reparacion",
      name: "in_repair",
      type: "A",
    },
    {
      id: 11,
      title: "Listo para entregar",
      name: "repaired",
      type: "A",
    },
    {
      id: 12,
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

  const isSelectedState = (title) => {
    if (title === stateOrder) {
      return {
        backgroundColor: colors[theme].input,
        borderWidth: 1,
        borderColor: colors[theme].card,
      };
    } else {
      return {};
    }
  };

  const goToOption = () => {
    const list = getOptions();
    const index = list.findIndex((object) => {
      return object.title === stateOrder;
    });
    return index;
  };

  const changeState = (title) => {
    const list = getOptions();
    const indexOption = list.findIndex((object) => {
      return object.title === title;
    });
    const indexActualState = list.findIndex((object) => {
      return object.title === stateOrder;
    });
    const optionSelected = list[indexOption];
    const actualState = list[indexActualState];
    console.log(optionSelected.name);
    console.log(actualState.name);
  };

  const Item = ({ title }) => (
    <Pressable
      onPress={() => changeState(title)}
      style={[styles.itemContainer, isSelectedState(title)]}>
      <Text style={styles.itemTitle}>{title}</Text>
    </Pressable>
  );
  const getItemLayout = (data, index) => {
    return {
      length: moderateScale(100),
      offset: verticalScale(46) * index,
      index,
    };
  };
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
          getItemLayout={getItemLayout}
          initialScrollIndex={goToOption()}
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
    maxHeight: verticalScale(180),
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
    width: moderateScale(160),
    // height: verticalScale(25),
    paddingBottom: verticalScale(5),
    paddingLeft: horizontalScale(10),
    borderWidth: 1,
    borderColor: colors[theme].input,
    borderRadius: moderateScale(10),
  },
  itemTitle: {
    color: colors[theme].text,
    // backgroundColor: "red",
  },
});
