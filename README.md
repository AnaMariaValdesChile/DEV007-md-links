# MARKDOWN LINKS

Encuentra links en archivos .md

![](https://raw.githubusercontent.com/AnaMariaValdesChile/DEV007-md-links/feature-tablasYColor/mdLinks.png)

## Índice

- [1. Preámbulo](#1-preámbulo)
- [2.Pasos para ejecutar en tu terminal](#2-pasos-para-ejecutar-en-tu-terminal)
- [3. Resultados](#3-resultados)
- [4. Resumen del proyecto](#4-resumen-del-proyecto)

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).
Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## 2. Pasos para ejecutar en tu terminal

#### Tener npm instalado en tu proyecto.

`npm install`

#### Instalar mdLinks en tu proyecto.

`npm i anavaldes-md-links <nombrepaquete>` o bien `npm i anavaldes-md-links install -g <nombrepaquete>`

La diferencia entre `npm i anavaldes-md-links` y `npm i anavaldes-md-links -g` (o npm install npm i anavaldes-md-links--global) radica en cómo se instalan los paquetes y para qué propósito se utilizan.

Cuando ejecutas tu paquete con `npm i anavaldes-md-links` en la terminal, instala los paquetes listados en el archivo package.json en la carpeta actual de tu proyecto.

En cambio cuando ejecutas tu paquete con `npm i anavaldes-md-links -g` en la terminal, se instala el paquete globalmente en tu sistema, no en una carpeta específica de tu proyecto. Estos paquetes se instalan en una ubicación global del sistema, lo que significa que estarán disponibles para todos tus proyectos y en cualquier lugar del sistema.

#### Ya puedes usar mdLinks, pero considera lo siguiente

Si instalaste mdLinks con `npm i anavaldes-md-links`, debes usar :

`npx anavaldes-md-links + ruta del archivo`

En cambio si intalaste mdLinks con `npm i anavaldes-md-links -g`, debes usar:

`anavaldes-md-links + ruta del archivo`

## 3. Resultados

Al ejecuatar mdLinks revisa la ruta ingresada y nos entrega como resultado
=> si es un archivo .md o, un directorio y si encuentra archivos md
=> si encuentro links y la informacion de estos.

#### Ejemplos de resultados

Si ejecuto =>`anavaldes-md-links readme.md` o `npx anavaldes-md-links readme.md`

Me devuelve =>
![](https://raw.githubusercontent.com/AnaMariaValdesChile/DEV007-md-links/feature-tablasYColor/Screenshot_1.png)

#### Opciones

Ademas puedes agregar dos comandos despues de ingresda la ruta:

##### - -validate

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok, de lo contrario devolvera un fail.

Por ejemplo:

![](https://raw.githubusercontent.com/AnaMariaValdesChile/DEV007-md-links/feature-tablasYColor/Screenshot_2.png)

##### - -stats

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

Por ejemplo:

![](https://raw.githubusercontent.com/AnaMariaValdesChile/DEV007-md-links/feature-tablasYColor/Screenshot_3.png)

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

## 4. Resumen del proyecto

Este proyecto es una herramienta de línea de comando (CLI) como librería (o biblioteca - library) en JavaScript.

La implementación de este proyecto tiene varias partes: leer del sistema de
archivos, recibir argumentos a través de la línea de comando, analizar texto,
hacer consultas HTTP, y todas estas cosas pueden enfocarse de muchas formas, tanto usando librerías como implementando en VanillaJS.

### Archivos del proyecto

- `README.md` con descripción del módulo, instrucciones de instalación/uso,
  documentación del API y ejemplos. Todo lo relevante para que cualquier
  developer que quiera usar tu librería pueda hacerlo sin inconvenientes.
- `index.js`: Desde este archivo se exporta la función (`mdLinks`).
- `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts, test, main, bin.
- `.editorconfig` con configuración para editores de texto.
- `.eslintrc` con configuración para linter. con reglas adicionales
  como Airbnb.
- `.gitignore` para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
- `test/md-links.spec.js` contiene los tests unitarios para la funciones que contiene la funcion `mdLinks()`.

### Diagrama de flujo del proyecto

![](https://raw.githubusercontent.com/AnaMariaValdesChile/DEV007-md-links/84cd1468db13a67a395f9c0c113c62b139edf789/MdLinksDiagrama.drawio.png)
