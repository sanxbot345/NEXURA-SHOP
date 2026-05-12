const gplay = require('google-play-scraper');

async function run() {
  const games = [
    { id: "com.mobile.legends", name: "Mobile Legends" },
    { id: "com.dts.freefireth", name: "Free Fire" },
    { id: "com.tencent.ig", name: "PUBG Mobile" },
    { id: "com.miHoYo.GenshinImpact", name: "Genshin Impact" },
    { id: "com.levelinfinite.sgameGlobal", name: "Honor of Kings" }
  ];

  for (const game of games) {
    try {
      const appInfo = await gplay.app({appId: game.id});
      console.log(`${game.name} ::: ${appInfo.headerImage}`);
    } catch (e) {
      console.log(`${game.name} ::: ERROR`);
    }
  }
}
run();
