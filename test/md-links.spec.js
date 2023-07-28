/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
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

describe('existenciaDeLaRuta', () => {
  it('Deberia devolver una funcion', () => {
    expect(typeof existenciaDeLaRuta).toBe('function');
  });
  it('Deberia devolver la ruta', () => {
    expect(existenciaDeLaRuta('README.md')).toEqual('README.md');
  });
  // eslint-disable-next-line max-len
  it('Deberia arrojar un error', async () => {
    try {
      await existenciaDeLaRuta('/c/v/lalala.md');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('rutaAbsoluta', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof rutaAbsoluta).toBe('function');
  });
  it('Deberia devolver la ruta', () => {
    expect(
      rutaAbsoluta(
        'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/READMEE.md',
      ),
    ).toEqual(
      'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/READMEE.md',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia arrojar un error', async () => {
    try {
      await rutaAbsoluta('/c/v/lalala.md');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('convirtiendoLaRutaAAbsoluta', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof convirtiendoLaRutaAAbsoluta).toBe('function');
  });
  it('Deberia devolver la ruta convertida a absoluta', () => {
    expect(convirtiendoLaRutaAAbsoluta('READMEE.md')).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\READMEE.md',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia arrojar un error', async () => {
    try {
      convirtiendoLaRutaAAbsoluta('/c/v/lalala.md');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('rutaEsArchivoMD', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof rutaEsArchivoMD).toBe('function');
  });
  it('Deberia devolver la ruta convertida a absoluta', () => {
    expect(
      rutaEsArchivoMD(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\READMEE.md',
      ),
    ).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\READMEE.md',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia arrojar un error', async () => {
    try {
      rutaEsArchivoMD('/c/v/lalala.js');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('rutaEsDirectorio', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof rutaEsDirectorio).toBe('function');
  });
  it('Deberia devolver la ruta convertida a absoluta', () => {
    expect(
      rutaEsDirectorio(
        'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba',
      ),
    ).toEqual(
      'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia arrojar un error', async () => {
    try {
      await rutaEsDirectorio(
        'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba/carpetaPrueba/invento2.md',
      );
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('leerArchivoMD', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof leerArchivoMD).toBe('function');
  });
  it('Deberia devolver una promesa', () => {
    expect(
      leerArchivoMD(
        'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/READMEE.md',
      ),
    ).toBe({});
  });
  // eslint-disable-next-line max-len
  it('Deberia arrojar un error', async () => {
    try {
      await leerArchivoMD('/c/v/lalala.js');
    } catch (error) {
      expect(error).toEqual(false);
    }
  });
});

describe('convertirAHtml', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof convertirAHtml).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Deberia devolver un string en formato html', () =>
    expect(
      convertirAHtml('Quiero que me retorne esto en formato de html'),
    ).toEqual('<p>Quiero que me retorne esto en formato de html</p>'));
});

describe('extraerLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof extraerLinks).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    extraerLinks('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('leerDirectorio', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof leerDirectorio).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    leerDirectorio('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('validarLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof validarLinks).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    validarLinks('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('estadisticas', () => {
  it('Deberia devolver una funcion', () => {
    expect(typeof estadisticas).toBe('function');
  });
  it('Deberia devolver un Objeto', () => {
    expect(estadisticas(links)).toEqual('{TOTAL: 6, UNIQUE: 1}');
  });
  // eslint-disable-next-line max-len
  it('Deberia arrojar un error', () =>
    estadisticas('/c/v/lalala.md').catch((error) => {
      expect(error).toEqual(false);
    }));
});
