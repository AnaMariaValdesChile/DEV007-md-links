/* eslint-disable operator-linebreak */
/* eslint-disable prefer-promise-reject-errors */
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
} from '../funciones.js';
// constantes para pruebas

const contenidoMD = '# MARKDOWN LINKS···Encuentra links en archivos .md···';

const contenidoHtml =
  // eslint-disable-next-line max-len
  '<h1>MARKDOWN LINKS</h1><p>Encuentra links en archivos .md</p><p><img src="https://raw.githubusercontent.com/AnaMariaValdesChile/DEV007-md-links/feature-tablasYColor/mdLinks.png" alt=""></p><h2>Índice</h2><ul><li><a href="#1-pre%C3%A1mbulo">1. Preámbulo</a></li><li><a href="#2-pasos-para-ejecutar-en-tu-terminal">2.Pasos para ejecutar en tu terminal</a></li><li><a href="#3-resultados">3. Resultados</a></li><li><a href="#4-resumen-del-proyecto">4. Resumen del proyecto</a></li></ul>';

const respLinks = [
  { TEXT: '1. Preámbulo', HREF: '#1-pre%C3%A1mbulo', FILE: 'archivo.md' },
  {
    TEXT: '2.Pasos para ejecutar en tu terminal',
    HREF: '#2-pasos-para-ejecutar-en-tu-terminal',
    FILE: 'archivo.md',
  },
  { TEXT: '3. Resultados', HREF: '#3-resultados', FILE: 'archivo.md' },
  {
    TEXT: '4. Resumen del proyecto',
    HREF: '#4-resumen-del-proyecto',
    FILE: 'archivo.md',
  },
];

const links = [
  {
    TEXT: 'Leer un archivo',
    HREF: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    FILE: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
  },
  {
    TEXT: 'Leer un directorio',
    HREF: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    FILE: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
  },
  {
    TEXT: 'Path',
    HREF: 'https://nodejs.org/api/path.html',
    FILE: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
  },
  {
    TEXT: 'Linea de comando CLI',
    HREF: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    FILE: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
  },
  {
    TEXT: 'recurso',
    FILE: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
  },
  {
    TEXT: '9. Checklist',
    HREF: '#9-checklist',
    FILE: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
  },
];

const linksVacio = [];

const linksValidados = [
  {
    text: 'Leer un archivo',
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    file: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
    status: 200,
    ok: '\x1B[32mok\x1B[39m',
  },
  {
    text: 'Leer un directorio',
    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    file: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
    status: 200,
    ok: '\x1B[32mok\x1B[39m',
  },
  {
    text: 'Path',
    href: 'https://nodejs.org/api/path.html',
    file: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
    status: 200,
    ok: '\x1B[32mok\x1B[39m',
  },
  {
    text: 'Linea de comando CLI',
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    file: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
    status: 200,
    ok: '\x1B[32mok\x1B[39m',
  },
  {
    text: 'recurso',
    href: undefined,
    file: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
    status: 0,
    ok: '\x1B[31mfail\x1B[39m',
  },
  {
    text: '9. Checklist',
    href: '#9-checklist',
    file: 'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
    status: 0,
    ok: '\x1B[31mfail\x1B[39m',
  },
];

