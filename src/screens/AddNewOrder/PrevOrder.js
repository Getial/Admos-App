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
import { shareAsync } from "expo-sharing";

import { colors, theme, fontFamily } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";
import generatePDF from "../../utils/generatePDF";
import { addNewOrderApi } from "../../api/orders";

export default function PrevOrder({ navigation, route }) {
  const { data } = route.params;

  const html = `
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
      <h3>Orden de servicio <br/> <span style="color: red">${
        data.service_number
      }</span></h1>
    </header>
    <Section>
      <h3>Detalles del usuario</h3>
      <p class="label">Nombre: <span class="description">${
        data.client_fullname
      }</span></p>
      <p class="label">Direccion: <span class="description">${
        data.client_address ? data.client_address : ""
      } ${data.client_municipality} </span></p>
      <p class="label">Celular: <span class="description">${
        data.client_phone_number
      }</span></p>
    </Section>
    <section>
      <h3>Detalles del producto</h3>
      <p class="label">Categoria: <span class="description">${
        data.category_name
      }</span></p>
      <p class="label">Marca: <span class="description">${
        data.brand_name
      }</span></p>
      <p class="label">Referencia: <span class="description">${
        data.reference_name
      }</span></p>
      <p class="label">Motivo del ingreso: <span class="description">${
        data.reason_for_entry
      }</span></p>
      <p class="label">Estado en el que se recibe el producto: <span class="description">${
        data.observations
      }</span></p>
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
  </html>
  `;

  delete data.client_fullname;
  delete data.client_address;
  delete data.client_municipality;
  delete data.client_phone_number;
  delete data.category_name;
  delete data.brand_name;
  delete data.reference_name;

  const onSubmit = async () => {
    try {
      const newFormData = {
        ...data,
        entry_date: new Date(),
        admitted_date: data.state === "admitted" ? new Date() : "",
      };
      // setIsLoading(true);
      const response = await addNewOrderApi(newFormData);
      // setIsLoading(false);
      generatePDF(response).then(async (result) => {
        await shareAsync(result.uri);
        navigation.popToTop();
        navigation.navigate("Home");
      });
    } catch (error) {
      console.log(error.request._response);
      throw new Error(error);
    }
  };

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
      <Pressable onPress={onSubmit} style={styles.btnSave}>
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
    marginBottom: verticalScale(28),
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
    color: colors[theme].text,
    textAlign: "center",
  },
});
