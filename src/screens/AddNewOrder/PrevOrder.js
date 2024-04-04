import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, theme, fontFamily } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";

export default function PrevOrder({ navigation }) {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.6">
    <style>
      body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: Arial, Helvetica, sans-serif;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      section,
      footer {
        margin: 20px 10px;
      }
      .label {
        font-weight: bold;
      }
      .description {
        font-weight: 300;
      }
      .conditions {
        font-size: x-small;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Servicios Tecnicos Tesla</h1>
      <h3>Orden de servicio <span style="color: red">00001</span></h1>
    </header>
    <Section>
      <h3>Detalles del usuario</h3>
      <p class="label">Nombre: <span class="description">Pepito Perez</span></p>
      <p class="label">Direccion: <span class="description">Calle 4 #25-12 - Pasto</span></p>
      <p class="label">Celular: <span class="description">3005475476</span></p>
    </Section>
    <section>
      <h3>Detalles del producto</h3>
      <p class="label">Categoria: <span class="description">Pistola de calor</span></p>
      <p class="label">Marca: <span class="description">Makita</span></p>
      <p class="label">Referencia: <span class="description">HG6031V</span></p>
      <p class="label">Motivo del ingreso: <span class="description">No prende</span></p>
      <p class="label">Estado en el que se recibe el producto: <span class="description">Se recibe producto en regulares condiciones sin accesorios</span></p>
      <p class="conditions">Nota: Declaro que el producto que entregue se encuentra en las condiciones registradas en el campo anterior </p>
    </section>
    <section style="display: flex; justify-content: space-around">
      <p>______________________ <br> Firma quien recibe</p>
      <p>______________________ <br> Firma cliente</p>
    </section>
    <footer>
      <p class="conditions"><span class="label">APRECIADO USUARIO:</span> Le solicitamos conservar este documento como unico comprobante que acredita su derecho de propiedad para reclamar su producto</p>
      <p class="conditions"><span class="label">IMPORTANTE:</span> Servicions Tecnicos Tesla NO asumira responsabilidad alguna si el producto no es retirado dentro de los 30 dias siguientes a la fecha de reparacion segun Ley 1480 del 2011 Articulo 18 capitulo 56 de la misma.</p>
      <p style="text-align: center; font-weight: bold; font-size: large">GRACIAS POR CONFIAR EN NOSOTROS</p>
    </footer>
  </body>
  </html>`;

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
      <Text style={styles.title}>Verificar la informacion</Text>
      <WebView
        style={styles.viewPdf}
        originWhitelist={["*"]}
        source={{ html: html }}
      />
      <Pressable onPress={() => console.log("guardar")} style={styles.btnSave}>
        <Text style={styles.txtBtn}>Guardar e imprimir</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    // alignItems: "center", // Comentado para evitar problemas de visualización del WebView
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(50),
    left: horizontalScale(30),
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: moderateScale(28),
    marginTop: verticalScale(55),
    marginBottom: verticalScale(30),
    // marginVertical: moderateScale(39),
  },
  viewPdf: {
    width: "95%",
    alignSelf: "center",
    // marginVertical: moderateScale(5),
  },
  btnSave: {
    backgroundColor: colors[theme].card,
    color: colors[theme].text,
    width: horizontalScale(150),
    alignSelf: "center",
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(50),
    marginVertical: verticalScale(30),
  },
  txtBtn: {
    color: colors[theme].background,
    textAlign: "center",
  },
});
