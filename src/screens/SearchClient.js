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
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { API_HOST } from "../utils/constants";
import { colors, fontFamily, theme } from "../utils/desing";

export default function SearchClient({ navigation }) {
  const [name, setName] = useState(null);
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchClients = async () => {
    setIsLoading(true);
    try {
      response = await axios.get(`${API_HOST}/users/?name=${name}`);
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
        navigation.navigate("NewOrderRegister", { id: client.id })
      }>
      <Text style={styles.name}>{client.fullname}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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
    minWidth: "50%",
    height: 40,
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: 25,
    fontFamily: fontFamily,
  },
  item: {
    backgroundColor: colors[theme].input,
    padding: 5,
    marginVertical: 8,
    width: "100%",
  },
  name: {
    fontFamily: fontFamily,
    color: colors[theme].text,
  },
});
