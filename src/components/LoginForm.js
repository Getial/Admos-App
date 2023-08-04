import React from "react";
import { TextInput, Button, Text, View, StyleSheet } from "react-native";

import { colors, fontFamily, theme } from '../utils/desing';

export default function LoginForm() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesion</Text>
            <TextInput placeholder="Email" placeholderTextColor={colors[theme].placeholder} style={styles.input}/>
            <TextInput placeholder="Contraseña" placeholderTextColor={colors[theme].placeholder} style={styles.input} />
            <Button title="Enviar" color={colors[theme].card} onPress={() => console.log("enviado")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: fontFamily,
        fontSize: 35,
        fontWeight: 'bold',
        color: colors[theme].title,
        marginBottom: 50,
    },
    input: {
        backgroundColor: colors[theme].input,
        color: colors[theme].text,
        minWidth: '50%',
        height: 40,
        borderRadius: 4,
        paddingLeft: 5,
        marginBottom: 15,
        fontFamily: fontFamily,
    },
    button: {
        fontFamily: fontFamily,
    }
  });
  