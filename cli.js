#!/usr/bin/env node
/* eslint-disable max-len */
import mdLinks from './index.js';

const optionsObject = {};
if (process.argv[3] === '--validate' || process.argv[4] === '--validate') {
  optionsObject.validate = true;
} else {
  optionsObject.validate = false;
}

if (process.argv[3] === '--stats' || process.argv[4] === '--stats') {
  optionsObject.stats = true;
} else {
  optionsObject.stats = false;
}
//   }
// }

mdLinks(process.argv[2], optionsObject)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