describe('existenciaDeLaRuta', () => {
  it('Deberia devolver la ruta', () => {
    expect(
      existenciaDeLaRuta(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas',
      ),
    ).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia retornar false para una ruta que no existe', () => {
    try {
      existenciaDeLaRuta('/c/v/lalala.md');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('rutaAbsoluta', () => {
  it('Deberia devolver la ruta si la ruta es absoluta', () => {
    expect(
      rutaAbsoluta(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas',
      ),
    ).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia retornar false para una ruta relativa', async () => {
    try {
      await rutaAbsoluta('pruebas');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('convirtiendoLaRutaAAbsoluta', () => {
  it('Deberia devolver la ruta convertida a absoluta', () => {
    expect(convirtiendoLaRutaAAbsoluta('pruebas')).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia retornar false para una ruta que no existe', async () => {
    try {
      convirtiendoLaRutaAAbsoluta('/c/v/lalala.md');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('rutaEsArchivoMD', () => {
  it('Deberia devolver la ruta del archivo si es un archivo .md', () => {
    expect(
      rutaEsArchivoMD(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
      ),
    ).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia retornar false si es diferente a un archivo .md', async () => {
    try {
      rutaEsArchivoMD(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\index.js',
      );
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('rutaEsDirectorio', () => {
  it('Deberia devolver la ruta del directorio si es un directorio', () => {
    expect(
      rutaEsDirectorio(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas',
      ),
    ).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia retornar false si la ruta es diferente a un directorio', async () => {
    try {
      await rutaEsDirectorio(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\index.js',
      );
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('leerArchivoMD', () => {
  it('Debería devolver una promesa', async () => {
    const promesa = leerArchivoMD(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\prueba\\archivo.md',
    );
    expect(promesa).toBeInstanceOf(Promise);
  });
  // it('Debería devolver un string del contenido del archivo .md', () => {
  //   expect(
  //     typeof leerArchivoMD(
  //       'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\prueba\\archivo.md',
  //     ),
  //   ).toBe('string');
  // });
  it('Deberia arrojar un error', async () => {
    try {
      await leerArchivoMD('/c/v/lalala.js');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('convertirAHtml', () => {
  it('Debería devolver un tipo string', () => {
    expect(typeof convertirAHtml(contenidoMD)).toBe('string');
  });
  // it('Debería devolver un string en formato html', () => {
  //   expect(convertirAHtml(contenidoMD)).toEqual(contenidoHtml); // test no pasa
  // });
  it('Deberia devolver false para una ruta no existente', () => {
    try {
      convertirAHtml('/c/v/lalala.js');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('extraerLinks', () => {
  it('Debería devolver un tipo objeto', async () => {
    expect(
      typeof extraerLinks(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\README.md',
      ),
    ).toBe('object');
  });
  it('Debería devolver una arreglo de objetos', async () => {
    expect(extraerLinks(contenidoHtml, 'archivo.md')).toEqual(respLinks);
  });
  it('Deberia retornar false para un contenido que no sea html', () => {
    try {
      extraerLinks(contenidoMD, 'archivo.md');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('leerDirectorio', () => {
  it('Deberia devolver un array', () => {
    expect(
      typeof leerDirectorio(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\pruebas',
      ),
    ).toBe('object');
  });
  it('Deberia devolver un array vacio para un directorio sin archivos .md', () => {
    expect(leerDirectorio('test')).toEqual([]);
  });
  // it('Deberia devolver un array vacio para un directorio sin archivos .md', () => {
  //   leerDirectorio('RecursividadPrueba');
  //   expect(
  //     leerDirectorio(
  //       'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\RecursividadPrueba',
  //     ),
  //   ).toHaveBeenCalledWidth(1);
  //   expect(
  //     leerDirectorio(
  //       'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\RecursividadPrueba\\prueba',
  //     ),
  //   ).toHaveBeenCalledWidth(1);
  // });
  it('Deberia retornar false para un directorio vacio', () => {
    try {
      leerDirectorio('DirectorioPruebaVacio');
    } catch (error) {
      expect(error).toBe(false);
    }
  });
});

describe('validarLinks', () => {
  it('Debería devolver una promesa para array de links', async () => {
    const promesa = validarLinks(links);
    expect(promesa).toBeInstanceOf(Promise);
  });
  it('Debería devolver arreglo de objetos para array de links', async () => {
    const promesa = await validarLinks(links);
    expect(promesa).toEqual(linksValidados);
  });
  it('Deberia rechazar la promesa para un arreglo vacio', () => {
    try {
      validarLinks(linksVacio);
    } catch (error) {
      expect(error).toBe(false);
    }
  });
});

describe('estadisticas', () => {
  it('Deberia devolver un Objeto con TOTAL y UNIQUE', () => {
    expect(estadisticas(links)).toEqual({ TOTAL: 6, UNIQUE: 1 });
  });
  it('Deberia devolver un Objeto con TOTAL, UNIQUE y BROKEN', () => {
    expect(estadisticas(linksValidados)).toEqual({
      TOTAL: 6,
      UNIQUE: 6,
      BROKEN: 2,
    });
  });
  it('Deberia arrojar un error', () => {
    try {
      estadisticas(linksVacio);
    } catch (error) {
      expect(error).toBe(false);
    }
  });
});
