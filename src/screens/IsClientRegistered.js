import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontFamily, theme } from '../utils/desing';


const IsClientRegistered = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¿El cliente esta registrado?</Text>
      <View>
        <Button title='Si, Buscar cliente' onPress={() => navigation.navigate('SearchClient')} />
        <Button title='No, Registrar nuevo cliente' onPress={() => navigation.navigate('NewClientRegister')} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors[theme].background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors[theme].title,
        fontSize: 25,
        marginBottom: 40
    }
})

export default IsClientRegistered