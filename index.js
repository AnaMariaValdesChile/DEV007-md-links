/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
import chalk from 'chalk';
import Table from 'cli-table3';
import {
  existenciaDeLaRuta,
  rutaAbsoluta,
  convirtiendoLaRutaAAbsoluta,
  rutaEsArchivoMD,
  rutaEsDirectorio,
  leerArchivoMD,
  convertirAHtml,
  extraerLinks,
  leerDirectorio,
  validarLinks,
  estadisticas,
} from './funciones.js';

export default function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    if (path) {
      if (existenciaDeLaRuta(path)) {
        const pathToWork = rutaAbsoluta(path)
          ? path
          : convirtiendoLaRutaAAbsoluta(path);
        if (rutaEsArchivoMD(pathToWork)) {
          console.log(chalk.blue('La ruta corresponde a un Archivo .md'));
          leerArchivoMD(pathToWork)
            .then((contenido) => {
              const html = convertirAHtml(contenido);
              const links = extraerLinks(html, pathToWork);

              if (links.length > 0 && options.validate) {
                console.log(
                  chalk.blue(
                    `Se encontraron ${links.length} links en el archivo`,
                  ),
                );
                validarLinks(links).then((linksValidate) => {
                  if (options.stats) {
                    const result = estadisticas(linksValidate);
                    resolve(result);
                  } else {
                    console.log(
                      chalk.yellow(
                        'Para obtener estadisticas agregre comando --stats',
                      ),
                    );
                  }
                });
              } else if (links.length > 0 && !options.validate) {
                console.log(
                  chalk.blue(
                    `Se encontraron ${links.length} links en el archivo`,
                  ),
                );
                const tabla = new Table({
                  head: [
                    chalk.blue('NUMERO'),
                    chalk.blue('TEXT'),
                    chalk.blue('HREF'),
                    chalk.blue('FILE'),
                  ],
                  colWidths: [10, 50, 50, 20],
                });
                let numero = 1;
                links.forEach((link) => {
                  tabla.push([
                    chalk.blue(numero),
                    link.TEXT,
                    link.HREF,
                    link.FILE,
                  ]);
                  numero += 1;
                });
                console.log(tabla.toString());
                if (options.stats) {
                  const result = estadisticas(links);
                  console.log(result);
                  resolve(
                    chalk.yellow(
                      'Si necesita validar los links agregue comando --validate',
                    ),
                  );
                } else {
                  console.log(
                    chalk.yellow(
                      'Para validar los links agrege comando --validate',
                    ),
                  );
                  reject(
                    chalk.yellow(
                      'Para obtener estadisticas agregue comando --stats',
                    ),
                  );
                }
              } else {
                reject(chalk.red('No se encontraron Links'));
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (rutaEsDirectorio(pathToWork)) {
          console.log(pathToWork);
          console.log(chalk.blue('La ruta corresponde a un Directorio'));
          console.log(chalk.green('Leyendo archivos...'));
          const archivosDirectorio = leerDirectorio(pathToWork);
          if (archivosDirectorio) {
            if (archivosDirectorio.length) {
              console.log(
                chalk.blue(
                  `Se encontraron ${archivosDirectorio.length} archivos .md`,
                ),
              );
              console.log(chalk.green('Extrayendo links...'));
              const allLinks = [];
              const promises = archivosDirectorio.map((archivo) =>
                leerArchivoMD(archivo)
                  .then((contenido) => {
                    const html = convertirAHtml(contenido);
                    const links = extraerLinks(html, archivo);
                    const rutaRelativa = archivo.split('\\');
                    console.log(
                      chalk.blue(
                        `Se encontraron ${links.length} links en el archivo ${
                          rutaRelativa[rutaRelativa.length - 1]
                        }`,
                      ),
                    );
                    allLinks.push(links);
                  })
                  .catch((error) => {
                    console.log(error);
                  }),
              );
              Promise.all(promises).then(() => {
                const links = allLinks.flat();
                console.log(
                  chalk.blue(
                    `Se encontraron ${links.length} links en total es este Directorio`,
                  ),
                );

                if (links.length > 0 && options.validate) {
                  validarLinks(links).then((linksValidate) => {
                    if (options.stats) {
                      const result = estadisticas(linksValidate);
                      resolve(chalk.green(result));
                    } else {
                      console.log(
                        chalk.yellow(
                          'Para obtener estadisticas agregue comando --stats',
                        ),
                      );
                    }
                  });
                } else if (links.length > 0 && !options.validate) {
                  console.log(links);
                  if (options.stats) {
                    const result = estadisticas(links);
                    console.log(chalk.green(result));
                    resolve(
                      chalk.yellow(
                        'Para validar los links agrege comando --validate',
                      ),
                    );
                  } else {
                    console.log(
                      chalk.yellow(
                        'Para validar los links agrege comando --validate',
                      ),
                    );
                    reject(
                      chalk.yellow(
                        'Para obtener estadisticas agregue comando --stats',
                      ),
                    );
                  }
                } else {
                  reject(chalk.red('No se encontraron Links'));
                }
              });
            } else {
              console.log(chalk.red('No se encontraron archivos .md'));
            }
          } else {
            reject(chalk.red('El directorio esta vacio'));
          }
        } else {
          reject(
            chalk.red(
              'La ruta no corresponde a un Archivo .md ni un Directorio.',
            ),
          );
        }
      } else if (path.includes('--validate') || path.includes('--stats')) {
        reject(
          chalk.red(
            'Debe ingresar una ruta antes de las opciones --validate o --stats',
          ),
        );
      } else {
        reject(chalk.red('La ruta no existe.'));
      }
    } else {
      console.log(chalk.magenta('Bienvenido a MdLinks'));
      console.log(
        chalk.magenta(
          'Esta es una libreria para obtener links de un archivo .md',
        ),
      );
      console.log(chalk.magenta('Pasos:'));
      console.log(
        chalk.magenta(
          '1- Ejecuta comando npx mdLinks + ruta (del archivo o carpeta) ',
        ),
      );
      console.log(
        chalk.magenta(
          'o bien solo mdLinks mas la ruta (si realizaste npm install global)',
        ),
      );
      console.log(
        chalk.magenta(
          '2- Obtendras el resultado de los links encontrados con sus propiedades text, href y file',
        ),
      );
      console.log(
        chalk.magenta(
          '3- Si deseas validar o recibir estadisticas ademas puedes ejecutar:',
        ),
      );
      console.log(
        chalk.magenta(
          'npx mdLinks <ruta> --validate o mdLinks <ruta> --validate (para validar los links) ',
        ),
      );
      console.log(
        chalk.magenta(
          'npx mdLinks <ruta> --stats o mdLinks <ruta> --stats (para recibir estadisticas) ',
        ),
      );
      reject(chalk.magenta('puedes usar --validate y --stats simultaneamente'));
    }
  });
}

// ruta absoluta 'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/READMEE.md'
// ruta relativa 'READMEE.md'
// ruta no existe 'REAMEE.md'
// ruta RELATIVA DIRECTORIO 'DirectorioPrueba'
// ruta ABSOLUTA DIRECTORIO 'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba'
// ruta absoluta fuera de proyecto mdLinks 'C:/Users/Acer/Desktop/carpeta'

// options --validate --start
