/* eslint-disable implicit-arrow-linebreak */
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import * as cheerio from 'cheerio';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Table from 'cli-table3';
// eslint-disable-next-line import/no-extraneous-dependencies
import colors from 'colors';

// existe la ruta

// eslint-disable-next-line consistent-return
export function existenciaDeLaRuta(ruta) {
  if (fs.existsSync(ruta)) return ruta;
}

// ruta absoluta o relativa

// eslint-disable-next-line consistent-return
export function rutaAbsoluta(ruta) {
  if (path.isAbsolute(ruta)) return ruta;
}

// convertir la ruta relativa a absoluta

export function convirtiendoLaRutaAAbsoluta(ruta) {
  return path.resolve(ruta);
}

// es un archivo .md
// eslint-disable-next-line consistent-return
export function rutaEsArchivoMD(archivo) {
  if (path.extname(archivo).includes('.md')) return archivo;
}

// la ruta es un directorio
// eslint-disable-next-line consistent-return
export function rutaEsDirectorio(directorio) {
  if (fs.statSync(directorio).isDirectory()) return directorio;
}

// leer archivo .md
export function leerArchivoMD(archivoMD) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(archivoMD, 'utf-8', (_, contenido) => {
        resolve(contenido);
      });
    } catch (err) {
      reject(err);
    }
  });
}
// convertir archivo .md a html

export function convertirAHtml(contenido) {
  return marked(contenido, { mangle: false, headerIds: false });
}

// extraer Links y devolver links e informacion de Links de archivo Html

export function extraerLinks(html, file) {
  const $ = cheerio.load(html);

  const links = [];
  $('a').each((_, element) => {
    const text = $(element).text();
    const href = $(element).attr('href');
    const linkInfo = { TEXT: text, HREF: href, FILE: file };
    links.push(linkInfo);
  });

  return links;
}

//---------------------------------------------------------
// eslint-disable-next-line max-len
// leer directorio y leer archivos y carpetas (recursividad), entregar array archivos .md
export function leerDirectorio(directorio) {
  const archivos = [];
  const intoDir = fs.readdirSync(directorio);
  if (intoDir.length) {
    intoDir.forEach((element) => {
      // eslint-disable-next-line max-len
      const dir = path.join(directorio, element); // Utilizamos path.join() para obtener la ruta completa del archivo o carpeta
      if (fs.statSync(dir).isFile() && path.extname(element).includes('.md')) {
        // eslint-disable-next-line max-len
        archivos.push(dir); // Agregamos la ruta completa del archivo .md al arreglo de archivos
      } else if (fs.statSync(dir).isDirectory()) {
        // eslint-disable-next-line max-len
        const archivosRecursivos = leerDirectorio(dir);
        archivos.push(...archivosRecursivos);
      }
    });
    return archivos;
  }
  return false;
}

// eslint-disable-next-line max-len
// validar links y devolver arreglo de objetos con la informacion de cada link validada
export function validarLinks(links) {
  const requests = links.map((link) =>
    axios
      .head(link.HREF)
      .then((response) => ({
        text: link.TEXT,
        href: link.HREF,
        file: link.FILE,
        status: response.status,
        ok: colors.green('ok'),
      }))
      .catch((error) => ({
        text: link.TEXT,
        href: link.HREF,
        file: link.FILE,
        status: error.response ? error.response.status : 0,
        ok: colors.red('fail'),
      })),
  );

  return Promise.all(requests).then((results) => {
    // Crear una nueva tabla
    const table = new Table({
      head: [
        colors.blue('NUMERO'),
        colors.blue('TEXT'),
        colors.blue('HREF'),
        colors.blue('FILE'),
        colors.blue('STATUS'),
        colors.blue('OK'),
      ],
      colWidths: [10, 50, 30, 20, 10, 10],
    });

    // Agregar filas a la tabla con los datos de cada link
    let numero = 1;
    results.forEach((link) => {
      const okColor = link.ok === 'ok' ? 'green' : 'red';
      table.push([
        colors.blue(numero),
        link.text,
        link.href,
        link.file,
        colors.yellow(link.status),
        colors[okColor](link.ok),
      ]);
      numero += 1;
    });

    // Imprimir la tabla
    console.log(table.toString());

    return results;
  });
}

// Estadisticas Links
export function estadisticas(arrayLinks) {
  const linksMap = new Map();
  let broken = 0;
  arrayLinks.forEach((link) => {
    if (link.ok === colors.red('fail')) {
      broken += 1;
    }

    linksMap.set(link.href, link);
  });

  const total = arrayLinks.length;
  const unique = linksMap.size;

  const objetoEstadisticas = arrayLinks[0].ok
    ? { TOTAL: total, UNIQUE: unique, BROKEN: broken }
    : { TOTAL: total, UNIQUE: unique };
  return objetoEstadisticas;
}

leerArchivoMD(
  'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas\\archivo.md',
)
  .then((respuesta) => convertirAHtml(respuesta))
  .then((html) => console.log(extraerLinks(html, 'archivo.md')));
