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
      const res = await fetch(`https://play.google.com/store/apps/details?id=${game.id}`);
      const text = await res.text();
      // Look for trailer image
      const trailerMatch = text.match(/<img[^>]+src=\"(https:\/\/play-lh\.googleusercontent\.com\/[^\"]+)\"[^>]*alt=\"Trailer\"/i) || text.match(/<img[^>]*alt=\"Trailer\"[^>]+src=\"(https:\/\/play-lh\.googleusercontent\.com\/[^\"]+)\"/i);
      console.log(`${game.name} ::: ${trailerMatch ? trailerMatch[1] : "NOT FOUND"}`);
    } catch (err) {
      console.log(`${game.name} ::: ERROR`);
    }
  }
}
run();
