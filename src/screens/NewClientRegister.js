import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontFamily, theme } from '../utils/desing';

const NewClientRegister = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nuevo Cliente</Text>
      <View style={styles.form}>
        <TextInput placeholder="Nombre completo" placeholderTextColor={colors[theme].placeholder} style={styles.input}/>
        <TextInput placeholder="Numero de documento" placeholderTextColor={colors[theme].placeholder} style={styles.input}/>
        <TextInput placeholder="Celular" placeholderTextColor={colors[theme].placeholder} style={styles.input}/>
        <TextInput placeholder="Direccion" placeholderTextColor={colors[theme].placeholder} style={styles.input}/>
        <TextInput placeholder="Ciudad o Municipio" placeholderTextColor={colors[theme].placeholder} style={styles.input}/>
      </View>
      <Button title='Guardar' style={styles.buton} onPress={() => console.log('crear nuevo usuario')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors[theme].background,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    title: {
        // flex: 1,
        color: colors[theme].title,
        fontFamily: fontFamily,
        fontSize: 35,
        textAlign: 'center'
    },
    form: {
        // flex: 2,
        justifyContent: 'space-around'
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
})

export default NewClientRegister