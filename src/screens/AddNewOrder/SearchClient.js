import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  Button,
  FlatList,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";

import { API_HOST } from "../../utils/constants";
import { colors, fontFamily, theme } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";

export default function SearchClient({ navigation }) {
  const [name, setName] = useState(null);
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchClients = async () => {
    setIsLoading(true);
    try {
      response = await axios.get(`${API_HOST}/clients/?name=${name}`);
      if (response.status === 200) {
        setIsLoading(false);
        setClients(response.data);
      }
    } catch (error) {
      alert("Ha ocurrido un error", error);
      setIsLoading(false);
    }
  };

  const Item = ({ client }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("NewOrderRegister", { client: client.id })
      }
    >
      <Text style={styles.name}>{client.fullname}</Text>
      <Text style={styles.municipality}>{client.municipality}</Text>
    </TouchableOpacity>
  );

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
      <Text style={styles.title}>
        {isLoading ? "Buscando cliente" : "Buscar cliente"}
      </Text>
      <TextInput
        placeholder="Nombre del cliente"
        placeholderTextColor={colors[theme].placeholder}
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {!isLoading ? (
        <Button
          title="Buscar"
          color={colors[theme].card}
          onPress={searchClients}
          disabled={isLoading}
        />
      ) : (
        <ActivityIndicator size="large" color={colors[theme].card} />
      )}
      <FlatList
        data={clients}
        renderItem={({ item }) => <Item client={item} />}
        keyExtractor={(item) => item.id}
        style={styles.flatlistcontainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(50),
    left: horizontalScale(30),
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    fontSize: 32,
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
    minWidth: "75%",
    height: 40,
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: 25,
    fontFamily: fontFamily,
  },
  flatlistcontainer: {
    marginTop: 50,
    maxHeight: 400,
    width: "50%",
  },
  item: {
    borderColor: colors[theme].input,
    borderWidth: 1,
    padding: 5,
    marginVertical: 8,
    width: "100%",
    height: verticalScale(40),
  },
  name: {
    fontFamily: fontFamily,
    color: colors[theme].text,
  },
  municipality: {
    color: colors[theme].placeholder,
  },
});
