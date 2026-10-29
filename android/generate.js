// Generates the Android (TWA) project for Bad Line with Bubblewrap, the same tool PWABuilder uses.
const {TwaManifest, TwaGenerator, ConsoleLog} = require('@bubblewrap/core');

(async () => {
  const url = 'https://cajsag73.github.io/bad-line/manifest.webmanifest';
  const m = await TwaManifest.fromWebManifest(url);
  m.packageId = 'io.github.cajsag73.badline';
  m.name = 'Bad Line';
  m.launcherName = 'Bad Line';
  m.appVersionName = process.env.VERSION_NAME || '1.0.0';
  m.appVersionCode = parseInt(process.env.VERSION_CODE || '1', 10);
  m.signingKey = {path: process.env.KEYSTORE_PATH, alias: 'android'};
  m.enableNotifications = false;
  m.fallbackType = 'customtabs';
  m.display = 'standalone';
  m.orientation = 'portrait';
  m.shortcuts = [];
  m.minSdkVersion = 24;
  const out = process.argv[2];
  await new TwaGenerator().createTwaProject(out, m, new ConsoleLog('generate'));
  await m.saveToFile(out + '/twa-manifest.json');
  console.log('Generated', m.packageId, m.appVersionName, m.appVersionCode, 'host', m.host, 'start', m.startUrl);
})().catch(e => { console.error(e); process.exit(1); });
