import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontFamily, theme } from '../utils/desing';

const NewOrderForm = (props) => {
  const {navigation, route} = props
  console.log(route.params);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>NewOrderForm</Text>
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
        marginBottom: 40,
        fontFamily: fontFamily,
    },
})

export default NewOrderForm