import axios from "axios";

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
      const res = await axios.get(`https://play.google.com/store/apps/details?id=${game.id}`);
      const text = res.data;
      const match = text.match(/https:\/\/play-lh\.googleusercontent\.com\/[a-zA-Z0-9_\-]+/g);
      console.log(`${game.name} found ${match ? match.length : 0} images`);
      if (match) {
        console.log("  " + match[0]);
        console.log("  " + match[1]);
        console.log("  " + match[2]);
      }
    } catch (err) {
      console.log(`${game.name} ::: ERROR`);
    }
  }
}
run();
