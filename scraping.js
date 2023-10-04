const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const cron = require("node-cron");

// Leer las URLs desde el archivo de configuración
const config = JSON.parse(fs.readFileSync("urls.json", "utf-8"));
const urls = config.urls;

// Expresión regular para buscar una fecha en el formato "d de mmmm y"
const regexFecha =
  /(Domingo|Lunes|Martes|Miércoles|Jueves|Viernes|Sábado) \d{1,2} de [a-zA-Z]+ \d{4}/;

// Función para realizar el scraping
function realizarScraping() {
  urls.forEach((url, index) => {
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          const $ = cheerio.load(response.data);

          // Buscar el div con la clase "fecha_res" y extraer su contenido
          const fechaDiv = $(".fecha_res");
          const fechaTexto = fechaDiv.find("strong").text().trim();

          // Utilizar la expresión regular para encontrar la fecha en el texto
          const match = fechaTexto.match(regexFecha);

          if (match && match[0]) {
            // Convertir la fecha a minúsculas
            const fechaParte = match[0].toLowerCase();

            // Mapa de nombres de meses en español a nombres de meses en inglés
            const meses = {
              enero: "01",
              febrero: "02",
              marzo: "03",
              abril: "04",
              mayo: "05",
              junio: "06",
              julio: "07",
              agosto: "08",
              septiembre: "09",
              octubre: "10",
              noviembre: "11",
              diciembre: "12",
            };

            // Dividir la cadena en palabras separadas por espacio
            const palabras = fechaParte.split(" ");

            // Extraer el día, el mes y el año de la cadena
            const dia = palabras[1]; // "27"
            const mesStr = palabras[3].toLowerCase(); // "septiembre"
            const año = palabras[4]; // "2023"

            // Obtener el número de mes en formato "MM"
            const mesEnNumero = meses[mesStr];

            // Crear una nueva cadena de fecha en formato "YYYY-MM-DD"
            const fechaFormateada = `${año}-${mesEnNumero}-${dia}`;

            // Buscar el div con la clase "ultimo_resultado" y extraer su contenido
            const resultadoDiv = $(".ultimo_resultado");
            const resultado = resultadoDiv.text().trim();

            console.log(`URL ${index + 1}: ${url}`);
            console.log("Fecha:", fechaFormateada);
            console.log("Número:", resultado);
            console.log("-------------------------------------------------");
          } else {
            console.log(`URL ${index + 1}: ${url}`);
            console.log("No se pudo encontrar una fecha en el texto.");
            console.log("-------------------------------------------------");
          }
        } else {
          console.error(`Error al cargar la página ${url}: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(`Error al realizar la solicitud HTTP ${url}:`, error);
      });
  });
}

/*
* * * * * * 
| | | | | |
| | | | | +-- Día de la semana (0 - 7) (Domingo es tanto 0 como 7)
| | | | +---- Mes (1 - 12 o abreviaturas como enero=1, diciembre=12)
| | | +------ Día del mes (1 - 31)
| | +-------- Hora (0 - 23)
| +---------- Minuto (0 - 59)
*/

// Programar la ejecución ...
cron.schedule("30 22 * * *", () => {
  console.log("Ejecutando scraping ...");
  realizarScraping();
});

cron.schedule("33 22 * * *", () => {
  console.log("Ejecutando scraping ...");
  realizarScraping();
});

cron.schedule("34 22 * * *", () => {
  console.log("Ejecutando scraping ...");
  realizarScraping();
});

cron.schedule("35 22 * * *", () => {
  console.log("Ejecutando scraping ...");
  realizarScraping();
});

cron.schedule("36 22 * * *", () => {
  console.log("Ejecutando scraping ...");
  realizarScraping();
});

cron.schedule("37 22 * * *", () => {
  console.log("Ejecutando scraping ...");
  realizarScraping();
});

