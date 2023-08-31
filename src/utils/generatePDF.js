import { printToFileAsync } from "expo-print";

export default function generatePDF(data) {
  const html = `
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
      <h3>Orden de servicio <span style="color: red">${
        data.service_number
      }</span></h1>
    </header>
    <Section>
      <h3>Detalles del usuario</h3>
      <p class="label">Nombre: <span class="description">${
        data.client_name
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

  return new Promise(async (resolve, reject) => {
    try {
      const file = await printToFileAsync({
        html: html,
        base64: false,
      });
      resolve(file);
    } catch (error) {
      reject(error);
    }
  });

  // let generatePdf = async () => {
  //   const file = await printToFileAsync({
  //     html: html,
  //     base64: false,
  //   });

  //   return file;
  // };

  // generatePdf();

  // return (
  //   <View style={styles.container}>
  //     <TextInput value={name} placeholder="Name" style={styles.textInput} onChangeText={(value) => setName(value)} />
  //     <Button title="Generate PDF" onPress={generatePdf} />
  //     <StatusBar style="auto" />
  //   </View>
  // );
}
