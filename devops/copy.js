const shell = require('shelljs');

shell.rm('-Rf', 'prod');
shell.mkdir('prod');
shell.cp('-R', '.nuxt', 'prod/.nuxt');
shell.cp('-R', 'package.json', 'prod/package.json');
shell.cp('-R', 'config', 'prod/config');
shell.cp('-R', 'nuxt.config.js', 'prod/nuxt.config.js');
shell.cp('-R', 'router.js', 'prod/router.js');
shell.cp('-R', 'static', 'prod/static');
shell.cp('-R', 'modules', 'prod/modules');
