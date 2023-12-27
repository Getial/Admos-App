import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

import { colors, theme } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";
import { updateOrder } from "../api/orders";

export default function ModalManageOrder({
  toggleModalManager,
  toggleModalServiceNumber,
  is_guarantee,
  stateOrder,
  id,
  setOrder,
  order,
}) {
  const navigation = useNavigation();
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
      name: "warranty_denial",
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
      title: "En reparacion",
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

  const [isLoading, setIsLoading] = useState(false);

  //autoscroll
  const getItemLayout = (data, index) => {
    return {
      length: moderateScale(100),
      offset: verticalScale(46) * index,
      index,
    };
  };

  const getOptions = () => {
    let list = [];
    if (is_guarantee) {
      list = options.filter((item) => item.type !== "C");
    } else {
      list = options.filter((item) => item.type !== "G");
    }
    // si la OS esta recibida la unica opcion elegible sera "ingresar"
    if (stateOrder === "Recibido") {
      list.splice(2);
    } else {
      list.shift();
    }
    return list;
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
    if (index === -1) {
      console.log("scrollIndexError", index);
      return 1;
    }
    return index;
  };

  const changeState = async (title) => {
    setIsLoading(true);
    const list = getOptions();
    const indexOption = list.findIndex((object) => {
      return object.title === title;
    });
    const indexActualState = list.findIndex((object) => {
      return object.title === stateOrder;
    });
    const optionSelected = list[indexOption];
    const actualState = list[indexActualState];

    if (optionSelected.id < actualState.id) {
      Alert.alert(
        "Advertencia",
        "Estas retrocediendo en el proceso, se reseteara la informacion desde este punto hacia adelante",
        [
          {
            text: "Entendido",
            onPress: () => {
              checkSelectedOption(optionSelected);
            },
          },
          {
            text: "Cancelar",
            onPress: () => {
              toggleModalManager();
            },
          },
        ]
      );
    } else {
      checkSelectedOption(optionSelected);
    }
  };

  const setSelectedOption = async (optionSelectedName) => {
    const formData = { state: optionSelectedName };
    const response = await updateOrder(id, formData);
    setOrder(response);
    setIsLoading(false);
    toggleModalManager();
  };

  const checkSelectedOption = async (optionSelected) => {
    switch (optionSelected.name) {
      case "admitted":
        if (order.service_number !== null) {
          setSelectedOption(optionSelected.name);
        } else {
          toggleModalServiceNumber();
        }
        break;

      case "revised":
        toggleModalManager();
        navigation.navigate("SetDiagnostic", { id: id });
        break;

      case "quoted":
        toggleModalManager();
        navigation.navigate("SetRepairPrice", { id: id });
        break;

      default:
        setSelectedOption(optionSelected.name);
        break;
    }
  };

  const Item = ({ title }) => (
    <Pressable
      onPress={() => changeState(title)}
      disabled={title === stateOrder ? true : false}
      style={[styles.itemContainer, isSelectedState(title)]}
    >
      <Text style={styles.itemTitle}>{title}</Text>
    </Pressable>
  );

  return (
    <BlurView
      intensity={10}
      blurReductionFactor={1}
      style={styles.centeredView}
    >
      <View style={styles.modalView}>
        {!isLoading ? (
          <>
            <Pressable
              onPress={toggleModalManager}
              style={styles.closeContainer}
            >
              <Icon name="close" color={colors[theme].card} size={30} />
            </Pressable>
            <FlatList
              data={getOptions()}
              renderItem={({ item }) => <Item title={item.title} />}
              getItemLayout={getItemLayout}
              initialScrollIndex={goToOption()}
              style={styles.flatlistContainer}
            />
          </>
        ) : (
          <ActivityIndicator size="large" color={colors[theme].card} />
        )}
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
