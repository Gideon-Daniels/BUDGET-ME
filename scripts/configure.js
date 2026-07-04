const fs = require('fs');
const path = require('path');

const env = process.argv[2];

if (!env) {
  console.error('Please specify an environment.');
  process.exit(1);
}

const source = path.join(
  __dirname,
  '..',
  'src',
  'app',
  'config',
  `app-config.${env}.ts`
);

const destination = path.join(
  __dirname,
  '..',
  'src',
  'app',
  'config',
  'app-deployment.active.ts'
);

if (!fs.existsSync(source)) {
  console.error(`Configuration '${env}' does not exist.`);
  process.exit(1);
}

fs.copyFileSync(source, destination);

console.log(`✔ Switched configuration to '${env}'`);
