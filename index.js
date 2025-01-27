/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
import colors from 'colors';
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
          console.log(colors.blue('La ruta corresponde a un Archivo .md'));
          leerArchivoMD(pathToWork)
            .then((contenido) => {
              const html = convertirAHtml(contenido);
              const links = extraerLinks(html, pathToWork);

              if (links.length > 0 && options.validate) {
                console.log(
                  colors.blue(
                    `Se encontraron ${links.length} links en el archivo`,
                  ),
                );
                validarLinks(links).then((linksValidate) => {
                  if (options.stats) {
                    const result = estadisticas(linksValidate);
                    resolve(result);
                  } else {
                    console.log(
                      colors.yellow(
                        'Para obtener estadisticas agregre comando --stats',
                      ),
                    );
                  }
                });
              } else if (links.length > 0 && !options.validate) {
                console.log(
                  colors.blue(
                    `Se encontraron ${links.length} links en el archivo`,
                  ),
                );
                const tabla = new Table({
                  head: [
                    colors.blue('NUMERO'),
                    colors.blue('TEXT'),
                    colors.blue('HREF'),
                    colors.blue('FILE'),
                  ],
                  colWidths: [10, 30, 40, 60],
                });
                let numero = 1;
                links.forEach((link) => {
                  tabla.push([
                    colors.blue(numero),
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
                    colors.yellow(
                      'Si necesita validar los links agregue comando --validate',
                    ),
                  );
                } else {
                  console.log(
                    colors.yellow(
                      'Para validar los links agrege comando --validate',
                    ),
                  );
                  reject(
                    colors.yellow(
                      'Para obtener estadisticas agregue comando --stats',
                    ),
                  );
                }
              } else {
                reject(colors.red('No se encontraron Links'));
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (rutaEsDirectorio(pathToWork)) {
          console.log(pathToWork);
          console.log(colors.blue('La ruta corresponde a un Directorio'));
          console.log(colors.green('Leyendo archivos...'));
          const archivosDirectorio = leerDirectorio(pathToWork);
          if (archivosDirectorio) {
            if (archivosDirectorio.length) {
              console.log(
                colors.blue(
                  `Se encontraron ${archivosDirectorio.length} archivos .md`,
                ),
              );
              console.log(colors.green('Extrayendo links...'));
              const allLinks = [];
              const promises = archivosDirectorio.map((archivo) =>
                leerArchivoMD(archivo)
                  .then((contenido) => {
                    const html = convertirAHtml(contenido);
                    const links = extraerLinks(html, archivo);
                    const rutaRelativa = archivo.split('\\');
                    console.log(
                      colors.blue(
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
                  colors.blue(
                    `Se encontraron ${links.length} links en total es este Directorio`,
                  ),
                );

                if (links.length > 0 && options.validate) {
                  validarLinks(links).then((linksValidate) => {
                    if (options.stats) {
                      const result = estadisticas(linksValidate);
                      resolve(colors.green(result));
                    } else {
                      console.log(
                        colors.yellow(
                          'Para obtener estadisticas agregue comando --stats',
                        ),
                      );
                    }
                  });
                } else if (links.length > 0 && !options.validate) {
                  console.log(links);
                  if (options.stats) {
                    const result = estadisticas(links);
                    console.log(colors.green(result));
                    resolve(
                      colors.yellow(
                        'Para validar los links agrege comando --validate',
                      ),
                    );
                  } else {
                    console.log(
                      colors.yellow(
                        'Para validar los links agrege comando --validate',
                      ),
                    );
                    reject(
                      colors.yellow(
                        'Para obtener estadisticas agregue comando --stats',
                      ),
                    );
                  }
                } else {
                  reject(colors.red('No se encontraron Links'));
                }
              });
            } else {
              console.log(colors.red('No se encontraron archivos .md'));
            }
          } else {
            reject(colors.red('El directorio esta vacio'));
          }
        } else {
          reject(
            colors.red(
              'La ruta no corresponde a un Archivo .md ni un Directorio.',
            ),
          );
        }
      } else if (path.includes('--validate') || path.includes('--stats')) {
        reject(
          colors.red(
            'Debe ingresar una ruta antes de las opciones --validate o --stats',
          ),
        );
      } else {
        reject(colors.red('La ruta no existe.'));
      }
    } else {
      console.log(colors.magenta('Bienvenido a MdLinks'));
      console.log(
        colors.magenta(
          'Esta es una libreria para obtener links de un archivo .md',
        ),
      );
      console.log(colors.magenta('Pasos:'));
      console.log(
        colors.magenta(
          '1- Ejecuta comando npx mdLinks + ruta (del archivo o carpeta) ',
        ),
      );
      console.log(
        colors.magenta(
          'o bien solo mdLinks mas la ruta (si realizaste npm install global)',
        ),
      );
      console.log(
        colors.magenta(
          '2- Obtendras el resultado de los links encontrados con sus propiedades text, href y file',
        ),
      );
      console.log(
        colors.magenta(
          '3- Si deseas validar o recibir estadisticas ademas puedes ejecutar:',
        ),
      );
      console.log(
        colors.magenta(
          'npx mdLinks <ruta> --validate o mdLinks <ruta> --validate (para validar los links) ',
        ),
      );
      console.log(
        colors.magenta(
          'npx mdLinks <ruta> --stats o mdLinks <ruta> --stats (para recibir estadisticas) ',
        ),
      );
      reject(
        colors.magenta('puedes usar --validate y --stats simultaneamente'),
      );
    }
  });
}
